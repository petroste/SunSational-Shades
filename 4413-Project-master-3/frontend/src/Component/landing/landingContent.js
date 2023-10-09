import React from 'react';
import { makeStyles } from '@mui/styles';
import ImageCard from './imageCard';
import places from './places';
import useWindowPosition from './useWindowPosition';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  
  export default function () {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
      <div className={classes.root} id="landing-content">
        <ImageCard place={places[0]} checked={checked}/>
        <ImageCard place={places[1]} checked={checked}/>
      </div>
    );
  }