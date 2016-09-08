/// <reference path="../node_modules/@types/es6-shim/index.d.ts" />

/* Module dependencies. */

// External.

import * as fs from 'fs';
import * as http from 'http';
import * as request from 'request';
import * as xml2js from 'xml2js';

// Internal.

import { ExtensionAttrIndexedData, ExtensionKeyIndexedData, ExtensionKeyIndexedDataTypes,
         ExtensionSubtagData, ExtensionSubtagIndexedData, ExtensionTypeIndexedData} from '../source/extensions/unicode/UnicodeBaseExtension.ts';

/* Module body. */

// Private interfaces.

interface ParsedData
{
    attrs: Array<ExtensionAttrIndexedData>;
    keys: Array<ExtensionKeyIndexedData>;
    subtags: ExtensionSubtagData;
    types: Array<ExtensionTypeIndexedData>;
}

// Link constants for data retrieval.

const unicodeExtensionLinks: Array<string> =
    [
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/calendar.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/collation.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/currency.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/measure.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/number.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/segmentation.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/timezone.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/variant.xml'
    ];

const transformExtensionLinks: Array<string> =
    [
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/transform-destination.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/transform.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/transform_ime.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/transform_keyboard.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/transform_mt.xml',
        'http://www.unicode.org/repos/cldr/tags/latest/common/bcp47/transform_private_use.xml',
    ];

function FetchData(links: Array<string>): Promise<Array<string>>
{
    return Promise.all(links.map(RequestLink));
}

function ParseData(xmls: Array<string>): ParsedData
{
    const parsedAttrs: Array<ExtensionAttrIndexedData> = [ ];
    const parsedKeys: Array<ExtensionKeyIndexedData> = [ ];
    const parsedSubtags: ExtensionSubtagData = { }
    const parsedTypes: Array<ExtensionTypeIndexedData> = [ ];

    for (const xml of xmls)
    {
        xml2js.parseString(xml,
            (error: undefined | null | Error, result: any): void =>
            {
                result.ldmlBCP47.keyword[0].key.forEach(
                    (keyData: any): void =>
                    {
                        const key: string = keyData.$.name;
                        const keyIndex: number = parsedKeys.push(keyData.$) - 1;
                        parsedKeys[keyIndex].types = { };

                        if (parsedSubtags[key] === undefined)
                        {
                            parsedSubtags[key] =
                                {
                                    keys: [ ]
                                };
                        }

                        parsedSubtags[key]!.keys!.push(keyIndex);

                        keyData.type.forEach(
                            (typeData: any): void =>
                            {
                                const type: string = typeData.$.name;
                                const typeIndex: number = parsedTypes.push(typeData.$) - 1;
                                parsedKeys[keyIndex].types[type] = typeIndex;

                                if (parsedSubtags[type] === undefined)
                                {
                                    parsedSubtags[type] =
                                        {
                                            types: [ ]
                                        };
                                }

                                parsedSubtags[type]!.types!.push(typeIndex);
                            });
                    });
            });
    }

    return {
        attrs: parsedAttrs,
        keys: parsedKeys,
        subtags: parsedSubtags,
        types: parsedTypes
    };
}

function RequestLink(link: string): Promise<string>
{
    return new Promise(
        (resolve, reject): void =>
        {
            request(link,
                (error: undefined | null | Error, response: http.IncomingMessage, body: any): void =>
                {
                    if (error != null)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(body);
                    }
                });
        });
}

Promise
    .all(
        [
            FetchData(transformExtensionLinks),
            FetchData(unicodeExtensionLinks)
        ])
    .then(
        (xmlData: Array<Array<string>>): Promise<Array<void>> =>
        {
            const transformData: ParsedData = ParseData(xmlData[0]);
            const unicodeData: ParsedData = ParseData(xmlData[1]);

            return Promise.all(
                [
                    fs.writeFile('data/transform/attrs.json', JSON.stringify(transformData.attrs, null, 4)),
                    fs.writeFile('data/transform/keys.json', JSON.stringify(transformData.keys, null, 4)),
                    fs.writeFile('data/transform/subtags.json', JSON.stringify(transformData.subtags, null, 4)),
                    fs.writeFile('data/transform/types.json', JSON.stringify(transformData.types, null, 4)),
                    fs.writeFile('data/unicode/attrs.json', JSON.stringify(unicodeData.attrs, null, 4)),
                    fs.writeFile('data/unicode/keys.json', JSON.stringify(unicodeData.keys, null, 4)),
                    fs.writeFile('data/unicode/subtags.json', JSON.stringify(unicodeData.subtags, null, 4)),
                    fs.writeFile('data/unicode/types.json', JSON.stringify(unicodeData.types, null, 4))
                ]);
        });
