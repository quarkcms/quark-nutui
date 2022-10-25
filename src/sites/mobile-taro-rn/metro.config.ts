/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path')
const extraNodeModules = {
  '@/config.json': path.resolve(__dirname + '/../../../config.json'),
  '@/packages': path.resolve(__dirname + '/../../../src/packages'),
  '@/utils': path.resolve(__dirname + '/../../../src/utils'),
  '@': path.resolve(__dirname + '/../../../src'),
}
const watchFolders = [
  path.resolve(__dirname + '/../../../config.json'),
  path.resolve(__dirname + '/../../../src/packages'),
  path.resolve(__dirname + '/../../../src/utils'),
  path.resolve(__dirname + '/../../../src'),
]

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
  },
  watchFolders,
}
