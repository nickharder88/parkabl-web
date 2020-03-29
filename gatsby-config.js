const siteUrl = 'https://parkabl.com';

module.exports = {
  siteMetadata: {
    title: 'parkabl',
    siteUrl,
    menu: {
      admin: {
        links: [
          {
            key: 'dashboard',
            name: 'Dashboard',
            icon: 'dashboard'
          },
          {
            key: 'operators',
            name: 'Operators',
            icon: 'rv_hookup'
          },
          {
            key: 'landlords',
            name: 'Landlords',
            icon: 'business'
          },
          {
            key: 'tenants',
            name: 'Tenants',
            icon: 'person'
          }
        ]
      },
      operator: {
        links: []
      },
      landlord: {
        links: []
      },
      tenant: {
        links: []
      }
    }
  },
  plugins: [
    'gatsby-plugin-flow',
    'gatsby-plugin-top-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      }
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'parkabl',
        short_name: 'parkable',
        lang: 'en',
        start_url: siteUrl,
        background_color: '#f2f2f2',
        theme_color: '#3f61b5'
      }
    }
  ]
};
