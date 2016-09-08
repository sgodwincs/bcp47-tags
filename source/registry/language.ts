/* Module dependencies. */

// External.

// Internal.

import { RegistryIndexLookUp, SearchIndex } from './index';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the language subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for language
     * subtags require that the first character be uppercase with all other following characters to be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;

    /**
     * Whether or not a language subtag is well-formed depends on if an extended language subtag follows it within the language tag itself. This
     * option determines whether or not when performing the well-formedness check to use the regular expression for an extended language following the
     * language subtag.
     *
     * The default value is `false`.
     */
    usingExtendedLanguage?: boolean;
}

// Private constants.

/**
 * This is identical to the well formed regular expressions except that it only matches the subtag string if it is both well-formed and follows case
 * conventions. Language subtag case conventions require that all characters be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^[a-z]+$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed language subtag with the assumption that an extended
 * language subtag will follow. Based on [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a language subtag with an extended language
 * following it must be a 2 to 3 sized alphabetical string. All characters are case insensitive.
 *
 * @private
 */
const wellFormedWithExtendedLanguageRegExp: RegExp = /^[a-zA-Z]{2,3}$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed language subtag with the assumption that an extended
 * language subtag will not follow. Based on [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a language subtag with no extended language
 * following it must be a 2 to 8 sized alphabetical string. All characters are case insensitive.
 *
 * @private
 */
const wellFormedWithoutExtendedLanguageRegExp: RegExp = /^[a-zA-Z]{2,8}$/;

// Language subtag functions.

/**
 * Determines whether or not the given subtag string is a private use language subtag. The private use check is case insensitive.
 *
 * @param language The subtag string to check if it is a private use language subtag.
 * @returns Returns whether or not the subtag string is a private use language subtag.
 */
export function IsPrivateUse(language: string): boolean
{
    language = language.toLowerCase();
    return language.length === 3 && language >= 'qaa' && language <= 'qtz';
};

/**
 * Determines whether or not the given range string is the language private use range. This is really only helpful when checking the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as private use ranges are
 * defined exactly the same as regular language subtags. Because of this, it is needed to have a way to filter out those ranges as they will lead to
 * false positives when checking if a language subtag string is registered. [[IsRegistered]] uses this internally, so there will probably not be a
 * need to use this function directly. The range check is case insensitive.
 *
 * @param range The string to check if is the defined private use range in the registry.
 * @returns Returns whether or not the range string is the language subtag's private use range.
 */
export function IsPrivateUseRange(range: string): boolean
{
    range = range.toLowerCase();
    return range === 'qaa..qtz';
};

/**
 * Determines whether or not the given subtag string is registered in the
 * [IANA language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as a language subtag. The
 * registration check is case insensitive. Note that language subtags provide a range of possible subtags that are considered private use. This
 * function does not consider those subtags as registered. To check if a language subtag is private use, call the [[IsPrivateUse]] function.
 *
 * @param language The subtag string to check for language subtag registration.
 * @returns Returns whether or not the subtag string is registered as a language subtag.
 */
export function IsRegistered(language: string): boolean
{
    if (IsPrivateUseRange(language))
    {
        return false;
    }

    const lookUp: null | RegistryIndexLookUp = SearchIndex(language);
    return !(lookUp === null || lookUp.language === undefined);
};

/**
 * Determines whether or not the given subtag string is a valid language subtag. A subtag string is a valid language subtag if it is both a
 * well-formed and registered language subtag.
 *
 * @param language The subtag string to check for language subtag validity.
 * @param options An options object that is passed to the [[IsWellFormed]] function. See [[IsWellFormedOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid language subtag.
 */
export function IsValid(language: string, options?: IsWellFormedOptions): boolean
{
    return IsWellFormed(language, options) && (IsRegistered(language) || IsPrivateUse(language));
};

/**
 * Determines whether or not the given subtag string is a well-formed language subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param language The subtag string to check if it is a well-formed language subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed language subtag.
 */
export function IsWellFormed(language: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    if (options.usingExtendedLanguage === undefined)
    {
        options.usingExtendedLanguage = false;
    }

    return (options.followsCaseConventions ?
           followsCaseConventionsRegExp.test(language) :
           true) &&
           (options.usingExtendedLanguage ?
           wellFormedWithExtendedLanguageRegExp.test(language) :
           wellFormedWithoutExtendedLanguageRegExp.test(language));
};
