const MONGODB_URI = process.env.MONGODB_URI

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined')
    }

    console.log('[Trishul Backend] Connecting to MongoDB Atlas...')

    await mongoose.connect(MONGODB_URI)

    console.log('[Trishul Backend] Connected to MongoDB Atlas successfully')

    await seedDatabase()

    app.listen(PORT, () => {
      console.log(`[Trishul Backend] Server running on port ${PORT}`)
    })

  } catch (err) {
    console.error('[Trishul Backend] Database connection failed:', err.message)
    process.exit(1)
  }
}

startServer()