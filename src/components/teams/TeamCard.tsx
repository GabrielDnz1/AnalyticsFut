import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/types';
import { Users } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  onClick: (teamId: string) => void;
}

export const TeamCard: FC<TeamCardProps> = ({ team, onClick }) => {
  return (
    <Card 
      className="hover:bg-accent cursor-pointer transition-colors"
      onClick={() => onClick(team.id)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {team.name}
        </CardTitle>
        {team.logoUrl ? (
          <img 
            src={team.logoUrl} 
            alt={team.name} 
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <Users className="h-8 w-8" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Players: {team.players.length}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Record: {team.stats.wins}W - {team.stats.draws}D - {team.stats.losses}L
        </div>
      </CardContent>
    </Card>
  );
};