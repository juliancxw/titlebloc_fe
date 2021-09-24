import { useEffect, useState } from 'react'
import {Avatar, Button, CssBaseline, TextField, InputAdornment, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, makeStyles } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore"
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import { usePrependedMessagesCount } from 'stream-chat-react';




const theme = createTheme();

const Register = () => {
  const [username, setUsername] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
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
      console.log(error)
    }
  };

  const handleUsernameChange = () => {

  }
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
 
  }
  useEffect(()=>{
    if (firstName && lastName){
      setUsername(firstName.toLowerCase() + lastName.toLowerCase())
    }
  },[firstName, lastName])

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
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
    </Container>
  );
}


export default  withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Register)