/* Module dependencies. */

// External.

// Internal.

import UnicodeBaseExtension, { IsExtensionSubtagRegisteredOptions,
       IsExtensionSubtagValidOptions, UnicodeExtensionSubtagType } from './UnicodeBaseExtension';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to the extension's [[TransformedContentExtension.IsExtensionSubtagPrivateUse]] method.
 */
export interface IsExtensionSubtagPrivateUseOptions
{
    /**
     * Determines under what subtag type the subtag should be checked for private use.
     *
     * The default value is `undefined`.
     */
    subtagType?: UnicodeExtensionSubtagType;
}

/**
 * Options to be passed to the extension's [[TransformedContentExtension.IsExtensionSubtagPrivateUseRange]] method.
 */
export interface IsExtensionSubtagPrivateUseRangeOptions
{
    /**
     * Determines under what subtag type the subtag should be checked for private use range.
     *
     * The default value is `undefined`.
     */
    subtagType?: UnicodeExtensionSubtagType;
}

// Class definition.

/**
 * Extension definition for the Unicode transformed content extension.
 */
export class TransformedContentExtension extends UnicodeBaseExtension
{
    /**
     * The data path relative to the `data` directory that points towards the directory that contains the data required for this extension.
     */
    public static readonly dataPath: string = 'transform';

    /*
     * The singleton that this extension is defined by. Every extension subtag under this extension will always follow this singleton within the
     * language tag.
     */
    public static readonly singleton: string = 't';

    /**
     * Initializes base classes.
     */
    public constructor()
    {
        super(TransformedContentExtension.singleton, TransformedContentExtension.dataPath);
    }

    /**
     * Determines whether or not the given subtag string is private use as defined by this extension. The check is case insensitive.
     *
     * @param languageSubtag The language subtag string to test for private use.
     * @param options Options that can give the caller greater control over the check.
     * @returns Returns whether or not the subtag is private use.
     */
    public IsExtensionSubtagPrivateUse(languageSubtag: string, options: IsExtensionSubtagPrivateUseRangeOptions = { }): boolean
    {
        if (options.subtagType !== undefined && options.subtagType !== 'type')
        {
            return false;
        }

        return super.IsExtensionSubtagWellFormed(languageSubtag,
            {
                subtagType: 'type'
            });
    }

    /**
     * Determines whether or not the given subtag string is in the private use range as defined by this extension. A private use range is an
     * identifier that exists within the registered subtags, but is not actually registered. It only serves to identify the range(s) in which a
     * subtag is considered private use. The check is case insensitive.
     *
     * @param languageSubtag The language subtag string to test if it is in the private use range.
     * @param options Options that can give the caller greater control over the check.
     * @returns Returns whether or not the subtag is in the private use range.
     */
    public IsExtensionSubtagPrivateUseRange(languageSubtag: string, options: IsExtensionSubtagPrivateUseOptions = { }): boolean
    {
        if (options.subtagType !== undefined && options.subtagType !== 'type')
        {
            return false;
        }

        return languageSubtag.toUpperCase() === 'PRIVATE_USE';
    }

    /**
     * Determines whether or not the given subtag string is registered as defined by this extension. Note that private use subtags are not considered
     * registered. The check is case insensitive.
     *
     * @param languageSubtag The language subtag string to test for registration.
     * @param options Options that can give the caller greater control over the check.
     * @returns Returns whether or not the subtag is registered.
     */
    public IsExtensionSubtagRegistered(languageSubtag: string, options: IsExtensionSubtagRegisteredOptions = { }): boolean
    {
        if (this.IsExtensionSubtagPrivateUseRange(languageSubtag, options))
        {
            return false;
        }

        return super.IsExtensionSubtagRegistered(languageSubtag, options);
    }

    /**
     * Determines whether or not the given subtag string is valid as defined by this extension. Note that private use subtags are considered
     * valid. The check is case insensitive.
     *
     * @param languageSubtag The language subtag string to test for validity.
     * @param options Options that can give the caller greater control over the check.
     * @returns Returns whether or not the subtag is valid.
     */
    public IsExtensionSubtagValid(languageSubtag: string, options: IsExtensionSubtagValidOptions = { }): boolean
    {
        return this.IsExtensionSubtagWellFormed(languageSubtag, options) &&
               (this.IsExtensionSubtagRegistered(languageSubtag, options) || this.IsExtensionSubtagPrivateUse(languageSubtag, options));
    }

    /**
     * Utility method for determining whether or not the given string is the [[TransformedContentExtension]]'s singleton.
     *
     * @param singleton The potential singleton string to check.
     * @returns Returns whether or not the given string is the [[TransformedContentExtension]]'s singleton.
     */
    public static IsExtensionSingleton(singleton: string): boolean
    {
        return singleton.toLowerCase() === TransformedContentExtension.singleton;
    }
};

export default new TransformedContentExtension();
