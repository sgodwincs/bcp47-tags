/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsRegistered, IsValid, IsWellFormed } from '../../source/registry/extlang';

/* Test body. */

// Private Interfaces.

interface ExtendedLanguageRegistry
{
    [key: string]: number;
}

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const extendedLanguageRegistry: ExtendedLanguageRegistry = require('language-subtag-registry/data/json/extlang.json') as ExtendedLanguageRegistry;

// Tests.

describe('Subtag - Extended Language',
    () =>
    {
        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered extended language subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('0')).to.equal(false);
                        expect(IsRegistered('ab')).to.equal(false);
                        expect(IsRegistered('abcd')).to.equal(false);
                        expect(IsRegistered('ABCD')).to.equal(false);
                        expect(IsRegistered('123')).to.equal(false);
                        expect(IsRegistered('abc')).to.equal(false);
                        expect(IsRegistered('aao')).to.equal(true);
                        expect(IsRegistered('ssr')).to.equal(true);
                        expect(IsRegistered('AAO')).to.equal(true);
                    });

                it('should return true for all registered extended languages',
                    () =>
                    {
                        Object.keys(extendedLanguageRegistry).forEach(
                            (extendedLanguage: string): void =>
                            {
                                expect(IsRegistered(extendedLanguage)).to.equal(true, `Expected "${extendedLanguage}" to be registered`);
                            });
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid extended language subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('0')).to.equal(false);
                        expect(IsValid('ab')).to.equal(false);
                        expect(IsValid('abcd')).to.equal(false);
                        expect(IsValid('ABCD')).to.equal(false);
                        expect(IsValid('123')).to.equal(false);
                        expect(IsValid('abc')).to.equal(false);
                        expect(IsValid('aao')).to.equal(true);
                        expect(IsValid('ssr')).to.equal(true);
                        expect(IsValid('AAO')).to.equal(true);
                    });

                it('should check case conventions options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(extendedLanguage: string): boolean
                            {
                                return IsValid(extendedLanguage,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('ab')).to.equal(false);
                        expect(TestHelper('abcd')).to.equal(false);
                        expect(TestHelper('ABCD')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('aao')).to.equal(true);
                        expect(TestHelper('ssr')).to.equal(true);
                        expect(TestHelper('AAO')).to.equal(false);
                    });

                it('should return true for all registered extended languages',
                    () =>
                    {
                        Object.keys(extendedLanguageRegistry).forEach(
                            (extendedLanguage: string): void =>
                            {
                                expect(IsValid(extendedLanguage)).to.equal(true, `Expected "${extendedLanguage}" to be valid`);
                            });
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed extended language subtag',
                    () =>
                    {
                        expect(IsWellFormed('')).to.equal(false);
                        expect(IsWellFormed('0')).to.equal(false);
                        expect(IsWellFormed('ab')).to.equal(false);
                        expect(IsWellFormed('abcd')).to.equal(false);
                        expect(IsWellFormed('ABCD')).to.equal(false);
                        expect(IsWellFormed('123')).to.equal(false);
                        expect(IsWellFormed('abc')).to.equal(true);
                        expect(IsWellFormed('ABC')).to.equal(true);
                        expect(IsWellFormed('xYZ')).to.equal(true);
                    });

                it('should check case conventions when options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(extendedLanguage: string): boolean
                            {
                                return IsWellFormed(extendedLanguage,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('ab')).to.equal(false);
                        expect(TestHelper('abcd')).to.equal(false);
                        expect(TestHelper('ABCD')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(true);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('xYZ')).to.equal(false);
                    });

                it('should return true for all registered extended languages',
                    () =>
                    {
                        Object.keys(extendedLanguageRegistry).forEach(
                            (extendedLanguage: string): void =>
                            {
                                expect(IsWellFormed(extendedLanguage)).to.equal(true, `Expected "${extendedLanguage}" to be well-formed`);
                            });
                    });
            });
    });
