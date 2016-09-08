/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import { UnicodeLocaleExtension } from '../../../source/extensions/unicode/UnicodeLocaleExtension';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('UnicodeLocaleExtension',
    () =>
    {
        describe('#UnicodeLocaleExtension',
            () =>
            {
                it('should correctly initialize the class instance',
                    () =>
                    {
                        const instance: UnicodeLocaleExtension = new UnicodeLocaleExtension();
                        expect(instance.GetDataPath()).to.equal(UnicodeLocaleExtension.dataPath);
                        expect(instance.GetSingleton()).to.equal(UnicodeLocaleExtension.singleton);
                    });
            });

        describe('.IsExtensionSingleton',
            () =>
            {
                it('should return or not the given singleton is the extension singleton',
                    () =>
                    {
                        expect(UnicodeLocaleExtension.IsExtensionSingleton('')).to.equal(false);
                        expect(UnicodeLocaleExtension.IsExtensionSingleton('t')).to.equal(false);
                        expect(UnicodeLocaleExtension.IsExtensionSingleton('u')).to.equal(true);
                        expect(UnicodeLocaleExtension.IsExtensionSingleton('U')).to.equal(true);
                    })
            });
    });
