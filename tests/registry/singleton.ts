/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsExtensionSingleton, IsGrandfatheredSingleton, IsPrivateUseSingleton,
         IsRegistered, IsValid, IsWellFormed } from '../../source/registry/singleton';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('Subtag - Singleton',
    () =>
    {
        describe('.IsExtensionSingleton',
            () =>
            {
                it('should return whether or not the singleton is an extension singleton',
                    () =>
                    {
                        expect(IsExtensionSingleton('')).to.equal(false);
                        expect(IsExtensionSingleton('0')).to.equal(false);
                        expect(IsExtensionSingleton('m')).to.equal(false);
                        expect(IsExtensionSingleton('i')).to.equal(false);
                        expect(IsExtensionSingleton('I')).to.equal(false);
                        expect(IsExtensionSingleton('x')).to.equal(false);
                        expect(IsExtensionSingleton('X')).to.equal(false);
                        expect(IsExtensionSingleton('t')).to.equal(true);
                        expect(IsExtensionSingleton('T')).to.equal(true);
                        expect(IsExtensionSingleton('u')).to.equal(true);
                        expect(IsExtensionSingleton('U')).to.equal(true);
                    });
            });

        describe('.IsGrandfatheredSingleton',
            () =>
            {
                it('should return whether or not the singleton is the grandfathered singleton',
                    () =>
                    {
                        expect(IsGrandfatheredSingleton('')).to.equal(false);
                        expect(IsGrandfatheredSingleton('0')).to.equal(false);
                        expect(IsGrandfatheredSingleton('m')).to.equal(false);
                        expect(IsGrandfatheredSingleton('i')).to.equal(true);
                        expect(IsGrandfatheredSingleton('I')).to.equal(true);
                        expect(IsGrandfatheredSingleton('x')).to.equal(false);
                        expect(IsGrandfatheredSingleton('X')).to.equal(false);
                        expect(IsGrandfatheredSingleton('t')).to.equal(false);
                        expect(IsGrandfatheredSingleton('T')).to.equal(false);
                        expect(IsGrandfatheredSingleton('u')).to.equal(false);
                        expect(IsGrandfatheredSingleton('U')).to.equal(false);
                    });
            });

        describe('.IsPrivateUseSingleton',
            () =>
            {
                it('should return whether or not the singleton is the private use singleton',
                    () =>
                    {
                        expect(IsPrivateUseSingleton('')).to.equal(false);
                        expect(IsPrivateUseSingleton('0')).to.equal(false);
                        expect(IsPrivateUseSingleton('m')).to.equal(false);
                        expect(IsPrivateUseSingleton('i')).to.equal(false);
                        expect(IsPrivateUseSingleton('I')).to.equal(false);
                        expect(IsPrivateUseSingleton('x')).to.equal(true);
                        expect(IsPrivateUseSingleton('X')).to.equal(true);
                        expect(IsPrivateUseSingleton('t')).to.equal(false);
                        expect(IsPrivateUseSingleton('T')).to.equal(false);
                        expect(IsPrivateUseSingleton('u')).to.equal(false);
                        expect(IsPrivateUseSingleton('U')).to.equal(false);
                    });
            });

        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered singleton subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('0')).to.equal(false);
                        expect(IsRegistered('m')).to.equal(false);
                        expect(IsRegistered('i')).to.equal(false);
                        expect(IsRegistered('I')).to.equal(false);
                        expect(IsRegistered('x')).to.equal(false);
                        expect(IsRegistered('X')).to.equal(false);
                        expect(IsRegistered('t')).to.equal(true);
                        expect(IsRegistered('T')).to.equal(true);
                        expect(IsRegistered('u')).to.equal(true);
                        expect(IsRegistered('U')).to.equal(true);
                        expect(IsRegistered('abc')).to.equal(false);
                        expect(IsRegistered('123')).to.equal(false);
                    });

                it('should correctly handle options.includeExtensions',
                    () =>
                    {
                        const TestHelper =
                            function(singleton: string): boolean
                            {
                                return IsRegistered(singleton,
                                    {
                                        includeExtensions: true,
                                        includeGrandfathered: false,
                                        includePrivateUse: false
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('m')).to.equal(false);
                        expect(TestHelper('i')).to.equal(false);
                        expect(TestHelper('I')).to.equal(false);
                        expect(TestHelper('x')).to.equal(false);
                        expect(TestHelper('X')).to.equal(false);
                        expect(TestHelper('t')).to.equal(true);
                        expect(TestHelper('T')).to.equal(true);
                        expect(TestHelper('u')).to.equal(true);
                        expect(TestHelper('U')).to.equal(true);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                    });

                it('should correctly handle options.includeGrandfathered',
                    () =>
                    {
                        const TestHelper =
                            function(singleton: string): boolean
                            {
                                return IsRegistered(singleton,
                                    {
                                        includeExtensions: false,
                                        includeGrandfathered: true,
                                        includePrivateUse: false
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('m')).to.equal(false);
                        expect(TestHelper('i')).to.equal(true);
                        expect(TestHelper('I')).to.equal(true);
                        expect(TestHelper('x')).to.equal(false);
                        expect(TestHelper('X')).to.equal(false);
                        expect(TestHelper('t')).to.equal(false);
                        expect(TestHelper('T')).to.equal(false);
                        expect(TestHelper('u')).to.equal(false);
                        expect(TestHelper('U')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                    });

                it('should correctly handle options.includePrivateUse',
                    () =>
                    {
                        const TestHelper =
                            function(singleton: string): boolean
                            {
                                return IsRegistered(singleton,
                                    {
                                        includeExtensions: false,
                                        includeGrandfathered: false,
                                        includePrivateUse: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('m')).to.equal(false);
                        expect(TestHelper('i')).to.equal(false);
                        expect(TestHelper('I')).to.equal(false);
                        expect(TestHelper('x')).to.equal(true);
                        expect(TestHelper('X')).to.equal(true);
                        expect(TestHelper('t')).to.equal(false);
                        expect(TestHelper('T')).to.equal(false);
                        expect(TestHelper('u')).to.equal(false);
                        expect(TestHelper('U')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                    });

                it('should return false when all singleton options are false',
                    () =>
                    {
                        const TestHelper =
                            function(singleton: string): boolean
                            {
                                return IsRegistered(singleton,
                                    {
                                        includeExtensions: false,
                                        includeGrandfathered: false,
                                        includePrivateUse: false
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('m')).to.equal(false);
                        expect(TestHelper('i')).to.equal(false);
                        expect(TestHelper('I')).to.equal(false);
                        expect(TestHelper('x')).to.equal(false);
                        expect(TestHelper('X')).to.equal(false);
                        expect(TestHelper('t')).to.equal(false);
                        expect(TestHelper('T')).to.equal(false);
                        expect(TestHelper('u')).to.equal(false);
                        expect(TestHelper('U')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid singleton subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('0')).to.equal(false);
                        expect(IsValid('m')).to.equal(false);
                        expect(IsValid('i')).to.equal(false);
                        expect(IsValid('I')).to.equal(false);
                        expect(IsValid('x')).to.equal(true);
                        expect(IsValid('X')).to.equal(true);
                        expect(IsValid('t')).to.equal(true);
                        expect(IsValid('T')).to.equal(true);
                        expect(IsValid('u')).to.equal(true);
                        expect(IsValid('U')).to.equal(true);
                        expect(IsValid('abc')).to.equal(false);
                        expect(IsValid('123')).to.equal(false);
                    });

                it('should correctly handle options.strict',
                    () =>
                    {
                        const TestHelper =
                            function(singleton: string): boolean
                            {
                                return IsValid(singleton,
                                    {
                                        strict: false
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(true);
                        expect(TestHelper('m')).to.equal(true);
                        expect(TestHelper('i')).to.equal(true);
                        expect(TestHelper('I')).to.equal(true);
                        expect(TestHelper('x')).to.equal(true);
                        expect(TestHelper('X')).to.equal(true);
                        expect(TestHelper('t')).to.equal(true);
                        expect(TestHelper('T')).to.equal(true);
                        expect(TestHelper('u')).to.equal(true);
                        expect(TestHelper('U')).to.equal(true);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed script subtag',
                    () =>
                    {
                        expect(IsWellFormed('')).to.equal(false);
                        expect(IsWellFormed('0')).to.equal(true);
                        expect(IsWellFormed('m')).to.equal(true);
                        expect(IsWellFormed('i')).to.equal(true);
                        expect(IsWellFormed('I')).to.equal(true);
                        expect(IsWellFormed('x')).to.equal(true);
                        expect(IsWellFormed('X')).to.equal(true);
                        expect(IsWellFormed('t')).to.equal(true);
                        expect(IsWellFormed('T')).to.equal(true);
                        expect(IsWellFormed('u')).to.equal(true);
                        expect(IsWellFormed('U')).to.equal(true);
                        expect(IsWellFormed('abc')).to.equal(false);
                        expect(IsWellFormed('123')).to.equal(false);
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
                        expect(TestHelper('0')).to.equal(true);
                        expect(TestHelper('m')).to.equal(true);
                        expect(TestHelper('i')).to.equal(true);
                        expect(TestHelper('I')).to.equal(false);
                        expect(TestHelper('x')).to.equal(true);
                        expect(TestHelper('X')).to.equal(false);
                        expect(TestHelper('t')).to.equal(true);
                        expect(TestHelper('T')).to.equal(false);
                        expect(TestHelper('u')).to.equal(true);
                        expect(TestHelper('U')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                    });
            });
    });
