import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../actions/user.actions.js';
import AppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the profile icon
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const pathName = useLocation();
  const dispatch = useDispatch();
  var user = localStorage.getItem('username');
  var userInfo2 = localStorage.getItem('userInfo');
  const [userInfo, setUserInfo] = useState();
  var points = '';
  if (user) {
    points = JSON.parse(localStorage.getItem('userInfo')).loyaltyPoints;
  }

  const handleLogout = (e) => {
    if (user) {
      e.preventDefault();
      dispatch(signout(user));
      localStorage.removeItem('username');
      navigate('/');
    } else {
      alert('Something went wrong.');
    }
  };

  const tabsList = [
    <Tab key="products" component={Link} to="/products" label="Products" />,
    <Tab key="contact" component={Link} to="/contact" label="Contact" />,
  ];

  if (user) {
    // tabsList.push(
    //    <Tab key="checkout" component={Link} to="/checkout" label="Checkout" />
    // );
    const isUserAdmin = JSON.parse(userInfo2).isAdmin;
    if (isUserAdmin) {
      tabsList.push(
        <Tab
          key="admin-view"
          component={Link}
          to="/admin-view"
          label="Admin View"
        />
      );
    }
  }

  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('userInfo');

      if (item) {
        setUserInfo(item);
      }
    }

    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  return (
    <React.Fragment>
      <AppBar
        elevation={pathName.pathname === '/' ? 0 : 3}
        sx={{
          background:
            pathName.pathname === '/'
              ? 'transparent'
              : 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)',
          position: pathName.pathname === '/' ? 'none' : 'sticky',
        }}
      >
        <Toolbar>
          <Button component={Link} to="/" onClick={() => setValue(false)}>
            <Icon icon="mdi:glasses" width="50" height="50" color="white" />
          </Button>
          <Tabs
            sx={{
              marginLeft: 'auto',
              flexGrow: 1,
              paddingLeft: '30px',
            }}
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
            TabIndicatorProps={{ style: { background: '#FADA5E' } }}
          >
            {React.Children.toArray(tabsList)}
          </Tabs>
          {user ? (
            <IconButton
              onClick={() => setValue(false)}
              component={Link}
              to="/cart"
              sx={{ color: 'white', marginLeft: '22%' }}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <></>
          )}

          {user ? (
            <IconButton
              onClick={() => setValue(false)}
              component={Link}
              to="/profile-view" // Add navigation to the profile page
              sx={{ color: 'white', marginLeft: '10px' }}
            >
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <></>
          )}

          {user ? (
            <>
              Welcome, {user} - Points: {points}
              <Button
                onClick={handleLogout}
                component={Link}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#7865f5',
                  marginLeft: '5%',
                  '&:hover': {
                    backgroundColor: '#4E2A84',
                  },
                }}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setValue(false)}
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#7865f5',
                  marginLeft: '39%',
                  '&:hover': {
                    backgroundColor: '#4E2A84',
                  },
                }}
              >
                LOGIN
              </Button>
              <Button
                onClick={() => setValue(false)}
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#7865f5',
                  marginLeft: '10px',
                  '&:hover': {
                    backgroundColor: '#4E2A84',
                  },
                }}
              >
                SIGN UP
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
