import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: '.env.local' })

import path from 'path'
import fs from 'fs'

// Categories with Italian names
const CATEGORIES = [
  {
    name: 'Grande Arredo',
    slug: 'grande-arredo',
    description: 'Pezzi di arredamento di grande impatto, mobili storici e oggetti decorativi di grandi dimensioni.',
  },
  {
    name: 'Illuminazione',
    slug: 'illuminazione',
    description: 'Lampade, fari e sistemi di illuminazione vintage e industriali.',
  },
  {
    name: 'Sedute',
    slug: 'sedute',
    description: 'Poltrone, divani e sedute di design d\'epoca.',
  },
  {
    name: 'Giocattoli',
    slug: 'giocattoli',
    description: 'Giocattoli vintage e da collezione.',
  },
  {
    name: 'Specchi',
    slug: 'specchi',
    description: 'Specchi decorativi e sartoriali d\'epoca.',
  },
]

// Products from CSV
const PRODUCTS = [
  {
    title: 'Cavallina Originale anni 30-40 Adam Praha',
    description: `Realizzata negli anni '30-'40 dalla manifattura Adam di Praga-Kunratice, questa cavallina professionale da ginnastica rappresenta uno dei più significativi esempi di attrezzatura sportiva dell'epoca. La struttura è in legno massello con gambe inclinate e rinforzi in ferro, regolabile in altezza tramite sistema telescopico a perno. Il corpo è rivestito in cuoio originale, con maniglie metalliche sagomate, e riporta i marchi autentici "ADAM PRAHA" e "ADAM" impressi sul legno. Patina e segni d'uso testimoniano la sua autenticità e lo rendono un pezzo di grande valore storico e collezionistico, ideale sia per ambienti sportivi che come elemento di arredo vintage e industriale.

### Caratteristiche
Autenticità storica: Prodotta negli anni '30-'40 dalla manifattura Adam di Praga-Kunratice, celebre per la realizzazione di attrezzature ginniche esportate in tutta Europa.
Materiali originali: Struttura in legno massello con gambe inclinate rinforzate in ferro e corpo rivestito in cuoio pieno fiore.
Design funzionale: Altezza regolabile tramite gambe telescopiche a perno e maniglie metalliche sagomate per l'allenamento professionale.

### Dimensioni
Lunghezza 160–170 cm, altezza 90–110 cm (variabile), profondità 40–50 cm circa.`,
    price: 4300,
    category: 'grande-arredo',
    imagesBase: 'cavallina',
    imageCount: 4,
    status: 'available' as const,
    featured: true,
  },
  {
    title: 'Pompa Benzina ESSO Anni 50',
    description: `Questa splendida pompa di benzina degli anni '50, del celebre marchio Wayne, è un autentico capolavoro di design vintage. Restaurata con grande attenzione ai dettagli, mantiene tutte le sue targhe originali, che ne certificano la provenienza e l'autenticità. La combinazione cromatica di rosso e bianco, vibrante e iconica, richiama l'estetica classica delle stazioni di servizio dell'epoca, aggiungendo un irresistibile fascino retrò.

Il restauro ha preservato non solo l'aspetto estetico, ma anche l'integrità strutturale, rendendola perfetta come elemento decorativo di grande impatto in collezioni private, showroom o ambienti dallo stile industriale.

### Caratteristiche
Autenticità certificata: Pompa di benzina Wayne originale anni '50 con targhe autentiche.
Restauro accurato: Rifinita per preservare l'estetica vintage e la struttura originale.
Colori iconici: Vivace combinazione di rosso e bianco, tipica del design dell'epoca.

### Dimensioni
Larghezza 63cm, altezza 157cm, profondità 43cm.`,
    price: 3200,
    category: 'grande-arredo',
    imagesBase: 'pompa',
    imageCount: 4,
    status: 'available' as const,
    featured: true,
  },
  {
    title: 'Faro Cinematografico Vintage',
    description: `Questo straordinario faro navale Wiska originale, recuperato da una nave indiana, è un pezzo unico che combina il fascino della tradizione nautica con un tocco moderno. Realizzato in metallo cromato di alta qualità, il faro è stato attentamente restaurato per preservare la sua autenticità e trasformato in una lampada funzionale. Montato su un elegante treppiedi in legno indiano, questo oggetto diventa un punto luce di grande impatto estetico e pratico, perfetto per ambienti raffinati e ricchi di carattere.

Il design del faro, con il suo stile industriale e vintage, si integra perfettamente in spazi dal gusto moderno, retrò o industrial. Il treppiedi regolabile consente di adattarne l'altezza a diverse esigenze, rendendolo ideale per illuminare angoli lettura, salotti o studi creativi.

### Caratteristiche
Autenticità nautica: Faro navale Wiska originale, recuperato da una nave indiana.
Materiali pregiati: Struttura in metallo cromato e treppiedi in legno massello indiano.
Design funzionale: Restaurato e cablato per un utilizzo sicuro come lampada d'interni.

### Dimensioni
Altezza piedistallo chiuso 147cm (aperto 200cm), diametro testa 30cm.`,
    price: 2500,
    category: 'illuminazione',
    imagesBase: 'wiska',
    imageCount: 4,
    status: 'available' as const,
    featured: true,
  },
  {
    title: 'Divano Art Decò anni 30',
    description: `Questo elegante divano in stile Art Déco, progettata dal rinomato designer Guglielmo Ulrich, rappresenta una sintesi perfetta di raffinatezza e comfort. Rivestita in tessuto verde oliva di alta qualità, dona un tocco di calore e carattere a qualsiasi ambiente. I piedini in legno massello, dalle linee pulite e solide, riflettono l'attenzione ai dettagli e l'estetica distintiva tipica del periodo Art Déco.

Perfettamente proporzionato, questo divano non è solo un pezzo di design, ma anche un elemento funzionale ideale per spazi living, angoli lettura o studi eleganti.

### Caratteristiche
Design esclusivo: Progettata da Guglielmo Ulrich, maestro dello stile Art Déco.
Materiali pregiati: Rivestimento in tessuto verde oliva e piedini in legno massello.
Stile senza tempo: Eleganza retrò che si adatta a spazi moderni o classici.

### Dimensioni
Larghezza 200cm, profondità 85cm, altezza 80cm.`,
    price: 1800,
    category: 'sedute',
    imagesBase: 'divanodeco',
    imageCount: 4,
    status: 'available' as const,
    featured: true,
  },
  {
    title: 'Faro Automobile Anni 30',
    description: `Questo faro industriale è un affascinante incontro tra storia e design, realizzato utilizzando un faro originale di un'automobile italiana degli anni '30 a gas, sapientemente ristrutturato e ricablato. Il faro conserva il suo carattere vintage, ma è stato ripristinato per offrire un'illuminazione perfettamente funzionale. La sua struttura metallica, con rifiniture d'epoca, si fonde armoniosamente con il cavalletto, realizzato da un architetto genovese negli anni '40.

Il cavalletto, dal design elegante e sobrio, offre una base stabile e regolabile, ideale per posizionare il faro in diverse angolazioni e adattarlo alle necessità di illuminazione.

### Caratteristiche
Epoca storica: Faro industriale realizzato con faro di automobile italiana anni '30 a gas.
Materiali pregiati: Ristrutturato e ricablato, con cavalletto di un architetto genovese degli anni '40.
Design distintivo: Combinazione di faro automobilistico vintage e treppiede elegante.

### Dimensioni
Altezza piedistallo chiuso 150cm (aperto 180cm), diametro testa 25cm.`,
    price: 1200,
    category: 'illuminazione',
    imagesBase: 'faroauto',
    imageCount: 4,
    status: 'available' as const,
    featured: false,
  },
  {
    title: 'Scultura di elefante in legno',
    description: `Questa testa di elefante scolpita in legno massello è un'autentica opera d'arte decorativa, frutto di un meticoloso lavoro d'intaglio che combina precisione artigianale e senso estetico. Le incisioni minuziose e il gioco di luci sulla superficie del legno danno vita a un pezzo unico, capace di evocare forza, saggezza e armonia con la natura.

Perfetta come decorazione da parete, porta un tocco esotico e raffinato in salotti, ingressi o spazi di rappresentanza.

### Caratteristiche
Maestria artigianale: Scultura in legno massello raffigurante la testa di un elefante, interamente realizzata a mano con incisioni millimetriche.
Materiali pregiati: Intagliata in legno massello di alta qualità, scelto per la sua compattezza e la venatura naturale.
Dettagli realistici: Le incisioni finissime riproducono con precisione le texture della pelle e la maestosità delle zanne.`,
    price: 1000,
    category: 'grande-arredo',
    imagesBase: 'elefante',
    imageCount: 3,
    status: 'available' as const,
    featured: false,
  },
  {
    title: 'Cavallo a dondolo anni 50',
    description: `Questo cavallo a dondolo inglese anni '50 è un autentico pezzo di storia del design d'infanzia. Realizzato in legno massello e rifinito con rotelle in ferro originale, conserva tutto il fascino delle creazioni artigianali del dopoguerra. Le linee dolci e il colore naturale del legno donano un'eleganza discreta, rendendolo ideale sia come oggetto da collezione che come complemento d'arredo.

La patina del tempo valorizza la sua autenticità, trasformando questo cavallo a dondolo in un simbolo di nostalgia e raffinatezza.

### Caratteristiche
Autenticità vintage: Cavallo a dondolo originale degli anni '50, di manifattura inglese.
Materiali di pregio: Realizzato interamente in legno massello con dettagli scolpiti a mano e rotelle in ferro battuto.
Design iconico: Il corpo elegante e le linee morbide richiamano il classico stile britannico del dopoguerra.`,
    price: 800,
    category: 'giocattoli',
    imagesBase: 'cavallino',
    imageCount: 4,
    status: 'available' as const,
    featured: true,
  },
  {
    title: 'Poltrona Art Decò Anni 30',
    description: `Questa elegante poltrona in stile Art Déco, progettata dal rinomato designer Guglielmo Ulrich, rappresenta una sintesi perfetta di raffinatezza e comfort. Rivestita in tessuto verde oliva di alta qualità, dona un tocco di calore e carattere a qualsiasi ambiente. I piedini in legno massello, dalle linee pulite e solide, riflettono l'attenzione ai dettagli e l'estetica distintiva tipica del periodo Art Déco.

Perfettamente proporzionata, questa poltrona non è solo un pezzo di design, ma anche un elemento funzionale ideale per spazi living, angoli lettura o studi eleganti.

### Caratteristiche
Design esclusivo: Progettata da Guglielmo Ulrich, maestro dello stile Art Déco.
Materiali pregiati: Rivestimento in tessuto verde oliva e piedini in legno massello.
Disponibile singola o la coppia.

### Dimensioni
Larghezza 90cm, altezza 80cm, profondità 92cm.`,
    price: 1200,
    category: 'sedute',
    imagesBase: 'poltronadeco',
    imageCount: 4,
    status: 'available' as const,
    featured: false,
  },
  {
    title: 'Specchio 3 ante Sartoriale',
    description: `Questo grande specchio sartoriale a tre ante è un oggetto unico che combina funzionalità ed eleganza. Progettato per adattarsi perfettamente a qualsiasi ambiente, presenta una struttura robusta e un rivestimento esclusivo che lo distingue come pezzo d'arredo di alta qualità. Le tre ante, incernierate con precisione, permettono di regolare l'inclinazione e di creare diverse prospettive, rendendolo ideale per prove di abbigliamento o come elemento decorativo di forte impatto visivo.

Dotato di pratiche ruote, lo specchio può essere spostato con facilità, garantendo versatilità e comodità in ogni spazio.

### Caratteristiche
Design funzionale: Specchio sartoriale con tre ante regolabili.
Facile mobilità: Dotato di ruote per uno spostamento senza sforzo.
Rivestimento esclusivo: Materiali di alta qualità per un look distintivo.

### Dimensioni
Singola Anta: larghezza 63cm, altezza 198cm.`,
    price: 1200,
    category: 'specchi',
    imagesBase: 'specchio3ante',
    imageCount: 4,
    status: 'available' as const,
    featured: true,
  },
  {
    title: "Macchina a pedali Giordani '60",
    description: `Questa macchina a pedali vintage, realizzata dallo storico marchio Giordani, è un'icona del design automobilistico per bambini degli anni '60 e '70. Con il suo profilo affusolato ispirato alle monoposto da corsa, sfoggia una livrea rossa con dettagli sportivi e adesivi originali, testimoni del suo glorioso passato.

La struttura in metallo e plastica rigida, unita alle ruote con cerchi a raggi e al volante in metallo inclinato, riproduce fedelmente l'estetica delle vetture da competizione dell'epoca. I segni del tempo aggiungono autenticità e fascino, rendendola un pezzo da collezione ricco di storia.

### Caratteristiche
Marchio: Giordani
Epoca: Anni '60-'70
Materiali: Metallo e plastica rigida
Design: Ispirato alle auto da corsa d'epoca`,
    price: 600,
    category: 'giocattoli',
    imagesBase: 'giordani',
    imageCount: 4,
    status: 'available' as const,
    featured: false,
  },
  {
    title: 'Faro navale Indiano',
    description: `Questo faro navale restaurato proviene da una cabina navale indiana degli anni '80, e rappresenta un'affascinante fusione di storia e funzionalità. Il faro, completamente restaurato e ricablato, mantiene il suo fascino originale, offrendo un'illuminazione potente e direzionabile. Il cavalletto, risalente agli anni '70 e proveniente da una livella stradale, aggiunge una base stabile e distintiva.

Perfetto come pezzo decorativo o per illuminare spazi moderni e dallo stile vintage.

### Caratteristiche
Oggetto storico: Faro navale restaurato, proveniente da una cabina navale indiana degli anni '80.
Cavalletto originale: Proveniente da una livella stradale degli anni '70.
Ricablato e pronto all'uso: Faro funzionante, perfetto per spazi decorativi o pratici.

### Dimensioni
Altezza piedistallo chiuso 130cm (aperto 180cm), diametro testa 23cm.`,
    price: 450,
    category: 'illuminazione',
    imagesBase: 'faronavale',
    imageCount: 4,
    status: 'available' as const,
    featured: false,
  },
  {
    title: 'Ampio specchio cornice in legno',
    description: `Questo ampio specchio con cornice in legno degli anni '70 è un elegante esempio di design vintage. La cornice, in legno lavorato, cattura perfettamente lo spirito dell'epoca, aggiungendo una nota di raffinatezza e carattere a qualsiasi ambiente. Le dimensioni generose lo rendono perfetto per arredare spazi ampi, come salotti o ingressi, offrendo anche un effetto di luminosità e profondità.

### Caratteristiche
Design vintage: Ampio specchio con cornice in legno degli anni '70.
Eleganza senza tempo: Perfetto per arredare e aggiungere carattere agli spazi.
Versatile: Ideale per salotti, ingressi o altri ambienti ampi.

### Dimensioni
Larghezza 80cm, altezza 151cm.`,
    price: 240,
    category: 'specchi',
    imagesBase: 'specchiolegno',
    imageCount: 4,
    status: 'available' as const,
    featured: false,
  },
]

