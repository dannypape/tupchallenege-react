import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const DateForm = ({ addDates }) => {

  const [selectedStartDate, setSelecteStartDate] = useState(new Date());
  const [selectedEndDate, setSelecteEndDate] = useState(new Date());
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStartDate <= selectedEndDate) {
      addDates({selectedStartDate, selectedEndDate});
      setSelecteStartDate(new Date());
      setSelecteEndDate(new Date());
    }
  }
  const handleStartDateChange = (date) => {
    setSelecteStartDate(date)
  }
  const handleEndDateChange = (date) => {
      setSelecteEndDate(date)
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
                format='M/d/yyyy'
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
                format='M/d/yyyy'
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
            <IconButton type="submit" color="primary">
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
  );
}

export default DateForm;