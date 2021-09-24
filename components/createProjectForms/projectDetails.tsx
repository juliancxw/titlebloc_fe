import{ Fragment, useState } from 'react'
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, makeStyles } from '@mui/material/styles';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';



const theme = createTheme();

export default function ProjectDetails() {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);

  return (
    <Box mt={3}>
     
      <DateRangePicker
        startText="Tartgeted Start Date"
        endText="Targeted End Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        inputFormat="DD/MM/YYYY"
        renderInput={(startProps, endProps) => (
          <Fragment>
            <TextField variant="standard" sx={{"& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},
        "& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}, }} {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField variant="standard" sx={{"& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},
        "& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}, }} {...endProps} />
          </Fragment>
        )}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
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
            autoComplete="lname"
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