// Rich text helper
function createRichText(text: string) {
  const paragraphs = text.split('\n\n').filter(p => p.trim())

  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map(p => {
        const isHeading = p.startsWith('### ')
        const content = isHeading ? p.replace('### ', '') : p

        if (isHeading) {
          return {
            type: 'heading',
            tag: 'h3',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: [{ type: 'text', text: content, format: 0, version: 1 }],
          }
        }

        return {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          children: [{ type: 'text', text: content, format: 0, version: 1 }],
        }
      }),
    },
  }
}

async function runSeed() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  console.log('🌱 Starting seed with real products...\n')

  const payload = await getPayload({ config })

  // Clear existing data
  console.log('📦 Clearing existing data...')
  await payload.delete({ collection: 'products', where: { id: { exists: true } } })
  await payload.delete({ collection: 'categories', where: { id: { exists: true } } })
  await payload.delete({ collection: 'media', where: { id: { exists: true } } })
  console.log('   Existing data cleared.\n')

  // Create categories
  console.log('📁 Creating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    const category = await payload.create({
      collection: 'categories',
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        featured: true,
      },
    })
    categoryMap[cat.slug] = String(category.id)
    console.log(`   Created: ${cat.name}`)
  }
  console.log('')

  // Upload image helper
  async function uploadImage(filepath: string, alt: string) {
    const filename = path.basename(filepath)

    // Check if already uploaded
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
    })

    if (existing.docs.length > 0) {
      return existing.docs[0]
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: filepath,
    })

    return media
  }

  // Create products
  console.log('🏺 Creating products...')
  const imagesDir = path.join(process.cwd(), 'public', 'prodotti')

  for (const product of PRODUCTS) {
    // Upload product images
    const productImages = []
    for (let i = 1; i <= product.imageCount; i++) {
      const imagePath = path.join(imagesDir, `${product.imagesBase}-${i}.jpg`)
      if (fs.existsSync(imagePath)) {
        const media = await uploadImage(imagePath, `${product.title} - Immagine ${i}`)
        productImages.push({ image: media.id })
        console.log(`   📷 Uploaded: ${product.imagesBase}-${i}.jpg`)
      }
    }

    // Create slug
    const slug = product.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '')
      .replace(/^-+/, '')

    // Create product
    await payload.create({
      collection: 'products',
      data: {
        title: product.title,
        slug,
        description: createRichText(product.description),
        price: product.price,
        category: categoryMap[product.category],
        status: product.status,
        featured: product.featured,
        images: productImages,
      },
    })
    console.log(`   ✅ Created: ${product.title}`)
  }

  // Update site settings
  console.log('\n⚙️  Updating site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'The Antiques',
      contactEmail: 'info@theantiques.com',
      contactPhone: '+39 02 1234 5678',
      address: 'Via del Design 25, 20121 Milano, Italia',
      hero: {
        title: 'Antiquariato Curato',
        subtitle: 'Pezzi unici con storia, carattere e fascino senza tempo',
      },
      footerText: 'The Antiques. Tutti i diritti riservati.',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/theantiques' },
      ],
    },
  })

  console.log('\n✅ Seed completed successfully!')
  console.log(`   ${CATEGORIES.length} categories created`)
  console.log(`   ${PRODUCTS.length} products created with images`)

  process.exit(0)
}

runSeed().catch((err) => {
  console.error('❌ Seed error:', err)
  process.exit(1)
})
