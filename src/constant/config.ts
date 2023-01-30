const devConfig = {
  SERVER_URL: 'https://api.wsdalearning.com'
}

const prodConfig = {
  SERVER_URL: 'https://api.wsdalearning.com'
}

export const config = {
  ...(process.env.NODE_ENV === "development" ? devConfig : prodConfig)
}