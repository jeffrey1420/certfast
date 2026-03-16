const appConfig = {
  appKey: process.env.APP_KEY || 'test-app-key-32-characters-minimum',
  http: {
    cookie: {},
    trustProxy: () => true,
  },
}

export default appConfig
