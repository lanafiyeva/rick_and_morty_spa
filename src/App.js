import React from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//import NativeSelect from '@material-ui/core/NativeSelect'
import TabPanel from './TabPanel'
import Characters from './Characters'
import Episodes from './Episodes'
import Locations from './Locations'
import MyWatchlist from './MyWatchlist'
import { Route, Link, Switch, useLocation } from 'react-router-dom'
import Container from '@mui/material/Container'

function App() {
  const location = useLocation()
  const pathlist = ['/character', '/episode', '/location', '/watchlist']
  const pathIndex = pathlist.indexOf(location.pathname)

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Tabs value={pathIndex} aria-label="simple tabs example">
            <Tab
              label="Characters"
              component={Link}
              to="/character"
              {...a11yProps(0)}
            />
            <Tab
              label="Episodes"
              component={Link}
              to="/episode"
              {...a11yProps(1)}
            />
            <Tab
              label="Locations"
              component={Link}
              to="/location"
              {...a11yProps(2)}
            />
            <Tab
              label="My watchlist"
              component={Link}
              to="/watchlist"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>
      </header>
      <body className="app-body" maxWidth="sm">
        <Switch>
          <Route path="/character">
            <Characters />
          </Route>
          <Route path="/episode">
            <Episodes />
          </Route>
          <Route path="/location">
            <Locations />
          </Route>
          <Route path="/watchlist">
            <MyWatchlist />
          </Route>
        </Switch>
      </body>
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default App
