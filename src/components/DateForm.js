import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const DateForm = ({ addDates }) => {

  const [selectedStartDate, setSelecteStartDate] = useState(null);
  const [selectedEndDate, setSelecteEndDate] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((selectedStartDate !== null) && (selectedEndDate !== null)) {
      if (selectedStartDate <= selectedEndDate) {
        addDates({selectedStartDate, selectedEndDate});
        setSelecteStartDate(null);
        setSelecteEndDate(null);
        setDisabled(true);
      }
    }
  }
  const handleClear = (e) => {
    e.preventDefault();
    setSelecteStartDate(null);
    setSelecteEndDate(null);
    setDisabled(true); 
  }
  const handleStartDateChange = (date) => {
    setSelecteStartDate(date);
    setDisabled(false);
  }
  const handleEndDateChange = (date) => {
      setSelecteEndDate(date);
      setDisabled(false);
  }
  
  const useStyles = makeStyles((theme) => ({
    inputs: {
      flexGrow: 1
    },
    spacing: {
      padding: '8px 16px'
    }
  }))
  const classes = useStyles();
  return (
      <form onSubmit={handleSubmit} className={classes.spacing}>
        <p>Select your Start and End dates and click the Plus button to reserve your dates.</p>
        <Grid container alignItems='center'>
          <Grid item className={classes.inputs}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker 
                disableToolbar
                variant='dialog'
                format='MM/dd/yyyy'
                margin='normal'
                id='start-date-picker'
                label='Start Date'
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardDatePicker 
                disableToolbar
                variant='dialog'
                format='MM/dd/yyyy'
                margin='normal'
                id='end-date-picker'
                label='End Date'
                value={selectedEndDate}
                onChange={handleEndDateChange}
                minDate={selectedStartDate}
                KeyboardButtonProps={{
                'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item >
            <IconButton type="submit" disabled={disabled} color="primary">
              <AddCircleIcon />
            </IconButton>
            <IconButton color="primary" disabled={disabled} onClick={handleClear}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
  );
}

export default DateForm;