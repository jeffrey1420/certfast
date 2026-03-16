import { create } from 'zustand'
import api from '@/lib/api'
import type { Policy } from '@/types'

interface PolicyState {
  policies: Policy[]
  currentPolicy: Policy | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchPolicies: () => Promise<void>
  fetchPolicyById: (id: string) => Promise<void>
  setCurrentPolicy: (policy: Policy | null) => void
  clearError: () => void
}

export const usePolicyStore = create<PolicyState>((set) => ({
  policies: [],
  currentPolicy: null,
  isLoading: false,
  error: null,

  fetchPolicies: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<Policy[]>('/policies')
      set({ policies: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch policies'
      set({ error: message, isLoading: false })
    }
  },

  fetchPolicyById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.get<Policy>(`/policies/${id}`)
      set({ currentPolicy: data, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch policy'
      set({ error: message, isLoading: false })
    }
  },

  setCurrentPolicy: (policy) => set({ currentPolicy: policy }),
  clearError: () => set({ error: null }),
}))
