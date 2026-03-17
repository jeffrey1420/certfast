import { create } from 'zustand'
import api from '@/lib/api'

// Backend-aligned assessment type
export interface AssessmentBackend {
  id: number
  organizationId: number
  title: string
  type: 'soc2_type1' | 'soc2_type2' | 'iso27001' | 'gdpr' | 'hipaa' | 'custom'
  status: 'draft' | 'active' | 'in_review' | 'completed' | 'archived'
  description: string | null
  dueDate: string | null
  startedAt: string | null
  completedAt: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

export interface CreateAssessmentDto {
  organizationId: number
  title: string
  type: string
  description?: string
  dueDate?: string
}

export interface UpdateAssessmentDto {
  title?: string
  description?: string
  dueDate?: string
  status?: string
}

interface AssessmentState {
  assessments: AssessmentBackend[]
  currentAssessment: AssessmentBackend | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchAssessments: (organizationId?: number) => Promise<void>
  fetchAssessmentById: (id: string) => Promise<void>
  createAssessment: (data: CreateAssessmentDto) => Promise<AssessmentBackend>
  updateAssessment: (id: string, data: UpdateAssessmentDto) => Promise<AssessmentBackend>
  deleteAssessment: (id: string) => Promise<void>
  setCurrentAssessment: (assessment: AssessmentBackend | null) => void
  clearError: () => void
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  assessments: [],
  currentAssessment: null,
  isLoading: false,
  error: null,

  fetchAssessments: async (organizationId?: number) => {
    set({ isLoading: true, error: null })
    try {
      const params = organizationId ? { organizationId } : {}
      const { data } = await api.get<AssessmentBackend[]>('/assessments', { params })
      set({ assessments: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch assessments'
      set({ error: message, isLoading: false })
    }
  },

  fetchAssessmentById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<AssessmentBackend>(`/assessments/${id}`)
      set({ currentAssessment: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch assessment'
      set({ error: message, isLoading: false })
    }
  },

  createAssessment: async (assessmentData: CreateAssessmentDto) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.post<AssessmentBackend>('/assessments', assessmentData)
      set((state) => ({
        assessments: [data, ...state.assessments],
        isLoading: false,
      }))
      return data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create assessment'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  updateAssessment: async (id: string, updates: UpdateAssessmentDto) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.put<AssessmentBackend>(`/assessments/${id}`, updates)
      set((state) => ({
        assessments: state.assessments.map((a) => (a.id === Number(id) ? data : a)),
        currentAssessment: state.currentAssessment?.id === Number(id) ? data : state.currentAssessment,
        isLoading: false,
      }))
      return data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update assessment'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  deleteAssessment: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/assessments/${id}`)
      set((state) => ({
        assessments: state.assessments.filter((a) => a.id !== Number(id)),
        currentAssessment: state.currentAssessment?.id === Number(id) ? null : state.currentAssessment,
        isLoading: false,
      }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete assessment'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  setCurrentAssessment: (assessment) => set({ currentAssessment: assessment }),
  clearError: () => set({ error: null }),
}))
