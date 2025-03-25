/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import columns2Parser from './parsers/columns2.js';
import hero4Parser from './parsers/hero4.js';
import cards5Parser from './parsers/cards5.js';
import columns7Parser from './parsers/columns7.js';
import columns__three_columns_8Parser from './parsers/columns__three_columns_8.js';
import columns9Parser from './parsers/columns9.js';
import cards__no_images_10Parser from './parsers/cards__no_images_10.js';
import columns__three_columns_11Parser from './parsers/columns__three_columns_11.js';
import hero14Parser from './parsers/hero14.js';
import columns__three_columns_15Parser from './parsers/columns__three_columns_15.js';
import quote16Parser from './parsers/quote16.js';
import columns17Parser from './parsers/columns17.js';
import columns__three_columns_18Parser from './parsers/columns__three_columns_18.js';
import columns__three_columns_19Parser from './parsers/columns__three_columns_19.js';
import tabs20Parser from './parsers/tabs20.js';
import cards__no_images_21Parser from './parsers/cards__no_images_21.js';
import columns22Parser from './parsers/columns22.js';
import cards23Parser from './parsers/cards23.js';
import columns__three_columns_24Parser from './parsers/columns__three_columns_24.js';
import cards25Parser from './parsers/cards25.js';
import accordion26Parser from './parsers/accordion26.js';
import hero27Parser from './parsers/hero27.js';
import hero28Parser from './parsers/hero28.js';
import columns29Parser from './parsers/columns29.js';
import columns30Parser from './parsers/columns30.js';
import columns31Parser from './parsers/columns31.js';
import quote__with_attribution_32Parser from './parsers/quote__with_attribution_32.js';
import tabs33Parser from './parsers/tabs33.js';
import columns__three_columns_34Parser from './parsers/columns__three_columns_34.js';
import columns35Parser from './parsers/columns35.js';
import carousel36Parser from './parsers/carousel36.js';
import table__striped___bordered_37Parser from './parsers/table__striped___bordered_37.js';
import columns__three_columns_38Parser from './parsers/columns__three_columns_38.js';
import cards39Parser from './parsers/cards39.js';
import columns40Parser from './parsers/columns40.js';
import hero41Parser from './parsers/hero41.js';
import quote42Parser from './parsers/quote42.js';
import columns43Parser from './parsers/columns43.js';

import headerParser from './parsers/header.js';

import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
      'Columns 2': columns2Parser,
    'Hero 4': hero4Parser,
    'Cards 5': cards5Parser,
    'Columns 7': columns7Parser,
    'Columns (three columns) 8': columns__three_columns_8Parser,
    'Columns 9': columns9Parser,
    'Cards (no images) 10': cards__no_images_10Parser,
    'Columns (three columns) 11': columns__three_columns_11Parser,
    'Hero 14': hero14Parser,
    'Columns (three columns) 15': columns__three_columns_15Parser,
    'Quote 16': quote16Parser,
    'Columns 17': columns17Parser,
    'Columns (three columns) 18': columns__three_columns_18Parser,
    'Columns (three columns) 19': columns__three_columns_19Parser,
    'Tabs 20': tabs20Parser,
    'Cards (no images) 21': cards__no_images_21Parser,
    'Columns 22': columns22Parser,
    'Cards 23': cards23Parser,
    'Columns (three columns) 24': columns__three_columns_24Parser,
    'Cards 25': cards25Parser,
    'Accordion 26': accordion26Parser,
    'Hero 27': hero27Parser,
    'Hero 28': hero28Parser,
    'Columns 29': columns29Parser,
    'Columns 30': columns30Parser,
    'Columns 31': columns31Parser,
    'Quote (with attribution) 32': quote__with_attribution_32Parser,
    'Tabs 33': tabs33Parser,
    'Columns (three columns) 34': columns__three_columns_34Parser,
    'Columns 35': columns35Parser,
    'Carousel 36': carousel36Parser,
    'Table (striped & bordered) 37': table__striped___bordered_37Parser,
    'Columns (three columns) 38': columns__three_columns_38Parser,
    'Cards 39': cards39Parser,
    'Columns 40': columns40Parser,
    'Hero 41': hero41Parser,
    'Quote 42': quote42Parser,
    'Columns 43': columns43Parser,
};

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // first, get dom elements for each block for the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });
  // also get all fragment elements for the current page
  const fragmentElements = fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath));

  // remove fragment elements
  fragmentElements.forEach((element) => {
    element.remove();
  });

  // transform all blocks using parsers
  blockElements.forEach(({ name, cluster, element }) => {
    const parserFn = parsers[`${name} ${cluster}`];

    if (!parserFn) return;

    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
