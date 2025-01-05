import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Team } from '@/types';

interface AddTeamFormProps {
  onSubmit: (team: Team) => void;
}

export function AddTeamForm({ onSubmit }: AddTeamFormProps) {
  const [teamName, setTeamName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTeam: Team = {
      id: crypto.randomUUID(),
      name: teamName,
      logoUrl: logoUrl || undefined,
      players: [],
      stats: {
        totalGames: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        cleanSheets: 0,
        possession: 0,
        shots: 0,
        shotsOnTarget: 0,
        passes: 0,
        passAccuracy: 0,
        tackles: 0,
        interceptions: 0
      }
    };

    onSubmit(newTeam);
    setTeamName('');
    setLogoUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="teamName">Team Name</Label>
        <Input
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="logoUrl">Logo URL (optional)</Label>
        <Input
          id="logoUrl"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="Enter logo URL"
        />
      </div>
      <Button type="submit" className="w-full" disabled={!teamName.trim()}>
        Create Team
      </Button>
    </form>
  );
}