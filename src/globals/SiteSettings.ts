import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Impostazioni Sito',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Nome Sito',
      type: 'text',
      defaultValue: 'The Antiques',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      label: 'Email di Contatto',
      type: 'email',
    },
    {
      name: 'contactPhone',
      label: 'Telefono',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Indirizzo',
      type: 'textarea',
    },
    {
      type: 'group',
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'image',
          label: 'Immagine',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          label: 'Titolo',
          type: 'text',
          defaultValue: 'Timeless Treasures',
        },
        {
          name: 'subtitle',
          label: 'Sottotitolo',
          type: 'text',
          defaultValue: 'Discover unique vintage and antique pieces',
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Link Social',
      type: 'array',
      labels: {
        singular: 'Link Social',
        plural: 'Link Social',
      },
      fields: [
        {
          name: 'platform',
          label: 'Piattaforma',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'footerText',
      label: 'Testo Footer',
      type: 'textarea',
    },
  ],
}
