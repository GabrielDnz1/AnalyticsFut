import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shot } from '../types';
import { FaTimes } from 'react-icons/fa'; // Ícone de X para excluir
import Papa from 'papaparse';

interface ShotHistoryProps {
  shots: Shot[];
  onDelete: (index: number) => void; 
}

const ShotHistory = ({ shots, onDelete }: ShotHistoryProps) => {
  // Função para exportar os dados para CSV
  const exportToCSV = () => {
    const csvData = shots.map((shot) => ({
      xG: shot.xG.toFixed(3),
      xGoT: shot.xGoT.toFixed(3),
      shotType: shot.shotType,
      technique: shot.technique,
      pressure: shot.pressure ? 'Sim' : 'Não',
      lookedBefore: shot.lookedBefore ? 'Sim' : 'Não',
    }));

    // Usando PapaParse para gerar o CSV
    const csv = Papa.unparse(csvData);

    // Criar um link para download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'shot_history.csv';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Registro dos Chutes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shots.map((shot, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg flex justify-between items-start">
              <div>
                <div className="font-semibold text-lg text-primary">
                  xG: {shot.xG.toFixed(3)}
                </div>
                <div className="font-semibold text-lg text-primary">
                  xGoT: {shot.xGoT.toFixed(3)} {/* Exibindo xGoT */}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Jogada para o Remate: {shot.shotType}</p>
                  <p>Tecnica do Remate: {shot.technique}</p>
                  <p>Sob Marcação: {shot.pressure ? 'Sim' : 'Não'}</p>
                  <p>Visão do Gol: {shot.lookedBefore ? 'Sim' : 'Não'}</p>
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={() => onDelete(index)}
              >
                <FaTimes size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Botão para exportar para CSV */}
        <div className="mt-4 text-center">
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-600 dark:text-gray-100 dark:hover:bg-blue-500"
          >
            Exportar para CSV
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShotHistory;
