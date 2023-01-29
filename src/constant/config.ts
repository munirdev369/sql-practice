const devConfig = {
  SERVER_URL: 'http://localhost:4000'
}

const prodConfig = {
  SERVER_URL: 'http://192.34.60.197:4000'
}

export const config = {
  ...(process.env.NODE_ENV === "development" ? devConfig : prodConfig)
}