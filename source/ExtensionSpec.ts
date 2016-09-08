/* Module dependencies. */

// External.

import * as assert from 'power-assert';

// Internal.

import LanguageTag from './LanguageTag';
import { IsWellFormed as IsSingletonWellFormed } from './registry/singleton';

/* Module body. */

// Public interfaces.

/**
 * Options to be passed to an extension's [[ExtensionSpec.IsExtensionSubtagRegistered]] method.
 */
export interface IsExtensionSubtagRegisteredOptions { }

/**
 * Options to be passed to an extension's [[ExtensionSpec.IsExtensionSubtagValid]] method.
 */
export interface IsExtensionSubtagValidOptions extends IsExtensionSubtagRegisteredOptions, IsExtensionSubtagWellFormedOptions { }

/**
 * Options to be passed to an extension's [[ExtensionSpec.IsExtensionSubtagWellFormed]] method.
 */
export interface IsExtensionSubtagWellFormedOptions
{
    /**
     * Determines whether or not case conventions should be considered when performing the well-formedness check. Extension subtag case conventions
     * require that all characters be lowercase, though extensions may specify stricter requirements.
     *
     * The default value is `false`.
     */
    followsCaseConventions?: boolean;
}

// Class definition.

/**
 * An abstract class for defining extensions. All extensions should extend this class and implement the required methods.
 */
abstract class ExtensionSpec
{
    /**
     * The singleton that this extension is defined by. Every extension subtag under this extension will always follow this singleton within the
     * language tag.
     */
    protected singleton: string;

    /**
     * Initializes the singleton property and ensures that it is a well-formed singleton using [[IsSingletonWellFormed]].
     *
     * @param singleton The singleton that will define the extension.
     */
    public constructor(singleton: string)
    {
        assert(IsSingletonWellFormed(singleton), 'ExtensionSpec constructor argument "singleton" must be a well-formed singleton subtag.');

        this.singleton = singleton;
    }

    /**
     * Getter method for the extension singleton.
     *
     * @returns Returns the extension singleton.
     */
    public GetSingleton(): string
    {
        return this.singleton;
    }

    /**
     * Determines whether or not the given subtag string is registered as one of this extension's subtags. This is to be implemented by the extending
     * extension.
     *
     * @param languageSubtag The language subtag string to test for registration.
     * @param options Options to be passed to the extension for greater control over the check.
     * @returns Returns whether or not the subtag is registered.
     */
    public abstract IsExtensionSubtagRegistered(languageSubtag: string, options?: IsExtensionSubtagRegisteredOptions): boolean;

    /**
     * Determines whether or not the given subtag string is valid as defined by the extending extension. This is to be implemented by the extending
     * extension.
     *
     * @param languageSubtag The language subtag stirng to test for validity.
     * @param options Options to be passed to the extension for greater control over the check.
     * @returns Returns whether or not the subtag is valid.
     */
    public abstract IsExtensionSubtagValid(languageSubtag: string, options?: IsExtensionSubtagValidOptions): boolean;

    /**
     * Determines whether or not the given subtag string is well-formed as defined by the extending extension. This is to be implemented by the
     * extending extension.
     *
     * @param languageSubtag The language subtag string to test for well-formedness.
     * @param options Options to be passed to the extension for greater control over the check.
     * @returns Returns whether or not the subtag is well-formed.
     */
    public abstract IsExtensionSubtagWellFormed(languageSubtag: string, options?: IsExtensionSubtagWellFormedOptions): boolean;
};

export default ExtensionSpec;
