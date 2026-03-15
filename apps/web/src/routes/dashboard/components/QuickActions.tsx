import { Button } from '@/components/ui/button';
import { Plus, Upload, FileCheck, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Assessment',
      icon: <Plus className="mr-2 h-4 w-4" />,
      variant: 'default' as const,
      onClick: () => navigate('/assessments/new'),
    },
    {
      label: 'Upload Evidence',
      icon: <Upload className="mr-2 h-4 w-4" />,
      variant: 'outline' as const,
      onClick: () => navigate('/evidence/upload'),
    },
    {
      label: 'View Reports',
      icon: <FileCheck className="mr-2 h-4 w-4" />,
      variant: 'outline' as const,
      onClick: () => navigate('/reports'),
    },
    {
      label: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
      variant: 'outline' as const,
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          onClick={action.onClick}
          className="flex-1 min-w-[140px]"
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
    </div>
  );
}
