/* Module dependencies. */

// External.

// Internal.

import ExtensionSpec from '../ExtensionSpec';
import transformedContentExtension from '../extensions/unicode/TransformedContentExtension';
import { IsExtensionSubtagRegisteredOptions, IsExtensionSubtagValidOptions,
         IsExtensionSubtagWellFormedOptions } from '../extensions/unicode/UnicodeBaseExtension';
import unicodeLocaleExtension from '../extensions/unicode/UnicodeLocaleExtension';
import { IsExtensionSingleton } from './singleton';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the extension subtag's [[IsWellFormed]] function.
 */
export interface IsRegisteredOptions extends IsExtensionSubtagRegisteredOptions
{
    /**
     * Specifies the singleton string or [[ExtensionSpec]] that should be used to test for extension subtag registration via the extension. Note that
     * unless this is specified, [[IsRegistered]] will return `false`.
     *
     * The default value is `undefined`.
     */
    singleton?: null | string | ExtensionSpec;
}

/**
 * Options to be passed to the extension subtag's [[IsWellFormed]] function.
 */
export interface IsValidOptions extends IsExtensionSubtagValidOptions
{
    /**
     * Specifies the singleton string or [[ExtensionSpec]] that should be used to test for extension subtag validity via the extension.
     *
     * The default value is `undefined`.
     */
    singleton?: null | string | ExtensionSpec;
}

/**
 * Options to be passed to the extension subtag's [[IsWellFormed]] function.
 */
export interface IsWellFormedOptions extends IsExtensionSubtagWellFormedOptions
{
    /**
     * Specifies the singleton string or [[ExtensionSpec]] that should be used to test for extension subtag well-formedness via the extension.
     *
     * The default value is `undefined`.
     */
    singleton?: null | string | ExtensionSpec;
}

// Private constants.

/**
 * This is identical to the [[wellFormedRegExp|well-formedness regular expression]] except that it only matches the subtag string if it is both
 * well-formed and follows case conventions. Extension subtag case conventions require that all characters be lowercase.
 *
 * @private
 */
const followsCaseConventionsRegExp: RegExp = /^[a-z0-9]{2,8}$/;

/**
 * The regular expression used to test whether or not a given subtag string is a well-formed extension subtag. Based on
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1), an extension subtag must be a 2 to 8 sized alphanumerical string. All characters are case
 * insensitive. For a regular expression that follows case conventions, see the [[followsCaseConventionsRegExp|follows case conventions regular
 * expression]].
 *
 * @private
 */
const wellFormedRegExp: RegExp = /^[a-zA-Z0-9]{2,8}$/;

// Extended Language subtag functions.

/**
 * Returns the extension associated with the given singleton subtag. If no extension is found with the given singleton subtag, `null` will be
 * returned. The singleton comparison is case insensitive.
 *
 * @param singleton The singleton ro retrieve the extension for.
 * @returns Returns the extension associated with the given singleton subtag or `null` if one was not found.
 */
export function GetExtensionBySingleton(singleton: string): null | ExtensionSpec
{
    switch (singleton.toLowerCase())
    {
        case transformedContentExtension.GetSingleton():
            return transformedContentExtension;

        case unicodeLocaleExtension.GetSingleton():
            return unicodeLocaleExtension;
    }

    return null;
};

/**
 * Given a subtag string, this function returns every extension that has a registered subtag under the given subtag string.
 *
 * @param subtag The subtag to check for registration under every extension.
 * @returns An array of extensions that have a registered subtag under the given subtag string.
 */
export function GetExtensionsBySubtag(subtag: string): Array<ExtensionSpec>
{
    const extensions: Array<ExtensionSpec> = [ ];

    if (transformedContentExtension.IsExtensionSubtagRegistered(subtag))
    {
        extensions.push(transformedContentExtension);
    }

    if (unicodeLocaleExtension.IsExtensionSubtagRegistered(subtag))
    {
        extensions.push(unicodeLocaleExtension);
    }

    return extensions;
}

/**
 * Determines whether or not the given subtag string is registered as an extension subtag. The registration check is case insensitive. Note that
 * unless the `options.singleton` option is passed a singleton string or an [[ExtensionSpec]], this function will always return `false`.
 *
 * @param extension The subtag string to check for extension subtag registration.
 * @param options An options object used to determine how the registration check is performed. See [[IsRegisteredOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is registered as an extension subtag.
 */
export function IsRegistered(extension: string, options: IsRegisteredOptions = { }): boolean
{
    if (options.singleton == null || (typeof options.singleton === 'string' && !IsExtensionSingleton(options.singleton)))
    {
        return false;
    }

    if (!(options.singleton instanceof ExtensionSpec))
    {
        options.singleton = GetExtensionBySingleton(options.singleton)!;
    }

    return options.singleton.IsExtensionSubtagRegistered(extension, options);
};

/**
 * Determines whether or not the given subtag string is a valid extension subtag.
 *
 * @param extension The subtag string to check for extension subtag validity.
 * @param options An options object used to determine how the validity check is performed. See [[IsValidOptions]] for more information on what each
 *      option means and its default value.
 * @returns Returns whether or not the subtag string is a valid extension subtag.
 */
export function IsValid(extension: string, options: IsValidOptions = { }): boolean
{
    if (options.singleton == null || (typeof options.singleton === 'string' && !IsExtensionSingleton(options.singleton)))
    {
        return false;
    }

    if (!(options.singleton instanceof ExtensionSpec))
    {
        options.singleton = GetExtensionBySingleton(options.singleton)!;
    }

    return options.singleton.IsExtensionSubtagValid(extension, options);
};

/**
 * Determines whether or not the given subtag string is a well-formed extension subtag as described by
 * [BCP 47](https://tools.ietf.org/html/bcp47#section-2.1). If `options.singleton` is passed a singleton string or an [[ExtensionSpec]], this function
 * will use the extension's [[ExtensionSpec.IsExtensionSubtagWellFormed]] method which may have stricter conditions for well-formedness.
 *
 * @param extension The subtag string to check if it is a well-formed extension subtag.
 * @param options An options object used to determine how the well-formedness check is performed. See [[IsWellFormedOptions]] for more information on
 *      what each option means and its default value.
 * @returns Returns whether or not the subtag string is a well-formed extension subtag.
 */
export function IsWellFormed(extension: string, options: IsWellFormedOptions = { }): boolean
{
    if (options.singleton == null || (typeof options.singleton === 'string' && !IsExtensionSingleton(options.singleton)))
    {
        return options.followsCaseConventions ? followsCaseConventionsRegExp.test(extension) : wellFormedRegExp.test(extension);
    }

    if (!(options.singleton instanceof ExtensionSpec))
    {
        options.singleton = GetExtensionBySingleton(options.singleton)!;
    }

    return options.singleton.IsExtensionSubtagWellFormed(extension, options);
};
