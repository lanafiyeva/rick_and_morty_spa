import * as React from 'react'
import '../App.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function PaginationControlled({ pages, page, setPage }) {
  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <Stack spacing={2}>
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
  )
}
