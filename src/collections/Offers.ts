import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: {
    singular: 'Offerta',
    plural: 'Offerte',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['product', 'createdAt', 'name', 'offerAmount'],
  },
  fields: [
    {
      name: 'product',
      label: 'Prodotto',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefono',
      type: 'text',
    },
    {
      name: 'offerAmount',
      label: 'Importo Offerta',
      type: 'number',
      min: 0,
    },
    {
      name: 'message',
      label: 'Messaggio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      label: 'Stato',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuova', value: 'new' },
        { label: 'Contattato', value: 'contacted' },
        { label: 'Chiusa', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
