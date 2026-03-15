// App constants

export const APP_NAME = 'CertFast'
export const APP_VERSION = '0.0.1'

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
  ORGANIZATIONS: {
    BASE: '/organizations',
    CURRENT: '/organizations/current',
  },
  ASSESSMENTS: {
    BASE: '/assessments',
    DETAIL: (id: string) => `/assessments/${id}`,
    EVIDENCE: (id: string) => `/assessments/${id}/evidence`,
  },
  CONTROLS: {
    BASE: '/controls',
    DETAIL: (id: string) => `/controls/${id}`,
  },
  EVIDENCE: {
    BASE: '/evidence',
    UPLOAD: '/evidence/upload',
    DETAIL: (id: string) => `/evidence/${id}`,
  },
  FRAMEWORKS: {
    BASE: '/frameworks',
    DETAIL: (id: string) => `/frameworks/${id}`,
  },
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  ASSESSMENTS: '/assessments',
  ASSESSMENT_DETAIL: (id: string) => `/assessments/${id}`,
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
  ORGANIZATION: '/settings/organization',
  INTEGRATIONS: '/settings/integrations',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  ORGANIZATION: 'organization',
  THEME: 'theme',
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
} as const
