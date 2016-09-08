/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import transformedContentExtension, { TransformedContentExtension } from '../../../source/extensions/unicode/TransformedContentExtension';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('TransformedContentExtension',
    () =>
    {
        describe('#TransformedContentExtension',
            () =>
            {
                it('should correctly initialize the class instance',
                    () =>
                    {
                        const instance: TransformedContentExtension = new TransformedContentExtension();
                        expect(instance.GetDataPath()).to.equal(TransformedContentExtension.dataPath);
                        expect(instance.GetSingleton()).to.equal(TransformedContentExtension.singleton);
                    });
            });

        describe('#IsExtensionSubtagPrivateUse',
            () =>
            {
                it('should return whether or not the given subtag is private use',
                    () =>
                    {
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('unknown tag')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('ca')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('abc')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('PRIVATE_USE')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('abc',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('abc',
                            {
                                subtagType: 'key'
                            })).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUse('abc',
                            {
                                subtagType: 'type'
                            })).to.equal(true);
                    });
            });

        describe('#IsExtensionSubtagRegistered',
            () =>
            {
                it('should return whether or not the given subtag is registered',
                    () =>
                    {
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('a')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('bb')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('fffFFZ')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('ZZZZZZZZ')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('ABC')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('aaa')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('PRIVATE_USE')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('d0')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('upper')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('s0')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('windows')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('ca')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('hebrew')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('em')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagRegistered('cccck')).to.equal(false);
                    });
            });

        describe('#IsExtensionSubtagValid',
            () =>
            {
                it('should return whether or not the given subtag is valid',
                    () =>
                    {
                        expect(transformedContentExtension.IsExtensionSubtagValid('')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagValid('a')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagValid('bb')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagValid('fffFFZ')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('ZZZZZZZZ')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('ABC')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('aaa')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('d0')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('upper')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('s0')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('windows')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('ca')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagValid('hebrew')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagValid('em')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagValid('cccck')).to.equal(true);
                    });
            });

        describe('#IsExtensionSubtagPrivateUseRange',
            () =>
            {
                it('should return whether or not the given subtag is private use',
                    () =>
                    {
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('unknown tag')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('ca')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('abc')).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('PRIVATE_USE')).to.equal(true);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('PRIVATE_USE',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('PRIVATE_USE',
                            {
                                subtagType: 'key'
                            })).to.equal(false);
                        expect(transformedContentExtension.IsExtensionSubtagPrivateUseRange('PRIVATE_USE',
                            {
                                subtagType: 'type'
                            })).to.equal(true);
                    });
            });



        describe('.IsExtensionSingleton',
            () =>
            {
                it('should return whether or not the given singleton is the extension singleton',
                    () =>
                    {
                        expect(TransformedContentExtension.IsExtensionSingleton('')).to.equal(false);
                        expect(TransformedContentExtension.IsExtensionSingleton('u')).to.equal(false);
                        expect(TransformedContentExtension.IsExtensionSingleton('t')).to.equal(true);
                        expect(TransformedContentExtension.IsExtensionSingleton('T')).to.equal(true);
                    })
            });
    });
