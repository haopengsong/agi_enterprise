/**
 * Application Identity (Brand)
 *
 * Also note that the 'Brand' is used in the following places:
 *  - README.md               all over
 *  - package.json            app-slug and version
 *  - [public/manifest.json]  name, short_name, description, theme_color, background_color
 */
export const Brand = {
  Title: {
    Base: 'xGPT',
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'xGPT',
  },
  Meta: {
    Description: 'Launch xGPT to unlock the full potential of AI',
    SiteName: 'xGPT - AI for everyone',
    ThemeColor: '#32383E',
    TwitterSite: '@',
  },
  URIs: {
        Home: 'https://www.google.com',
    CardImage: 'https://www.google.com',
    OpenRepo: 'https://www.google.com',
    OpenProject: 'https://www.google.com',
    SupportInvite: 'https://www.google.com',
    PrivacyPolicy: 'https://www.google.com',
  },
};