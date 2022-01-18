import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ClearIcon from '@mui/icons-material/Clear'
import { getItems, removeItem } from '../utils'

export default function CheckboxList() {
  //const [checked, setChecked] = useState([0])
  const [itemsList, setItemsList] = useState([])

  useEffect(() => {
    setItemsList(getItems())
  }, [])

  const handleRemoveItem = (id) => {
    removeItem(id)
    setItemsList(getItems())
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        color: 'black',
      }}
    >
      {itemsList.map((value) => {
        const labelId = `checkbox-list-label-${value}`

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => handleRemoveItem(value.id)}
              >
                <ClearIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText id={labelId} primary={value.name} />
          </ListItem>
        )
      })}
    </List>
  )
}
