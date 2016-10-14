/* Module dependencies. */

// External.

// Internal.

import ExtensionSpec from './ExtensionSpec';
import LanguageTag from './LanguageTag';
import { GetExtensionBySingleton, GetExtensionsBySubtag, GetRecord, IsExtensionRegisteredOptions,
         IsExtensionValidOptions, IsExtensionWellFormedOptions, IsSingletonRegisteredOptions,
         IsSingletonValidOptions, IsSubtagPrivateUse, IsSubtagRegistered, IsSubtagValid,
         IsSubtagWellFormed, MapPrivateUseToRegistered, RegistryRecord, RegistryRecordScope, RegistryRecordType } from './registry';

/* Module body. */

// Public Types.

/**
 * Options to be passed to the [[LanguageSubtag]] constructor.
 */
export interface LanguageSubtagOptions extends IsExtensionRegisteredOptions, IsExtensionValidOptions, IsExtensionWellFormedOptions
{
    /**
     * See [[IsSingletonRegisteredOptions.includeExtensions]].
     */
    includeExtensionsRegistered?: boolean;

    /**
     * See [[IsSingletonRegisteredOptions.includeGrandfathered]].
     */
    includeGrandfatheredRegistered?: boolean;

    /**
     * See [[IsSingletonRegisteredOptions.includePrivateUse]].
     */
    includePrivateUseRegistered?: boolean;

    /**
     * See [[IsSingletonValidOptions.includePrivateUse]].
     */
    includePrivateUseValid?: boolean;

    /**
     * See [[IsSingletonValidOptions.strict]].
     */
    strict?: boolean;
}

/**
 * The language subtag types that the [[LanguageSubtag]] class can represent.
 */
export type LanguageSubtagType = 'language' | 'extlang' | 'script' | 'region' | 'variant' | 'extension' | 'privateuse' | 'singleton';

/**
 * Similar to [[LanguageSubtagType]] but includes `grandfathered` as an edge case that simply serves to provide a placeholder for representing
 * individual subtags of a grandfathered language tag.
 */
export type LanguageSubtagTypeExtended = LanguageSubtagType | 'grandfathered';

// Class definition.

/**
 * A class that represents an individual language subtag and contains all information regarding said subtag. Note that the usage of subtag here is
 * defined in such a way that the `'-''` is not included. This means that even though redundant and grandfathered tags are included in the language
 * subtag registered, they can not be represented properly with this class. This class does however support representing individual subtags of either
 * a redundant or grandfathered tag, but none of the record data will be included. If you wish to retrieve the record information for a redundant or
 * grandfathered tag, use the [[LanguageTag]] class.
 */
export default class LanguageSubtag
{
    /**
     * Additional information about the subtag, as deemed appropriated for understanding the registry and implementing language tags using the subtag.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is of type `'extension'`,`'grandfathered'`, or `'singleton'`, this will be
     * `null`. Otherwise, it will be always be an array.
     */
    private comments: null | Array<string>;

    /**
     * The date the subtag record was registered. If the subtag given is not registered or [[LanguageSubtag.type]] is of type `'extension'`,
     * `'grandfathered'`, or `'singleton'`, this will be `null`. Otherwise, it will always be a date.
     */
    private dateAdded: null | Date;

    /**
     * The date the subtag record was deprecated. In some cases, this value is earlier than that of the [[LanguageSubtag.dateAdded]] record field.
     * That is, the date of deprecation preceded the addition of the record to the registry.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is of type `'extension'`, `'grandfathered'`, `'singleton'` this will be
     * `null`. Otherwise, it may be `null` or a date depending on whether or not a deprecated field existed in the subtag's record.
     */
    private dateDeprecated: null | Date;

    /**
     * An array of strings that are non-normative descriptions for the subtag.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is of type `'extension`', `'grandfathered'`, or `'singleton'`, this will be
     * `null`. Otherwise, it will always be an array with at least one description.
     */
    private descriptions: null | Array<string>;

    /**
     * The value that was given in the constructor's `options.singleton` field. See [[IsExtensionRegisteredOptions.singleton]] for a description of
     * this member.
     */
    private extensionSingleton: null | string;

    /**
     * The value that was given in the constructor's `options.subtagType` field. See [[IsExtensionRegisteredOptions.subtagType]] for a description of
     * this member.
     */
    private extensionSubtagType: null | string;

