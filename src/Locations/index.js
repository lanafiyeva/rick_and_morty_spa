import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import '../App.css'
import { API_URLS } from '../urls'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import PaginationControlled from '../Common/pagination'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useHistory } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import InputAdornment from '@mui/material/InputAdornment'
import Input from '@mui/material/Input'

function Locations() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [info, setInfo] = useState({})
  const location = useLocation()
  let history = useHistory()
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))
  const classes = useStyles()
  const page = parseInt(new URLSearchParams(location.search).get('page')) || 1
  const [searchValue, setSeachValue] = React.useState('')
  const [param, setParam] = React.useState('name')
  const URL = '/location'

  const handleChangeSearchValue = (event) => {
    setSeachValue(event.target.value)
  }

  const handleChangeParam = (event) => {
    setParam(event.target.value)
  }

  const handleSearchClick = (event) => {
    let currentUrl = URL + (searchValue ? '/?' + param + '=' + searchValue : '')
    history.push(currentUrl)
  }

  const handleClearSearch = (event) => {
    let currentUrl = URL
    setSeachValue('')
    history.push(currentUrl)
  }

  useEffect(async () => {
    try {
      const response = await fetch(API_URLS.LOCATION + location.search)
      const result = await response.json()
      setIsLoaded(true)
      setItems(result.results)
      setInfo(result.info)
    } catch (e) {
      setIsLoaded(true)
      setError(e)
    }
  }, [location])

  return (
    <>
      <div class="filter-container locations">
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Param</InputLabel>
            <Select
              labelId="name-label"
              id="name-select"
              value={param}
              onChange={handleChangeParam}
            >
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'type'}>Type</MenuItem>
              <MenuItem value={'dimension'}>Dimension</MenuItem>
            </Select>
          </FormControl>

          <Input
            id="name-id"
            label="Name"
            value={searchValue}
            onChange={handleChangeSearchValue}
            endAdornment={
              <InputAdornment position="end">
                {searchValue ? (
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClearSearch}
                  >
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <div class="empty-div" />
                )}
              </InputAdornment>
            }
          />

          <Button variant="contained" onClick={handleSearchClick}>
            Search
          </Button>
        </form>
      </div>

      {!items ? <div>No results</div> : null}
      {items && !items.length ? <div>Загрузка...</div> : null}
      {items && items.length ? (
        <div class="locationstyle">
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">name</TableCell>
                  <TableCell align="right">type</TableCell>
                  <TableCell align="right">dimension</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell align="right">{item.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.type}</TableCell>
                    <TableCell align="right">{item.dimension}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}

      {items && items.length ? (
        <div>
          <PaginationControlled
            pages={info.pages}
            page={page}
            url="/location"
          />
        </div>
      ) : null}
    </>
  )
}

export default Locations
