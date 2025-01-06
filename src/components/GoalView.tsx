import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GoalViewProps {
  selectedPosition: { x: number; y: number } | null;
  onGoalClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const GoalView = ({ selectedPosition, onGoalClick }: GoalViewProps) => {
  const handleGoalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Obtendo o contêiner de onde o clique aconteceu
    const field = event.currentTarget;
    const rect = field.getBoundingClientRect();

    // Calculando a posição relativa ao clique
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Exibindo as coordenadas no console
    console.log('Coordenadas do clique:', x, y);

    // Verificando se y é maior ou igual a 15
    if (y < 15) {
      console.log('Clique ignorado: y é menor que 15');
      return; // Ignora o clique se y for menor que 15
    }

    // Chamando a função onGoalClick passando as coordenadas
    onGoalClick(event);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Local do Remate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="relative w-full aspect-[4/3] cursor-crosshair bg-muted rounded-lg overflow-hidden"
          onClick={handleGoalClick} // Alterando para usar a função handleGoalClick
        >
          {/* Soccer field representation */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            {/* linha de fundo */}
            <rect x="-20" y="15" width="150" height="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
            {/* área */}
            <rect x="15" y="15" width="70" height="33" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
            {/* Pequena Área */}
            <rect x="30" y="15" width="40" height="11.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
            {/* Trave */}
            <rect x="40" y="7" width="20" height="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
            {/* Penalty spot */}
            <circle cx="50" cy="36" r="0.8" fill="hsl(var(--primary))"/>
            {/* Penalty arc - now facing downward */}
            <path 
              d="M 35 48 A 16 10 0 0 0 65 48" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="1"
            />
          </svg>

          {/* Shot marker */}
          {selectedPosition && (
            <div 
              className="absolute w-3 h-3 bg-destructive rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${selectedPosition.x}%`,
                top: `${selectedPosition.y}%`
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalView;
