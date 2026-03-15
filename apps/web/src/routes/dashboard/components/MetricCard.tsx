import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp: boolean | null;
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  trendUp 
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        {trend && (
          <div className={cn(
            "mt-2 flex items-center text-xs",
            trendUp === true && "text-green-600",
            trendUp === false && "text-red-600",
            trendUp === null && "text-muted-foreground"
          )}>
            {trendUp === true && <TrendingUp className="mr-1 h-3 w-3" />}
            {trendUp === false && <TrendingDown className="mr-1 h-3 w-3" />}
            {trendUp === null && <Minus className="mr-1 h-3 w-3" />}
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
