'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Third-party Imports
import { useDropzone } from 'react-dropzone'

// Component Imports
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

const ProductImage = ({ files, setFiles, existingImages, setExistingImages }) => {
  // States
  // const [files, setFiles] = useState([])

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    // Handle old image (string path)
    if (typeof file === 'string') {
      const src = `http://localhost:5001/${file}`
      return <img width={38} height={38} alt='preview' src={src} />
    }

    // Handle newly uploaded image
    if (file?.type?.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    }

    return <i className='ri-file-text-line' />
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)

    setFiles([...filtered])
  }

  const handleRemoveExistingFile = url => {
    setExistingImages(prev => prev.filter(img => img !== url))
  }

  const fileList = (
    <List>
      {/* Existing Images */}
      {existingImages.map((img, index) => (
        <ListItem key={`old-${index}`} className='pis-4 plb-3'>
          <div className='file-details'>
            <div className='file-preview'>{renderFilePreview(img)}</div>
            <div>
              <Typography className='file-name font-medium'>{img.split('/').pop()}</Typography>
              <Typography className='file-size' variant='body2'>
                Saved Image
              </Typography>
            </div>
          </div>
          <IconButton onClick={() => handleRemoveExistingFile(img)}>
            <i className='ri-close-line text-xl' />
          </IconButton>
        </ListItem>
      ))}

      {/* New Images */}
      {files.map(file => (
        <ListItem key={file.name} className='pis-4 plb-3'>
          <div className='file-details'>
            <div className='file-preview'>{renderFilePreview(file)}</div>
            <div>
              <Typography className='file-name font-medium' color='text.primary'>
                {file.name}
              </Typography>
              <Typography className='file-size' variant='body2'>
                {Math.round(file.size / 100) / 10 > 1000
                  ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                  : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
              </Typography>
            </div>
          </div>
          <IconButton onClick={() => handleRemoveFile(file)}>
            <i className='ri-close-line text-xl' />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )

  const handleRemoveAllFiles = () => {
    setFiles([])
    setExistingImages([])
  }

  return (
    <Dropzone>
      <Card>
        <CardHeader
          title='Product Image'
          action={
            <Typography component={Link} color='primary.main' className='font-medium'>
              Add media
            </Typography>
          }
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
        />
        <CardContent>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='flex items-center flex-col gap-2 text-center'>
              <CustomAvatar variant='rounded' skin='light' color='secondary'>
                <i className='ri-upload-2-line' />
              </CustomAvatar>
              <Typography variant='h4'>Drag and Drop Your Image Here.</Typography>
              <Typography color='text.disabled'>or</Typography>
              <Button variant='outlined' size='small'>
                Browse Image
              </Button>
            </div>
          </div>
          {files.length > 0 || existingImages.length > 0 ? (
            <>
              {fileList}
              <div className='buttons'>
                <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                  Remove All
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default ProductImage
