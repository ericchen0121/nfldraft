import Analytics from 'analytics'
import mixpanelPlugin from '@analytics/mixpanel'

const analytics = Analytics({
  app: 'NFL Ultimate Mock Draft',
  plugins: [
    mixpanelPlugin({
      token: process.env.REACT_APP_MIXPANEL_TOKEN,
    }),
  ],
})

export default analytics
