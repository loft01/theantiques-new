import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

export const generateMetadata = () => generatePageMetadata({ config, params: Promise.resolve({ segments: ['not-found'] }), searchParams: Promise.resolve({}) })

const NotFound = () => NotFoundPage({ config, importMap, params: Promise.resolve({ segments: ['not-found'] }), searchParams: Promise.resolve({}) })

export default NotFound
