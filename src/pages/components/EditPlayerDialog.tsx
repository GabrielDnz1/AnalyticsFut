import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { PlayerForm } from './PlayerForm';
import { Player } from '@/types';

interface EditPlayerDialogProps {
  player: Player;
  onPlayerUpdate: (player: Player) => void;
}

export function EditPlayerDialog({ player, onPlayerUpdate }: EditPlayerDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (updatedPlayer: Player) => {
    onPlayerUpdate({ ...updatedPlayer, id: player.id, teamId: player.teamId });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
        </DialogHeader>
        <PlayerForm player={player} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}