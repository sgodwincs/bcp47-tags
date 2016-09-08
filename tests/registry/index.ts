/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { GetRecord, GetRecordByIndex, IsRegistryRecordScope,
         IsRegistryRecordType, Registry, RegistryIndex, SearchIndex } from '../../source/registry/index';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;
const index: RegistryIndex = require('language-subtag-registry/data/json/index.json') as RegistryIndex;
const registry: Registry = require('language-subtag-registry/data/json/registry.json') as Registry;

// Tests.

describe('Subtag - Index',
    () =>
    {
        describe('.GetRecord',
            () =>
            {
                it('should return the record information',
                    () =>
                    {
                        expect(GetRecord('region', 'en')).to.equal(null);
                        expect(GetRecord('language', 'some random tag')).to.equal(null);
                        expect(GetRecord('language', 'en')).to.equal(registry[index['en'].language]);
                        expect(GetRecord('region', 'us')).to.equal(registry[index['us'].region]);
                    });
            });

        describe('.GetRecordByIndex',
            () =>
            {
                it('should return the record with the given index',
                    () =>
                    {
                        expect(GetRecordByIndex(20)).to.equal(registry[20]);
                        expect(GetRecordByIndex(50)).to.equal(registry[50]);
                    });

                it('should return null if the index is negative or greater than the registry size',
                    () =>
                    {
                        expect(GetRecordByIndex(-1)).to.equal(null);
                        expect(GetRecordByIndex(0)).to.not.equal(null);
                        expect(GetRecordByIndex(registry.length)).to.equal(null);
                    });
            });

        describe('.SearchIndex',
            () =>
            {
                it('should return null if the tag is not in the registry',
                    () =>
                    {
                        expect(SearchIndex('a tag not added')).to.equal(null);
                        expect(SearchIndex('another tag')).to.equal(null);
                    });

                it('should return null if the record information does not contain the required type(s)',
                    () =>
                    {
                        expect(SearchIndex('en', 'script')).to.equal(null);
                        expect(SearchIndex('US', 'variant')).to.equal(null);
                        expect(SearchIndex('1606nict',
                            [
                                'extlang',
                                'grandfathered',
                                'variant'
                            ])).to.equal(null);
                    });

                it('should return the index lookup information',
                    () =>
                    {
                        expect(SearchIndex('en')).to.equal(index['en']);
                        expect(SearchIndex('US', 'region')).to.equal(index['us']);
                        expect(SearchIndex('bh',
                            [
                                'language',
                                'region'
                            ])).to.equal(index['bh']);
                    });
            });

        describe('.IsRegistryRecordScope',
            () =>
            {
                it('should return whether or not the value is a registry record type',
                    () =>
                    {
                        expect(IsRegistryRecordScope(undefined)).to.equal(false);
                        expect(IsRegistryRecordScope(null)).to.equal(false);
                        expect(IsRegistryRecordScope(0)).to.equal(false);
                        expect(IsRegistryRecordScope('scope')).to.equal(false);

                        expect(IsRegistryRecordScope('macrolanguage')).to.equal(true);
                        expect(IsRegistryRecordScope('collection')).to.equal(true);
                        expect(IsRegistryRecordScope('special')).to.equal(true);
                        expect(IsRegistryRecordScope('private-use')).to.equal(true);
                    });
            });

        describe('.IsRegistryRecordType',
            () =>
            {
                it('should return whether or not the value is a registry record type',
                    () =>
                    {
                        expect(IsRegistryRecordType(undefined)).to.equal(false);
                        expect(IsRegistryRecordType(null)).to.equal(false);
                        expect(IsRegistryRecordType(0)).to.equal(false);
                        expect(IsRegistryRecordType('type')).to.equal(false);

                        expect(IsRegistryRecordType('language')).to.equal(true);
                        expect(IsRegistryRecordType('extlang')).to.equal(true);
                        expect(IsRegistryRecordType('script')).to.equal(true);
                        expect(IsRegistryRecordType('region')).to.equal(true);
                        expect(IsRegistryRecordType('variant')).to.equal(true);
                        expect(IsRegistryRecordType('grandfathered')).to.equal(true);
                        expect(IsRegistryRecordType('redundant')).to.equal(true);
                    });
            });
    });
