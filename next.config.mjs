import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // basePath for GitHub Pages project sites (e.g. /personal-site). Provided by
  // the deploy workflow from actions/configure-pages; empty for root/custom domains.
  // NOTE: we inject it via env rather than letting configure-pages run its
  // `static_site_generator: next` codemod, because that codemod rewrites this
  // file and drops options like `trailingSlash`, which breaks canonical and
  // sitemap URLs. See .github/workflows/node.js.yml.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,

  // Allow dev server access from local network (mobile testing, etc.)
  allowedDevOrigins: ['http://192.168.*.*:3000'],

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  // Turbopack configuration (used in development)
  turbopack: {
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  // Experimental features
  experimental: {
    // TypeScript 7 is the native compiler and does not expose the JavaScript
    // compiler API that Next's build-time type check reaches for, so the build
    // fails outright without this. Shelling out to the TypeScript CLI is the
    // path Next itself names in that error. Verified that type errors still
    // fail the build under this flag.
    useTypeScriptCli: true,

    optimizePackageImports: [
      '@fortawesome/react-fontawesome',
      '@fortawesome/fontawesome-svg-core',
    ],
  },
};

// Bundle analyzer for production build analysis
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
