import t from 'tap'

const { main } = (await t.mockImport('../src/index.js', {
  '../src/retrieve-nodejs-versions.js': {
    async getNodeJSVersions() {
      return [
        {
          "version": "v21.1.0",
          "date": "2023-10-24",
          "files": [
            "aix-ppc64", "headers", "linux-arm64", "linux-armv7l",
            "linux-ppc64le", "linux-s390x", "linux-x64", "osx-arm64-tar",
            "osx-x64-pkg", "osx-x64-tar", "src", "win-arm64-7z",
            "win-arm64-zip", "win-x64-7z", "win-x64-exe", "win-x64-msi",
            "win-x64-zip", "win-x86-7z", "win-x86-exe", "win-x86-msi",
            "win-x86-zip"
          ],
          "npm": "10.2.0",
          "v8": "11.8.172.15",
          "uv": "1.46.0",
          "zlib": "1.2.13.1-motley",
          "openssl": "3.0.10+quic",
          "modules": "120",
          "lts": false,
          "security": false
        },
        {
          "version": "v21.0.0",
          "date": "2023-10-17",
          "files": [
            "aix-ppc64", "headers", "linux-arm64", "linux-armv7l",
            "linux-ppc64le", "linux-s390x", "linux-x64", "osx-arm64-tar",
            "osx-x64-pkg", "osx-x64-tar", "src", "win-arm64-7z",
            "win-arm64-zip", "win-x64-7z", "win-x64-exe", "win-x64-msi",
            "win-x64-zip", "win-x86-7z", "win-x86-exe", "win-x86-msi",
            "win-x86-zip"
          ],
          "npm": "10.2.0",
          "v8": "11.8.172.13",
          "uv": "1.46.0",
          "zlib": "1.2.13.1-motley",
          "openssl": "3.0.10+quic",
          "modules": "120",
          "lts": false,
          "security": false
        }
      ]
    }
  },
}))


const result = await main({})
t.match(
  result,
  [
    { version: 'v21.1.0' },
    { version: 'v21.0.0' },
  ],
  'should have expected version'
)
