import { Avatar, Box, IconButton, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Close } from '@material-ui/icons'
import GitHubIcon from '@material-ui/icons/GitHub'
import Login from 'features/Auth/components/Login'
import Register from 'features/Auth/components/Register'
import { logout } from 'features/Auth/userSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: '#ccc',
    zIndex: 1,
  },
  productLink: {
    color: '#fff',
    textDecoration: 'none',
  },
}))

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function Header() {
  const classes = useStyles()
  const loggedInUser = useSelector((state) => state.user.current)
  const isLoggedIn = !!loggedInUser.id
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.LOGIN)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleUserIconClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleLogoutClick = () => {
    const action = logout()
    dispatch(action)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <GitHubIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            GITHUB SHOP
          </Typography>

          <Button color="inherit">Todo</Button>
          <Button color="inherit">Albums</Button>
          <Button color="inherit">
            <NavLink to="/products" className={classes.productLink}>
              Products
            </NavLink>
          </Button>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton onClick={handleUserIconClick}>
              <Avatar />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeIcon} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account, login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account, Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
