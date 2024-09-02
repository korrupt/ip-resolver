import { SetMetadata } from '@nestjs/common';

/**
 * Custom metadata key for the AclScope decorator.
 *
 * This constant represents the key that will be used
 * to store scope metadata associated with ACL functionalities.
 */
export const ACL_SCOPE = 'facade.acl-scope';

/**
 * Custom decorator to associate a specific ACL scope with a route handler.
 *
 * @param {string} scope - The ACL scope to be associated with the route handler.
 * @returns A decorator that sets the given ACL scope as metadata.
 *
 * @example
 *
 * ```typescript
 * @AclScope('admin')
 * findOne() { ... }
 * ```
 */
export const AclScope = (scope: string) => SetMetadata(ACL_SCOPE, scope);
