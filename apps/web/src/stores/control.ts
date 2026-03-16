import { create } from 'zustand'
import api from '@/lib/api'
import type { ControlDetailed } from '@/types'

interface ControlState {
  controls: ControlDetailed[]
  currentControl: ControlDetailed | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchControls: () => Promise<void>
  fetchControlById: (id: string) => Promise<void>
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

  setCurrentControl: (control) => set({ currentControl: control }),
  clearError: () => set({ error: null }),
}))
