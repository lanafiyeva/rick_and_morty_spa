import React from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//import NativeSelect from '@material-ui/core/NativeSelect'
import TabPanel from './TabPanel'
import Characters from './Characters'
import Episodes from './Episodes'
import { Route, Link, Switch, useLocation } from 'react-router-dom'

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

        <Switch>
          <Route path="/character">
            <Characters />
          </Route>
          <Route path="/episode">
            <Episodes />
          </Route>
          <Route path="/location">Locations</Route>
          <Route path="/watchlist">My watchlist</Route>
        </Switch>
      </header>
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
/*
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))
*/

export default App
