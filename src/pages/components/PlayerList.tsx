import { Team, Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EditPlayerDialog } from './EditPlayerDialog';
import { DeletePlayerDialog } from './DeletePlayerDialog';

interface PlayersListProps {
  team: Team;
  onTeamUpdate: (team: Team) => void;
}

export function PlayersList({ team, onTeamUpdate }: PlayersListProps) {
  const handlePlayerUpdate = (updatedPlayer: Player) => {
    const updatedTeam = {
      ...team,
      players: team.players.map(player => 
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    };
    onTeamUpdate(updatedTeam);
  };

  const handlePlayerDelete = (playerId: string) => {
    const updatedTeam = {
      ...team,
      players: team.players.filter(player => player.id !== playerId)
    };
    onTeamUpdate(updatedTeam);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Players</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Goals</TableHead>
              <TableHead>Assists</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.stats.goals}</TableCell>
                <TableCell>{player.stats.assists}</TableCell>
                <TableCell className="space-x-2">
                  <EditPlayerDialog player={player} onPlayerUpdate={handlePlayerUpdate} />
                  <DeletePlayerDialog player={player} onPlayerDelete={handlePlayerDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}