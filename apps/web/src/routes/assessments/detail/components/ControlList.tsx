import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export interface Control {
  id: string
  name: string
  description: string
  status: 'not_started' | 'in_progress' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high'
  evidenceRequired: boolean
  evidenceCount: number
  checklistItems: {
    id: string
    text: string
    checked: boolean
  }[]
}

interface ControlListProps {
  controls: Control[]
  onToggleChecklistItem: (controlId: string, itemId: string) => void
}

const statusConfig = {
  not_started: { label: 'Not Started', variant: 'secondary' as const, icon: Circle },
  in_progress: { label: 'In Progress', variant: 'default' as const, icon: AlertCircle },
  completed: { label: 'Completed', variant: 'outline' as const, icon: CheckCircle2 },
  failed: { label: 'Failed', variant: 'destructive' as const, icon: AlertCircle },
}

const priorityConfig = {
  low: { label: 'Low', className: 'bg-blue-100 text-blue-800' },
  medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', className: 'bg-red-100 text-red-800' },
}

export function ControlList({ controls, onToggleChecklistItem }: ControlListProps) {
  const [expandedControl, setExpandedControl] = useState<string | null>(null)

  const toggleExpand = (controlId: string) => {
    setExpandedControl(expandedControl === controlId ? null : controlId)
  }

  const getCompletionPercentage = (control: Control) => {
    if (control.checklistItems.length === 0) return 0
    const checked = control.checklistItems.filter((item) => item.checked).length
    return Math.round((checked / control.checklistItems.length) * 100)
  }

  return (
    <div className="space-y-3">
      {controls.map((control) => {
        const StatusIcon = statusConfig[control.status].icon
        const isExpanded = expandedControl === control.id
        const completionPercent = getCompletionPercentage(control)

        return (
          <div
            key={control.id}
            className="border rounded-lg bg-card overflow-hidden"
          >
            {/* Control Header - Always visible */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => toggleExpand(control.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <StatusIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{control.name}</h4>
                    <Badge variant="secondary" className={priorityConfig[control.priority].className}>
                      {priorityConfig[control.priority].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{control.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge variant={statusConfig[control.status].variant}>
                    {statusConfig[control.status].label}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="border-t px-4 py-4 space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Checklist Progress</span>
                    <span className="font-medium">{completionPercent}%</span>
                  </div>
                  <Progress value={completionPercent} className="h-2" />
                </div>

                {/* Checklist Items */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Checklist</h5>
                  <div className="space-y-1">
                    {control.checklistItems.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-accent/50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => onToggleChecklistItem(control.id, item.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Evidence Info */}
                {control.evidenceRequired && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Evidence:</span>
                    <Badge variant="outline">
                      {control.evidenceCount} {control.evidenceCount === 1 ? 'file' : 'files'} attached
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
