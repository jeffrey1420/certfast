import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label: string;
  description?: string;
  className?: string;
}

export function ProgressBar({ 
  value, 
  label, 
  description,
  className 
}: ProgressBarProps) {
  // Determine color based on progress
  const getProgressColor = (val: number) => {
    if (val >= 80) return 'bg-green-500';
    if (val >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Progress 
        value={value} 
        className="h-2"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
