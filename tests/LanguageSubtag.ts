/* Module dependencies. */

// External.

import * as chai from 'chai';

// Internal.

import LanguageSubtag from '../source/LanguageSubtag';

/* Test body. */

// Constants.

const expect: Chai.ExpectStatic = chai.expect;

// Tests.

describe('LanguageSubtag',
    () =>
    {
        describe('#LanguageSubtag',
            () =>
            {
                it('');
            });

        describe('.FormatSubtag',
            () =>
            {
                it('should return the formatted subtag for the given type',
                    () =>
                    {
                        expect(LanguageSubtag.FormatSubtag('language', 'en')).to.equal('en');
                        expect(LanguageSubtag.FormatSubtag('language', 'EN')).to.equal('en');
                        expect(LanguageSubtag.FormatSubtag('extlang', 'aao')).to.equal('aao');
                        expect(LanguageSubtag.FormatSubtag('extlang', 'AAO')).to.equal('aao');
                        expect(LanguageSubtag.FormatSubtag('script', 'latn')).to.equal('Latn');
                        expect(LanguageSubtag.FormatSubtag('script', 'LATN')).to.equal('Latn');
                        expect(LanguageSubtag.FormatSubtag('region', 'us')).to.equal('US');
                        expect(LanguageSubtag.FormatSubtag('region', 'US')).to.equal('US');
                        expect(LanguageSubtag.FormatSubtag('variant', '1694acad')).to.equal('1694acad');
                        expect(LanguageSubtag.FormatSubtag('variant', '1694ACAD')).to.equal('1694acad');
                        expect(LanguageSubtag.FormatSubtag('extension', 'gregory')).to.equal('gregory');
                        expect(LanguageSubtag.FormatSubtag('extension', 'GREGORY')).to.equal('gregory');
                        expect(LanguageSubtag.FormatSubtag('privateuse', 'sometag')).to.equal('sometag');
                        expect(LanguageSubtag.FormatSubtag('privateuse', 'SOMETAG')).to.equal('sometag');
                        expect(LanguageSubtag.FormatSubtag('singleton', 'x')).to.equal('x');
                        expect(LanguageSubtag.FormatSubtag('singleton', 'X')).to.equal('x');
                    });
            });

        describe('.IsLanguageSubtagType',
            () =>
            {
                it('should return whether or not the value is a LanguageSubtagType',
                    () =>
                    {
                        expect(LanguageSubtag.IsLanguageSubtagType('')).to.equal(false);
                        expect(LanguageSubtag.IsLanguageSubtagType('random value')).to.equal(false);
                        expect(LanguageSubtag.IsLanguageSubtagType(null)).to.equal(false);
                        expect(LanguageSubtag.IsLanguageSubtagType(undefined)).to.equal(false);
                        expect(LanguageSubtag.IsLanguageSubtagType(152)).to.equal(false);
                        expect(LanguageSubtag.IsLanguageSubtagType([ ])).to.equal(false);
                        expect(LanguageSubtag.IsLanguageSubtagType('language')).to.equal(true);
                        expect(LanguageSubtag.IsLanguageSubtagType('extlang')).to.equal(true);
                        expect(LanguageSubtag.IsLanguageSubtagType('script')).to.equal(true);
                        expect(LanguageSubtag.IsLanguageSubtagType('region')).to.equal(true);
                        expect(LanguageSubtag.IsLanguageSubtagType('variant')).to.equal(true);
                        expect(LanguageSubtag.IsLanguageSubtagType('extension')).to.equal(true);
                        expect(LanguageSubtag.IsLanguageSubtagType('privateuse')).to.equal(true);
                    });
            });
    });
