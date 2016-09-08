/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsValid, IsWellFormed } from '../../source/registry/privateuse';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('Subtag - Private Use',
    () =>
    {
        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid private use subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('abcdefghi')).to.equal(false);
                        expect(IsValid('123abc456')).to.equal(false);
                        expect(IsValid('a')).to.equal(true);
                        expect(IsValid('0')).to.equal(true);
                        expect(IsValid('abcdefgh')).to.equal(true);
                        expect(IsValid('12345678')).to.equal(true);
                        expect(IsValid('0a1b2')).to.equal(true);
                        expect(IsValid('ABC123')).to.equal(true);
                    });

                it('should check case conventions options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(privateUse: string): boolean
                            {
                                return IsValid(privateUse,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('abcdefghi')).to.equal(false);
                        expect(TestHelper('123abc456')).to.equal(false);
                        expect(TestHelper('a')).to.equal(true);
                        expect(TestHelper('0')).to.equal(true);
                        expect(TestHelper('abcdefgh')).to.equal(true);
                        expect(TestHelper('12345678')).to.equal(true);
                        expect(TestHelper('0a1b2')).to.equal(true);
                        expect(TestHelper('ABC123')).to.equal(false);
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed private use subtag',
                    () =>
                    {
                        expect(IsWellFormed('')).to.equal(false);
                        expect(IsWellFormed('abcdefghi')).to.equal(false);
                        expect(IsWellFormed('123abc456')).to.equal(false);
                        expect(IsWellFormed('a')).to.equal(true);
                        expect(IsWellFormed('0')).to.equal(true);
                        expect(IsWellFormed('abcdefgh')).to.equal(true);
                        expect(IsWellFormed('12345678')).to.equal(true);
                        expect(IsWellFormed('0a1b2')).to.equal(true);
                        expect(IsWellFormed('ABC123')).to.equal(true);
                    });

                it('should check case conventions when options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(privateUse: string): boolean
                            {
                                return IsWellFormed(privateUse,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('abcdefghi')).to.equal(false);
                        expect(TestHelper('123abc456')).to.equal(false);
                        expect(TestHelper('a')).to.equal(true);
                        expect(TestHelper('0')).to.equal(true);
                        expect(TestHelper('abcdefgh')).to.equal(true);
                        expect(TestHelper('12345678')).to.equal(true);
                        expect(TestHelper('0a1b2')).to.equal(true);
                        expect(TestHelper('ABC123')).to.equal(false);
                    });
            });
    });
