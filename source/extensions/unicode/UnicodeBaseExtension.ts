/* Module dependencies. */

// External.

// Internal.

import LanguageTag from '../../LanguageTag';
import ExtensionSpec,
       { IsExtensionSubtagRegisteredOptions as IsExtensionSubtagRegisteredOptionsBase,
         IsExtensionSubtagValidOptions as IsExtensionSubtagValidOptionsBase,
         IsExtensionSubtagWellFormedOptions as IsExtensionSubtagWellFormedOptionsBase } from '../../ExtensionSpec';

/* Module body. */

// Public types.

/**
 * Each Unicode based extension subtag can be either an attriute, key, or type. This defines the enumeration for those values.
 */
export type UnicodeExtensionSubtagType = 'attr' | 'key' | 'type';

// Public interfaces.

// Registry interfaces.

/**
 * Defines the structure for an indexed attribute within the Unicode subtag registry.
 */
export interface ExtensionAttrIndexedData
{
    [index: string]: any;
}

/**
 * Defines the structure for an indexed key within the Unicode subtag registry.
 */
export interface ExtensionKeyIndexedData
{
    [index: string]: any;
    name: string;
    types: ExtensionKeyIndexedDataTypes;
}

/**
 * Defines the structure for a key's data types.
 */
export interface ExtensionKeyIndexedDataTypes
{
    [index: number]: number;
}

/**
 * Defines the structure for the Unicode subtag registry.
 */
export interface ExtensionSubtagData
{
    [index: string]: undefined | ExtensionSubtagIndexedData;
}

/**
 * Defines the structure for subtag indexed data within the Unicode subtag registry.
 */
export interface ExtensionSubtagIndexedData
{
    attrs?: Array<number>;
    keys?: Array<number>;
    types?: Array<number>;
}

/**
 * Defines the structure for an indexed type within the Unicode subtag registry.
 */
export interface ExtensionTypeIndexedData
{
    [index: string]: any;
    name: string;
}

/**
 * Defines the structure for the subtag indexed data within the Unicode subtag registry.
 */
export interface SubtagIndexedData
{
    attrs?: Array<number>;
    keys?: Array<number>;
    types?: Array<number>;
}

// Option interfaces.

/**
 * Options to be passed to an extension's [[UnicodeBaseExtension.IsExtensionSubtagRegistered]] method.
 */
export interface IsExtensionSubtagRegisteredOptions extends IsExtensionSubtagRegisteredOptionsBase
{
    /**
     * Determines under what subtag type the subtag should be checked for registration.
     *
     * The default value is `undefined`.
     */
    subtagType?: UnicodeExtensionSubtagType;
}

/**
 * Options to be passed to an extension's [[UnicodeBaseExtension.IsExtensionSubtagValid]] method.
 */
export interface IsExtensionSubtagValidOptions extends IsExtensionSubtagValidOptionsBase
{
    /**
     * Determines under what subtag type the subtag should be checked for validity.
     *
     * The default value is `undefined`.
     */
    subtagType?: UnicodeExtensionSubtagType;
}

/**
 * Options to be passed to an extension's [[UnicodeBaseExtension.IsExtensionSubtagWellFormed]] method.
 */
export interface IsExtensionSubtagWellFormedOptions extends IsExtensionSubtagWellFormedOptionsBase
{
    /**
     * Determines under what subtag type the subtag should be checked for well-formedness.
     *
     * The default value is `undefined`.
     */
    subtagType?: UnicodeExtensionSubtagType;
}

// Class definition.

/**
 * Base class for all Unicode based extensions. There are currently two Unicode based extensions: [[TransformedContentExtension]] and
 * [[UnicodeLocaleExtension]].
 */
export default class UnicodeBaseExtension extends ExtensionSpec
{
    /**
     * The data path relative to the `data` directory that points towards the directory that contains the data required for the extension.
     */
    private dataPath: string;

    /**
     * The regular expression used to test whether or not a given Unicode extension subtag is an attribute.
     */
    public static readonly attributeWellFormedRegExp: RegExp = /^[a-zA-Z0-9]{3,8}$/;

    /**
     * The regular expression used to test whether or not a given Unicode extension subtag follows case conventions. Extension subtag case conventions
     * require that all characters be lowercase.
     */
    public static readonly followsCaseConventionsRegExp: RegExp = /^[a-z0-9]*$/;

    /**
     * The regular expression used to test whether or not a given Unicode extension subtag is a key.
     */
    public static readonly keyWellFormedRegExp: RegExp = /^[a-zA-Z0-9]{2}$/;

