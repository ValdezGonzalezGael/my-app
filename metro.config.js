const {getDefaultConfig}= require("@expo/metro-config");

const getDefaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolve.assetExts.push("cjs");

module.exports = defaultConfig;