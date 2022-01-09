import * as React from 'react'
import '../App.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router-dom'

export default function PaginationControlled({ pages, page, url }) {
  let history = useHistory()
  const handleChange = (event, value) => {
    let currentUrl = url + '?page=' + value
    history.push(currentUrl)
  }

  return (
    <Stack spacing={2}>
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
  )
}
