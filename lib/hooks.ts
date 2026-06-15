import { useState, useCallback } from 'react'

// Hook for managing booking form state
export const useBookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000),
    guests: 1,
    roomPreference: '',
    specialRequests: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }, [errors])

  const resetForm = useCallback(() => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 86400000),
      guests: 1,
      roomPreference: '',
      specialRequests: '',
    })
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    updateField,
    setErrors,
    resetForm,
  }
}

// Hook for managing filter state
export const useFilters = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    guests: 0,
    roomType: '',
    amenities: [] as string[],
    searchQuery: '',
  })

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      minPrice: 0,
      maxPrice: 50000,
      guests: 0,
      roomType: '',
      amenities: [],
      searchQuery: '',
    })
  }, [])

  return {
    filters,
    updateFilter,
    resetFilters,
  }
}

// Hook for pagination
export const usePagination = (itemsPerPage: number = 12) => {
  const [currentPage, setCurrentPage] = useState(1)

  const getPaginatedData = useCallback((data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [currentPage, itemsPerPage])

  const getTotalPages = useCallback((dataLength: number) => {
    return Math.ceil(dataLength / itemsPerPage)
  }, [itemsPerPage])

  return {
    currentPage,
    setCurrentPage,
    getPaginatedData,
    getTotalPages,
  }
}

// Hook for managing favorite/wishlist
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>([])

  const addToWishlist = useCallback((id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist((prev) => prev.filter((item) => item !== id))
  }, [])

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }, [])

  const isInWishlist = useCallback((id: number) => {
    return wishlist.includes(id)
  }, [wishlist])

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  }
}
