/**
 * @wl/cores
 * Core business logic for shared implementation
 * 
 * This package provides authentication and core business logic components
 * for use across applications. It defines interfaces and implementations
 * that can be extended or replaced by application-specific code.
 */

// Export authentication interfaces, services, and composables
export * from './interfaces';
export * from './auth';
export * from './composables';

// Export utilities (to be added as needed)
// export * from './utils';

// Export state management (to be added as needed)
// export * from './state';

// Package version
export const VERSION = '0.1.0';