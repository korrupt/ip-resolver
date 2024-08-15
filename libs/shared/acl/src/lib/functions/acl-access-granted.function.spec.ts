import { aclAccessGranted } from './acl-access-granted.function';

/**
 * This suite of tests is designed to ensure that the `aclAccessGranted` function works as expected.
 * The function determines if a user with certain scopes has access to a target scope.
 * The data array below contains test cases which are described in the following format:
 * [Target Scope, User's Scopes, Expected Result (true if access is granted, false otherwise)]
 */

// Test data for aclAccessGranted function
/* eslint-disable */
/* prettier-disable */
describe('aclAccessGranted()', () => {
  const data: [string, string[], boolean][] = [
    ['User.Read', ['User.Read'], true],
    ['User.Read', ['User.Write'], false],
    ['User.Read', ['User.Write', 'User.Read.SomeResourcee'], false],
    ['User.Read', ['User.Write', 'User.Read.All'], true],
    ['User.Read', ['User.Write.All'], false],
    ['User.Read', ['User.Read.All'], true],

    ['User.Write', ['User.Write'], true],
    ['User.Write', ['User.Read'], false],
    ['User.Write', ['User.Write.All'], true],
    ['User.Write', ['User.Read.All', 'User.Write.SomeResourcee'], false],
    ['User.Write', ['User.Read.All', 'User.Write.All'], true],
    ['User.Write', ['User.Write'], true],

    ['User.Read', ['User.ReadWrite'], true],
    ['User.Read', ['User.ReadWrite.All'], true],
    ['User.Write', ['User.ReadWrite'], true],
    ['User.Write', ['User.ReadWrite.All'], true],
    ['User.Write', ['User.ReadWrite.SomeResourcee'], false],
    ['User.Read', ['User.ReadWrite.SomeResourcee'], false],

    ['User.Read.SomeResourcee', ['User.Read.SomeResourcee'], true],
    ['User.Read.SomeResourcee', ['User.Read', 'User.ReadWrite', 'User.Read.User'], false],
    ['User.Read.SomeResourcee', ['User.Read.All'], true],
    ['User.Read.SomeResourcee', ['User.ReadWrite.All'], true],

    ['User.Write.SomeResourcee', ['User.Read.SomeResourcee'], false],
    ['User.Write.SomeResourcee', ['User.Write.SomeResourcee'], true],
    ['User.Write.SomeResourcee', ['User.Write'], false],
    ['User.Write.SomeResourcee', ['User.ReadWrite.SomeResourcee'], true],
    ['User.Write.SomeResourcee', ['User.ReadWrite.All'], true],
  ];

  /**
   * Parameterized test for the aclAccessGranted function.
   * Each entry in the data array represents a single test scenario.
   * The test checks if, for a given target scope and a list of user scopes, the function returns the expected result.
   */
  it.each(data)('When targetScope is %s and userScopes are %s, result should be %s', (target, userScopes, result) => {
    expect(aclAccessGranted(target, userScopes)).toBe(result);
  });
});