    /**
     * The extension specs that matched the given subtag.
     *
     * If the subtag given is not of type `'extension'` or `'singleton'`, this will be `null`. Otherwise, it will always be an array.
     */
    private extensionSpecs: null | Array<ExtensionSpec>;

    /**
     * The value that was given in the constructor's `options.followCaseConventions` field.
     */
    private followedCaseConventions: null | boolean;

    /**
     * The value that was given in the constructor's `options.includeExtensionRegistered` field. See
     * [[IsSingletonRegisteredOptions.includeExtensions]] for a description of this member.
     *
     * If [[LanguageSubtagType.type]] is not of type `'singleton'`, this will be `null`. Otherwise, it will always be a boolean that defaults to the
     * default value as defined by [[IsSingletonRegisteredOptions.includeExtensions]].
     */
    private includedExtensionRegistered: null | boolean;

    /**
     * The value that was given in the constructor's `options.includedGrandfatheredRegistered` field. See
     * [[IsSingletonRegisteredOptions.includeGrandfathered]] for a description of this member.
     *
     * If [[LanguageSubtagType.type]] is not of type `'singleton'`, this will be `null`. Otherwise, it will always be a boolean that defaults to the
     * default value as defined by [[IsSingletonRegisteredOptions.includeGrandfathered]].
     */
    private includedGrandfatheredRegistered: null | boolean;

    /**
     * The value that was given in the constructor's `options.includedPrivateUseRegistered` field. See
     * [[IsSingletonRegisteredOptions.includePrivateUse]] for a description of this member.
     *
     * If [[LanguageSubtagType.type]] is not of type `'singleton'`, this will be `null`. Otherwise, it will always be a boolean that defaults to the
     * default value as defined by [[IsSingletonRegisteredOptions.includePrivateUse]].
     */
    private includedPrivateUseRegistered: null | boolean;

    /**
     * The value that was given in the constructor's `options.includedPrivateUseValid` field. See
     * [[IsSingletonValidOptions.includePrivateUse]] for a description of this member.
     *
     * If [[LanguageSubtagType.type]] is not of type `'singleton'`, this will be `null`. Otherwise, it will always be a boolean that defaults to the
     * default value as defined by [[IsSingletonValidOptions.includePrivateUse]].
     */
    private includedPrivateUseValid: null | boolean;

    /**
     * The primary language subtag defined by ISO 639 as the "macrolanguage" that encompasses this language subtag.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is not of type `'language'` or `'extlang'`, this will be `null`. Otherwise, it
     *  may be `null` or a [[LanguageSubtag]] depending on whether or not a macrolanguage field existed in the subtag's record.
     */
    private macrolanguage: null | LanguageSubtag;

    /**
     * A canonical mapping from the subtag to a modern equivalent that is preferred in its place. Depending on the value of [[LanguageSubtag.type]],
     * this value can take differents forms. In the case of `language`, this value may contain a primary language subtag that is preferred when
     * forming the language tag. In the cases of `'script'`, `'region'`, and `'variant'`, this value may contain the subtag of the same type that is
     * preferred for forming the language tag. In the last case of `extlang`, this value will always contain an "extended language range" that is
     * preferred for forming the language tag.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is of type `'extension'`, 'grandfathered'`, or `'singleton'`, this will be
     * `null`. Otherwise, it may be `null`, a [[LanguageSubtag]], or a [[LanguageTag]] depending on whether or not a preferred value field existed in
     * the subtag's record.
     */
    private preferredValue: null | LanguageSubtag | LanguageTag;

    /**
     * An array of either [[LanguageSubtag]] or [[LanguageTag]] that serve as **recommended** prefixes to the [[LanguageSubtag.subtag]] record field.
     * If the value of [[LanguageSubtag.type]] is `'extlang'`, the array will only consist of values of type [[LanguageSubtag]], otherwise if the
     * value is `'variant'`, it is possible that the array could contain values of type [[LanguageSubtag]] or [[LanguageTag]]. Whether or not a given
     * index is of type [[LanguageTag]], depends on the presence of the `'-'` character in the prefix. If it is present, the type will be of type
     * [[LanguageTag]], otherwise it will be of type [[LanguageSubtag]].
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is of type `'extension'`, `'grandfathered'`, `'singleton'`, this will be
     * `null`. Otherwise, it will always be an array.
     */
    private prefixes: null | Array<LanguageSubtag | LanguageTag>;

