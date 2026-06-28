import express from 'express'
import {
  getHomestays,
  getHomestayById,
  searchHomestays,
  createHomestay,
  updateHomestay,
  deleteHomestay
} from '../controllers/homestayController.js'

const router = express.Router()

router.route('/')
  .get(getHomestays)
  .post(createHomestay)

router.route('/search')
  .get(searchHomestays)

router.route('/:id')
  .get(getHomestayById)
  .put(updateHomestay)
  .delete(deleteHomestay)

export default router
