import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: 'maroon',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    fontFamily: '',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    backgroundColor: 'yellow',
    marginTop: '100px',
    textAlign: 'center',
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
});
export default useStyles;
