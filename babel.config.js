const testMode = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: testMode ? ['babel-plugin-istanbul'] : []
}
