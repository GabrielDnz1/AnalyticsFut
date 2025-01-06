import React, { useState } from 'react';
import { Shot } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ShotFormProps {
  onSubmit: (data: Omit<Shot, 'position' | 'xG'>) => void;
  disabled: boolean;
}

const ShotForm: React.FC<ShotFormProps> = ({ onSubmit, disabled }) => {
  const [shotData, setShotData] = useState<Shot>({
    shotType: 'Com assistência',
    technique: 'Pé',
    pressure: false,
    lookedBefore: false,
    position: { x: 0, y: 0 },
    destination: { x: 0, y: 0 },
    xG: 0,
    xGoT: 0,
  }
);

  const handleChange = (name: string, value: string) => {
    setShotData((prevData) => ({
      ...prevData,
      [name]: name === 'pressure' || name === 'lookedBefore' ? value === 'true' : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { position, xG, ...dataToSubmit } = shotData;
    onSubmit(dataToSubmit);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Características do Chute</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="shotType">Jogada para o Chute</Label>
            <Select
              disabled={disabled}
              value={shotData.shotType}
              onValueChange={(value) => handleChange('shotType', value)}
            >
              <SelectTrigger id="shotType">
                <SelectValue placeholder="Selecione o tipo de chute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Com assistência">Com assistência</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Bola Parada">Bola Parada</SelectItem>
                <SelectItem value="Pênalti">Pênalti</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technique">Técnica de Chute</Label>
            <Select
              disabled={disabled}
              value={shotData.technique}
              onValueChange={(value) => handleChange('technique', value)}
            >
              <SelectTrigger id="technique">
                <SelectValue placeholder="Selecione a técnica do Chute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pé">Pé</SelectItem>
                <SelectItem value="Cabeça">Cabeça</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pressure">Sob Marcação</Label>
            <Select
              disabled={disabled}
              value={shotData.pressure ? 'true' : 'false'}
              onValueChange={(value) => handleChange('pressure', value)}
            >
              <SelectTrigger id="pressure">
                <SelectValue placeholder="Selecione se há pressão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lookedBefore">Visão do Gol</Label>
            <Select
              disabled={disabled}
              value={shotData.lookedBefore ? 'true' : 'false'}
              onValueChange={(value) => handleChange('lookedBefore', value)}
            >
              <SelectTrigger id="lookedBefore">
                <SelectValue placeholder="Selecione se já olhou para o gol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={disabled}
            className="w-full"
            variant="default"
          >
            Calcular xG
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShotForm;
