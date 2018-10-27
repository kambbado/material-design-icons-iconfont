export default {
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
