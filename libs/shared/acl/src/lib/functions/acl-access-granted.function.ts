/**
 * This function is responsible for checking if access is granted based on the target scope and the user's scopes.
 * It parses the scopes with a regular expression and then determines if the user has the necessary permissions.
 */

/**
 * Check if the given user's scopes grant access to the target scope.
 *
 * @param {string | undefined} targetScope - The scope required to access a resource or action.
 * @param {string[]} userScopes - An array of scopes the user has.
 *
 * @returns {boolean} - Returns `true` if access is granted, otherwise `false`.
 */
export function aclAccessGranted(targetScope: string | undefined, userScopes: string[]): boolean {
  // Regular expression to match and parse the given scope strings.
  const scopeRegEx = /([A-Z][a-z]+)\.(ReadWrite|Read|Write)(?:\.([A-Z][a-z]+))?/;

  // If target scope is not provided, access is denied by default.
  if (!targetScope) {
    return false;
  }

  // Parse the target scope using the regular expression.
  const [_, targetResource, targetAction, targetSubResource] = targetScope.match(scopeRegEx) || [];

  // Parse each user scope using the regular expression.
  const userScopesParsed = userScopes.map((scope) => scope.match(scopeRegEx) || []);

  // Filter user scopes that match the target resource.
  let filteredScopes = userScopesParsed.filter(([_, resource]) => resource === targetResource);

  // If there's a target sub-resource, filter user scopes accordingly.
  if (targetSubResource) {
    filteredScopes = filteredScopes.filter(
      ([_, __, ___, subResource]) => subResource === targetSubResource || subResource === 'All'
    );
  } else {
    filteredScopes = filteredScopes.filter(([_, __, ___, subResource]) => !subResource || subResource === 'All');
  }

  // Check if any filtered scope grants access to the target action.
  return filteredScopes.some(([_, __, action]) => action === 'ReadWrite' || action === targetAction);
}
