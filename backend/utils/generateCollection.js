import fs from 'fs/promises'
import axios from 'axios'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://localhost:5000/api'
const COLLECTION_PATH = path.join(__dirname, '../data/postman_collection.json')
const OUTPUT_FILENAME = 'W4_APICollection_trishul.json'
const OUTPUT_PATH = path.join(__dirname, '../../', OUTPUT_FILENAME)

async function generate() {
  console.log('[API Collector] Starting collection generation...')
  
  // Read base collection
  let collection;
  try {
    const raw = await fs.readFile(COLLECTION_PATH, 'utf-8')
    collection = JSON.parse(raw)
  } catch (error) {
    console.error('Failed to read base postman collection:', error)
    process.exit(1)
  }

  // We will execute the requests sequentially and capture responses
  const items = collection.item
  const newItems = []
  
  let createdHomestayId = null

  for (const item of items) {
    console.log(`[API Collector] Executing request: ${item.name}...`)
    
    let url = item.request.url.raw
    let method = item.request.method
    let headers = {}
    
    // Map headers
    if (item.request.header) {
      item.request.header.forEach(h => {
        headers[h.key] = h.value
      })
    }

    let data = null
    if (item.request.body && item.request.body.raw) {
      data = JSON.parse(item.request.body.raw)
    }

    // Dynamic ID replacement for update/delete
    if (item.name.includes('Update Homestay') || item.name.includes('Delete Homestay')) {
      if (createdHomestayId) {
        url = url.replace(/\/homestays\/\d+/, `/homestays/${createdHomestayId}`)
        item.request.url.raw = url
        item.request.url.path[item.request.url.path.length - 1] = createdHomestayId
      }
    }

    let response;
    let errorOccurred = false;
    let statusText = 'OK'
    let statusCode = 200
    let responseBody = ''
    let responseHeaders = []

    try {
      const res = await axios({
        url,
        method,
        headers,
        data,
        validateStatus: () => true // Do not throw on 404/400
      })
      response = res
      statusCode = res.status
      statusText = res.statusText || (statusCode === 201 ? 'Created' : statusCode === 204 ? 'No Content' : 'OK')
      responseBody = statusCode === 204 ? '' : JSON.stringify(res.data, null, 2)
      
      // Save created homestay ID for next operations
      if (item.name.includes('Create Homestay') && statusCode === 201) {
        createdHomestayId = res.data.data.id
        console.log(`[API Collector] Created Homestay ID: ${createdHomestayId}`)
      }

      // Map response headers
      Object.keys(res.headers).forEach(k => {
        responseHeaders.push({
          key: k,
          value: res.headers[k]
        })
      })
    } catch (err) {
      console.error(`[API Collector] Request failed for ${item.name}:`, err.message)
      errorOccurred = true
    }

    if (!errorOccurred && response) {
      // Build Postman Response object
      const postmanResponse = {
        name: `${item.name} Response`,
        originalRequest: {
          method: item.request.method,
          header: item.request.header || [],
          body: item.request.body || null,
          url: item.request.url
        },
        status: statusText,
        code: statusCode,
        _postman_previewlanguage: 'json',
        header: responseHeaders,
        cookie: [],
        body: responseBody
      }
      
      // Inject example response
      item.response = [postmanResponse]
    }
    
    newItems.push(item)
  }

  collection.item = newItems

  // Save the modified collection
  try {
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(collection, null, 2), 'utf-8')
    console.log(`[API Collector] Success! Saved collection with examples to: ${OUTPUT_PATH}`)
  } catch (error) {
    console.error('Failed to write output collection file:', error)
  }
}

generate()
