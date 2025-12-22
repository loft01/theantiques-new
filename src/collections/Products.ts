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
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Immagine',
        plural: 'Immagini',
      },
      fields: [
        {
          name: 'image',
          label: 'Immagine',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
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
