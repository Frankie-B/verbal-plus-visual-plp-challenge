import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export const plugins = [
  autoprefixer(),
  postcssPresetEnv({ stage: 3, browsers: 'last 10 versions' }),
];
