/* Module dependencies. */

// External.

// Internal.

import { LanguageSubtagType } from './LanguageSubtag';
import { IsRegistered as IsExtensionRegistered, IsRegisteredOptions as IsExtensionRegisteredOptions,
         IsValid as IsExtensionValid, IsValidOptions as IsExtensionValidOptions,
         IsWellFormed as IsExtensionWellFormed, IsWellFormedOptions as IsExtensionWellFormedOptions } from './registry/extension';
import { IsRegistered as IsExtendedLanguageRegistered, IsValid as IsExtendedLanguageValid,
         IsWellFormed as IsExtendedLanguageWellFormed} from './registry/extlang';
import { SearchIndex } from './registry/index';
import { IsPrivateUse as IsLanguagePrivateUse, IsRegistered as IsLanguageRegistered,
         IsValid as IsLanguageValid, IsWellFormed as IsLanguageWellFormed,
         IsWellFormedOptions as IsLanguageWellFormedOptions } from './registry/language';
import { IsValid as IsPrivateUseValid, IsWellFormed as IsPrivateuseWellFormed } from './registry/privateuse';
import { IsPrivateUse as IsRegionPrivateUse, IsRegistered as IsRegionRegistered,
         IsValid as IsRegionValid, IsWellFormed as IsRegionWellFormed } from './registry/region';
import { IsPrivateUse as IsScriptPrivateUse, IsRegistered as IsScriptRegistered,
         IsValid as IsScriptValid, IsWellFormed as IsScriptWellFormed } from './registry/script';
import { IsPrivateUseSingleton, IsRegistered as IsSingletonRegistered,
         IsRegisteredOptions as IsSingletonRegisteredOptions, IsValid as IsSingletonValid,
         IsValidOptions as IsSingletonValidOptions, IsWellFormed as IsSingletonWellFormed } from './registry/singleton';
import { IsRegistered as IsVariantRegistered, IsValid as IsVariantValid,
         IsWellFormed as IsVariantWellFormed } from './registry/variant';

/* Module body. */

// Private interfaces.

/**
 * Map interface for mapping private use check functions to their respective values or functions per each type.
 */
interface IsSubtagPrivateUseMap
{
    extension: boolean;
    extlang: boolean;
    language: typeof IsLanguagePrivateUse;
    privateuse: boolean;
    region: typeof IsRegionPrivateUse;
    script: typeof IsScriptPrivateUse;
    singleton: typeof IsPrivateUseSingleton;
    variant: boolean;
}

/**
 * Map interface for mapping registration check functions to their respective values or functions per each type.
 */
interface IsSubtagRegisteredMap
{
    extension: typeof IsExtensionRegistered;
    extlang: typeof IsExtendedLanguageRegistered;
    language: typeof IsLanguageRegistered;
    privateuse: boolean;
    region: typeof IsRegionRegistered;
    script: typeof IsScriptRegistered;
    singleton: typeof IsSingletonRegistered;
    variant: typeof IsVariantRegistered;
}

/**
 * Map interface for mapping validation check functions to their respective values or functions per each type.
 */
interface IsSubtagValidMap
{
    extension: typeof IsExtensionValid;
    extlang: typeof IsExtendedLanguageValid;
    language: typeof IsLanguageValid;
    privateuse: typeof IsPrivateUseValid;
    region: typeof IsRegionValid;
    script: typeof IsScriptValid;
    singleton: typeof IsSingletonValid;
    variant: typeof IsVariantValid;
}

/**
 * Map interface for mapping well-formedness check functions to their respective values or functions per each type.
 */
interface IsSubtagWellFormedMap
{
    extension: typeof IsExtensionWellFormed;
    extlang: typeof IsExtendedLanguageWellFormed;
    language: typeof IsLanguageWellFormed;
    privateuse: typeof IsPrivateuseWellFormed;
    region: typeof IsRegionWellFormed;
    script: typeof IsScriptWellFormed;
    singleton: typeof IsSingletonWellFormed;
    variant: typeof IsVariantWellFormed;
}

// Constants.

// RegExps.

/* tslint:disable:max-line-length */

/**
 * The regular expression used to test whether or not a language tag is a well-formed language tag. This accounts for irregular and regular language
 * tags.
 */
const wellFormedLanguageTagRegExp: RegExp = /^(((en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+))$/i;

/**
 * The regular expression used to test whether or not a language tag is a well-formed language tag. This only accounts for regular language tags.
 */
const wellFormedRegularLanguageTagRegExp: RegExp = /^(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+))$/;

