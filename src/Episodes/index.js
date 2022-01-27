import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import '../App.css'
import { API_URLS } from '../urls'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import PaginationControlled from '../Common/pagination'
import Button from '@mui/material/Button'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useHistory } from 'react-router-dom'
import { setItem, getFavorites, removeItem } from '../utils'
import { List } from '@mui/material'

function Episodes() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [info, setInfo] = useState({})
  const [favorites, setFavorites] = useState(new Set())
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
  const [name, setName] = React.useState('')
  const [page, setPage] = React.useState(1)
  const url = '/episode'

  useEffect(async () => {
    setFavorites(getFavorites())
    const urlParams = new URLSearchParams(location.search)
    let _page = parseInt(urlParams.get('page')) || 1
    let _name = urlParams.get('name') || ''
    setPage(_page)
    setName(_name)

    const params = new URLSearchParams({
      name: _name,
      page: _page,
    })

    try {
      const response = await fetch(API_URLS.EPISODE + '?' + params.toString())
      const result = await response.json()
      setIsLoaded(true)
      setItems(result.results)
      setInfo(result.info)
    } catch (e) {
      setIsLoaded(true)
      setError(e)
    }
  }, [location.search])

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleSearchClick = (event) => {
    let currentUrl = url + (name ? '?name=' + name : '')
    history.push(currentUrl)
    setItems()
  }

  return (
    <>
      <div class="filter-container">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="name-id"
            label="Name"
            value={name}
            onChange={handleChangeName}
          />

          <Button variant="contained" onClick={handleSearchClick}>
            Search
          </Button>
        </form>
      </div>

      {!items ? <div>No results</div> : null}
      {items && !items.length ? <div>Загрузка...</div> : null}
      {items && items.length ? (
        <div class="episodestyle">
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
                  <TableCell align="right">air_date</TableCell>
                  <TableCell align="right">episode</TableCell>
                  <TableCell>Add to Watchlist</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell align="right">{item.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.air_date}</TableCell>
                    <TableCell align="right">{item.episode}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        onClick={() => {
                          if (favorites.has(String(item.id))) {
                            const filtered = [...favorites].filter(
                              (x) => x !== String(item.id)
                            )

                            const newFilteredFavorites = new Set(filtered)
                            setFavorites(newFilteredFavorites)
                            removeItem(item.id)
                          } else {
                            setItem(item.id, item.name)
                            const newFavorites = new Set([
                              ...favorites,
                              String(item.id),
                            ])
                            setFavorites(newFavorites)
                          }
                        }}
                      >
                        {favorites.has(String(item.id)) ? (
                          <FavoriteIcon></FavoriteIcon>
                        ) : (
                          <FavoriteBorderIcon></FavoriteBorderIcon>
                        )}
                      </Button>
                    </TableCell>
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
            name={name}
            url={url}
          />
        </div>
      ) : null}
    </>
  )
}

export default Episodes
