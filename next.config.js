const path = require("path");

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Index",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
