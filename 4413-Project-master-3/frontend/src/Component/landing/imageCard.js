import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Collapse } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 645,
    margin: '20px',
    justifyContent: 'center',
  },
  media: {
    height: 440,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    textAlign: 'center',
  },
  desc: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#ddd',
    textAlign: 'center',
  },
}));
export default function ImageCard({ place, checked }) {
  const classes = useStyles();
  return (
    <Collapse in={checked} {...(checked ? { timeout: 2000 } : {})}>
      <Card
        className={classes.root}
        sx={{
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
        }}
      >
        <CardMedia className={classes.media} image={place.imageUrl} />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h1"
            sx={{
              fontFamily: 'Nunito',
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            {place.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.desc}
            sx={{ fontFamily: 'Nunito', fontSize: '1.1rem', color: '#ddd' }}
          >
            {place.description}
          </Typography>
        </CardContent>
        <Box textAlign="center">
          {place.cardNumber === 1 ? (
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                fontSize: '2rem',
                margin: '10px',
                fontFamily: 'Nunito',
                backgroundColor: '#7865f5',
                ':hover': { backgroundColor: '#4E2A84' },
              }}
            >
              Shop now.
            </Button>
          ) : (
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              sx={{
                fontSize: '2rem',
                margin: '10px',
                fontFamily: 'Nunito',
                backgroundColor: '#7865f5',
                ':hover': { backgroundColor: '#4E2A84' },
              }}
            >
              Contact Us.
            </Button>
          )}
        </Box>
      </Card>
    </Collapse>
  );
}
