/* Module dependencies. */

// External.

// Internal.

import { RegistryIndexLookUp, SearchIndex } from './index';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the region subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for region subtags
     * require that the first character be uppercase with all other following characters to be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Region subtag case conventions require that all alphabetical characters be uppercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^(?:[A-Z]{2}|[0-9]{3})$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed region subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a region subtag must be either 2 alphabetical characters or 3 digits.
 * For a regular expression that follows case conventions, see the [[followsCaseConventionsRegExp|follows case conventions regular expression]].
 *
 * @private
 */
const wellFormedRegExp: RegExp = /^(?:[a-zA-Z]{2}|[0-9]{3})$/;

// Region subtag functions.

/**
 * Determines whether or not the given subtag string is a private use region subtag. The private use check is case insensitive.
 *
 * @param region The subtag string to check if it is a private use region subtag.
 * @returns Returns whether or not the subtag string is a private use region subtag.
 */
export function IsPrivateUse(region: string): boolean
{
    region = region.toLowerCase();
    return region.length === 2 &&
           (region === 'aa' ||
           (region >= 'qm' && region <= 'qz') ||
           (region >= 'xa' && region <= 'xz') ||
           region === 'zz');
}

/**
 * Determines whether or not the given range string is a region private use range. This is really only helpful when checking the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as private use ranges are
 * defined exactly the same as regular region subtags. Because of this, it is needed to have a way to filter out those ranges as they will lead to
 * false positives when checking if a region subtag string is registered. [[IsRegistered]] uses this internally, so there will probably not be a need
 * to use this function directly. The range check is case insensitive.
 *
 * @param range The string to check if is a defined private use range in the registry.
 * @returns Returns whether or not the range string is the region subtag's private use range.
 */
export function IsPrivateUseRange(range: string): boolean
{
    range = range.toLowerCase();
    return range === 'qm..qz' || range === 'xa..xz';
};

/**
 * Determines whether or not the given subtag string is registered in the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as a region subtag. The
 * registration check is case insensitive. Note that region subtags provide a range of possible subtags that are considered private use. This function
 * does not consider those subtags as registered. To check if a region subtag is private use, call the [[IsPrivateUse]] function.
 *
 * @param region The subtag string to check for region subtag registration.
 * @returns Returns whether or not the subtag string is registered as a region subtag.
 */
export function IsRegistered(region: string): boolean
{
    if (IsPrivateUseRange(region))
    {
        return false;
    }

    const lookUp: null | RegistryIndexLookUp = SearchIndex(region);
    return !(lookUp === null || lookUp.region === undefined);
};

/**
 * Determines whether or not the given subtag string is a valid region subtag. A subtag string is a valid region subtag if it is both a well-formed
 * and registered region subtag.
 *
 * @param region The subtag string to check for region subtag validity.
 * @param options An options object that is passed to the [[IsWellFormed]] function. See [[IsWellFormedOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid region subtag.
 */
export function IsValid(region: string, options?: IsWellFormedOptions): boolean
{
    return IsWellFormed(region, options) && (IsRegistered(region) || IsPrivateUse(region));
};

/**
 * Determines whether or not the given subtag string is a well-formed region subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param region The subtag string to check if it is a well-formed region subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed region subtag.
 */
export function IsWellFormed(region: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    return options.followsCaseConventions ? followsCaseConventionsRegExp.test(region) : wellFormedRegExp.test(region);
};
