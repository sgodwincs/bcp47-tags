/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { IsGrandfatheredTag, IsIrregularGrandfatheredTag, IsRegularGrandfatheredTag, IsTagWellFormed,
         IsSubtagPrivateUse, IsSubtagRegistered, IsSubtagValid, IsSubtagWellFormed, MapPrivateUseToRegistered} from '../source/registry';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('Registry',
    () =>
    {
        describe('.IsGrandfatheredTag',
            () =>
            {
                it('should return whether or not the tag is a grandfathered tag',
                    () =>
                    {
                        expect(IsGrandfatheredTag('')).to.equal(false);
                        expect(IsGrandfatheredTag('en')).to.equal(false);
                        expect(IsGrandfatheredTag('US')).to.equal(false);
                        expect(IsGrandfatheredTag('i-ami')).to.equal(true);
                        expect(IsGrandfatheredTag('en-gb-oed')).to.equal(true);
                    });
            });

        describe('.IsIrregularGrandfatheredTag',
            () =>
            {
                it('should return whether or not the tag is an irregular grandfathered tag',
                    () =>
                    {
                        expect(IsIrregularGrandfatheredTag('')).to.equal(false);
                        expect(IsIrregularGrandfatheredTag('en')).to.equal(false);
                        expect(IsIrregularGrandfatheredTag('zh-min')).to.equal(false);
                        expect(IsIrregularGrandfatheredTag('en-GB-oed')).to.equal(true);
                        expect(IsIrregularGrandfatheredTag('i-ami')).to.equal(true);
                    });
            });

        describe('.IsRegularGrandfatheredTag',
            () =>
            {
                it('should return whether or not the tag is an regular grandfathered tag',
                    () =>
                    {
                        expect(IsRegularGrandfatheredTag('')).to.equal(false);
                        expect(IsRegularGrandfatheredTag('en')).to.equal(false);
                        expect(IsRegularGrandfatheredTag('zh-min')).to.equal(true);
                        expect(IsRegularGrandfatheredTag('en-GB-oed')).to.equal(false);
                        expect(IsRegularGrandfatheredTag('i-ami')).to.equal(false);
                    });
            });

        describe('.IsTagWellFormed',
            () =>
            {
                it('should return whether or not the tag is well-formed',
                    () =>
                    {
                        expect(IsTagWellFormed('')).to.equal(false);
                        expect(IsTagWellFormed('longlangtag')).to.equal(false);
                        expect(IsTagWellFormed('en')).to.equal(true);
                        expect(IsTagWellFormed('zh-min')).to.equal(true);
                        expect(IsTagWellFormed('en-gb-oed')).to.equal(true);
                        expect(IsTagWellFormed('i-ami')).to.equal(true);
                        expect(IsTagWellFormed('ja-JP')).to.equal(true);
                        expect(IsTagWellFormed('x-tag')).to.equal(true);
                    });
            });

        describe('.IsSubtagPrivateUse',
            () =>
            {
                it('should return whether or not the subtag is private use',
                    () =>
                    {
                        expect(IsSubtagPrivateUse('extension', 'ca')).to.equal(false);
                        expect(IsSubtagPrivateUse('extlang', 'aao')).to.equal(false);
                        expect(IsSubtagPrivateUse('language', 'qab')).to.equal(true);
                        expect(IsSubtagPrivateUse('privateuse', 'tag')).to.equal(true);
                        expect(IsSubtagPrivateUse('region', 'qy')).to.equal(true);
                        expect(IsSubtagPrivateUse('script', 'qaab')).to.equal(true);
                        expect(IsSubtagPrivateUse('singleton', 'x')).to.equal(true);
                        expect(IsSubtagPrivateUse('variant', '1606nict')).to.equal(false);
                    });
            });

        describe('.IsSubtagRegistered',
            () =>
            {
                it('should return whether or not the subtag is registered',
                    () =>
                    {
                        expect(IsSubtagRegistered('extension', 'ca')).to.equal(false)
                        expect(IsSubtagRegistered('extlang', 'aao')).to.equal(true);
                        expect(IsSubtagRegistered('language', 'en')).to.equal(true);
                        expect(IsSubtagRegistered('privateuse', 'tag')).to.equal(false);
                        expect(IsSubtagRegistered('region', 'US')).to.equal(true);
                        expect(IsSubtagRegistered('script', 'latn')).to.equal(true);
                        expect(IsSubtagRegistered('singleton', 'u')).to.equal(true);
                        expect(IsSubtagRegistered('variant', '1606nict')).to.equal(true);
                    });
            });

        describe('.IsSubtagValid',
            () =>
            {
                it('should return whether or not the subtag is valid',
                    () =>
                    {
                        expect(IsSubtagValid('extension', 'ca')).to.equal(false)
                        expect(IsSubtagValid('extlang', 'aao')).to.equal(true);
                        expect(IsSubtagValid('language', 'en')).to.equal(true);
                        expect(IsSubtagValid('privateuse', 'tag')).to.equal(true);
                        expect(IsSubtagValid('region', 'US')).to.equal(true);
                        expect(IsSubtagValid('script', 'latn')).to.equal(true);
                        expect(IsSubtagValid('singleton', 'u')).to.equal(true);
                        expect(IsSubtagValid('variant', '1606nict')).to.equal(true);
                    });
            });

        describe('.IsSubtagWellFormed',
            () =>
            {
                it('should return whether or not the subtag is well-formed',
                    () =>
                    {
                        expect(IsSubtagWellFormed('extension', 'ca')).to.equal(true)
                        expect(IsSubtagWellFormed('extlang', 'aao')).to.equal(true);
                        expect(IsSubtagWellFormed('language', 'en')).to.equal(true);
                        expect(IsSubtagWellFormed('privateuse', 'tag')).to.equal(true);
                        expect(IsSubtagWellFormed('region', 'US')).to.equal(true);
                        expect(IsSubtagWellFormed('script', 'latn')).to.equal(true);
                        expect(IsSubtagWellFormed('singleton', 'u')).to.equal(true);
                        expect(IsSubtagWellFormed('variant', '1606nict')).to.equal(true);
                    });
            });

        describe('.MapPrivateUseToRegistered',
            () =>
            {
                it('should map the subtag to the correct registered private use subtag',
                    () =>
                    {
                        expect(MapPrivateUseToRegistered('extension', 'ca')).to.equal(null);
                        expect(MapPrivateUseToRegistered('extlang', 'aao')).to.equal(null);
                        expect(MapPrivateUseToRegistered('language', 'qab')).to.equal('qaa..qtz');
                        expect(MapPrivateUseToRegistered('privateuse', 'tag')).to.equal(null);
                        expect(MapPrivateUseToRegistered('region', 'qy')).to.equal('QM..QZ');
                        expect(MapPrivateUseToRegistered('script', 'qaab')).to.equal('Qaaa..Qabx');
                        expect(MapPrivateUseToRegistered('singleton', 'x')).to.equal(null);
                        expect(MapPrivateUseToRegistered('variant', '1606nict')).to.equal(null);
                    });
            });
    });
