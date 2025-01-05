import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PlayerForm } from './PlayerForm';
import { Team, Player } from '@/types';

interface AddPlayerDialogProps {
  team: Team;
  onTeamUpdate: (team: Team) => void;
}

export function AddPlayerDialog({ team, onTeamUpdate }: AddPlayerDialogProps) {
  const [open, setOpen] = useState(false);

  const handlePlayerAdd = (newPlayer: Player) => {
    const updatedTeam = {
      ...team,
      players: [...team.players, { ...newPlayer, teamId: team.id }]
    };
    onTeamUpdate(updatedTeam);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Player
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
        </DialogHeader>
        <PlayerForm onSubmit={handlePlayerAdd} />
      </DialogContent>
    </Dialog>
  );
}