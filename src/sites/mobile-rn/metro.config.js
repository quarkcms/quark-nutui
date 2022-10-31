/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path')

const extraNodeModules = {
  '@/config.json': path.resolve(__dirname + '/../../../src/config.json'),
  '@/packages': path.resolve(__dirname + '/../../../src/packages'),
  '@/utils': path.resolve(__dirname + '/../../../src/utils'),
  '@/sites': path.resolve(__dirname + '/../../../src/sites'),
  '@/locales': path.resolve(__dirname + '/../../../src/locales'),
  '@/styles': path.resolve(__dirname + '/../../../src/styles'),
  '@': path.resolve(__dirname + '/../../../src'),
}
const watchFolders = [
  path.resolve(__dirname + '/../../../src/packages'),
  path.resolve(__dirname + '/../../../src/utils'),
  path.resolve(__dirname + '/../../../src/sites'),
  path.resolve(__dirname + '/../../../src/locales'),
  path.resolve(__dirname + '/../../../src/styles'),
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
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
}
