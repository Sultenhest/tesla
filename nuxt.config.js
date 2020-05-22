require('dotenv').config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Tesla',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   ** color: '#2C7A7B',
   ** height: '5px'
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vue-js-modal',
    '~plugins/vue-chartjs',
    '~plugins/v-tooltip',
    '~plugins/global-components',
    '~plugins/vue-draggable'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: #
    '@nuxtjs/auth',
    // Doc: https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    'nuxt-svgicon',
    'vue-sweetalert2/nuxt',
    'nuxt-vue-select',
    '@nuxtjs/moment'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.LARAVEL_ENDPOINT,
    credentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Auth module configuration
   */
  auth: {
    strategies: {
      local: false,
      password_grant: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: { url: '/api/logout', method: 'post' },
          user: {
            url: 'api/user'
          }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/dashboard'
    }
  },
  /*
   ** Toast module configuration
   */
  toast: {
    position: 'top-right',
    duration: 3000,
    // className: ['w-64', 'h-12', 'p-4', 'bg-white', 'rounded'],
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /*
   ** Transition Settings
   */
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    duration: 500
  },
  /*
   ** Route configuration
   */
  router: {
    middleware: ['auth']
  }
}
