/* Module dependencies. */

// External.

// Internal.

import { RegistryIndexLookUp, SearchIndex } from './index';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the extended language subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for extended
     * language subtags require that the all characters be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Extended language subtag case conventions require that all characters be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^[a-z]{3}$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed extended language subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a extended language subtag must be 3 alphabetical characters. All characters are case
 * insensitive. For a regular expression that follows case conventions, see the [[followsCaseConventionsRegExp|follows case conventions regular
 * expression]].
 *
 * @private
 */
const wellFormedRegExp: RegExp = /^[a-zA-Z]{3}$/;

// Extended Language subtag functions.

/**
 * Determines whether or not the given subtag string is registered in the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as a extended language subtag.
 * The registration check is case insensitive.
 *
 * @param extendedLanguage The subtag string to check for extended language subtag registration.
 * @returns Returns whether or not the subtag string is registered as a extended language subtag.
 */
export function IsRegistered(extendedLanguage: string): boolean
{
    const lookUp: null | RegistryIndexLookUp = SearchIndex(extendedLanguage);
    return lookUp === null || lookUp.extlang === undefined ? false : true;
};

/**
 * Determines whether or not the given subtag string is a valid extended language subtag. A subtag string is a valid extended language subtag if it is
 * both a well-formed and registered extended language subtag.
 *
 * @param extendedLanguage The subtag string to check for extended language subtag validity.
 * @param options An options object that is passed to the [[IsWellFormed]] function. See [[IsWellFormedOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid extended language subtag.
 */
export function IsValid(extendedLanguage: string, options?: IsWellFormedOptions): boolean
{
    return IsWellFormed(extendedLanguage, options) && IsRegistered(extendedLanguage);
};

/**
 * Determines whether or not the given subtag string is a well-formed extended language subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param extendedLanguage The subtag string to check if it is a well-formed extended language subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed extended language subtag.
 */
export function IsWellFormed(extendedLanguage: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    return options.followsCaseConventions ? followsCaseConventionsRegExp.test(extendedLanguage) : wellFormedRegExp.test(extendedLanguage);
};
