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
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'hGPT',
  },
  Meta: {
    Description: 'Launch xGPT to unlock the full potential of AI, with precise control over your data and models. Voice interface, AI personas, advanced features, and fun UX.',
    SiteName: 'xGPT | Precision AI for You',
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