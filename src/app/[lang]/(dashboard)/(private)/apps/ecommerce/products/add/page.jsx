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
import { useState } from 'react'

const eCommerceProductsAdd = () => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState(`<p>Keep your account secure with authentication step.</p>`)
  const [files, setFiles] = useState([])
  const [price, setPrice] = useState(0)
  const [status, setStatus] = useState('active')

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('slug', slug)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('status', status)

      // Append multiple images
      files.forEach((file, index) => {
        formData.append('images', file) // backend should expect `images` as array
      })

      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to add product')
      }

      const result = await response.json()
      alert('Product added successfully!')
      console.log('Response:', result)

      // Optional: reset form or navigate
    } catch (error) {
      console.error('Error submitting product:', error)
      alert('There was an error adding the product.')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductAddHeader handleSubmit={handleSubmit} />
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
            <ProductImage files={files} setFiles={setFiles} />
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
