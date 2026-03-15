import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Organization } from '@/types'

interface OrganizationState {
  currentOrganization: Organization | null
  organizations: Organization[]
  setCurrentOrganization: (org: Organization | null) => void
  setOrganizations: (orgs: Organization[]) => void
  addOrganization: (org: Organization) => void
  updateOrganization: (org: Organization) => void
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      currentOrganization: null,
      organizations: [],
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
    }),
    {
      name: 'organization-storage',
      partialize: (state) => ({ currentOrganization: state.currentOrganization }),
    }
  )
)