    /**
     * Indicates whether or not the subtag is private use.
     */
    private privateUse: boolean;

    /**
     * Indicates whether or not the subtag is registered. Note that private use subtags are not considered to be registered.
     */
    private registered: boolean;

    /**
     * Information about a primary or extended language subtag indicating the type of language code according to ISO 639. The values permitted in this
     * field are `'macrolanguage'`, `'collection'`, `'special'`, and `'private-use'`.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is not of type `'language'` or `'extlang'`, this will be `null`. Otherwise, it
     * may be `null` or a value of the enumeration [[RegistryRecordScope]] depending on whether or not a scope field existed in the subtag's record.
     */
    private scope: null | RegistryRecordScope;

    /**
     * The value that was given in the constructor's `options.strict` field. See [[IsSingletonValidOptions.strict]] for a description of this member.
     *
     * If [[LanguageSubtagType.type]] is not of type `'singleton'`, this will be `null`. Otherwise, it will always be a boolean that defaults to the
     * default value as defined by [[IsSingletonValidOptions.includePrivateUse]].
     */
    private strictSingletons: null | boolean;

    /**
     * The original subtag string that was passed into the constructor.
     */
    private subtag: string;

    /**
     * The same as [[LanguageSubtag.subtag]], but it is formatted with the case conventions set by [[LanguageSubtag.type]].
     */
    private subtagFormatted: string;

    /**
     * The script subtag that **should not** be used to form language tags with the associated primary or extended language subtag.
     *
     * If the subtag given is not registered or [[LanguageSubtag.type]] is not of type `'language'` or `'extlang'`, this will be `null`. Otherwise, it
     * may be `null` or a [[LanguageSubtag]] depending on whether or not a suppress script field existed in the subtag's record.
     */
    private suppressedScript: null | LanguageSubtag;

    /**
     * The type of subtag this instance represents.
     */
    private type: LanguageSubtagTypeExtended;

    /**
     * Indicates whether or not the subtag is valid. A subtag is valid if it is well-formed and either private use or registered.
     */
    private valid: boolean;

    /**
     * Indicates whether or not the subtag is well-formed.
     */
    private wellFormed: boolean;

    /**
     * A helper method that sets all the record members for the subtag to null.
     */
    private NullifyRecordMembers(): void
    {
        this.comments = null;
        this.dateAdded = null;
        this.dateDeprecated = null;
        this.descriptions = null;
        this.macrolanguage = null;
        this.preferredValue = null;
        this.prefixes = null;
        this.scope = null;
        this.suppressedScript = null;
    }

