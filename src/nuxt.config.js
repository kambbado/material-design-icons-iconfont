export default {
  generate: {
    dir: '../'
  },
  build: { 
    extend(config, { isDev, isClient }) {
      if (!isDev) {
        // relative links, please.
        config.output.publicPath = "./_nuxt/";
      }
      return config;
    }
  }
};
