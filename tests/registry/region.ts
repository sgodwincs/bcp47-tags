/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsPrivateUse, IsPrivateUseRange, IsRegistered, IsValid, IsWellFormed } from '../../source/registry/region';

/* Test body. */

// Private Interfaces.

interface RegionRegistry
{
    [key: string]: number;
}

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const regionRegistry: RegionRegistry = require('language-subtag-registry/data/json/region.json') as RegionRegistry;

// Tests.

describe('Subtag - Region',
    () =>
    {
        describe('.IsPrivateUse',
            () =>
            {
                it('should return whether or not the region is private use',
                    () =>
                    {
                        expect(IsPrivateUse('')).to.equal(false);
                        expect(IsPrivateUse('qm..qz')).to.equal(false);
                        expect(IsPrivateUse('xa..xz')).to.equal(false);
                        expect(IsPrivateUse('00')).to.equal(false);
                        expect(IsPrivateUse('us')).to.equal(false);
                        expect(IsPrivateUse('US')).to.equal(false);
                        expect(IsPrivateUse('abc')).to.equal(false);
                        expect(IsPrivateUse('zzz')).to.equal(false);
                        expect(IsPrivateUse('aa')).to.equal(true);
                        expect(IsPrivateUse('AA')).to.equal(true);
                        expect(IsPrivateUse('qm')).to.equal(true);
                        expect(IsPrivateUse('QO')).to.equal(true);
                        expect(IsPrivateUse('qz')).to.equal(true);
                        expect(IsPrivateUse('xa')).to.equal(true);
                        expect(IsPrivateUse('xt')).to.equal(true);
                        expect(IsPrivateUse('zz')).to.equal(true);
                    });
            });

        describe('.IsPrivateUseRange',
            () =>
            {
                it('should return whether or not the range is the private use range',
                    () =>
                    {
                        expect(IsPrivateUseRange('')).to.equal(false);
                        expect(IsPrivateUseRange('zz')).to.equal(false);
                        expect(IsPrivateUseRange('qm..qz')).to.equal(true);
                        expect(IsPrivateUseRange('XA..XZ')).to.equal(true);
                    });
            });

        describe('.IsRegistered',
            () =>
            {
                it('should return whether or not the subtag is a registered region subtag',
                    () =>
                    {
                        expect(IsRegistered('')).to.equal(false);
                        expect(IsRegistered('a')).to.equal(false);
                        expect(IsRegistered('abc')).to.equal(false);
                        expect(IsRegistered('ABC')).to.equal(false);
                        expect(IsRegistered('0')).to.equal(false);
                        expect(IsRegistered('123')).to.equal(false);
                        expect(IsRegistered('qm..qz')).to.equal(false);
                        expect(IsRegistered('xa..xz')).to.equal(false);
                        expect(IsRegistered('XA..XZ')).to.equal(false);
                        expect(IsRegistered('us')).to.equal(true);
                        expect(IsRegistered('US')).to.equal(true);
                        expect(IsRegistered('jp')).to.equal(true);
                        expect(IsRegistered('aa')).to.equal(true);
                        expect(IsRegistered('zz')).to.equal(true);
                        expect(IsRegistered('qo')).to.equal(false);
                    });

                it('should return true for all registered regions',
                    () =>
                    {
                        Object.keys(regionRegistry).forEach(
                            (region: string): void =>
                            {
                                expect(IsRegistered(region)).to.equal(!IsPrivateUseRange(region),
                                       `Expected "${region}" to${IsPrivateUseRange(region) ? '' : ' not'} be registered`);
                            });
                    });
            });

        describe('.IsValid',
            () =>
            {
                it('should return whether or not the subtag is a valid region subtag',
                    () =>
                    {
                        expect(IsValid('')).to.equal(false);
                        expect(IsValid('a')).to.equal(false);
                        expect(IsValid('00')).to.equal(false);
                        expect(IsValid('1234')).to.equal(false);
                        expect(IsValid('0ab')).to.equal(false);
                        expect(IsValid('abc')).to.equal(false);
                        expect(IsValid('ABC')).to.equal(false);
                        expect(IsValid('0')).to.equal(false);
                        expect(IsValid('123')).to.equal(false);
                        expect(IsValid('qm..qz')).to.equal(false);
                        expect(IsValid('xa..xz')).to.equal(false);
                        expect(IsValid('XA..XZ')).to.equal(false);
                        expect(IsValid('us')).to.equal(true);
                        expect(IsValid('US')).to.equal(true);
                        expect(IsValid('jp')).to.equal(true);
                        expect(IsValid('aa')).to.equal(true);
                        expect(IsValid('zz')).to.equal(true);
                        expect(IsValid('qo')).to.equal(true);
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
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('1234')).to.equal(false);
                        expect(TestHelper('0ab')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('ABC')).to.equal(false);
                        expect(TestHelper('0')).to.equal(false);
                        expect(TestHelper('123')).to.equal(false);
                        expect(TestHelper('qm..qz')).to.equal(false);
                        expect(TestHelper('xa..xz')).to.equal(false);
                        expect(TestHelper('XA..XZ')).to.equal(false);
                        expect(TestHelper('us')).to.equal(false);
                        expect(TestHelper('US')).to.equal(true);
                        expect(TestHelper('jp')).to.equal(false);
                        expect(TestHelper('aa')).to.equal(false);
                        expect(TestHelper('zz')).to.equal(false);
                        expect(TestHelper('qo')).to.equal(false);
                    });

                it('should return true for all registered regions',
                    () =>
                    {
                        Object.keys(regionRegistry).forEach(
                            (region: string): void =>
                            {
                                expect(IsValid(region)).to.equal(!IsPrivateUseRange(region),
                                       `Expected "${region}" to${IsPrivateUseRange(region) ? '' : ' not'} be valid`);
                            });
                    });
            });

        describe('.IsWellFormed',
            () =>
            {
                it('should return whether or not the subtag is a well-formed region subtag',
                    () =>
                    {
                        expect(IsWellFormed('')).to.equal(false);
                        expect(IsWellFormed('00')).to.equal(false);
                        expect(IsWellFormed('1234')).to.equal(false);
                        expect(IsWellFormed('0ab')).to.equal(false);
                        expect(IsWellFormed('abc')).to.equal(false);
                        expect(IsWellFormed('a')).to.equal(false);
                        expect(IsWellFormed('ab0')).to.equal(false);
                        expect(IsWellFormed('AB0')).to.equal(false);
                        expect(IsWellFormed('ab')).to.equal(true);
                        expect(IsWellFormed('AB')).to.equal(true);
                        expect(IsWellFormed('414')).to.equal(true);
                        expect(IsWellFormed('123')).to.equal(true);
                    });

                it('should check case conventions when options.followsCaseConventions is true',
                    () =>
                    {
                        const TestHelper =
                            function(region: string): boolean
                            {
                                return IsWellFormed(region,
                                    {
                                        followsCaseConventions: true
                                    });
                            };

                        expect(TestHelper('')).to.equal(false);
                        expect(TestHelper('00')).to.equal(false);
                        expect(TestHelper('1234')).to.equal(false);
                        expect(TestHelper('0ab')).to.equal(false);
                        expect(TestHelper('abc')).to.equal(false);
                        expect(TestHelper('a')).to.equal(false);
                        expect(TestHelper('ab0')).to.equal(false);
                        expect(TestHelper('AB0')).to.equal(false);
                        expect(TestHelper('ab')).to.equal(false);
                        expect(TestHelper('AB')).to.equal(true);
                        expect(TestHelper('414')).to.equal(true);
                        expect(TestHelper('123')).to.equal(true);
                    });

                it('should return true for all registered regions',
                    () =>
                    {
                        Object.keys(regionRegistry).forEach(
                            (region: string): void =>
                            {
                                expect(IsWellFormed(region)).to.equal(!IsPrivateUseRange(region),
                                       `Expected "${region}" to${IsPrivateUseRange(region) ? '' : ' not'} be well-formed`);
                            });
                    });
            });
    });
