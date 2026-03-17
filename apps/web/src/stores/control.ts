import { create } from 'zustand'
import api from '@/lib/api'
import type { ControlDetailed, CreateControlData } from '@/types'

export interface UpdateControlData {
  title?: string
  description?: string
  category?: string
  status?: 'draft' | 'active' | 'archived' | 'deprecated'
}

interface ControlState {
  controls: ControlDetailed[]
  currentControl: ControlDetailed | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchControls: () => Promise<void>
  fetchControlById: (id: string) => Promise<void>
  createControl: (data: CreateControlData) => Promise<ControlDetailed | null>
  updateControl: (id: number, data: UpdateControlData) => Promise<ControlDetailed | null>
  archiveControl: (id: number) => Promise<boolean>
  setCurrentControl: (control: ControlDetailed | null) => void
  clearError: () => void
}

export const useControlStore = create<ControlState>((set) => ({
  controls: [],
  currentControl: null,
  isLoading: false,
  error: null,

  fetchControls: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<ControlDetailed[]>('/controls')
      set({ controls: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch controls'
      set({ error: message, isLoading: false })
    }
  },

  fetchControlById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<ControlDetailed>(`/controls/${id}`)
      set({ currentControl: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch control'
      set({ error: message, isLoading: false })
    }
  },

  createControl: async (data: CreateControlData) => {
    set({ isLoading: true, error: null })
    try {
      const { data: control } = await api.post<ControlDetailed>('/controls', data)
      set((state) => ({
        controls: [control, ...state.controls],
        isLoading: false,
      }))
      return control
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create control'
      set({ error: message, isLoading: false })
      return null
    }
  },

  updateControl: async (id: number, data: UpdateControlData) => {
    set({ isLoading: true, error: null })
    try {
      const { data: control } = await api.put<ControlDetailed>(`/controls/${id}`, data)
      set((state) => ({
        controls: state.controls.map((c) => (c.id === id ? control : c)),
        currentControl: state.currentControl?.id === id ? control : state.currentControl,
        isLoading: false,
      }))
      return control
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update control'
      set({ error: message, isLoading: false })
      return null
    }
  },

  archiveControl: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/controls/${id}`)
      set((state) => ({
        controls: state.controls.filter((c) => c.id !== id),
        currentControl: state.currentControl?.id === id ? null : state.currentControl,
        isLoading: false,
      }))
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to archive control'
      set({ error: message, isLoading: false })
      return false
    }
  },

  setCurrentControl: (control) => set({ currentControl: control }),
  clearError: () => set({ error: null }),
}))
