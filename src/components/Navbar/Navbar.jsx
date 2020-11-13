import {
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Typography,
    makeStyles,
    Button,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h5,
    marginLeft: '.5em'
  },
}))



const Navbar = () => {
  const firebase = useFirebase()
  const profile = useSelector(state => state.firebase.profile)
  const classes = useStyles()
  function loginWithGoogle() {
    return firebase.login({ provider: 'google', type: 'popup' })
  }
  console.log(profile)
  return(
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center" direction="row">
          <Grid item>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              <span className={classes.title}>
                CertiMe
              </span>
            </IconButton>
          </Grid>
          <Grid item>
            { (profile.isLoaded && !profile.isEmpty) && profile.displayName.split()[0] }
            { (profile.isLoaded && !profile.isEmpty) ? <Button color="inherit" onClick={() => firebase.auth().signOut()}>Logout</Button> : <Button color="inherit" onClick={loginWithGoogle}>Login</Button> }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;