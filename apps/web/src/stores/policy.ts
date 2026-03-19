import { create } from 'zustand'
import api from '@/lib/api'
import type { Policy } from '@/types'

export interface CreatePolicyData {
  organizationId: number
  title: string
  content: string
  version?: string
}

export interface UpdatePolicyData {
  title?: string
  content?: string
  status?: 'draft' | 'published' | 'archived' | 'deprecated'
  version?: string
}

interface PolicyState {
  policies: Policy[]
  currentPolicy: Policy | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchPolicies: () => Promise<void>
  fetchPolicyById: (id: string) => Promise<void>
  createPolicy: (data: CreatePolicyData) => Promise<Policy | null>
  updatePolicy: (id: number, data: UpdatePolicyData) => Promise<Policy | null>
  deletePolicy: (id: number) => Promise<boolean>
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

  createPolicy: async (data: CreatePolicyData) => {
    set({ isLoading: true, error: null })
    try {
      const { data: policy } = await api.post<Policy>('/policies', data)
      set((state) => ({ 
        policies: [policy, ...state.policies],
        isLoading: false 
      }))
      return policy
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create policy'
      set({ error: message, isLoading: false })
      return null
    }
  },

  updatePolicy: async (id: number, data: UpdatePolicyData) => {
    set({ isLoading: true, error: null })
    try {
      const { data: policy } = await api.put<Policy>(`/policies/${id}`, data)
      set((state) => ({
        policies: state.policies.map((p) => (p.id === id ? policy : p)),
        currentPolicy: state.currentPolicy?.id === id ? policy : state.currentPolicy,
        isLoading: false,
      }))
      return policy
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update policy'
      set({ error: message, isLoading: false })
      return null
    }
  },

  deletePolicy: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/policies/${id}`)
      set((state) => ({
        policies: state.policies.filter((p) => p.id !== id),
        currentPolicy: state.currentPolicy?.id === id ? null : state.currentPolicy,
        isLoading: false,
      }))
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete policy'
      set({ error: message, isLoading: false })
      return false
    }
  },

  setCurrentPolicy: (policy) => set({ currentPolicy: policy }),
  clearError: () => set({ error: null }),
}))
