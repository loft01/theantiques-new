import type { CollectionConfig } from 'payload'
import { deleteFromR2 } from '../lib/r2'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        // Delete the main file
        if (doc.filename) {
          await deleteFromR2(doc.filename)
        }
        // Delete all image sizes
        if (doc.sizes) {
          for (const size of Object.values(doc.sizes) as { filename?: string }[]) {
            if (size?.filename) {
              await deleteFromR2(size.filename)
            }
          }
        }
      },
    ],
  },
  upload: {
    disableLocalStorage: true,
    // Resize original to max 1600px and convert to WebP
    resizeOptions: {
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        fit: 'inside',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        fit: 'inside',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Testo Alternativo',
      type: 'text',
    },
  ],
}