    /**
     * Performs all well-formedness, registration, and validation checks as needed for the given subtag based on its type.
     *
     * @param type The type of subtag that should be used for checking for well-formedness, registration, and validation.
     * @param subtag The subtag that is to be checked for well-formedness, registration, and validation.
     * @param options An options object used to determine various ways in which the subtag will be checked for well-formedness, registration, and
     *      validation. See [[LanguageSubtagOptions]] for more information on what each option means and its default value.
     */
    public constructor(type: LanguageSubtagTypeExtended, subtag: string, options: LanguageSubtagOptions = { })
    {
        this.subtag = subtag;
        this.type = type;

        if (type === 'extension')
        {
            this.extensionSingleton = typeof options.singleton === 'string' ? options.singleton : null;
            this.extensionSubtagType = typeof options.subtagType === 'string' ? options.subtagType : null;
        }
        else
        {
            this.extensionSingleton = null;
            this.extensionSubtagType = null;
        }

        if (type === 'singleton')
        {
            this.includedExtensionRegistered = typeof options.includeExtensionsRegistered === 'boolean' ? options.includeExtensionsRegistered : true;
            this.includedGrandfatheredRegistered = typeof options.includeGrandfatheredRegistered === 'boolean' ? options.includeGrandfatheredRegistered : false;
            this.includedPrivateUseRegistered = typeof options.includePrivateUseRegistered === 'boolean' ? options.includePrivateUseRegistered : false;
            this.includedPrivateUseValid = typeof options.includePrivateUseValid === 'boolean' ? options.includePrivateUseValid : true;
            this.strictSingletons = typeof options.strict === 'boolean' ? options.strict : true;
        }
        else
        {
            this.includedExtensionRegistered = null;
            this.includedGrandfatheredRegistered = null;
            this.includedPrivateUseRegistered = null;
            this.strictSingletons = null;
        }

        if (type === 'grandfathered')
        {
            this.NullifyRecordMembers();

            this.extensionSpecs = null;
            this.followedCaseConventions = null;
            this.privateUse = false;
            this.registered = false;
            this.valid = true;
            this.wellFormed = false;

            this.subtagFormatted = subtag.toLowerCase();

            if (this.subtagFormatted === 'gb')
            {
                this.subtagFormatted = 'GB';
            }

            return;
        }

        const tempOptions: LanguageSubtagOptions & IsSingletonRegisteredOptions & IsSingletonValidOptions = options;
        tempOptions.includeExtensions = this.includedExtensionRegistered === null ? undefined : this.includedExtensionRegistered;
        tempOptions.includeGrandfathered = this.includedGrandfatheredRegistered === null ? undefined : this.includedGrandfatheredRegistered;
        tempOptions.includePrivateUse = this.includedPrivateUseRegistered === null ? undefined : this.includedPrivateUseRegistered;
        tempOptions.strict = this.strictSingletons === null ? undefined : this.strictSingletons;

        type = type as LanguageSubtagType;

        this.followedCaseConventions = typeof options.followsCaseConventions === 'boolean' ? options.followsCaseConventions : false;
        this.subtagFormatted = LanguageSubtag.FormatSubtag(type, subtag);
        this.privateUse = IsSubtagPrivateUse(type, subtag);
        this.registered = IsSubtagRegistered(type, subtag, tempOptions);

        tempOptions.includePrivateUse = this.includedPrivateUseValid === null ? undefined : this.includedPrivateUseValid;

        this.valid = IsSubtagValid(type, subtag, tempOptions);
        this.wellFormed = IsSubtagWellFormed(type, subtag, tempOptions);

        if (this.valid)
        {
            switch (type)
            {
                case 'extension':
                    this.extensionSpecs = GetExtensionsBySubtag(subtag);
                    this.NullifyRecordMembers();
                    break;

                case 'singleton':
                    const extensionSpec: null | ExtensionSpec = GetExtensionBySingleton(subtag);
                    this.extensionSpecs = extensionSpec === null ? [ ] :
                        [
                            extensionSpec
                        ];
                    this.NullifyRecordMembers();
                    break;

                default:
                    const record: null | RegistryRecord =
                        this.privateUse ?
                        GetRecord(type as RegistryRecordType, MapPrivateUseToRegistered(type, subtag)) :
                        GetRecord(type as RegistryRecordType, subtag);

                    this.extensionSpecs = null;

                    if (record === null)
                    {
                        this.NullifyRecordMembers();
                    }
                    else
                    {
                        this.comments = record.Comments === undefined ? [ ] : record.Comments;
                        this.dateAdded = new Date(record.Added);
                        this.dateDeprecated = record.Deprecated === undefined ? null : new Date(record.Deprecated);
                        this.descriptions = record.Description.slice();
                        this.macrolanguage = record.Macrolanguage === undefined ? null : new LanguageSubtag('language', record.Macrolanguage);
                        this.scope = record.Scope === undefined ? null : record.Scope;
                        this.suppressedScript =
                            record['Suppress-Script'] === undefined ?
                            null :
                            new LanguageSubtag('script', record['Suppress-Script']!);

                        const preferredValue: undefined | string = record['Preferred-Value'];

                        if (preferredValue === undefined)
                        {
                            this.preferredValue = null;
                        }
                        else
                        {
                            if (type === 'extlang')
                            {
                                this.preferredValue = new LanguageTag(preferredValue);
                            }
                            else
                            {
                                this.preferredValue = new LanguageSubtag(type, preferredValue);
                            }
                        }

                        this.prefixes = [ ];
                        const prefixes: undefined | Array<string> = record.Prefix;

                        if (prefixes !== undefined)
                        {
                            for (const prefix of prefixes)
                            {
                                if (type === 'extlang')
                                {
                                    this.prefixes.push(new LanguageSubtag('language', prefix));
                                }
                                else if (prefix.split('-').length > 1)
                                {
                                    this.prefixes.push(new LanguageTag(prefix));
                                }
                                else
                                {
                                    this.prefixes.push(new LanguageSubtag('variant', prefix));
                                }
                            }
                        }

                        break;
                    }

                    break;
            }
        }
        else
        {
            if (type === 'extension' || type === 'singleton')
            {
                this.extensionSpecs = [ ];
            }
            else
            {
                this.extensionSpecs = null;
            }

            this.NullifyRecordMembers();
        }
    }

