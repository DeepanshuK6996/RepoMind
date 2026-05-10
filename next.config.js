/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    serverExternalPackages: ['@google/genai', 'google-auth-library'],
    images: {
        remotePatterns: [
          { 
            protocol: "https",
            hostname: "img.clerk.com",  // 👈 add this
          },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },  
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default config;
