import { Team } from '@/types';
import { TeamStats } from './components/TeamStats';
import { PlayersList } from './components/PlayerList';
import { AddPlayerDialog } from './components/AddPlayerDialog';
import { TeamPerformanceCharts } from './components/TeamPerformanceCharts';

interface TeamDetailsProps {
  team: Team;
  onTeamUpdate: (updatedTeam: Team) => void;
}

export function TeamDetails({ team, onTeamUpdate }: TeamDetailsProps) {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {team.logoUrl ? (
              <img src={team.logoUrl} alt={team.name} className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{team.name[0]}</span>
              </div>
            )}
            <h1 className="text-4xl font-bold text-foreground">{team.name}</h1>
          </div>
          <AddPlayerDialog team={team} onTeamUpdate={onTeamUpdate} />
        </div>

        <div className="grid gap-8">
          <TeamStats stats={team.stats} />
          <TeamPerformanceCharts team={team} />
          <PlayersList team={team} onTeamUpdate={onTeamUpdate} />
        </div>
      </div>
    </div>
  );
}