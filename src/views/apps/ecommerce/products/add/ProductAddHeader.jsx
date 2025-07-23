// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ProductAddHeader = ({ handleSubmit, edit }) => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {edit ? `Edit ` : `Add a new`} Product
        </Typography>
        <Typography>Orders placed across your store</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='outlined' color='secondary'>
          Discard
        </Button>
        {/* <Button variant='outlined'>Save Draft</Button> */}
        <Button variant='contained' onClick={handleSubmit}>
          {edit ? `Edit` : `Publish`} Product
        </Button>
      </div>
    </div>
  )
}

export default ProductAddHeader
