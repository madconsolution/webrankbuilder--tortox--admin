'use client'
// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ProductAddHeader from '@views/apps/ecommerce/products/add/ProductAddHeader'
import ProductInformation from '@views/apps/ecommerce/products/add/ProductInformation'
import ProductImage from '@views/apps/ecommerce/products/add/ProductImage'
import ProductVariants from '@views/apps/ecommerce/products/add/ProductVariants'
import ProductInventory from '@views/apps/ecommerce/products/add/ProductInventory'
import ProductPricing from '@views/apps/ecommerce/products/add/ProductPricing'
import ProductOrganize from '@views/apps/ecommerce/products/add/ProductOrganize'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const eCommerceProductsAdd = () => {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit') === 'true'
  const id = searchParams.get('id')

  // States
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState(`<p>Keep your account secure with authentication step.</p>`)
  const [files, setFiles] = useState([])
  const [price, setPrice] = useState(0)
  const [status, setStatus] = useState('active')
  const [existingImages, setExistingImages] = useState([]) // old images from DB
  const [newImages, setNewImages] = useState([]) // new uploaded files

  // Fetch product if editing
  useEffect(() => {
    if (edit && id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:5001/api/products/${id}`)
          if (!res.ok) throw new Error('Failed to fetch product')

          const product = await res.json()

          // console.log('Product: ', product)

          // Set state with product data
          setName(product.name)
          setSlug(product.slug)
          setDescription(product.description)
          console.log('Product Description: ', product.description)
          setPrice(product.price)
          setStatus(product.status)
          setExistingImages(product.images || []) // assuming images are URLs or filenames

          // Note: handle images separately
          // You may want to set preview images instead of files directly
        } catch (err) {
          console.error('Error fetching product:', err)
        }
      }

      fetchProduct()
    }
  }, [edit, id])

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('slug', slug)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('status', status)

      // Send existing image paths as JSON string
      formData.append('existingImages', JSON.stringify(existingImages))

      // Send new images
      files.forEach(file => {
        formData.append('images', file)
      })

      const url = edit ? `http://localhost:5001/api/products/${id}` : 'http://localhost:5001/api/products'

      const method = edit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to submit product')
      }

      const result = await response.json()
      alert(`Product ${edit ? 'updated' : 'created'} successfully`)
      console.log('Response:', result)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Something went wrong.')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductAddHeader handleSubmit={handleSubmit} edit={edit} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductInformation
              name={name}
              setName={setName}
              slug={slug}
              setSlug={setSlug}
              description={description}
              setDescription={setDescription}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductImage
              files={files}
              setFiles={setFiles}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <ProductVariants />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductInventory />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductPricing price={price} setPrice={setPrice} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductOrganize status={status} setStatus={setStatus} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsAdd
