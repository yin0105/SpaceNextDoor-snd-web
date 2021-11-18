require('dotenv').config();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === "true",
});
const domainConfigs = require("./domain.config.json");

const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || "en-US";
const domainsByEnv = ()=> {
  const domains = domainConfigs[process.env.APP_ENV];
  if(!domains || domains.length < 1) {
    return [
      {
        domain: "localhost:3000",
        defaultLocale: DEFAULT_LOCALE,
        locales: [`${DEFAULT_LOCALE}`],
        enable: true,
        http: true,
      },
    ];
  }
  return domains;
}

const nextTranslate = require('next-translate')
module.exports = withBundleAnalyzer({
  env: {
    API_URL: process.env.API_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },

  generateBuildId: () => {
    // You can, for example, get the latest git commit hash here
    return process.env.LATEST_GIT_HASH || "";
  },
  ...nextTranslate(),
  i18n: {
    locales: ["en-US", "th", "ja"],
    defaultLocale: "en-US",
    localeDetection: false,
    domains: domainsByEnv(),
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999',
          }
        ],
      },
    ]
  },
});
console.log("next.config.js", JSON.stringify(module.exports, null, 2));
