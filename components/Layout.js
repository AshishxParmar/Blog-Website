import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
  ThemeProvider,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { createTheme } from '@material-ui/core/styles';
import useStyles from '../utils/styles';
import { Store } from '../utils/Stores';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
const Layout = ({ title, description, children }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? `DARK_MODE_OFF` : `DARK_MODE_ON` });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    closeSnackbar();
    setAnchorEl(null);

    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
    enqueueSnackbar('Logout Successful', { variant: 'success' });
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title}-Shoppers` : 'Shoppers'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Shoopers</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passhref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>

                    <Link href="/admin" passHref>
                      {' '}
                      <MenuItem>Admin Dashboard</MenuItem>
                    </Link>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography variant="h5">All Rights Reserve @Vkaps.co.in</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
