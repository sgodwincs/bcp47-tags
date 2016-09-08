/* Module dependencies. */

// External.

// Internal.

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the singleton subtag's [[IsRegistered]] function.
 */
export interface IsRegisteredOptions
{
    /**
     * Determines whether or not extension singletons should be considered as registered singletons. The default value is `true`.
     */
    includeExtensions?: boolean;

    /**
     * Determines whether or not the grandfathered singleton should be considered as a registered singleton. The default value is `false`.
     */
    includeGrandfathered?: boolean;

    /**
     * Determines whether or not the private use singleton should be considered as a registered singleton. The default value is `false`.
     */
    includePrivateUse?: boolean;
}

/**
 * Options to be passed to the singleton subtag's [[IsValid]] function. All options from [[IsRegisteredOptions]] and [[IsWellFormedOptions]] are also
 * supported here.
 */
export interface IsValidOptions extends IsRegisteredOptions, IsWellFormedOptions
{
    /**
     * Determines whether or not the private use singleton should be considered as a registered singleton. The default value is `true`.
     */
    includePrivateUse?: boolean;

    /**
     * Determines whether or not the validity check should enforce registration for the singleton. This mainly exists because singleton subtags are
     * not strictly defined in [BCP 47](https://tools.ietf.org/html/bcp47) and are only defined indirectly through the use of extension and private
     * use subtags. Because of this, one may consider a singleton subtag to be valid when it is simply well-formed, or one may consider a singleton
     * subtag to be valid when it matches one of the singletons defined in [[IsRegisteredOptions]]. Note that if this value is defined as `false`,
     * then all options from [[IsRegisteredOptions]] are not considered.
     *
     * The default value is `true`.
     */
    strict?: boolean;
}

/**
 * Options to be passed to the singleton subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for singleton
     * subtags require that the character be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Language subtag case conventions require that the character be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^[a-z0-9]$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed singleton subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a language subtag must be a single alphanumerical character. The character is case
 * case insensitive. For a regular expression that follows case conventions, see the [[followsCaseConventionsRegExp|follows case conventions regular
 * expression]].
 *
 * @private
 */
const wellFormedRegExp: RegExp = /^[a-zA-Z0-9]$/;

// Public constants.

/**
 * The constant for the grandfathered singleton. Use [[IsGrandfatheredSingleton]] if you want to check if a subtag string is a grandfathered
 * singleton.
 */
export const grandfatheredSingleton: string = 'i';

/**
 * The constant for the private use singleton. Use [[IsPrivateUseSingleton]] if you want to check if a subtag string is a private use singleton.
 */
export const privateUseSingleton: string = 'x';

// Singleton subtag functions.

/**
 * Determines whether or not the given singleton string is registered as an extension singleton. Currently, there are only two assigned extensions:
 * Transformed Content and Unicode Locale. The check is case insensitive.
 *
 * Note that the extension singleton values are hardcoded in this function to avoid circular dependencies among modules.
 *
 * @param singleton The singleton to check whether or not it is an extension singleton.
 * @returns Returns whether or not the singleton is an extension singleton.
 */
export function IsExtensionSingleton(singleton: string): boolean
{
    singleton = singleton.toLowerCase();
    return singleton === 't' || singleton === 'u';
};

/**
 * Determines whether or not the given singleton string is the grandfathered singleton. The grandfathered singleton for the most part should not be
 * considered in validity checks as the [[LanguageTag]] class will handle grandfathered language tags. The check is case insensitive.
 *
 * @param singleton The singleton to check whether or not it is a grandfathered singleton.
 * @returns Returns whether or not the singleton is a grandfathered singleton.
 */
export function IsGrandfatheredSingleton(singleton: string): boolean
{
    return singleton.toLowerCase() === grandfatheredSingleton;
}

/**
 * Determines whether or not the given singleton string is the private use singleton. The check is case insensitive.
 *
 * @param singleton The singleton to check whether or not it is a private use singleton.
 * @returns Returns whether or not the singleton is a private use singleton.
 */
export function IsPrivateUseSingleton(singleton: string): boolean
{
    return singleton.toLowerCase() === privateUseSingleton;
};

/**
 * Determines whether or not the given subtag string is registered as one of the singletons defined in [[IsRegisteredOptions]]. The registration check
 * is case insensitive.
 *
 * @param singleton The subtag string to check for singleton subtag registration.
 * @param options An options object used to determine how the registration check is performed. See [[IsRegisteredOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is registered as a singleton subtag.
 */
export function IsRegistered(singleton: string, options: IsRegisteredOptions = { }): boolean
{
    if (options.includeExtensions === undefined)
    {
        options.includeExtensions = true;
    }

    if (options.includeGrandfathered === undefined)
    {
        options.includeGrandfathered = false;
    }

    if (options.includePrivateUse === undefined)
    {
        options.includePrivateUse = false;
    }

    return (options.includeExtensions && IsExtensionSingleton(singleton)) ||
           (options.includeGrandfathered && IsGrandfatheredSingleton(singleton)) ||
           (options.includePrivateUse && IsPrivateUseSingleton(singleton));
};

/**
 * Determines whether or not the given subtag string is a valid singleton subtag. A subtag string is a valid singleton subtag if it is both a
 * well-formed and registered singleton subtag.
 *
 * @param singleton The subtag string to check for singleton subtag validity.
 * @param options An options object used to determine how the validity check is performed. See [[IsValidOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid singleton subtag.
 */
export function IsValid(singleton: string, options: IsValidOptions = { }): boolean
{
    if (options.includePrivateUse === undefined)
    {
        options.includePrivateUse = true;
    }

    if (options.strict === undefined)
    {
        options.strict = true;
    }

    return IsWellFormed(singleton, options) && (!options.strict || IsRegistered(singleton, options));
};

/**
 * Determines whether or not the given subtag string is a well-formed singleton subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param singleton The subtag string to check if it is a well-formed singleton subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed singleton subtag.
 */
export function IsWellFormed(singleton: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    return options.followsCaseConventions ? followsCaseConventionsRegExp.test(singleton) : wellFormedRegExp.test(singleton);
};
