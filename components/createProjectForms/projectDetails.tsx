import{ Fragment, useState } from 'react'
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, makeStyles } from '@mui/material/styles';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


type Props = {
  projectPeriod: DateRange<Date>;
  setProjectPeriod: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
};


const theme = createTheme();

export default function ProjectDetails({projectPeriod, setProjectPeriod}:Props) {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);

  return (
    <Box mt={3}>
      <DateRangePicker
        startText="Tartgeted Start Date"
        endText="Targeted End Date"
        value={projectPeriod}
        onChange={(newValue) => {
          setProjectPeriod(newValue);
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

      
    </Box>
  );
}
