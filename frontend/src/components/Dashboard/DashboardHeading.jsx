import React from 'react'
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

const DashboardHeading = ({heading}) => {
  return (
    <>
        <Card className='headingCard'>
            <Typography className='headingText' variant='h3'>{heading}</Typography>
        </Card>
    </>
  )
}

export default DashboardHeading