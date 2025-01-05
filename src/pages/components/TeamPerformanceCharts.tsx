import { Team } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface TeamPerformanceChartsProps {
  team: Team;
}

export function TeamPerformanceCharts({ team }: TeamPerformanceChartsProps) {
  // Example data - in a real app, this would come from your actual match data
  const performanceData = [
    {
      name: 'Game 1',
      goals: 2,
      assists: 1,
      possession: 60,
    },
    {
      name: 'Game 2',
      goals: 1,
      assists: 1,
      possession: 55,
    },
    {
      name: 'Game 3',
      goals: 3,
      assists: 2,
      possession: 65,
    },
  ];

  return (
    <div className="grid gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="goals" 
                  fill="hsl(var(--chart-1))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="assists" 
                  fill="hsl(var(--chart-2))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="possession" 
                  fill="hsl(var(--chart-3))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}