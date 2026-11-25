const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Garante que as extensões padrão (incluindo .ttf, usado pelos ícones do
// @expo/vector-icons) continuem presentes. Antes a lista estava sendo
// SUBSTITUÍDA em vez de estendida, o que quebrava a resolução das fontes
// e derrubava o bundle com erro 500.
config.resolver.assetExts = [...new Set([...config.resolver.assetExts, 'svg'])];

module.exports = config;
