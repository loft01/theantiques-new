import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

export async function deleteFromR2(filename: string, prefix = 'media') {
  try {
    const key = `${prefix}/${filename}`
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET || '',
        Key: key,
      })
    )
    console.log(`Deleted from R2: ${key}`)
  } catch (error) {
    console.error(`Failed to delete from R2: ${filename}`, error)
  }
}