/* tslint:enable:max-line-length */

// LanguageSubtagType -> Utility function mappings.

const isSubtagPrivateUseMap: IsSubtagPrivateUseMap =
    {
        extension: false,
        extlang: false,
        language: IsLanguagePrivateUse,
        privateuse: true,
        region: IsRegionPrivateUse,
        script: IsScriptPrivateUse,
        singleton: IsPrivateUseSingleton,
        variant: false
    };

const isSubtagRegisteredMap: IsSubtagRegisteredMap =
    {
        extension: IsExtensionRegistered,
        extlang: IsExtendedLanguageRegistered,
        language: IsLanguageRegistered,
        privateuse: false,
        region: IsRegionRegistered,
        script: IsScriptRegistered,
        singleton: IsSingletonRegistered,
        variant: IsVariantRegistered
    };

const isSubtagValidMap: IsSubtagValidMap =
    {
        extension: IsExtensionValid,
        extlang: IsExtendedLanguageValid,
        language: IsLanguageValid,
        privateuse: IsPrivateUseValid,
        region: IsRegionValid,
        script: IsScriptValid,
        singleton: IsSingletonValid,
        variant: IsVariantValid
    };

const isSubtagWellFormedMap: IsSubtagWellFormedMap =
    {
        extension: IsExtensionWellFormed,
        extlang: IsExtendedLanguageWellFormed,
        language: IsLanguageWellFormed,
        privateuse: IsPrivateuseWellFormed,
        region: IsRegionWellFormed,
        script: IsScriptWellFormed,
        singleton: IsSingletonWellFormed,
        variant: IsVariantWellFormed
    };

// General tag functions.

/**
 * Determines whether or not the given language tag is a grandfathered tag. As defined by [BCP 47](https://tools.ietf.org/html/bcp47), a grandfathered
 * lanugage tag is a non-redundant tag that was registered during the [RFC 3066](https://tools.ietf.org/html/rfc3066) era. An example of a
 * grandfathered tag is en-GB-oed.
 *
 * @param languageTag The language tag to check if it is a grandfathered tag.
 * @returns Returns whether or not the given language tag is a grandfathered tag.
 */
export function IsGrandfatheredTag(languageTag: string): boolean
{
    return SearchIndex(languageTag, 'grandfathered') !== null;
};

/**
 * Determines whether or not the given language tag is an irregular grandfathered tag. An irregular grandfathered tag is a grandfathered tag that does
 * not follow the well-formedness definitions that apply to regular language tags. An example of an irregular grandfathered tag is `i-ami`.
 *
 * @param languageTag The language tag to check if it is an irregular grandfathered tag.
 * @returns Returns whether or not the given language tag is an irregular grandfathered tag.
 */
export function IsIrregularGrandfatheredTag(languageTag: string): boolean
{
    return IsGrandfatheredTag(languageTag) && !wellFormedRegularLanguageTagRegExp.test(languageTag);
};

/**
 * Determines whether or not the given language tag is a regular grandfathered tag. A regular grandfathered tag is a grandfathered tag that follows
 * the well-formedness definitions that apply to regular language tags. An example of a regular grandfathered tag is `zh-min`.
 *
 * @param languageTag The language tag to check if it is a regular grandfathered tag.
 * @returns Returns whether or not the given language tag is a regular grandfathered tag.
 */
export function IsRegularGrandfatheredTag(languageTag: string): boolean
{
    return IsGrandfatheredTag(languageTag) && wellFormedRegularLanguageTagRegExp.test(languageTag);
};

/**
 * Determines whether or not the given language tag is a well-formed language tag. Note that this does include grandfathered tags in the
 * well-formedness check.
 *
 * @param languageTag The language tag to check if it is a well-formed language tag.
 * @returns Returns whether or not the given language tag is a well-formed language tag,
 */
export function IsTagWellFormed(languageTag: string): boolean
{
    return wellFormedLanguageTagRegExp.test(languageTag);
};

// General subtag functions.

/**
 * Determines whether or not the given language subtag type and subtag is a private use subtag.
 *
 * @param type The type of language subtag that should be used to check if `subtag` is a private use subtag.
 * @param subtag The tag to check if it is a private use subtag.
 * @returns Returns whether or not the given language subtag type and subtag is a private use subtag.
 */
