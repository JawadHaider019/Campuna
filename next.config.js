const nextConfig = {
    headers: async () => {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' https://campuna.de https://campuna.de/version-test https://campuna.vercel.app"
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig