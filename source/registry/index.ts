/* Module dependencies. */

// External.

// Internal.

/* Module body. */

// Public Types.

/**
 * Type definition for the subtag registry file. The registry contains every registered subtag and the information related to each subtag.
 */
export type Registry = Array<RegistryRecord>;

/**
 * Enumeration defining the scope property of a subtag. This property only applies to language subtag.s
 */
export type RegistryRecordScope = 'macrolanguage' | 'collection' | 'special' | 'private-use';

/**
 * Enumeration defining the type property of a subtag.
 */
export type RegistryRecordType = 'language' | 'extlang' | 'script' | 'region' | 'variant' | 'grandfathered' | 'redundant';

// Public interfaces.

/**
 * Type definition for the subtag registry index file. The index file is a lookup map for finding the index of a subtag based on its type within the
 * registry. This is needed because a subtag string can refer to multiple subtags of different types (region, script, etc.).
 */
export interface RegistryIndex
{
    [key: string]: undefined | RegistryIndexLookUp;
}

/**
 * Structure defining the possible results of a registry index lookup. Since a subtag string may refer to multiple subtag types, each possibility
 * needs to be considered. Note that even though `grandfathered` and `redundant` are not valid subtag types, the registry includes them anyway.
 */
export interface RegistryIndexLookUp
{
    /**
     * If defined, it will refer to the index of the corresponding extended language subtag [[RegistryRecord]] within the subtag registry.
     */
    extlang?: number;

    /**
     * If defined, it will refer to the index of the corresponding grandfathered language tag [[RegistryRecord]] within the subtag registry.
     */
    grandfathered?: number;

    /**
     * If defined, it will refer to the index of the corresponding language subtag [[RegistryRecord]] within the subtag registry.
     */
    language?: number;

    /**
     * If defined, it will refer to the index of the corresponding redundant language tag [[RegistryRecord]] within the subtag registry.
     */
    redundant?: number;

    /**
     * If defined, it will refer to the index of the corresponding region subtag [[RegistryRecord]] within the subtag registry.
     */
    region?: number;

    /**
     * If defined, it will refer to the index of the corresponding script subtag [[RegistryRecord]] within the subtag registry.
     */
    script?: number;

    /**
     * If defined, it will refer to the index of the corresponding variant [[RegistryRecord]] within the subtag registry.
     */
    variant?: number;
}

/**
 * Structure defining the possible information that can accompany a subtag within the subtag registry.
 */
export interface RegistryRecord
{
    /**
     * Contains the date the record was registered or, in the case of grandfathered and redundant tags, the date the corresponding tag was registered
     * under the rules of [RFC1766](https://tools.ietf.org/html/rfc1766) or [RFC3066](https://tools.ietf.org/html/rfc3066).
     */
    Added: string;

    /**
     * If defined, it will contain additional information about the subtag, as deemed appropriate for understanding the registry and implementing
     * language tags using the subtag or tag.
     */
    Comments?: Array<string>;

    /**
     * If defined, it will contain the date the record was deprecated. In some cases, this value is earlier than that of the [[RegistryRecord.Added]]
     * field in the same record. That is, the date of deprecation preceded the addition of the record to the registry.
     */
    Deprecated?: string;

    /**
     * Contains a non-normative description of the subtag or tag.
     */
    Description: Array<string>;

    /**
     * If defined, contains a primary language subtag defined by ISO 639 as the `'macrolanguage'`` that encompasses this language subtag. This field
     * **must** appear only in records whose [[RegistryRecord.Type]] field is `'language'` or `'extlang'`.
     */
    Macrolanguage?: string;

    /**
     * If defined, contains a canonical mapping from this record's value to a modern equivalent that is preferred in its place. Depending on the value
     * of the [[RegistryRecord.Type]] field, this value can take different forms:
     *
     * * For fields of type `'language'`, this field contains the primary language subtag that is preferred when forming the language tag.
     * * For fields of type `'script'`, `'region'`, or `'variant'`, this field contains the subtag of the same type that is preferred for forming the
     *   language tag.
     * * For fields of type `'extlang'`, `'grandfathered'`, or `'redundant'`, this field contains an extended language range
     *   ([RFC4647](https://tools.ietf.org/html/rfc4647)) that is preferred for forming the language tag. That is, the preferred language tag will
     *   contain, in order, each of the subtags that appears in the [[RegistryRecord.Preferred-Value]] field; additional fields can be included in a
     *   language tag, as described elsewhere in this document. For example, the replacement for the grandfathered tag `'zh-min-nan'` (Min Nan Chinese)
     *   is `'nan'`, which can be used as the basis for tags such as `'nan-Hant'` or `'nan-TW'` (note that the extended language subtag form such as
     *   `'zh-nan-Hant'` or `'zh-nan-TW'` can also be used).
     */
    'Preferred-Value'?: string;

    /**
     * If defined, contains a valid language tag that is **recommended** as one possible prefix to this record's subtag. This field **may** appear in
     * records whose [[RegistryRecord.Type]] field is either `'extlang'` or `'variant'` (it **must not** appear in any other record type).
     */
    Prefix?: Array<string>;

