/* Module dependencies. */

// External.

// Internal.

import UnicodeBaseExtension from './UnicodeBaseExtension';

/* Module body. */

// Class definition.

/**
 * Extension definition for the Unicode locale extension.
 */
export class UnicodeLocaleExtension extends UnicodeBaseExtension
{
    /**
     * The data path relative to the `data` directory that points towards the directory that contains the data required for this extension.
     */
    public static readonly dataPath: string = 'unicode';

    /*
     * The singleton that this extension is defined by. Every extension subtag under this extension will always follow this singleton within the
     * language tag.
     */
    public static readonly singleton: string = 'u';

    /**
     * Initializes base classes.
     */
    public constructor()
    {
        super(UnicodeLocaleExtension.singleton, UnicodeLocaleExtension.dataPath);
    }

    /**
     * Utility method for determining whether or not the given string is the [[TransformedContentExtension]]'s singleton.
     *
     * @param singleton The potential singleton string to check.
     * @returns Returns whether or not the given string is the [[TransformedContentExtension]]'s singleton.
     */
    public static IsExtensionSingleton(singleton: string): boolean
    {
        return singleton.toLowerCase() === UnicodeLocaleExtension.singleton;
    }
};

export default new UnicodeLocaleExtension();
