import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import { 
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider 
} from "@material-ui/core/styles";
import DateForm from './components/DateForm';
import DateList from './components/DateList';

function App() {

  const defaultDateList = [];
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  const [ dateList, setDateList ] = useState(defaultDateList);
  const addDates = ({selectedStartDate, selectedEndDate}) => {
    // assigning the datelist to temp variable
    let copy = [...dateList];
    copy = [...copy, { id: dateList.length + 1, start: selectedStartDate, end: selectedEndDate}];
    setDateList(copy);
  }
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleRemoveItem = id => {
    // assigning the datelist to temp variable
    let copy = [...dateList];
    copy.splice(id, 1);
    setDateList(copy);
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1
    }
  }))
  const classes = useStyles();
  return (
    
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start">
              <MenuIcon />
            </IconButton>
            <h4 className={classes.title}>TUP Challenge</h4>
            <Switch checked={darkState} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>

        <Grid container justify='space-around'> 
          <DateForm addDates={addDates}/>
        </Grid>

        <DateList dateList={dateList} handleRemoveItem={handleRemoveItem}/>

      </div>
    </ThemeProvider>
  );
}

export default App;
