const authConfig = {
  default: 'api',
  guards: {
    api: {
      driver: 'bearer',
    },
  },
}

export default authConfig
