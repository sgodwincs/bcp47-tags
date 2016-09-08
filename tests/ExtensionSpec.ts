/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import ExtensionSpec from '../source/ExtensionSpec';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

class TestExtension extends ExtensionSpec
{
    IsExtensionSubtagRegistered()
    {
        return true;
    }

    IsExtensionSubtagValid()
    {
        return true;
    }

    IsExtensionSubtagWellFormed()
    {
        return true;
    }
}

// Tests.

describe('ExtensionSpec',
    () =>
    {
        describe('#ExtensionSpec',
            () =>
            {
                it('should correctly initialize the class instance',
                    () =>
                    {
                        const instance: TestExtension = new TestExtension('a');
                        expect(instance.GetSingleton()).to.equal('a');
                    });

                it('should assert that the singleton is well-formed',
                    () =>
                    {
                        expect(TestExtension.bind(null, 'ill-formed singleton')).to.throw(/ExtensionSpec constructor argument "singleton" must be a well-formed singleton subtag\./);
                    });
            });

        describe('#GetSingleton',
            () =>
            {
                it('should return the data path',
                    () =>
                    {
                        const instance: TestExtension = new TestExtension('x');
                        expect(instance.GetSingleton()).to.equal('x');
                    });
            });
    });
