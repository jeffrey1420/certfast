import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface CreateButtonProps {
  onClick?: () => void
}

export function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <Button onClick={onClick}>
      <Plus className="h-4 w-4 mr-2" />
      New Assessment
    </Button>
  )
}
