/** @type {import('next').NextConfig} */

const path = require('path');


const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'app/styles')],
    },
    typescript: {
        //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
        ignoreBuildErrors: false,
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'canvastemplate.com', 'framerusercontent.com', 'firebasestorage.googleapis.com', 'app.framerstatic.com']
        // disableStaticImages: true,
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'lh3.googleusercontent.com',
        //         port: '',
        //         pathname: '/a/**',
        //     },
        //     {
        //         protocol: 'https',
        //         hostname: 'https://framerusercontent.com/',
        //         port: '',
        //         pathname: '**',
        //     },
        //     {
        //         protocol: 'https',
        //         hostname: 'firebasestorage.googleapis.com',
        //         port: '',
        //         pathname: '/**/ecomsai.appspot.com/**',
        //     }
        // ],
    },
    webpack(config) {
        config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' });
        config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });
        return config;
    },
    reactStrictMode: false,
    swcMinify: true,      // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    },
    transpilePackages: ['antd-mobile']
}
module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const path = require('path');
// const runtimeCaching = require('next-pwa/cache');

// const withPWA = require('next-pwa')({
//     dest: 'public',
//     scope: '/',
//     runtimeCaching,
// })
// if (process.env.NODE_ENV === 'development') {
//     const withBundleAnalyzer = require('@next/bundle-analyzer')({
//         enabled: process.env.ANALYZE === 'true',
//     })

//     module.exports = withBundleAnalyzer({
//         sassOptions: {
//             includePaths: [path.join(__dirname, 'app/styles')],
//         },
//         typescript: {
//             //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
//             ignoreBuildErrors: false,
//         },
//         images: {
//             disableStaticImages: true
//         },
//         webpack(config) {
//             config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' });
//             config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });

//             return config;
//         },
//         reactStrictMode: false
//     })
// } else {
//     module.exports = withPWA({
//         // config
//         sassOptions: {
//             includePaths: [path.join(__dirname, 'styles')],
//         },
//         typescript: {
//             //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
//             ignoreBuildErrors: false,
//         },
//         images: {
//             disableStaticImages: true
//         },
//         // experimental: {
//         //   appDir: true,
//         // },
//         // webpack(config) {
//         //   config.module.rules.push({
//         //     test: /\.svg$/,
//         //     use: ["@svgr/webpack"]
//         //   });

//         //   return config;
//         // },
//         reactStrictMode: false
//     })
// }