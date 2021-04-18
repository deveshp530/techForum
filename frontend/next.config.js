const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'techForum',
    API: 'http://localhost:8000/api',
    PRODUCTION: 'false',
    DOAMIN: 'http://localhost:3000',
    FB_APP_ID: 'fadsfasdfds',
  },
});
