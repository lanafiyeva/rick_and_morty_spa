import React, { useEffect, useState } from 'react'
import '../App.css'
import { API_URLS } from '../urls'
import CharacterCard from './card'
import { makeStyles, withTheme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

function Characters() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
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
  const [status, setStatus] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [species, setSpecies] = React.useState('')

  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }

  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }

  const handleChangeSpecies = (event) => {
    setSpecies(event.target.value)
  }

  useEffect(() => {
    const params = new URLSearchParams({
      status: status,
      gender: gender,
      species: species,
    })

    console.log('status')
    console.log(status)
    fetch(API_URLS.CHARACTER + '?' + params.toString())
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result.results)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [status, gender, species])

  return (
    <>
      <div class="filter-container">
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={status}
              onChange={handleChangeStatus}
            >
              <MenuItem value={'Alive'}>Alive</MenuItem>
              <MenuItem value={'Dead'}>Dead</MenuItem>
              <MenuItem value={'unknown'}>unknown</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={gender}
              onChange={handleChangeGender}
            >
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Genderless'}>Genderless</MenuItem>
              <MenuItem value={'unknown'}>unknown</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="species-id"
            label="Species"
            value={species}
            onChange={handleChangeSpecies}
          />
        </form>
      </div>

      {!items ? <div>No results</div> : null}
      {items && !items.length ? <div>Загрузка...</div> : null}
      {items && items.length ? (
        <div class="cardsstyle">
          {items.map((item) => (
            <CharacterCard character={item} />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default Characters