    /**
     * The regular expression used to test whether or not a given Unicode extension subtag is well-formed.
     */
    public static readonly subtagWellFormedRegExp: RegExp = /^[a-zA-Z0-9]{2,8}$/;

    /**
     * The regular expression used to test whether or not a givne Unicode extension subtag is a type.
     */
    public static readonly typeWellFormedRegExp: RegExp = /^[a-zA-Z0-9]{3,8}$/;

    /**
     * Initializes internal values.
     *
     * @param singleton The extension singleton subtag this extension is defined by. This must be a single character.
     * @param dataPath The path to the folder containing the extension subtag data.
     */
    public constructor(singleton: string, dataPath: string)
    {
        super(singleton);

        this.dataPath = dataPath;
    }

    /**
     * Getter method for the extension data path.
     *
     * @returns Returns the extension data path.
     */
    public GetDataPath(): string
    {
        return this.dataPath;
    }

    /**
     * Implementation for the [[ExtensionSpec.IsExtensionSubtagRegistered]] abstract method. Determines whether or not the given subtag string is
     * registered as one of this extension's subtags. If `options.subtagType` is not defined, this method will check for subtag registration under
     * attributes, keys, and types. Otherwise, if it is defined, then the check will only consider subtags of that type. The check is case
     * insensitive.
     *
     * @param languageSubtag The language subtag string to test for registration.
     * @param options Options to be passed to the extension for greater control over the check.
     * @returns Returns whether or not the subtag is registered.
     */
    public IsExtensionSubtagRegistered(languageSubtag: string, options: IsExtensionSubtagRegisteredOptions = { }): boolean
    {
        languageSubtag = languageSubtag.toLowerCase();
        const subtagData: undefined | SubtagIndexedData = (require(`../../../data/${this.dataPath}/subtags.json`) as ExtensionSubtagData)[languageSubtag];

        if (subtagData === undefined)
        {
            return false;
        }

        if (options.subtagType === undefined)
        {
            return true;
        }

        switch (options.subtagType)
        {
            case 'attr':
                return subtagData.attrs !== undefined;

            case 'key':
                return subtagData.keys !== undefined;

            case 'type':
                return subtagData.types !== undefined;
        }

        return false;
    }

    /**
     * Implementation for the [[ExtensionSpec.IsExtensionSubtagValid]] abstract method. Determines whether or not the given subtag string is valid as
     * defined by the extending extension. An extension subtag for this extension is valid if it is both well-formed and registered. The check is case
     * insensitive.
     *
     * @param languageSubtag The language subtag string to test for validity.
     * @param options Options to be passed to the extension for greater control over the check.
     * @returns Returns whether or not the subtag is valid.
     */
    public IsExtensionSubtagValid(languageSubtag: string, options?: IsExtensionSubtagValidOptions): boolean
    {
        return this.IsExtensionSubtagWellFormed(languageSubtag, options) && this.IsExtensionSubtagRegistered(languageSubtag, options);
    }

    /**
     * Implementation for the [[ExtensionSpec.IsExtensionSubtagWellFormed]] abstract method. Determines whether or not the given subtag string is
     * well-formed as defined by the extending extension. If `options.subtagType` is not defined, this method will check for subtag well-formedness
     * under attributes, keys, and types. Otherwise, if it is defined, then the check will only consider subtags of that type. The check is case
     * insensitive unless `options.followsCaseConventions` is `true`.
     *
     * @param languageSubtag The language subtag string to test for well-formedness.
     * @param options Options to be passed to the extension for greater control over the check.
     * @returns Returns whether or not the subtag is well-formed.
     */
    public IsExtensionSubtagWellFormed(languageSubtag: string, options: IsExtensionSubtagWellFormedOptions = { }): boolean
    {
        if (options.followsCaseConventions && !UnicodeBaseExtension.followsCaseConventionsRegExp.test(languageSubtag))
        {
            return false;
        }

        if (options.subtagType === undefined)
        {
            return UnicodeBaseExtension.subtagWellFormedRegExp.test(languageSubtag);
        }

        switch (options.subtagType)
        {
            case 'attr':
                return UnicodeBaseExtension.attributeWellFormedRegExp.test(languageSubtag);

            case 'key':
                return UnicodeBaseExtension.keyWellFormedRegExp.test(languageSubtag);

            case 'type':
                return UnicodeBaseExtension.typeWellFormedRegExp.test(languageSubtag);
        }

        return false;
    }
};
