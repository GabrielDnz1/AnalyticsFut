import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Player } from '@/types';

interface PlayerFormProps {
  player?: Player;
  onSubmit: (player: Player) => void;
}

export function PlayerForm({ player, onSubmit }: PlayerFormProps) {
  const [name, setName] = useState(player?.name ?? '');
  const [position, setPosition] = useState<'GK' | 'DF' | 'MF' | 'FW'>(player?.position ?? 'MF');
  const [age, setAge] = useState(player?.age?.toString() ?? '');
  const [imageUrl, setImageUrl] = useState(player?.imageUrl ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const playerData: Player = {
      id: player?.id ?? crypto.randomUUID(),
      name,
      position,
      age: parseInt(age),
      imageUrl: imageUrl || undefined,
      teamId: player?.teamId ?? '',
      stats: player?.stats ?? {
        goals: 0,
        assists: 0,
        tackles: 0,
        shots: 0,
        shotsOnTarget: 0,
        passes: 0,
        passAccuracy: 0,
        interceptions: 0,
        possession: 0,
        minutesPlayed: 0,
        gamesPlayed: 0
      }
    };

    onSubmit(playerData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Select value={position} onValueChange={(value) => setPosition(value as 'GK' | 'DF' | 'MF' | 'FW')}>
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GK">Goalkeeper</SelectItem>
            <SelectItem value="DF">Defender</SelectItem>
            <SelectItem value="MF">Midfielder</SelectItem>
            <SelectItem value="FW">Forward</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter player age"
          required
          min="15"
          max="50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>

      <Button type="submit" className="w-full">
        {player ? 'Update Player' : 'Add Player'}
      </Button>
    </form>
  );
}