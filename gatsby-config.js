const { populate } = require('dotenv');

/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const adapter = require("gatsby-adapter-netlify").default

module.exports = {
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),
  siteMetadata: {
    title: `Dictuc`,
    siteUrl: process.env.SITE_URL
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    {
      resolve:"gatsby-omni-font-loader",
      options:{
        enableListener:true,
        preconnect:[`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap`,
          },
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          }
        ]
          }
    },
     {
    resolve: "gatsby-source-strapi",
    options: {
      apiURL: process.env.STRAPI_API_URL,
      accessToken: process.env.STRAPI_TOKEN,
      preview: true,
      collectionTypes: [
        "servicio",
        "menu-superior",
        "carrusel",
        "sector",
        "alerta-modal",
        "tipo-de-servicio",
        "tipo-de-contacto",
        "menu-footer-superior", 
        "menu-footer",
        "menu-secundario",
        "noticia",
        {
          singularName: "pagina",
          queryParams: {
            populate: "all",
            publicationState: "preview"
          }
        }
      ],
      singleTypes: ["agente"],
      queryLimit: 1000,
    },
    },
    {
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn: "https://0b93923ee789184590c8b4fd16c06e4f@o4504873002139648.ingest.us.sentry.io/4509710108524544",
        environment: process.env.NODE_ENV,
        enabled: (() => ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)()
      }
    },
  ]
};