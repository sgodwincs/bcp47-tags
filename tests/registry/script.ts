/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsPrivateUse, IsPrivateUseRange, IsRegistered, IsValid, IsWellFormed } from '../../source/registry/script';

/* Test body. */

// Private Interfaces.

interface ScriptRegistry
{
    [key: string]: number;
}

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const scriptRegistry: ScriptRegistry = require('language-subtag-registry/data/json/script.json') as ScriptRegistry;

// Tests.

describe('Subtag - Script',
    () =>
    {
        describe('.IsPrivateUse',
            () =>
            {
                it('should return whether or not the script is private use',
                    () =>
                    {
                        expect(IsPrivateUse('')).to.equal(false);
                        expect(IsPrivateUse('abcd')).to.equal(false);
                        expect(IsPrivateUse('qaaaa')).to.equal(false);
                        expect(IsPrivateUse('qaaa ')).to.equal(false);
                        expect(IsPrivateUse('pzzz')).to.equal(false);
                        expect(IsPrivateUse('qaby')).to.equal(false);
                        expect(IsPrivateUse('qaaa..qabx')).to.equal(false);
                        expect(IsPrivateUse('qaaa')).to.equal(true);
                        expect(IsPrivateUse('QAAA')).to.equal(true);
                        expect(IsPrivateUse('qaac')).to.equal(true);
                        expect(IsPrivateUse('qaba')).to.equal(true);
                        expect(IsPrivateUse('qabx')).to.equal(true);
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
                        expect(IsPrivateUseRange('qaaa..qabx')).to.equal(true);
                        expect(IsPrivateUseRange('QAAA..QABX')).to.equal(true);
                    });
            });

        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered script subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('0000')).to.equal(false);
                        expect(IsRegistered('abc')).to.equal(false);
                        expect(IsRegistered('abcde')).to.equal(false);
                        expect(IsRegistered('abc0')).to.equal(false);
                        expect(IsRegistered('abcd')).to.equal(false);
                        expect(IsRegistered('ABCD')).to.equal(false);
                        expect(IsRegistered('qaaa..qabx')).to.equal(false);
                        expect(IsRegistered('qabc')).to.equal(false);
                        expect(IsRegistered('zzzz')).to.equal(true);
                        expect(IsRegistered('ZZZZ')).to.equal(true);
                        expect(IsRegistered('Zzzz')).to.equal(true);
                    });

                it('should return true for all registered scripts',
                    () =>
                    {
                        Object.keys(scriptRegistry).forEach(
                            (script: string): void =>
                            {
                                expect(IsRegistered(script)).to.equal(!IsPrivateUseRange(script),
                                       `Expected "${script}" to${IsPrivateUseRange(script) ? '' : ' not'} be registered`);
                            });
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid script subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('0000')).to.equal(false);
                        expect(IsValid('abc')).to.equal(false);
                        expect(IsValid('abcde')).to.equal(false);
                        expect(IsValid('abc0')).to.equal(false);
                        expect(IsValid('abcd')).to.equal(false);
                        expect(IsValid('ABCD')).to.equal(false);
                        expect(IsValid('qaaa..qabx')).to.equal(false);
                        expect(IsValid('zzzz')).to.equal(true);
                        expect(IsValid('ZZZZ')).to.equal(true);
                    });

                it('should check case conventions options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(script: string): boolean
                            {
                                return IsValid(script,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0000')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('abcde')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('abcd')).to.equal(false);
                        expect(TestHelper('ABCD')).to.equal(false);
                        expect(TestHelper('qaaa..qabx')).to.equal(false);
                        expect(TestHelper('qabc')).to.equal(false);
                        expect(TestHelper('zzzz')).to.equal(false);
                        expect(TestHelper('ZZZZ')).to.equal(false);
                        expect(TestHelper('Zzzz')).to.equal(true);
                    });

                it('should return true for all registered scripts',
                    () =>
                    {
                        Object.keys(scriptRegistry).forEach(
                            (script: string): void =>
                            {
                                expect(IsValid(script)).to.equal(!IsPrivateUseRange(script),
                                       `Expected "${script}" to${IsPrivateUseRange(script) ? '' : ' not'} be valid`);
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
                        expect(IsWellFormed('0000')).to.equal(false);
                        expect(IsWellFormed('abc')).to.equal(false);
                        expect(IsWellFormed('abcde')).to.equal(false);
                        expect(IsWellFormed('abc0')).to.equal(false);
                        expect(IsWellFormed('abcd')).to.equal(true);
                        expect(IsWellFormed('ABCD')).to.equal(true);
                        expect(IsWellFormed('Abcd')).to.equal(true);
                    });

                it('should check case conventions when options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(script: string): boolean
                            {
                                return IsWellFormed(script,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0000')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('abcde')).to.equal(false);
                        expect(TestHelper('abc0')).to.equal(false);
                        expect(TestHelper('abcd')).to.equal(false);
                        expect(TestHelper('ABCD')).to.equal(false);
                        expect(TestHelper('Abcd')).to.equal(true);
                    });

                it('should return true for all registered scripts',
                    () =>
                    {
                        Object.keys(scriptRegistry).forEach(
                            (script: string): void =>
                            {
                                expect(IsWellFormed(script)).to.equal(!IsPrivateUseRange(script),
                                       `Expected "${script}" to${IsPrivateUseRange(script) ? '' : ' not'} be well-formed`);
                            });
                    });
            });
    });
