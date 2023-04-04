const devConfig = {
  SERVER_URL: 'http://localhost:4000'
}

const prodConfig = {
  SERVER_URL: 'https://api.wsdalearning.com'
}

export const config = {
  ...(process.env.NODE_ENV === "development" ? devConfig : prodConfig)
}