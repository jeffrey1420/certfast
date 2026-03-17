/**
 * Module augmentation for HttpContext
 * 
 * Extends the base HttpContext interface to include properties
 * added by middleware (e.g., authUserId from auth_middleware)
 */
declare module '@adonisjs/core/http' {
  interface HttpContext {
    authUserId: number
  }
}
