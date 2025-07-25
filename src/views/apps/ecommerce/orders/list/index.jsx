'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import OrderCard from './OrderCard'
import OrderListTable from './OrderListTable'

const OrderList = ({ inquiryData }) => {
  return (
    <Grid container spacing={6}>
      {/* <Grid size={{ xs: 12 }}>
        <OrderCard />
      </Grid> */}
      <Grid size={{ xs: 12 }}>
        <OrderListTable inquiryData={inquiryData} />
      </Grid>
    </Grid>
  )
}

export default OrderList
