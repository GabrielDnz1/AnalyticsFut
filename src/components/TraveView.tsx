import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TraveViewProps {
    selectedPositionTrave: { x: number; y: number } | null;
    onTraveClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const TraveView = ({ selectedPositionTrave, onTraveClick }: TraveViewProps) => {
    const handleTraveClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Aqui calculamos as coordenadas x e y com base no clique
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100; // Normalizando para uma porcentagem de 0 a 100
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        // Exibe no console as coordenadas
        console.log(`Coordenadas clicadas: x = ${x}, y = ${y}`);

        // Impede a seleção se x for menor que 12, maior que 88, ou y for menor que 15 ou maior que 60
        if (x < 12 || x > 88 || y < 15 || y > 55) {
            console.log("Clique ignorado: coordenadas fora do intervalo permitido");
            return; // Impede a seleção
        }

        // Chama a função passada via props (onTraveClick) se a condição for atendida
        onTraveClick(event);
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Destino da Finalização
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className="relative w-full aspect-[4/3] cursor-crosshair bg-muted rounded-lg overflow-hidden"
                    onClick={handleTraveClick} // Modificação para usar handleTraveClick
                >
                    {/* Soccer field representation */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                        {/* linha de fundo */}
                        <rect x="-20" y="55" width="150" height="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                        {/* área */}
                        <rect x="0" y="15" width="100" height="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                    </svg>

                    {/* Shot marker */}
                    {selectedPositionTrave && (
                        <div
                            className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${selectedPositionTrave.x}%`,
                                top: `${selectedPositionTrave.y}%`
                            }}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TraveView;