export function IsSubtagPrivateUse(type: LanguageSubtagType, subtag: string): boolean
{
    const IsSubtagPrivateUseFunction: boolean | Function = isSubtagPrivateUseMap[type];
    return typeof IsSubtagPrivateUseFunction === 'boolean' ?
           IsSubtagPrivateUseFunction :
           IsSubtagPrivateUseFunction(subtag);
};

/**
 * Determines whether or not the given language subtag is a registered subtag of type `type`.
 *
 * @param type The type of language subtag that should be used to check if `subtag` is a registered subtag.
 * @param subtag The tag to check if it is a registered subtag.
 * @returns Returns whether or not the given language subtag is a registered subtag of type `type`.
 */
export function IsSubtagRegistered(type: LanguageSubtagType,
                                   subtag: string,
                                   options?: IsExtensionRegisteredOptions | IsSingletonRegisteredOptions): boolean
{
    const IsSubtagRegisteredFunction: boolean | Function = isSubtagRegisteredMap[type];
    return typeof IsSubtagRegisteredFunction === 'boolean' ?
           IsSubtagRegisteredFunction :
           IsSubtagRegisteredFunction(subtag, options);
};

/**
 * Determines whether or not the given language subtag is a valid subtag of type `type`.
 *
 * @param type The type of language subtag that should be used to check if `subtag` is a valid subtag.
 * @param subtag The tag to check if it is a valid subtag.
 * @returns Returns whether or not the given language subtag is a valid subtag of type `type`.
 */
export function IsSubtagValid(type: LanguageSubtagType, subtag: string, options?: IsExtensionValidOptions | IsSingletonValidOptions): boolean
{
    return isSubtagValidMap[type](subtag, options);
};

/**
 * Determines whether or not the given language subtag is a well-formed subtag of type `type`.
 *
 * @param type The type of language subtag that should be used to check if `subtag` is a well-formed subtag.
 * @param subtag The tag to check if it is a well-formed subtag.
 * @returns Returns whether or not the given language subtag is a well-formed subtag of type `type`.
 */
export function IsSubtagWellFormed(type: LanguageSubtagType,
                                   subtag: string,
                                   options?: IsExtensionWellFormedOptions | IsLanguageWellFormedOptions): boolean
{
    return isSubtagWellFormedMap[type](subtag, options);
};

// Re-export registry subtag functions.

export { GetExtensionBySingleton, GetExtensionsBySubtag, IsRegistered as IsExtensionRegistered,
         IsRegisteredOptions as IsExtensionRegisteredOptions, IsValidOptions as IsExtensionValidOptions,
         IsWellFormedOptions as IsExtensionWellFormedOptions, IsValid as IsExtensionValid,
         IsWellFormed as IsExtensionWellFormed } from './registry/extension';
export { IsRegistered as IsExtendedLanguageRegistered, IsValid as IsExtendedLanguageValid,
         IsWellFormed as IsExtendedLanguageWellFormed } from './registry/extlang';
export { IsPrivateUse as IsLanguagePrivateUse, IsRegistered as IsLanguageRegistered,
         IsValid as IsLanguageValid, IsWellFormed as IsLanguageWellFormed,
         IsWellFormedOptions as IsLanguageWellFormedOptions } from './registry/language';
export { GetRecord, GetRecordByIndex, IsRegistryRecordScope, IsRegistryRecordType, RegistryIndexLookUp,
         RegistryRecord, RegistryRecordScope, RegistryRecordType, SearchIndex } from './registry/index';
export { IsValid as IsPrivateUseValid, IsWellFormed as IsPrivateuseWellFormed } from './registry/privateuse';
export { IsPrivateUse as IsRegionPrivateUse, IsPrivateUseRange as IsRegionPrivateUseRange, IsRegistered as IsRegionRegistered,
         IsValid as IsRegionValid, IsWellFormed as IsRegionWellFormed } from './registry/region';
export { IsPrivateUse as IsScriptPrivateUse, IsPrivateUseRange as IsScriptPrivateUseRange, IsRegistered as IsScriptRegistered,
         IsValid as IsScriptValid, IsWellFormed as IsScriptWellFormed } from './registry/script';
export { IsExtensionSingleton, IsPrivateUseSingleton, IsRegistered as IsSingletonRegistered,
         IsRegisteredOptions as IsSingletonRegisteredOptions, IsValid as IsSingletonValid,
         IsValidOptions as IsSingletonValidOptions, IsWellFormed as IsSingletonWellFormed } from './registry/singleton';
export { IsRegistered as IsVariantRegistered, IsValid as IsVariantValid,
         IsWellFormed as IsVariantWellFormed } from './registry/variant';
