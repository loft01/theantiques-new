import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Messaggio',
    plural: 'Messaggi',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'status', 'createdAt'],
  },
  fields: [
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
      name: 'subject',
      label: 'Oggetto',
      type: 'text',
      required: true,
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
        { label: 'Nuovo', value: 'new' },
        { label: 'Letto', value: 'read' },
        { label: 'Risposto', value: 'replied' },
        { label: 'Archiviato', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