    /**
     * Getter method for the subtag record's comments field.
     *
     * @returns Returns the subtag record's comments field.
     */
    public GetComments(): null | Array<string>
    {
        return this.comments;
    }

    /**
     * Getter method for the subtag record's added field.
     *
     * @returns Returns the subtag record's added field.
     */
    public GetDateAdded(): null | Date
    {
        return this.dateAdded;
    }

    /**
     * Getter method for the subtag record's deprecated field.
     *
     * @returns Returns the subtag record's deprecated field.
     */
    public GetDateDeprecated(): null | Date
    {
        return this.dateDeprecated;
    }

    /**
     * Getter method for the subtag record's description field.
     *
     * @returns Returns the subtag record's description field.
     */
    public GetDescriptions(): null | Array<string>
    {
        return this.descriptions;
    }

    /**
     * Getter method for what extension singleton was used for a given extension subtag.
     *
     * @returns Returns what extension singleton was used for a given extension subtag.
     */
    public GetExtensionSingleton(): null | string
    {
        return this.extensionSingleton;
    }

    /**
     * Getter method for what extension specs matched the given singleton or extension subtag.
     *
     * @returns Returns what extension specs matched the given singleton or extension subtag.
     */
    public GetExtensionSpecs(): null | Array<ExtensionSpec>
    {
        return this.extensionSpecs;
    }

    /**
     * Getter method for what extension subtag type was used for extension subtag validation.
     *
     * @returns Returns what extension subtag type was used for extension subtag validation.
     */
    public GetExtensionSubtagType(): null | string
    {
        return this.extensionSubtagType;
    }

    /**
     * Getter method for the subtag record's macrolanguage field.
     *
     * @returns Returns the subtag record's macrolanguage field.
     */
    public GetMacrolanguage(): null | LanguageSubtag
    {
        return this.macrolanguage;
    }

    /**
     * Getter method for the subtag record's preferred value field.
     *
     * @returns Returns the subtag record's preferred value field.
     */
    public GetPreferredValue(): null | LanguageSubtag | LanguageTag
    {
        return this.preferredValue;
    }

    /**
     * Getter method for the subtag record's prefix field.
     *
     * @returns Returns the subtag record's prefix field.
     */
    public GetPrefixes(): null | Array<LanguageTag | LanguageSubtag>
    {
        return this.prefixes;
    }

    /**
     * Getter method for the subtag record's scope field.
     *
     * @returns Returns the subtag record's scope field.
     */
    public GetScope(): null | RegistryRecordScope
    {
        return this.scope;
    }

    /**
     * Getter method for the subtag record's suppressed script field.
     *
     * @returns Returns the subtag record's suppressed script field.
     */
    public GetSuppressedScript(): null | LanguageSubtag
    {
        return this.suppressedScript;
    }

    /**
     * Getter method for the subtag type.
     *
     * @returns Returns the subtag type.
     */
    public GetType(): LanguageSubtagTypeExtended
    {
        return this.type;
    }

    /**
     * Getter method for whether or not case conventions were enforced.
     *
     * @returns Returns whether or not case conventions were enforced.
     */
    public FollowedCaseConventions(): null | boolean
    {
        return this.followedCaseConventions;
    }

    /**
     * Getter method for whether or not extension singletons were considered registered in regards to the registeration check for singleton subtags.
     *
     * @returns Returns whether or not extension singletons were considered registered in regards to the registeration check for singleton subtags.
     */
    public IncludedExtensionRegistered(): null | boolean
    {
        return this.includedExtensionRegistered;
    }

