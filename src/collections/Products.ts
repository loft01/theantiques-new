import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Prodotto',
    plural: 'Prodotti',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'price'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req, operation }) => {
        if (operation !== 'update' || !originalDoc) return data

        // Get old image IDs (now images is array of IDs or media objects directly)
        const oldImageIds = (originalDoc.images || [])
          .map((img: string | { id: string }) =>
            typeof img === 'string' ? img : img?.id
          )
          .filter(Boolean)

        // Get new image IDs
        const newImageIds = (data.images || [])
          .map((img: string | { id: string }) =>
            typeof img === 'string' ? img : img?.id
          )
          .filter(Boolean)

        // Find removed images
        const removedImageIds = oldImageIds.filter(
          (id: string) => !newImageIds.includes(id)
        )

        // Delete removed media documents (this triggers R2 cleanup via Media afterDelete hook)
        for (const mediaId of removedImageIds) {
          try {
            await req.payload.delete({
              collection: 'media',
              id: mediaId,
            })
          } catch (error) {
            console.error(`Failed to delete media ${mediaId}:`, error)
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Titolo',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      label: 'Descrizione',
      type: 'richText',
    },
    {
      name: 'images',
      label: 'Immagini',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'price',
      label: 'Prezzo',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'priceLabel',
      label: 'Etichetta Prezzo',
      type: 'select',
      defaultValue: 'asking',
      options: [
        { label: 'Prezzo Richiesto', value: 'asking' },
        { label: 'A Partire Da', value: 'starting' },
        { label: 'Stima', value: 'estimate' },
        { label: 'Fai un\'Offerta', value: 'offer' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      label: 'In Evidenza',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: 'Stato',
      type: 'select',
      defaultValue: 'available',
      required: true,
      options: [
        { label: 'Disponibile', value: 'available' },
        { label: 'In Trattativa', value: 'pending' },
        { label: 'Venduto', value: 'sold' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
