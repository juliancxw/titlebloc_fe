import { useEffect, useState, useCallback, Fragment } from 'react'
import {Avatar, Snackbar, Button, IconButton, CssBaseline, TextField, InputAdornment, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, makeStyles } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, onSnapshot, query } from "firebase/firestore"
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import { usePrependedMessagesCount } from 'stream-chat-react';
import debounce from "lodash.debounce"
import { createImmediatelyInvokedArrowFunction } from 'typescript';



const theme = createTheme();

const Register = () => {
  const [username, setUsername] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [usernameChecked, setUsernameChecked] = useState()
  const [usernameResultColor, setUsernameResultColor] = useState()
  const [usernameResultText, setUsernameResultText] = useState()
  const [warningOpen, setWarningOpen] = useState(false);
  const [warning, setWarning] = useState();
  


  const handleWarning = (message) => {
    setWarningOpen(true);
    setWarning(message)
  };

  const handleWarningClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setWarningOpen(false);
  };

  const warningAction = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleWarningClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email')
    const password = data.get('password')

    try {
      const auth = await getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password)
      const db = await getFirestore()
      console.log(db)
      await updateProfile(auth.currentUser, {
        displayName: firstName + " " + lastName
      })
      await setDoc(doc(db, "users", user.user.uid), {
        firstName: firstName,
        lastName: lastName,
        username: username,
      });
    }
    catch(error) {
      handleWarning(error.message)
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
 
  }


  useEffect(()=>{
    if (firstName && lastName && !username){
      setUsername(firstName.toLowerCase() + lastName.toLowerCase())
    }
  },[firstName, lastName])

  const checkUsername = async (username) => {
    if(username){
      const db = await getFirestore()
      const usernamesRef = doc(db, 'usernames', username)
      const docSnap = await getDoc(usernamesRef)
      if (docSnap._document) {
        setUsernameChecked(true)
        setUsernameResultColor("error")
        setUsernameResultText("Username Exists, Please choose another.")
      }
      else {
        setUsernameChecked(true)
        setUsernameResultColor("success")
        setUsernameResultText("Username available!")
      }
    }
    else {
      setUsernameChecked(false)
      setUsernameResultColor(null)
      setUsernameResultText(null)
    }
  }

  const debouncedCheck = useCallback(
    debounce(async (username: string) => {
      await checkUsername(username)}, 1000),
    [],
  );

  //Check if username is available
  useEffect(()=>{
    if (username) {
      debouncedCheck(username);
    }
  }, [username, debouncedCheck])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box mb={4}>
            <img src="/titlebloc01.svg" height='120px'/>
        </Box>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastname"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                focused={usernameChecked}
                color={usernameResultColor}
                helperText={usernameResultText}
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleUsernameChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                <Typography variant="body2" color="secondary">Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={warningOpen}
        autoHideDuration={6000}
        onClose={handleWarningClose}
        message={warning}
        action={warningAction}
      />
    </Container>
  );
}


export default  withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Register)