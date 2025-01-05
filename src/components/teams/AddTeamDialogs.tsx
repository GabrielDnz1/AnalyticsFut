import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AddTeamForm } from './AddTeamForm';
import { Team } from '@/types';

interface AddTeamDialogProps {
  onTeamAdd: (team: Team) => void;
}

export function AddTeamDialog({ onTeamAdd }: AddTeamDialogProps) {
  const [open, setOpen] = useState(false);

  const handleTeamAdd = (team: Team) => {
    onTeamAdd(team);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
        </DialogHeader>
        <AddTeamForm onSubmit={handleTeamAdd} />
      </DialogContent>
    </Dialog>
  );
}