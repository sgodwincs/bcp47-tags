/* Module dependencies. */

// External.

// Internal.

import { RegistryIndexLookUp, SearchIndex } from './index';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the variant subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for variant subtags
     * require that all characters be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Variant subtag case conventions require that all characters be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^(?:[a-z0-9]{5,8}|[0-9][a-z0-9]{3})$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed variant subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a variant subtag can be a 5 to 8 sized alphanumerical string or a digit followed by 3
 * alphanumerical characters. All characters are case insensitive. For a regular expression that follows case conventions, see the
 * [[followsCaseConventionsRegExp|follows case conventions regular expression]].
 *
 * @private
 */
const wellFormedRegExp: RegExp = /^(?:[a-zA-Z0-9]{5,8}|[0-9][a-zA-Z0-9]{3})$/;

// Variant subtag functions.

/**
 * Determines whether or not the given subtag string is registered in the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as a variant subtag. The
 * registration check is case insensitive.
 *
 * @param variant The subtag string to check for variant subtag registration.
 * @returns Returns whether or not the subtag string is registered as a variant subtag.
 */
export function IsRegistered(variant: string): boolean
{
    const lookUp: null | RegistryIndexLookUp = SearchIndex(variant);
    return lookUp === null || lookUp.variant === undefined ? false : true;
};

/**
 * Determines whether or not the given subtag string is a valid variant subtag. A subtag string is a valid variant subtag if it is both a well-formed
 * and registered variant subtag.
 *
 * @param variant The subtag string to check for variant subtag validity.
 * @param options An options object that is passed to the [[IsWellFormed]] function. See [[IsWellFormedOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid variant subtag.
 */
export function IsValid(variant: string, options?: IsWellFormedOptions): boolean
{
    return IsWellFormed(variant, options) && IsRegistered(variant);
};

/**
 * Determines whether or not the given subtag string is a well-formed variant subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param variant The subtag string to check if it is a well-formed variant subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed variant subtag.
 */
export function IsWellFormed(variant: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    return options.followsCaseConventions ? followsCaseConventionsRegExp.test(variant) : wellFormedRegExp.test(variant);
};
