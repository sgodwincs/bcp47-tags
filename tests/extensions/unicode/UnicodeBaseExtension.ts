/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import UnicodeBaseExtension from '../../../source/extensions/unicode/UnicodeBaseExtension';
import { UnicodeLocaleExtension } from '../../../source/extensions/unicode/UnicodeLocaleExtension';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('UnicodeBaseExtension',
    () =>
    {
        describe('#UnicodeBaseExtension',
            () =>
            {
                it('should correctly initialize the class instance',
                    () =>
                    {
                        const instance: UnicodeBaseExtension = new UnicodeBaseExtension('a', 'datapath');
                        expect(instance.GetDataPath()).to.equal('datapath');
                        expect(instance.GetSingleton()).to.equal('a');
                    });
            });

        describe('#GetDataPath',
            () =>
            {
                it('should return the data path',
                    () =>
                    {
                        const instance: UnicodeBaseExtension = new UnicodeBaseExtension('a', 'some random data path');
                        expect(instance.GetDataPath()).to.equal('some random data path');
                    });
            });

        describe('#IsExtensionSubtagRegistered',
            () =>
            {
                it('should return whether or not the subtag is registered under the extension',
                    () =>
                    {
                        const instance: UnicodeBaseExtension = new UnicodeBaseExtension(UnicodeLocaleExtension.singleton, UnicodeLocaleExtension.dataPath);

                        expect(instance.IsExtensionSubtagRegistered('unknown subtag')).to.equal(false);
                        expect(instance.IsExtensionSubtagRegistered('ca')).to.equal(true);
                        expect(instance.IsExtensionSubtagRegistered('ca',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagRegistered('ca',
                            {
                                subtagType: 'key'
                            })).to.equal(true);
                        expect(instance.IsExtensionSubtagRegistered('ca',
                            {
                                subtagType: 'type'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagRegistered('gregory')).to.equal(true);
                        expect(instance.IsExtensionSubtagRegistered('gregory',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagRegistered('gregory',
                            {
                                subtagType: 'key'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagRegistered('gregory',
                            {
                                subtagType: 'type'
                            })).to.equal(true);
                    });
            });

        describe('#IsExtensionSubtagValid',
            () =>
            {
                it('should return whether or not the subtag is valid under the extension',
                    () =>
                    {
                        const instance: UnicodeBaseExtension = new UnicodeBaseExtension(UnicodeLocaleExtension.singleton, UnicodeLocaleExtension.dataPath);

                        expect(instance.IsExtensionSubtagValid('unknown subtag')).to.equal(false);
                        expect(instance.IsExtensionSubtagValid('ca')).to.equal(true);
                        expect(instance.IsExtensionSubtagValid('ca',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagValid('ca',
                            {
                                subtagType: 'key'
                            })).to.equal(true);
                        expect(instance.IsExtensionSubtagValid('ca',
                            {
                                subtagType: 'type'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagValid('gregory')).to.equal(true);
                        expect(instance.IsExtensionSubtagValid('gregory',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagValid('gregory',
                            {
                                subtagType: 'key'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagValid('gregory',
                            {
                                subtagType: 'type'
                            })).to.equal(true);
                    });
            });

        describe('#IsExtensionSubtagWellFormed',
            () =>
            {
                it('should return whether or not the subtag is valid under the extension',
                    () =>
                    {
                        const instance: UnicodeBaseExtension = new UnicodeBaseExtension(UnicodeLocaleExtension.singleton, UnicodeLocaleExtension.dataPath);

                        expect(instance.IsExtensionSubtagWellFormed('unknown subtag')).to.equal(false);
                        expect(instance.IsExtensionSubtagWellFormed('ca')).to.equal(true);
                        expect(instance.IsExtensionSubtagWellFormed('ca',
                            {
                                subtagType: 'attr'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagWellFormed('ca',
                            {
                                subtagType: 'key'
                            })).to.equal(true);
                        expect(instance.IsExtensionSubtagWellFormed('ca',
                            {
                                subtagType: 'type'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagWellFormed('gregory')).to.equal(true);
                        expect(instance.IsExtensionSubtagWellFormed('gregory',
                            {
                                subtagType: 'attr'
                            })).to.equal(true);
                        expect(instance.IsExtensionSubtagWellFormed('gregory',
                            {
                                subtagType: 'key'
                            })).to.equal(false);
                        expect(instance.IsExtensionSubtagWellFormed('gregory',
                            {
                                subtagType: 'type'
                            })).to.equal(true);
                    });
            });
    });
