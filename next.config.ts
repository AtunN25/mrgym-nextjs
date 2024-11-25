import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',  // Captura todas las solicitudes que empiecen con /auth
        destination: 'https://mrgymbackendspringboot-production-d49e.up.railway.app/auth/:path*',  // Redirige al backend real
      },
      {
        source: '/cliente/actualizar/:dni', // Captura las solicitudes que empiecen con /cliente/actualizar
        destination: 'https://mrgymbackendspringboot-production-d49e.up.railway.app/cliente/actualizar/:dni',  // Redirige al endpoint real del backend
      },
    ];
  },
};

export default nextConfig;