    /**
     * Getter method for whether or not the grandfathered singleton was considered registered in regards to the registeration check for singleton
     * subtags.
     *
     * @returns Returns whether or not the grandfathered singleton was considered registered in regards to the registeration check for singleton
     * subtags.
     */
    public IncludedGrandfatheredRegistered(): null | boolean
    {
        return this.includedGrandfatheredRegistered;
    }

    /**
     * Getter method for whether or not the private-use singleton was considered registered in regards to the registeration check for singleton
     * subtags.
     *
     * @returns Returns whether or not the private-use singleton was considered registered in regards to the registeration check for singleton
     * subtags.
     */
    public IncludedPrivateUseRegistered(): null | boolean
    {
        return this.includedPrivateUseRegistered;
    }

    /**
     * Getter method for whether or not the private-use singleton was considered valid in regards to validating a singleton subtag.
     *
     * @returns Returns whether or not the private-use singleton was considered valid in regards to validating a singleton subtag.
     */
    public IncludedPrivateUseValid(): null | boolean
    {
        return this.includedPrivateUseValid;
    }

    /**
     * Getter method for whether or not the subtag is deprecated.
     *
     * @returns Returns whether or not the subtag is deprecated.
     */
    public IsDeprecated(): boolean
    {
        return this.dateDeprecated instanceof Date;
    }

    /**
     * Getter method for whether or not the subtag is private-use.
     *
     * @returns Returns whether or not the subtag is private-use.
     */
    public IsPrivateUse(): boolean
    {
        return this.privateUse;
    }

    /**
     * Getter method for whether or not the subtag is registered.
     *
     * @returns Returns whether or not the subtag is registered.
     */
    public IsRegistered(): boolean
    {
        return this.registered;
    }

    /**
     * Getter method for whether or not the subtag is valid.
     *
     * @returns Returns whether or not the subtag is valid.
     */
    public IsValid(): boolean
    {
        return this.valid;
    }

    /**
     * Getter method for whether or not the subtag is well-formed.
     *
     * @returns Returns whether or not the subtag is well-formed.
     */
    public IsWellFormed(): boolean
    {
        return this.wellFormed;
    }

    /**
     * Getter method for whether or not singleton validation was strict.
     *
     * @returns Returns whether or not singleton validation was strict.
     */
    public StrictSingletons(): null | boolean
    {
        return this.strictSingletons;
    }

    /**
     * Returns the subtag as a string with `followCaseConventions` deciding whether or not it should be formatted based on case conventions.
     *
     * @param followCaseConventions Whether or not the returned string should be formatted based on case conventions. Defaults to `true`.
     * @returns Returns the subtag as a string.
     */
    public ToString(followCaseConventions: boolean = true): string
    {
        return followCaseConventions ? this.subtagFormatted : this.subtag;
    }

    /**
     * Given a subtag type and a subtag string, this method will return a formatted subtag string that follows case conventions as determined by the
     * specific subtag type. The subtag types `'language'`, `'extlang'`, `'variant'`, `'extension'`, and `singleton` are all formatted as lowercase.
     * The `'region'` subtag type is formatted as uppercase, while the `'script'` subtag type is formatted where the first letter is uppercase and all
     * following letters are lowercase.
     *
     * @param type The type of subtag that is given.
     * @param subtag The subtag that is to be formatted.
     * @returns Returns the formatted subtag.
     */
    public static FormatSubtag(type: LanguageSubtagType, subtag: string): string
    {
        switch (type)
        {
            case 'region':
                return subtag.toUpperCase();

            case 'script':
                subtag = subtag.toLowerCase();

                if (subtag.length > 0)
                {
                    subtag = subtag.charAt(0).toUpperCase() + subtag.substring(1);
                }

                return subtag;
        }

        return subtag.toLowerCase();
    }

    /**
     * Type guard for checking if a value is of type [[LanguageSubtagType]]. The check is case insensitive.
     *
     * @param value The value to check.
     * @returns Returns whether or not the value is of type [[LanguageSubtagType]].
     */
    public static IsLanguageSubtagType(value: any): value is LanguageSubtagType
    {
        if (typeof value !== 'string')
        {
            return false;
        }

        value = value.toLowerCase();
        return value === 'language' || value === 'extlang' || value === 'script' || value === 'region' ||
               value === 'variant' || value === 'extension' || value === 'privateuse';
    }
};
