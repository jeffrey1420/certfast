import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/api'
import type { Organization } from '@/types'

interface OrganizationState {
  currentOrganization: Organization | null
  organizations: Organization[]
  isLoading: boolean
  error: string | null
  setCurrentOrganization: (org: Organization | null) => void
  setOrganizations: (orgs: Organization[]) => void
  addOrganization: (org: Organization) => void
  updateOrganization: (org: Organization) => void
  fetchOrganizations: () => Promise<void>
  clearError: () => void
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      currentOrganization: null,
      organizations: [],
      isLoading: false,
      error: null,
      setCurrentOrganization: (currentOrganization) => set({ currentOrganization }),
      setOrganizations: (organizations) => set({ organizations }),
      addOrganization: (org) =>
        set((state) => ({
          organizations: [...state.organizations, org],
        })),
      updateOrganization: (org) =>
        set((state) => ({
          organizations: state.organizations.map((o) =>
            o.id === org.id ? org : o
          ),
          currentOrganization:
            state.currentOrganization?.id === org.id ? org : state.currentOrganization,
        })),
      fetchOrganizations: async () => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await api.get<Organization[]>('/organizations')
          set({ organizations: data, isLoading: false })
          // Auto-select first org if none selected
          set((state) => {
            if (!state.currentOrganization && state.organizations.length > 0) {
              return { currentOrganization: state.organizations[0] }
            }
            return {}
          })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch organizations'
          set({ error: message, isLoading: false })
        }
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: 'organization-storage',
      partialize: (state) => ({ currentOrganization: state.currentOrganization }),
    }
  )
)
