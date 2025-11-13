import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0', // Allow external connections for mobile testing
    port: 8080,
    strictPort: true,
  },
  build: {
    target: 'es2020', // ES2020 for BigInt support (transformers) + good mobile browser support
    assetsInlineLimit: 4096, // Reduce HTTP requests
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks (critical)
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          'ui-core': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          
          // Backend chunks
          'supabase': ['@supabase/supabase-js'],
          'query': ['@tanstack/react-query'],
          
          // Heavy feature chunks (lazy loaded)
          'charts': ['recharts'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ai-heavy': ['@huggingface/transformers'],
          
          // UI components (grouped by usage)
          'ui-advanced': [
            '@radix-ui/react-tabs', 
            '@radix-ui/react-accordion',
            '@radix-ui/react-slider',
            '@radix-ui/react-progress',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.debug', 'console.trace'] : [],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: '3BI.AI - Enterprise AI Platform',
        short_name: '3BI.AI',
        description: 'Premium AI platform integrating Grok, Claude 4, GPT-5, and more',
        theme_color: '#8b5cf6',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        categories: ['productivity', 'ai', 'business']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/jmazzsxnatfewblgpxfq\.supabase\.co\/rest\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours for offline support
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/jmazzsxnatfewblgpxfq\.supabase\.co\/functions\/v1\/grok$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'grok-streaming-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours for offline support
              },
              networkTimeoutSeconds: 30,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/jmazzsxnatfewblgpxfq\.supabase\.co\/functions\/(ai-chat|advanced-ai)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ai-responses-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 // 1 hour for AI responses
              },
              networkTimeoutSeconds: 30,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/jmazzsxnatfewblgpxfq\.supabase\.co\/functions\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'edge-functions-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 2 // 2 minutes
              },
              networkTimeoutSeconds: 15,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
