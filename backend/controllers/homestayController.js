import HomestayModel from '../models/homestayModel.js'

// @desc    Get all homestays (with optional location filtering)
// @route   GET /api/homestays
// @access  Public
export async function getHomestays(req, res, next) {
  try {
    const { location } = req.query
    let homestays = await HomestayModel.getAll()
    
    if (location) {
      homestays = homestays.filter(h => h.location.toLowerCase() === location.toLowerCase())
    }
    
    res.status(200).json(homestays)
  } catch (error) {
    next(error)
  }
}

// @desc    Get homestay by ID
// @route   GET /api/homestays/:id
// @access  Public
export async function getHomestayById(req, res, next) {
  try {
    const homestay = await HomestayModel.getById(req.params.id)
    if (!homestay) {
      res.status(404)
      throw new Error('Homestay not found')
    }
    res.status(200).json(homestay)
  } catch (error) {
    next(error)
  }
}

// @desc    Search homestays
// @route   GET /api/homestays/search
// @access  Public
export async function searchHomestays(req, res, next) {
  try {
    const { q } = req.query
    const results = await HomestayModel.search(q)
    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
}

// @desc    Create new homestay
// @route   POST /api/homestays
// @access  Public (Simulated Admin/Host role)
export async function createHomestay(req, res, next) {
  try {
    const { title, location, price, guests, type, image, rating, reviews, availability, bedrooms, bathrooms, amenities } = req.body
    
    const newHomestay = await HomestayModel.create({
      title,
      location,
      price,
      guests,
      type,
      image,
      rating,
      reviews,
      availability,
      bedrooms,
      bathrooms,
      amenities
    })
    
    res.status(201).json({
      success: true,
      message: 'Homestay listing created successfully',
      data: newHomestay
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
}

// @desc    Update homestay listing
// @route   PUT /api/homestays/:id
// @access  Public
export async function updateHomestay(req, res, next) {
  try {
    const updated = await HomestayModel.update(req.params.id, req.body)
    if (!updated) {
      res.status(404)
      throw new Error('Homestay not found to update')
    }
    
    res.status(200).json({
      success: true,
      message: 'Homestay listing updated successfully',
      data: updated
    })
  } catch (error) {
    if (res.statusCode === 200) res.status(400)
    next(error)
  }
}

// @desc    Delete homestay listing
// @route   DELETE /api/homestays/:id
// @access  Public
export async function deleteHomestay(req, res, next) {
  try {
    const success = await HomestayModel.delete(req.params.id)
    if (!success) {
      res.status(404)
      throw new Error('Homestay not found to delete')
    }
    // Return 204 No Content for successful delete
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
