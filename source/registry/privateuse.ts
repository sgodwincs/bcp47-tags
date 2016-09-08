/* Module dependencies. */

// External.

// Internal.

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the private use subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Case conventions for private use
     * subtags require that all characters be lowercase.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Private use subtag case conventions require that all characters be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^[a-z0-9]{1,8}$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed private use subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), a private use subtag must be a 1 to 8 sized alphanumerical string. All characters are case
 * insensitive. For a regular expression that follows case conventions, see the
 * [[followsCaseConventionsRegExp|follows case conventions regular expression]].
 *
 * @private
 */

const wellFormedRegExp: RegExp = /^[a-zA-Z0-9]{1,8}$/;

// Private use subtag functions.

/**
 * Determines whether or not the given subtag string is a valid private use subtag. A subtag string is a valid private use subtag if it is
 * well-formed. This is the exact same as [[IsWellFormed]] and is only defined to provide a common interface with the other subtag functions.
 *
 * @param privateUse The subtag string to check for private use subtag validity.
 * @param options An options object that is passed to the [[IsWellFormed]] function. See [[IsWellFormedOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid private use subtag.
 */
export function IsValid(privateUse: string, options?: IsWellFormedOptions): boolean
{
    return IsWellFormed(privateUse, options);
};

/**
 * Determines whether or not the given subtag string is a well-formed private use subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1).
 *
 * @param privateUse The subtag string to check if it is a well-formed private use subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed private use subtag.
 */
export function IsWellFormed(privateUse: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.followsCaseConventions === undefined)
    {
        options.followsCaseConventions = false;
    }

    return options.followsCaseConventions ? followsCaseConventionsRegExp.test(privateUse) : wellFormedRegExp.test(privateUse);
};
