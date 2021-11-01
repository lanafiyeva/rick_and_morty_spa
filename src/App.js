import React from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//import NativeSelect from '@material-ui/core/NativeSelect'
import TabPanel from './TabPanel'
import Characters from './Characters'
import Episodes from './Episodes'

function App() {
  //const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Characters" {...a11yProps(0)} />
            <Tab label="Episodes" {...a11yProps(1)} />
            <Tab label="Locations" {...a11yProps(2)} />
            <Tab label="My watchlist" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Characters />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Episodes />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Locations
        </TabPanel>
        <TabPanel value={value} index={3}>
          My watchlist
        </TabPanel>
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
