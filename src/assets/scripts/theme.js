import '../styles/theme.scss';

import './utility/polyfill';

import lazySizes from 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';
lazySizes.cfg = { ...lazySizes.cfg, init: false };

document.addEventListener('DOMContentLoaded', () => {
  lazySizes.init();
});
