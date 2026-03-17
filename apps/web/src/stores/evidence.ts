import { create } from 'zustand'
import api from '@/lib/api'
import type { Evidence, CreateEvidenceData, UpdateEvidenceData } from '@/types'

interface EvidenceState {
  evidence: Evidence[]
  currentEvidence: Evidence | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchEvidenceByControl: (controlId: number) => Promise<void>
  fetchEvidenceById: (id: number) => Promise<void>
  createEvidence: (data: CreateEvidenceData) => Promise<Evidence | null>
  updateEvidence: (id: number, data: UpdateEvidenceData) => Promise<Evidence | null>
  deleteEvidence: (id: number) => Promise<boolean>
  setCurrentEvidence: (evidence: Evidence | null) => void
  clearError: () => void
}

export const useEvidenceStore = create<EvidenceState>((set) => ({
  evidence: [],
  currentEvidence: null,
  isLoading: false,
  error: null,

  fetchEvidenceByControl: async (controlId: number) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<Evidence[]>(`/evidence?controlId=${controlId}`)
      set({ evidence: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch evidence'
      set({ error: message, isLoading: false })
    }
  },

  fetchEvidenceById: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<Evidence>(`/evidence/${id}`)
      set({ currentEvidence: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch evidence'
      set({ error: message, isLoading: false })
    }
  },

  createEvidence: async (data: CreateEvidenceData) => {
    set({ isLoading: true, error: null })
    try {
      const { data: evidence } = await api.post<Evidence>('/evidence', data)
      set((state) => ({ 
        evidence: [...state.evidence, evidence],
        isLoading: false 
      }))
      return evidence
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create evidence'
      set({ error: message, isLoading: false })
      return null
    }
  },

  updateEvidence: async (id: number, data: UpdateEvidenceData) => {
    set({ isLoading: true, error: null })
    try {
      const { data: evidence } = await api.put<Evidence>(`/evidence/${id}`, data)
      set((state) => ({
        evidence: state.evidence.map((e) => (e.id === id ? evidence : e)),
        currentEvidence: state.currentEvidence?.id === id ? evidence : state.currentEvidence,
        isLoading: false,
      }))
      return evidence
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update evidence'
      set({ error: message, isLoading: false })
      return null
    }
  },

  deleteEvidence: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/evidence/${id}`)
      set((state) => ({
        evidence: state.evidence.filter((e) => e.id !== id),
        currentEvidence: state.currentEvidence?.id === id ? null : state.currentEvidence,
        isLoading: false,
      }))
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete evidence'
      set({ error: message, isLoading: false })
      return false
    }
  },

  setCurrentEvidence: (evidence) => set({ currentEvidence: evidence }),
  clearError: () => set({ error: null }),
}))