    /**
     * If defined, contains information about a primary or extended language subtag indicating the type of language code according to ISO 639. The
     * values permitted in this field are `'macrolanguage'`, `'collection'`, `'special'`, and `'private-use'`. This field only appears in records
     * whose [[RegistryRecord.Type]] field is either `'language'` or `'extlang'`. When this field is omitted, the language is an individual language.
     */
    Scope?: RegistryRecordScope;

    /**
     * If defined, contains the subtag being defined. This field **must** appear in all records whose [[RegistryRecord.Type]] field has one of these
     * values: `'language'`, `'extlang'`, `'script'`, `'region'`, or `'variant'`.
     */
    Subtag?: string;

    /**
     * If defined, contains a script subtag that **should not** be used to form language tags with the associated primary or extended language subtag.
     * This field **must** appear only in records whose [[RegistryRecord.Type]] field is `'language'` or `'extlang'`.
     */
    'Suppress-Script'?: string;

    /**
     * If defined, contains a complete language tag. This field **must** appear in all records whose [[RegistryRecord.Type]] field has one of these
     * values: `'grandfathered'` or `'redundant'`. If the type is `'grandfathered'`, then this will be one of the tags listed in either the
     * `'regular'` or `'irregular'` production.
     */
    Tag?: string;

    /**
     * Contains one of the following strings: `'language'`, `'extlang'`, `'script'`, `'region'`, `'variant'`, `'grandfathered'`, and `'redundant'`; it
     * denotes the type of tag or subtag.
     */
    Type: RegistryRecordType;
}

// JSON data.

const index: RegistryIndex = require('language-subtag-registry/data/json/index.json') as RegistryIndex;
const registry: Registry = require('language-subtag-registry/data/json/registry.json') as Registry;

// Registry searching.

/**
 * Retrieves a [[RegistryRecord]] given a [[RegistryRecordType]] and a subtag string. The function will perform a lookup on the subtag string in
 * subtag registry and return a registry record if a subtag of type `type` exists. If `type` does not exist, the function will return `null`. The
 * `tag` parameter is case insensitive.
 *
 * @param type The type of record that is to be retrieved.
 * @param tag The subtag string to look up a record for
 * @returns Returns null if a record of type `type` and tag `tag` did not exist, or the record information associated with the type and tag.
 */
export function GetRecord(type: RegistryRecordType, tag: string): null | RegistryRecord
{
    const lookUp: null | RegistryIndexLookUp = SearchIndex(tag, type);

    if (lookUp === null)
    {
        return null;
    }

    return GetRecordByIndex(lookUp[type]);
};

/**
 * Retrieves a [[RegistryRecord]] by index in the subtag registry. If `recordIndex` is negative or greater than the size of the registry, this
 * function will return `null`.
 *
 * @param recordIndex The index of the record to retrieve.
 * @returns Returns null if a record with the given index does not exist, or the record information associated with the index.
 */
export function GetRecordByIndex(recordIndex: number): null | RegistryRecord
{
    if (recordIndex < 0 || recordIndex >= registry.length)
    {
        return null;
    }

    return registry[recordIndex];
};

/**
 * Searches the subtag index registry for a language subtag `tag`. If `requiredTypes` is specified, the subtag will be required to have the given
 * record types, or null will be returned. The `tag` parameter is case insensitive.
 *
 * @param tag The tag to search for within the index registry.
 * @param requiredTypes The types that are required to exist for the language subtag.
 * @returns Returns null either if a record with the given tag does not exist, or the tag does not have the specified record types. Otherwise, the
 *      index lookup information associated with the tag is returned.
 */
export function SearchIndex(tag: string, requiredTypes: RegistryRecordType | Array<RegistryRecordType> = [ ]): null | RegistryIndexLookUp
{
    const lookUp: undefined | RegistryIndexLookUp = index[tag.toLowerCase()];

    if (lookUp === undefined)
    {
        return null;
    }

    if (!Array.isArray(requiredTypes))
    {
        requiredTypes =
            [
                requiredTypes
            ];
    }

    for (const requiredType of requiredTypes)
    {
        if (lookUp[requiredType as string] === undefined)
        {
            return null;
        }
    }

    return lookUp;
};

// Type guards.

/**
 * Type guard for checking if a value is of type [[RegistryRecordScope]]. The check is case insensitive.
 *
 * @param value The value to check.
 * @returns Returns whether or not the value is of type [[RegistryRecordScope]].
 */
export function IsRegistryRecordScope(value: any): value is RegistryRecordScope
{
    if (typeof value !== 'string')
    {
        return false;
    }

    value = value.toLowerCase();
    return value === 'macrolanguage' || value === 'collection' || value === 'special' || value === 'private-use';
}

/**
 * Type guard for checking if a value is of type [[RegistryRecordType]]. The check is case insensitive.
 *
 * @param value The value to check.
 * @returns Returns whether or not the value is of type [[RegistryRecordType]].
 */
export function IsRegistryRecordType(value: any): value is RegistryRecordType
{
    if (typeof value !== 'string')
    {
        return false;
    }

    value = value.toLowerCase();
    return value === 'language' || value === 'extlang' || value === 'script' || value === 'region' ||
           value === 'variant' || value === 'grandfathered' || value === 'redundant';
}
