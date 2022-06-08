module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      // redireciona os links hard coded de documentos do Portal para a API implementada no NextJs
      {
        source: '/Management/GestaoPublicacao/:path*',
        destination: '/api/GestaoPublicacao/:path*',
        permanent: false,
      }
    ]
  },
  images: {
    domains: ['localhost:5000'],
  },
  // suporte para Docker (vide https://github.com/vercel/next.js/blob/canary/examples/with-docker/README.md)
  experimental: {
    outputStandalone: true,
  },  
}
