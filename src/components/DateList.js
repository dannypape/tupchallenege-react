import React from 'react';
import { IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const DateList = ({dateList, handleRemoveItem}) => {
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
        <List>
            <Grid container alignItems='center'  justify='center' className={classes.spacing}>
                <Grid item >
                    <small>Your selected dates will display below. Click the X icon to remove that entry.</small>
                </Grid>
            </Grid>
            {dateList.map((item, key) => {
                return (
                    <ListItem key={key} divider>
                        <ListItemText primary={moment(item.start).format('MM/DD/YYYY')} secondary="Start" component="span"/>
                        <ListItemText primary={moment(item.end).format('MM/DD/YYYY')} secondary="End" component="span"/>
                        <IconButton  name={item.id} component="span" onClick={() => handleRemoveItem(key)} color="primary">
                            <HighlightOffIcon />
                        </IconButton>
                    </ListItem>
                    
                );
            })}
            
        </List>
    );
}

export default DateList;