/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { GetExtensionBySingleton, GetExtensionsBySubtag,
         IsRegistered, IsValid, IsWellFormed } from '../../source/registry/extension';
import { ExtensionSubtagData, UnicodeExtensionSubtagType } from '../../source/extensions/unicode/UnicodeBaseExtension';
import transformedContentExtension, { TransformedContentExtension } from '../../source/extensions/unicode/TransformedContentExtension';
import unicodeLocaleExtension, { UnicodeLocaleExtension } from '../../source/extensions/unicode/UnicodeLocaleExtension';

/* Test body. */

// Private Interfaces.

interface ExtendedLanguageRegistry
{
    [key: string]: number;
}

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const transformSubtags: ExtensionSubtagData = require('../../data/transform/subtags.json') as ExtensionSubtagData;
const unicodeSubtags: ExtensionSubtagData = require('../../data/unicode/subtags.json') as ExtensionSubtagData;

// Tests.

describe('Subtag - Extension',
    () =>
    {
        describe('.GetExtensionBySingleton',
            () =>
            {
                it('should return the extension by the singleton',
                    () =>
                    {
                        expect(GetExtensionBySingleton('')).to.equal(null);
                        expect(GetExtensionBySingleton('i')).to.equal(null);
                        expect(GetExtensionBySingleton('x')).to.equal(null);
                        expect(GetExtensionBySingleton('unknown singleton')).to.equal(null);
                        expect(GetExtensionBySingleton(TransformedContentExtension.singleton)).to.equal(transformedContentExtension);
                        expect(GetExtensionBySingleton(UnicodeLocaleExtension.singleton)).to.equal(unicodeLocaleExtension);
                    });
            });

        describe('.GetExtensionsBySubtag',
            () =>
            {
                it('should return the extensions by the subtag',
                    () =>
                    {
                        expect(GetExtensionsBySubtag('d0')).to.deep.equal(
                            [
                                transformedContentExtension
                            ]);
                        expect(GetExtensionsBySubtag('DIGIT')).to.deep.equal(
                            [
                                transformedContentExtension
                            ]);
                        expect(GetExtensionsBySubtag('ca')).to.deep.equal(
                            [
                                unicodeLocaleExtension
                            ]);
                        expect(GetExtensionsBySubtag('iso8601')).to.deep.equal(
                            [
                                unicodeLocaleExtension
                            ]);
                    });
            });

        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered extension subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('a')).to.equal(false);
                        expect(IsRegistered('bb')).to.equal(false);
                        expect(IsRegistered('fffFFZ')).to.equal(false);
                        expect(IsRegistered('ZZZZZZZZ')).to.equal(false);
                        expect(IsRegistered('ABC')).to.equal(false);
                        expect(IsRegistered('aaa')).to.equal(false);
                        expect(IsRegistered('PRIVATE_USE')).to.equal(false);
                        expect(IsRegistered('d0')).to.equal(false);
                        expect(IsRegistered('upper')).to.equal(false);
                        expect(IsRegistered('s0')).to.equal(false);
                        expect(IsRegistered('windows')).to.equal(false);
                        expect(IsRegistered('ca')).to.equal(false);
                        expect(IsRegistered('hebrew')).to.equal(false);
                        expect(IsRegistered('em')).to.equal(false);
                        expect(IsRegistered('cccck')).to.equal(false);
                    });

                it('should correctly handle the options.singleton and options.subtagType options',
                    () =>
                    {
                        const TestHelperCreator =
                            function(singleton: string, subtagType?: UnicodeExtensionSubtagType): (subtag: string) => boolean
                            {
                                return function(subtag: string)
                                    {
                                        return IsRegistered(subtag,
                                            {
                                                singleton,
                                                subtagType
                                            });
                                    };
                            };

                        // TransformedContentExtension.

                        let TestHelper: (subtag: string) => boolean = TestHelperCreator(TransformedContentExtension.singleton);

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('PRIVATE_USE')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(true);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(true);
                        expect(TestHelper('windows')).to.equal(true);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'attr');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('PRIVATE_USE')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'key');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('PRIVATE_USE')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(true);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(true);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'type');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(true);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        // UnicodeLocaleExtension.

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton);

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(true);
                        expect(TestHelper('hebrew')).to.equal(true);
                        expect(TestHelper('em')).to.equal(true);
                        expect(TestHelper('cccck')).to.equal(true);

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'attr');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'key');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(true);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(true);
                        expect(TestHelper('cccck')).to.equal(false);

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'type');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(true);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(true);
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid extension subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('a')).to.equal(false);
                        expect(IsValid('bb')).to.equal(false);
                        expect(IsValid('fffFFZ')).to.equal(false);
                        expect(IsValid('ZZZZZZZZ')).to.equal(false);
                        expect(IsValid('ABC')).to.equal(false);
                        expect(IsValid('aaa')).to.equal(false);
                        expect(IsValid('d0')).to.equal(false);
                        expect(IsValid('upper')).to.equal(false);
                        expect(IsValid('s0')).to.equal(false);
                        expect(IsValid('windows')).to.equal(false);
                        expect(IsValid('ca')).to.equal(false);
                        expect(IsValid('hebrew')).to.equal(false);
                        expect(IsValid('em')).to.equal(false);
                        expect(IsValid('cccck')).to.equal(false);
                    });

                it('should correctly handle the options.followsCaseConventions, options.singleton, and options.subtagType options',
                    () =>
                    {
                        const TestHelperCreator =
                            function(singleton: string, subtagType?: UnicodeExtensionSubtagType): (subtag: string, followsCaseConventions?: boolean) => boolean
                            {
                                return function(subtag: string, followsCaseConventions?: boolean)
                                    {
                                        return IsValid(subtag,
                                            {
                                                followsCaseConventions,
                                                singleton,
                                                subtagType
                                            });
                                    };
                            };

                        // TransformedContentExtension.

                        let TestHelper: (subtag: string, followsCaseConventions?: boolean) => boolean = TestHelperCreator(TransformedContentExtension.singleton);

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(true);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                        expect(TestHelper('ABC')).to.equal(true);
                        expect(TestHelper('aaa')).to.equal(true);
                        expect(TestHelper('d0')).to.equal(true);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(true);
                        expect(TestHelper('windows')).to.equal(true);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(true);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(true);

                        expect(TestHelper('d0', true)).to.equal(true);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(true);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(false);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(true);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'attr');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        expect(TestHelper('d0', true)).to.equal(false);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(false);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(false);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(false);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'key');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(true);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(true);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        expect(TestHelper('d0', true)).to.equal(true);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(false);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(false);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(false);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'type');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(true);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                        expect(TestHelper('ABC')).to.equal(true);
                        expect(TestHelper('aaa')).to.equal(true);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(true);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(true);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(true);

                        expect(TestHelper('d0', true)).to.equal(false);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(true);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(false);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(true);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        // UnicodeLocaleExtension.

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton);

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(true);
                        expect(TestHelper('hebrew')).to.equal(true);
                        expect(TestHelper('em')).to.equal(true);
                        expect(TestHelper('cccck')).to.equal(true);

                        expect(TestHelper('d0', true)).to.equal(false);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(false);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(true);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(true);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'attr');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(false);

                        expect(TestHelper('d0', true)).to.equal(false);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(false);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(false);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(false);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'key');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(false);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(true);
                        expect(TestHelper('hebrew')).to.equal(false);
                        expect(TestHelper('em')).to.equal(true);
                        expect(TestHelper('cccck')).to.equal(false);

                        expect(TestHelper('d0', true)).to.equal(false);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(false);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(true);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(false);
                        expect(TestHelper('HEBREW', true)).to.equal(false);

                        TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'type');

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('bb')).to.equal(false);
                        expect(TestHelper('fffFFZ')).to.equal(false);
                        expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('aaa')).to.equal(false);
                        expect(TestHelper('d0')).to.equal(false);
                        expect(TestHelper('upper')).to.equal(true);
                        expect(TestHelper('s0')).to.equal(false);
                        expect(TestHelper('windows')).to.equal(false);
                        expect(TestHelper('ca')).to.equal(false);
                        expect(TestHelper('hebrew')).to.equal(true);
                        expect(TestHelper('em')).to.equal(false);
                        expect(TestHelper('cccck')).to.equal(true);

                        expect(TestHelper('d0', true)).to.equal(false);
                        expect(TestHelper('D0', true)).to.equal(false);
                        expect(TestHelper('windows', true)).to.equal(false);
                        expect(TestHelper('wInDoWs', true)).to.equal(false);
                        expect(TestHelper('ca', true)).to.equal(false);
                        expect(TestHelper('CA', true)).to.equal(false);
                        expect(TestHelper('hebrew', true)).to.equal(true);
                        expect(TestHelper('HEBREW', true)).to.equal(false);
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed extension subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('a')).to.equal(false);
                        expect(IsValid('bb')).to.equal(false);
                        expect(IsValid('fffFFZ')).to.equal(false);
                        expect(IsValid('ZZZZZZZZ')).to.equal(false);
                        expect(IsValid('ABC')).to.equal(false);
                        expect(IsValid('aaa')).to.equal(false);
                        expect(IsValid('d0')).to.equal(false);
                        expect(IsValid('upper')).to.equal(false);
                        expect(IsValid('s0')).to.equal(false);
                        expect(IsValid('windows')).to.equal(false);
                        expect(IsValid('ca')).to.equal(false);
                        expect(IsValid('hebrew')).to.equal(false);
                        expect(IsValid('em')).to.equal(false);
                        expect(IsValid('cccck')).to.equal(false);
                    });

                    it('should correctly handle the options.followsCaseConventions, options.singleton, and options.subtagType options',
                        () =>
                        {
                            const TestHelperCreator =
                                function(singleton: string, subtagType?: UnicodeExtensionSubtagType): (subtag: string, followsCaseConventions?: boolean) => boolean
                                {
                                    return function(subtag: string, followsCaseConventions?: boolean)
                                        {
                                            return IsWellFormed(subtag,
                                                {
                                                    followsCaseConventions,
                                                    singleton,
                                                    subtagType
                                                });
                                        };
                                };

                            // TransformedContentExtension.

                            let TestHelper: (subtag: string, followsCaseConventions?: boolean) => boolean = TestHelperCreator(TransformedContentExtension.singleton);

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(true);
                            expect(TestHelper('fffFFZ')).to.equal(true);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                            expect(TestHelper('ABC')).to.equal(true);
                            expect(TestHelper('aaa')).to.equal(true);
                            expect(TestHelper('d0')).to.equal(true);
                            expect(TestHelper('upper')).to.equal(true);
                            expect(TestHelper('s0')).to.equal(true);
                            expect(TestHelper('windows')).to.equal(true);
                            expect(TestHelper('ca')).to.equal(true);
                            expect(TestHelper('hebrew')).to.equal(true);
                            expect(TestHelper('em')).to.equal(true);
                            expect(TestHelper('cccck')).to.equal(true);

                            expect(TestHelper('d0', true)).to.equal(true);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(true);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(true);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(true);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'attr');

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(false);
                            expect(TestHelper('fffFFZ')).to.equal(true);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                            expect(TestHelper('ABC')).to.equal(true);
                            expect(TestHelper('aaa')).to.equal(true);
                            expect(TestHelper('d0')).to.equal(false);
                            expect(TestHelper('upper')).to.equal(true);
                            expect(TestHelper('s0')).to.equal(false);
                            expect(TestHelper('windows')).to.equal(true);
                            expect(TestHelper('ca')).to.equal(false);
                            expect(TestHelper('hebrew')).to.equal(true);
                            expect(TestHelper('em')).to.equal(false);
                            expect(TestHelper('cccck')).to.equal(true);

                            expect(TestHelper('d0', true)).to.equal(false);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(true);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(false);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(true);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'key');

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(true);
                            expect(TestHelper('fffFFZ')).to.equal(false);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                            expect(TestHelper('ABC')).to.equal(false);
                            expect(TestHelper('aaa')).to.equal(false);
                            expect(TestHelper('d0')).to.equal(true);
                            expect(TestHelper('upper')).to.equal(false);
                            expect(TestHelper('s0')).to.equal(true);
                            expect(TestHelper('windows')).to.equal(false);
                            expect(TestHelper('ca')).to.equal(true);
                            expect(TestHelper('hebrew')).to.equal(false);
                            expect(TestHelper('em')).to.equal(true);
                            expect(TestHelper('cccck')).to.equal(false);

                            expect(TestHelper('d0', true)).to.equal(true);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(false);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(true);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(false);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            TestHelper = TestHelperCreator(TransformedContentExtension.singleton, 'type');

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(false);
                            expect(TestHelper('fffFFZ')).to.equal(true);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                            expect(TestHelper('ABC')).to.equal(true);
                            expect(TestHelper('aaa')).to.equal(true);
                            expect(TestHelper('d0')).to.equal(false);
                            expect(TestHelper('upper')).to.equal(true);
                            expect(TestHelper('s0')).to.equal(false);
                            expect(TestHelper('windows')).to.equal(true);
                            expect(TestHelper('ca')).to.equal(false);
                            expect(TestHelper('hebrew')).to.equal(true);
                            expect(TestHelper('em')).to.equal(false);
                            expect(TestHelper('cccck')).to.equal(true);

                            expect(TestHelper('d0', true)).to.equal(false);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(true);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(false);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(true);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            // UnicodeLocaleExtension.

                            TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton);

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(true);
                            expect(TestHelper('fffFFZ')).to.equal(true);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                            expect(TestHelper('ABC')).to.equal(true);
                            expect(TestHelper('aaa')).to.equal(true);
                            expect(TestHelper('d0')).to.equal(true);
                            expect(TestHelper('upper')).to.equal(true);
                            expect(TestHelper('s0')).to.equal(true);
                            expect(TestHelper('windows')).to.equal(true);
                            expect(TestHelper('ca')).to.equal(true);
                            expect(TestHelper('hebrew')).to.equal(true);
                            expect(TestHelper('em')).to.equal(true);
                            expect(TestHelper('cccck')).to.equal(true);

                            expect(TestHelper('d0', true)).to.equal(true);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(true);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(true);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(true);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'attr');

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(false);
                            expect(TestHelper('fffFFZ')).to.equal(true);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                            expect(TestHelper('ABC')).to.equal(true);
                            expect(TestHelper('aaa')).to.equal(true);
                            expect(TestHelper('d0')).to.equal(false);
                            expect(TestHelper('upper')).to.equal(true);
                            expect(TestHelper('s0')).to.equal(false);
                            expect(TestHelper('windows')).to.equal(true);
                            expect(TestHelper('ca')).to.equal(false);
                            expect(TestHelper('hebrew')).to.equal(true);
                            expect(TestHelper('em')).to.equal(false);
                            expect(TestHelper('cccck')).to.equal(true);

                            expect(TestHelper('d0', true)).to.equal(false);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(true);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(false);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(true);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'key');

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(true);
                            expect(TestHelper('fffFFZ')).to.equal(false);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(false);
                            expect(TestHelper('ABC')).to.equal(false);
                            expect(TestHelper('aaa')).to.equal(false);
                            expect(TestHelper('d0')).to.equal(true);
                            expect(TestHelper('upper')).to.equal(false);
                            expect(TestHelper('s0')).to.equal(true);
                            expect(TestHelper('windows')).to.equal(false);
                            expect(TestHelper('ca')).to.equal(true);
                            expect(TestHelper('hebrew')).to.equal(false);
                            expect(TestHelper('em')).to.equal(true);
                            expect(TestHelper('cccck')).to.equal(false);

                            expect(TestHelper('d0', true)).to.equal(true);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(false);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(true);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(false);
                            expect(TestHelper('HEBREW', true)).to.equal(false);

                            TestHelper = TestHelperCreator(UnicodeLocaleExtension.singleton, 'type');

                            expect(TestHelper('')).to.equal(false);
                            expect(TestHelper('a')).to.equal(false);
                            expect(TestHelper('bb')).to.equal(false);
                            expect(TestHelper('fffFFZ')).to.equal(true);
                            expect(TestHelper('ZZZZZZZZ')).to.equal(true);
                            expect(TestHelper('ABC')).to.equal(true);
                            expect(TestHelper('aaa')).to.equal(true);
                            expect(TestHelper('d0')).to.equal(false);
                            expect(TestHelper('upper')).to.equal(true);
                            expect(TestHelper('s0')).to.equal(false);
                            expect(TestHelper('windows')).to.equal(true);
                            expect(TestHelper('ca')).to.equal(false);
                            expect(TestHelper('hebrew')).to.equal(true);
                            expect(TestHelper('em')).to.equal(false);
                            expect(TestHelper('cccck')).to.equal(true);

                            expect(TestHelper('d0', true)).to.equal(false);
                            expect(TestHelper('D0', true)).to.equal(false);
                            expect(TestHelper('windows', true)).to.equal(true);
                            expect(TestHelper('wInDoWs', true)).to.equal(false);
                            expect(TestHelper('ca', true)).to.equal(false);
                            expect(TestHelper('CA', true)).to.equal(false);
                            expect(TestHelper('hebrew', true)).to.equal(true);
                            expect(TestHelper('HEBREW', true)).to.equal(false);
                        });
            });
    });
