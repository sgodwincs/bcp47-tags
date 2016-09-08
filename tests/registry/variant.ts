/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsRegistered, IsValid, IsWellFormed } from '../../source/registry/variant';

/* Test body. */

// Private Interfaces.

interface VariantRegistry
{
    [key: string]: number;
}

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const variantRegistry: VariantRegistry = require('language-subtag-registry/data/json/variant.json') as VariantRegistry;

// Tests.

describe('Subtag - Variant',
    () =>
    {
        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered variant subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('0')).to.equal(false);
                        expect(IsRegistered('abcd')).to.equal(false);
                        expect(IsRegistered('abcdefghi')).to.equal(false);
                        expect(IsRegistered('a000')).to.equal(false);
                        expect(IsRegistered('abcde')).to.equal(false);
                        expect(IsRegistered('0abc')).to.equal(false);
                        expect(IsRegistered('1901')).to.equal(true);
                    });

                it('should return true for all registered variants',
                    () =>
                    {
                        Object.keys(variantRegistry).forEach(
                            (variant: string): void =>
                            {
                                expect(IsRegistered(variant)).to.equal(true, `Expected "${variant}" to be registered`);
                            });
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid variant subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('0')).to.equal(false);
                        expect(IsValid('abcd')).to.equal(false);
                        expect(IsValid('abcdefghi')).to.equal(false);
                        expect(IsValid('a000')).to.equal(false);
                        expect(IsValid('abcde')).to.equal(false);
                        expect(IsValid('0abc')).to.equal(false);
                        expect(IsValid('1901')).to.equal(true);
                        expect(IsValid('1694acad')).to.equal(true);
                        expect(IsValid('1694ACAD')).to.equal(true);
                    });

                it('should check case conventions options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(variant: string): boolean
                            {
                                return IsValid(variant,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('abcd')).to.equal(false);
                        expect(TestHelper('abcdefghi')).to.equal(false);
                        expect(TestHelper('a000')).to.equal(false);
                        expect(TestHelper('abcde')).to.equal(false);
                        expect(TestHelper('0abc')).to.equal(false);
                        expect(TestHelper('1901')).to.equal(true);
                        expect(TestHelper('1694acad')).to.equal(true);
                        expect(TestHelper('1694ACAD')).to.equal(false);
                    });

                it('should return true for all registered variants',
                    () =>
                    {
                        Object.keys(variantRegistry).forEach(
                            (variant: string): void =>
                            {
                                expect(IsValid(variant)).to.equal(true, `Expected "${variant}" to be valid`);
                            });
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed variant subtag',
                    () =>
                    {
                        expect(IsWellFormed('')).to.equal(false);
                        expect(IsWellFormed('0')).to.equal(false);
                        expect(IsWellFormed('abcd')).to.equal(false);
                        expect(IsWellFormed('abcdefghi')).to.equal(false);
                        expect(IsWellFormed('a000')).to.equal(false);
                        expect(IsWellFormed('abcdef')).to.equal(true);
                        expect(IsWellFormed('ABCDEF')).to.equal(true);
                        expect(IsWellFormed('123456')).to.equal(true);
                        expect(IsWellFormed('0000')).to.equal(true);
                        expect(IsWellFormed('0abc')).to.equal(true);
                        expect(IsWellFormed('0Abc')).to.equal(true);
                    });

                it('should check case conventions when options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(variant: string): boolean
                            {
                                return IsWellFormed(variant,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('abcd')).to.equal(false);
                        expect(TestHelper('abcdefghi')).to.equal(false);
                        expect(TestHelper('a000')).to.equal(false);
                        expect(TestHelper('abcdef')).to.equal(true);
                        expect(TestHelper('ABCDEF')).to.equal(false);
                        expect(TestHelper('123456')).to.equal(true);
                        expect(TestHelper('0000')).to.equal(true);
                        expect(TestHelper('0abc')).to.equal(true);
                        expect(TestHelper('0Abc')).to.equal(false);
                    });

                it('should return true for all registered variants',
                    () =>
                    {
                        Object.keys(variantRegistry).forEach(
                            (variant: string): void =>
                            {
                                expect(IsWellFormed(variant)).to.equal(true, `Expected "${variant}" to be well-formed`);
                            });
                    });
            });
    });
