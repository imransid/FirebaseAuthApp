// // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-var-requires
// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// const {withSentryConfig} = require('@sentry/react-native/metro');

// // const {
// //   createSentryMetroSerializer,
// // } = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */

// const defaultConfig = getDefaultConfig(__dirname);
// const {assetExts, sourceExts} = defaultConfig.resolver;

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },

//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   },

//   // serializer: {
//   //   customSerializer: createSentryMetroSerializer(),
//   // },
// };

// // module.exports = withSentryConfig(
// //   withSentryConfig(mergeConfig(defaultConfig, config)),
// // );

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const {withSentryConfig} = require('@sentry/react-native/metro');

// Get the default configuration
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

// Custom configuration
const config = {
  transformer: {
    // Support SVG files with react-native-svg-transformer
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Exclude SVG from asset extensions and include it in source extensions
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Combine the default and custom configurations
const combinedConfig = mergeConfig(defaultConfig, config);

module.exports = combinedConfig;

// Integrate with Sentry
// module.exports = withSentryConfig(combinedConfig);
