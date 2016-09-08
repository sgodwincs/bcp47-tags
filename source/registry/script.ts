/* Module dependencies. */

// External.

// Internal.

import { RegistryIndexLookUp, SearchIndex } from './index';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the script subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for script subtags
     * require that the first character be uppercase with all other following characters to be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Script subtag case conventions require that the first character be uppercase with all other following
 * characters to be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^[A-Z][a-z]{3}$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed script subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a script subtag must be 4 alphabetical characters. All characters are case insensitive.
 * For a regular expression that follows case conventions, see the [[followsCaseConventionsRegExp|follows case conventions regular expression]].
 *
 * @private
 */
const wellFormedRegExp: RegExp = /^[a-zA-Z]{4}$/;

// Script subtag functions.

/**
 * Determines whether or not the given subtag string is a private use script subtag. The private use check is case insensitive.
 *
 * @param script The subtag string to check if it is a private use script subtag.
 * @returns Returns whether or not the subtag string is a private use script subtag.
 */
export function IsPrivateUse(script: string): boolean
{
    script = script.toLowerCase();
    return script.length === 4 && script >= 'qaaa' && script <= 'qabx';
};

/**
 * Determines whether or not the given range string is the script private use range. This is really only helpful when checking the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as private use ranges are
 * defined exactly the same as regular script subtags. Because of this, it is needed to have a way to filter out those ranges as they will lead to
 * false positives when checking if a script subtag string is registered. [[IsRegistered]] uses this internally, so there will probably not be a need
 * to use this function directly. The range check is case insensitive.
 *
 * @param range The string to check if is the defined private use range in the registry.
 * @returns Returns whether or not the range string is the script subtag's private use range.
 */
export function IsPrivateUseRange(range: string): boolean
{
    range = range.toLowerCase();
    return range === 'qaaa..qabx';
};

/**
 * Determines whether or not the given subtag string is registered in the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as a script subtag. The
 * registration check is case insensitive. Note that script subtags provide a range of possible subtags that are considered private use. This function
 * does not consider those subtags as registered. To check if a script subtag is private use, call the [[IsPrivateUse]] function.
 *
 * @param script The subtag string to check for script subtag registration.
 * @returns Returns whether or not the subtag string is registered as a script subtag.
 */
export function IsRegistered(script: string): boolean
{
    if (IsPrivateUseRange(script))
    {
        return false;
    }

    const lookUp: null | RegistryIndexLookUp = SearchIndex(script);
    return !(lookUp === null || lookUp.script === undefined);
};

/**
 * Determines whether or not the given subtag string is a valid script subtag. A subtag string is a valid script subtag if it is both a well-formed
 * and registered script subtag.
 *
 * @param script The subtag string to check for script subtag validity.
 * @param options An options object that is passed to the [[IsWellFormed]] function. See [[IsWellFormedOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid script subtag.
 */
export function IsValid(script: string, options?: IsWellFormedOptions): boolean
{
    return IsWellFormed(script, options) && (IsRegistered(script) || IsPrivateUse(script));
};

/**
 * Determines whether or not the given subtag string is a well-formed script subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param script The subtag string to check if it is a well-formed script subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed script subtag.
 */
export function IsWellFormed(script: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    return options.followsCaseConventions ? followsCaseConventionsRegExp.test(script) : wellFormedRegExp.test(script);
};
