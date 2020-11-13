import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({

})


const Navbar = () => {
    const classes = useStyles()
    return(
<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
    )
}

export default Navbar;