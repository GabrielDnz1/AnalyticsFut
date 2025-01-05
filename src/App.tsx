import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { Shot } from './types';
import Header from './components/Header';
import ShotForm from './components/ShotForm';
import GoalView from './components/GoalView';
import TraveView from './components/TraveView';
import ShotHistory from './components/ShotHistory';
import { calculateXG, calculateXGoT } from './utils/xgCalculator';
import { VideoEmbed } from './components/VideoEmbed';
import { FootballField } from './components/FootballField';
import { EventList } from './components/EventList';
import { FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TeamCard } from '@/components/teams/TeamCard';
import { AddTeamDialog } from '@/components/teams/AddTeamDialogs';
import { Team } from '@/types';
import { TeamDetails } from './pages/TeamDetails';

export default function App() {
  // Estado para os times
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const handleTeamClick = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const handleTeamAdd = (newTeam: Team) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const handleTeamUpdate = (updatedTeam: Team) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === updatedTeam.id ? updatedTeam : team
      )
    );
  };

  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  // Cronômetro
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSpeed, setTimerSpeed] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / timerSpeed);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSpeed]);

  const formatTime = (minutes: number, seconds: number) =>
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleTimeChange = (newMinutes: number, newSeconds: number) => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  };

  // Estado para a calculadora de xG
  const [shots, setShots] = useState<Shot[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const [traveSelectedPosition, setTraveSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const [isTraveEnabled, setIsTraveEnabled] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(false);

  // Estado para o logger de eventos no futebol
  const [videoUrl, setVideoUrl] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  const handleGoalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setSelectedPosition({ x, y });
    setIsTraveEnabled(true);
  };

  const handleTraveClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setTraveSelectedPosition({ x, y });
    setIsFormEnabled(true);
  };

  const handleShotSubmit = (shotData: Omit<Shot, "position" | "xG" | "xGoT">) => {
    if (!selectedPosition || !traveSelectedPosition) return;

    const xG = calculateXG(selectedPosition, shotData);
    const xGoT = calculateXGoT(traveSelectedPosition, shotData);

    const newShot: Shot = {
      ...shotData,
      position: selectedPosition,
      destination: traveSelectedPosition,
      xG,
      xGoT,
    };

    setShots((prevShots) => [...prevShots, newShot]);

    setSelectedPosition(null);
    setTraveSelectedPosition(null);
    setIsTraveEnabled(false);
    setIsFormEnabled(false);
  };

  const handleDeleteShot = (index: number) => {
    setShots((prevShots) => prevShots.filter((_, i) => i !== index));
  };

  const handleFieldClick = (x: number, y: number) => {
    const formattedTime = formatTime(minutes, seconds); // Formata o tempo corretamente
    setEvents(prev => [...prev, { x, y, timestamp: formattedTime, description: '' }]);
  };

  const handleEventUpdate = (index: number, description: string) => {
    setEvents(prev => prev.map((event, i) =>
      i === index ? { ...event, description } : event
    ));
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(prev => prev.filter((_, i) => i !== index)); // Deleta o evento selecionado
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <main className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Calculadora de xG</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
            <GoalView selectedPosition={selectedPosition} onGoalClick={handleGoalClick} />
            <div className={!isTraveEnabled ? 'opacity-50' : ''}>
              <TraveView selectedPositionTrave={traveSelectedPosition} onTraveClick={handleTraveClick} />
            </div>
            <div className={!isFormEnabled ? 'opacity-50' : ''}>
              <ShotForm onSubmit={handleShotSubmit} disabled={!isFormEnabled} />
            </div>
          </div>
          <ShotHistory shots={shots} onDelete={handleDeleteShot} />

          {/* Campo para inserir a URL do vídeo */}
          <div className="mt-8 text-center">
            <input
              type="text"
              placeholder="Insira uma URL válida do video do jogo"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-80 p-2 text-center bg-gray-700 text-white rounded-md"
            />
          </div>

          {/* Exibe o vídeo se houver URL */}
          {videoUrl && <VideoEmbed url={videoUrl} />}

          {/* Cronômetro */}
          <div className="mt-4 text-center text-xl font-bold text-foreground">
            {formatTime(minutes, seconds)}
          </div>

          {/* Botões para controlar o cronômetro */}
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              onClick={() => setIsTimerRunning(true)}
              disabled={isTimerRunning}
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Start
            </Button>
            <Button
              onClick={() => setIsTimerRunning(false)}
              disabled={!isTimerRunning}
              className="px-6 py-2 bg-red-600 text-white rounded-md"
            >
              Pause
            </Button>
          </div>

          {/* Controle de velocidade do cronômetro */}
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              onClick={() => setTimerSpeed(1)}
              className={`px-6 py-2 rounded-md ${timerSpeed === 1 ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
              1x
            </Button>
            <Button
              onClick={() => setTimerSpeed(2)}
              className={`px-6 py-2 rounded-md ${timerSpeed === 2 ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
              2x
            </Button>
            <Button
              onClick={() => setTimerSpeed(3)}
              className={`px-6 py-2 rounded-md ${timerSpeed === 3 ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
              3x
            </Button>
          </div>

          {/* Entrada para ajuste manual do tempo */}
          <div className="mt-4 text-center">
            <div className="flex justify-center space-x-2">
              <input
                type="number"
                value={minutes}
                onChange={(e) => handleTimeChange(Number(e.target.value), seconds)}
                className="w-16 p-2 text-center bg-gray-700 text-white rounded-md"
                min="0"
              />
              <span>:</span>
              <input
                type="number"
                value={seconds}
                onChange={(e) => handleTimeChange(minutes, Number(e.target.value))}
                className="w-16 p-2 text-center bg-gray-700 text-white rounded-md"
                min="0"
                max="59"
              />
            </div>
          </div>

          {/* Football Field */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Logger de Eventos</h2>
            <FootballField events={events} onFieldClick={handleFieldClick} />
          </div>

          <EventList
            events={events}
            onEventUpdate={handleEventUpdate}
            onDeleteEvent={handleDeleteEvent}
          />

        </main>
      </div>
      <ThemeProvider defaultTheme="dark" storageKey="analytics-fut-theme">
        <div className="min-h-screen bg-background">
          {selectedTeam ? (
            <TeamDetails team={selectedTeam} onTeamUpdate={handleTeamUpdate} />
          ) : (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Teams</h1>
                <AddTeamDialog onTeamAdd={handleTeamAdd} />
              </div>

              {teams.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Essa Função ainda não está totalmente implementada.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team) => (
                    <TeamCard
                      key={team.id}
                      team={team}
                      onClick={handleTeamClick}
                    />
                  ))}
                </div>
              )}
            </main>
          )}
        </div>
      </ThemeProvider>
    </ThemeProvider>
  );
}
