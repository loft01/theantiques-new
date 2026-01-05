// Script to clear old string icon values from categories
// Run with: npx tsx scripts/clear-icon-strings.ts

import { MongoClient } from 'mongodb'

async function clearIconStrings() {
  const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/theantiques'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db()
    const collection = db.collection('categories')

    // Find categories with string icon values (not ObjectIds)
    const result = await collection.updateMany(
      {
        icon: { $type: 'string' }
      },
      {
        $unset: { icon: '' }
      }
    )

    console.log(`Updated ${result.modifiedCount} categories`)
    console.log('Old string icon values have been cleared')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

clearIconStrings()
