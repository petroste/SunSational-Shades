import * as React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Collapse, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  colorText: {
    color: '#7865f5',
    fontSize: '3.5rem', // updated font size
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #000',
  },
  colorText2: {
    color: '#7865f5',
    fontSize: '2.5rem', // updated font size
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #000',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: '4.5rem',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textShadow: '2px 2px 4px #000',
  },
  title2: {
    color: '#ffffff',
    fontSize: '2.0rem',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textShadow: '2px 2px 4px #000',
    marginTop: '1rem',
  },
  goDown: {
    color: '#7865f5',
    fontSize: '4rem !important',
  },
}));

export default function LandingHeader() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />{' '}
            <span className={classes.colorText}>SunSational Shades.</span>
          </h1>
          <h3 className={classes.title2}>
            {' '}
            Begin To See The World{' '}
            <span className={classes.colorText2}>SunSationally.</span>
          </h3>
          <Scroll to="landing-content" smooth={true}>
            <IconButton>
              <KeyboardArrowDownIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
