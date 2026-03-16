import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Eye } from 'lucide-react'
import type { ControlDetailed } from '@/types'

interface ControlCardProps {
  control: ControlDetailed
  onView: (id: string) => void
}

const maturityConfig = {
  basic: { label: 'Basic', variant: 'secondary' as const },
  intermediate: { label: 'Intermediate', variant: 'default' as const },
  advanced: { label: 'Advanced', variant: 'outline' as const },
}

const categoryColors: Record<string, string> = {
  'Governance': 'bg-blue-100 text-blue-800 border-blue-200',
  'Risk Management': 'bg-purple-100 text-purple-800 border-purple-200',
  'Asset Management': 'bg-green-100 text-green-800 border-green-200',
  'Access Control': 'bg-orange-100 text-orange-800 border-orange-200',
  'Cryptography': 'bg-pink-100 text-pink-800 border-pink-200',
  'Physical Security': 'bg-red-100 text-red-800 border-red-200',
  'Operations Security': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Communications Security': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'System Acquisition': 'bg-teal-100 text-teal-800 border-teal-200',
  'Supplier Relationships': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Incident Management': 'bg-rose-100 text-rose-800 border-rose-200',
  'Business Continuity': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Compliance': 'bg-slate-100 text-slate-800 border-slate-200',
}

export function ControlCard({ control, onView }: ControlCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-mono text-muted-foreground">
                {control.code}
              </CardTitle>
              <h3 className="font-semibold leading-tight">{control.title}</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(control.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {control.description}
        </p>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[control.category] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            {control.category}
          </span>
          <Badge variant={maturityConfig[control.maturityLevel].variant}>
            {maturityConfig[control.maturityLevel].label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
