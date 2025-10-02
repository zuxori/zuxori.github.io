import React from 'react';
import Link from '@docusaurus/Link';

/**
 * docusaurus-plugin-search-local sometimes emits links whose “to”
 * is just a hash (e.g.  "#ori").
 * If we detect that case we prepend the document path so the link works.
 *
 * Props we can rely on:
 *   – to        = raw link target (may be "#section")
 *   – pathname  = doc path (e.g. "/docs/zuxori-character-summary")
 *   – href      = same as `to` in most cases (backup)
 */
export default function SearchResultLink(props) {
  const {to = '', pathname = '', href = '', ...rest} = props;

  // If the plugin gave us only a hash, stitch the real path in front
  const isHashOnly = to.startsWith('#');
  const basePath   = pathname || href.split('#')[0] || '';         // safest fallback
  const fixedTo    = isHashOnly ? `${basePath}${to}` : to;

  return <Link to={fixedTo} {...rest} />;
}