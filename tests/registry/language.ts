/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsPrivateUse, IsPrivateUseRange, IsRegistered,
         IsValid, IsWellFormed, MapPrivateUseToRegistered } from '../../source/registry/language';

/* Test body. */

// Private Interfaces.

interface LanguageRegistry
{
    [key: string]: number;
}

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const languageRegistry: LanguageRegistry = require('language-subtag-registry/data/json/language.json') as LanguageRegistry;

// Tests.

describe('Subtag - Language',
    () =>
    {
        describe('.IsPrivateUse',
            () =>
            {
                it('should return whether or not the language is private use',
                    () =>
                    {
                        expect(IsPrivateUse('')).to.equal(false);
                        expect(IsPrivateUse('abc')).to.equal(false);
                        expect(IsPrivateUse('qaaa')).to.equal(false);
                        expect(IsPrivateUse('qa')).to.equal(false);
                        expect(IsPrivateUse('qua')).to.equal(false);
                        expect(IsPrivateUse('qaa..qtz')).to.equal(false);
                        expect(IsPrivateUse('qaa')).to.equal(true);
                        expect(IsPrivateUse('QAA')).to.equal(true);
                        expect(IsPrivateUse('qaz')).to.equal(true);
                        expect(IsPrivateUse('Qha')).to.equal(true);
                        expect(IsPrivateUse('qtz')).to.equal(true);
                    });
            });

        describe('.IsPrivateUseRange',
            () =>
            {
                it('should return whether or not the range is the private use range',
                    () =>
                    {
                        expect(IsPrivateUseRange('')).to.equal(false);
                        expect(IsPrivateUseRange('abcd')).to.equal(false);
                        expect(IsPrivateUseRange('qaa..qtz')).to.equal(true);
                        expect(IsPrivateUseRange('QAA..QTZ')).to.equal(true);
                    });
            });

        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered language subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('00')).to.equal(false);
                        expect(IsRegistered('abcdefgh')).to.equal(false);
                        expect(IsRegistered('abc0')).to.equal(false);
                        expect(IsRegistered('a9')).to.equal(false);
                        expect(IsRegistered('ZZZ')).to.equal(false);
                        expect(IsRegistered('qaa..qtz')).to.equal(false);
                        expect(IsRegistered('en')).to.equal(true);
                        expect(IsRegistered('EN')).to.equal(true);
                        expect(IsRegistered('jA')).to.equal(true);
                        expect(IsRegistered('Ja')).to.equal(true);
                        expect(IsRegistered('qab')).to.equal(false);
                    });

                it('should return true for all registered languages',
                    () =>
                    {
                        Object.keys(languageRegistry).forEach(
                            (language: string): void =>
                            {
                                expect(IsRegistered(language)).to.equal(!IsPrivateUseRange(language),
                                       `Expected "${language}" to${IsPrivateUseRange(language) ? '' : ' not'} be registered`);
                            });
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid language subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('00')).to.equal(false);
                        expect(IsValid('abcdefgh')).to.equal(false);
                        expect(IsValid('abc0')).to.equal(false);
                        expect(IsValid('a9')).to.equal(false);
                        expect(IsValid('ZZZ')).to.equal(false);
                        expect(IsValid('qaa..qtz')).to.equal(false);
                        expect(IsValid('en')).to.equal(true);
                        expect(IsValid('EN')).to.equal(true);
                        expect(IsValid('jA')).to.equal(true);
                        expect(IsValid('Ja')).to.equal(true);
                        expect(IsValid('qab')).to.equal(true);
                    });

                it('should check case conventions options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(language: string): boolean
                            {
                                return IsValid(language,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('abcdefgh')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('a9')).to.equal(false);
                        expect(TestHelper('ZZZ')).to.equal(false);
                        expect(TestHelper('qaa..qtz')).to.equal(false);
                        expect(TestHelper('en')).to.equal(true);
                        expect(TestHelper('EN')).to.equal(false);
                        expect(TestHelper('jA')).to.equal(false);
                        expect(TestHelper('Ja')).to.equal(false);
                        expect(TestHelper('qab')).to.equal(true);
                    });

                it('should check assuming a extended language follows when options.usingExtendedLanguage is true',
                    () =>
                    {
                        const TestHelper =
                            function(language: string): boolean
                            {
                                return IsValid(language,
                                    {
                                        usingExtendedLanguage: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('abcdefgh')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('a9')).to.equal(false);
                        expect(TestHelper('ZZZ')).to.equal(false);
                        expect(TestHelper('qaa..qtz')).to.equal(false);
                        expect(TestHelper('en')).to.equal(true);
                        expect(TestHelper('EN')).to.equal(true);
                        expect(TestHelper('jA')).to.equal(true);
                        expect(TestHelper('Ja')).to.equal(true);
                        expect(TestHelper('qab')).to.equal(true);
                    });

                it('should correctly check validity when options.followsCaseConventions and options.usingExtendedLanguage are true',
                    () =>
                    {
                        const TestHelper =
                            function(language: string): boolean
                            {
                                return IsValid(language,
                                    {
                                        followsCaseConventions: true,
                                        usingExtendedLanguage: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('abcdefgh')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('a9')).to.equal(false);
                        expect(TestHelper('ZZZ')).to.equal(false);
                        expect(TestHelper('qaa..qtz')).to.equal(false);
                        expect(TestHelper('en')).to.equal(true);
                        expect(TestHelper('EN')).to.equal(false);
                        expect(TestHelper('jA')).to.equal(false);
                        expect(TestHelper('Ja')).to.equal(false);
                        expect(TestHelper('qab')).to.equal(true);
                    });

                it('should return true for all registered languages',
                    () =>
                    {
                        Object.keys(languageRegistry).forEach(
                            (language: string): void =>
                            {
                                expect(IsValid(language)).to.equal(!IsPrivateUseRange(language),
                                       `Expected "${language}" to${IsPrivateUseRange(language) ? '' : ' not'} be valid`);
                            });
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed script subtag',
                    () =>
                    {
                        expect(IsWellFormed('')).to.equal(false);
                        expect(IsWellFormed('00')).to.equal(false);
                        expect(IsWellFormed('abcdefgh')).to.equal(true);
                        expect(IsWellFormed('abc0')).to.equal(false);
                        expect(IsWellFormed('a9')).to.equal(false);
                        expect(IsWellFormed('ZZZ')).to.equal(true);
                        expect(IsWellFormed('qaa..qtz')).to.equal(false);
                        expect(IsWellFormed('en')).to.equal(true);
                        expect(IsWellFormed('EN')).to.equal(true);
                        expect(IsWellFormed('jA')).to.equal(true);
                        expect(IsWellFormed('Ja')).to.equal(true);
                        expect(IsWellFormed('qab')).to.equal(true);
                    });

                it('should check case conventions when options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(language: string): boolean
                            {
                                return IsWellFormed(language,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('abcdefgh')).to.equal(true);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('a9')).to.equal(false);
                        expect(TestHelper('ZZZ')).to.equal(false);
                        expect(TestHelper('qaa..qtz')).to.equal(false);
                        expect(TestHelper('en')).to.equal(true);
                        expect(TestHelper('EN')).to.equal(false);
                        expect(TestHelper('jA')).to.equal(false);
                        expect(TestHelper('Ja')).to.equal(false);
                        expect(TestHelper('qab')).to.equal(true);
                    });

                it('should check assuming a extended language follows when options.usingExtendedLanguage is true',
                    () =>
                    {
                        const TestHelper =
                            function(language: string): boolean
                            {
                                return IsWellFormed(language,
                                    {
                                        usingExtendedLanguage: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('abcdefgh')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('a9')).to.equal(false);
                        expect(TestHelper('ZZZ')).to.equal(true);
                        expect(TestHelper('qaa..qtz')).to.equal(false);
                        expect(TestHelper('en')).to.equal(true);
                        expect(TestHelper('EN')).to.equal(true);
                        expect(TestHelper('jA')).to.equal(true);
                        expect(TestHelper('Ja')).to.equal(true);
                        expect(TestHelper('qab')).to.equal(true);
                    });

                it('should correctly check well-formedness when options.followsCaseConventions and options.usingExtendedLanguage are true',
                    () =>
                    {
                        const TestHelper =
                            function(language: string): boolean
                            {
                                return IsWellFormed(language,
                                    {
                                        followsCaseConventions: true,
                                        usingExtendedLanguage: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('abcdefgh')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('a9')).to.equal(false);
                        expect(TestHelper('ZZZ')).to.equal(false);
                        expect(TestHelper('qaa..qtz')).to.equal(false);
                        expect(TestHelper('en')).to.equal(true);
                        expect(TestHelper('EN')).to.equal(false);
                        expect(TestHelper('jA')).to.equal(false);
                        expect(TestHelper('Ja')).to.equal(false);
                        expect(TestHelper('qab')).to.equal(true);
                    });

                it('should return true for all registered languages',
                    () =>
                    {
                        Object.keys(languageRegistry).forEach(
                            (language: string): void =>
                            {
                                expect(IsWellFormed(language)).to.equal(!IsPrivateUseRange(language),
                                       `Expected "${language}" to${IsPrivateUseRange(language) ? '' : ' not'} be well-formed`);
                            });
                    });
            });

        describe('.MapPrivateUseToRegistered',
            () =>
            {
                it('should map the subtag to the correct registered private use subtag',
                    () =>
                    {
                        expect(MapPrivateUseToRegistered('')).to.equal(null);
                        expect(MapPrivateUseToRegistered('abc')).to.equal(null);
                        expect(MapPrivateUseToRegistered('qaaa')).to.equal(null);
                        expect(MapPrivateUseToRegistered('qa')).to.equal(null);
                        expect(MapPrivateUseToRegistered('qua')).to.equal(null);
                        expect(MapPrivateUseToRegistered('qaa..qtz')).to.equal(null);
                        expect(MapPrivateUseToRegistered('qaa')).to.equal('qaa..qtz');
                        expect(MapPrivateUseToRegistered('QAA')).to.equal('qaa..qtz');
                        expect(MapPrivateUseToRegistered('qaz')).to.equal('qaa..qtz');
                        expect(MapPrivateUseToRegistered('Qha')).to.equal('qaa..qtz');
                        expect(MapPrivateUseToRegistered('qtz')).to.equal('qaa..qtz');
                    });
            });
    });
