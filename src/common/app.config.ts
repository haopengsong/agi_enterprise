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
    Base: 'xGLM',
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'xGLM',
  },
  Meta: {
    Description: 'Launch xGLM to unlock the full potential of AI',
    SiteName: 'xGLM - The Generative Large lang Model for everyone',
    ThemeColor: '#32383E',
    TwitterSite: '@',
  },
  URIs: {
        Home: 'https://www.baidu.com',
    CardImage: 'https://www.baidu.com',
    OpenRepo: 'https://www.baidu.com',
    OpenProject: 'https://www.baidu.com',
    SupportInvite: 'https://www.baidu.com',
    PrivacyPolicy: 'https://www.baidu.com',
  },
};