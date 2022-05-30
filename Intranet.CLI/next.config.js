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
}
