import { useState, Fragment, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Container,
  Paper,
  Grid,
  TextField,
  Divider,
} from '@mui/material'
import { makeStyles, useTheme, Theme, createStyles } from '@mui/material/styles';
import {  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  Public as PublicIcon,
  AssignmentIndOutlined as AssignmentIndOutlinedIcon,
  HomeWorkOutlined as HomeWorkOutlinedIcon,
  NextWeekOutlined as NextWeekOutlinedIcon,
  WorkOutlineOutlined as WorkOutlineOutlinedIcon,
  ArchiveOutlined as ArchiveOutlinedIcon,
  QuestionAnswerOutlined as QuestionAnswerOutlinedIcon,
  ExpandLess, ExpandMore,
} from '@mui/icons-material/';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, onSnapshot, query } from "firebase/firestore"

import AppLayout from '../../components/appLayout'
import ProjectType from '../../components/createProjectForms/projectType'
import PropertyType from '../../components/createProjectForms/propertyType'
import ProjectDetails from '../../components/createProjectForms/projectDetails'


const CreateProject = () => {
  const theme = useTheme();
  const [projectType, setProjectType] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [buildingNo, setBuildingNo] = useState<string | null>(null);
  const [streetAddress, setStreetAddress] = useState<string | null>(null);
  const [unitNo, setUnitNo] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState<string | null>(null);
  const [projectPeriod, setProjectPeriod ] = useState<DateRange<Date>>([null, null]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const db = await getFirestore()
      console.log(db)
      await addDoc(collection(db, "projects"), {
        firstName: firstName,
        lastName: lastName,
        username: username,
      });
   
    }
    catch(error) {
      console.log(error)
    } 
  }



  return (
    <Box>
      <Box mx={theme.spacing(3)} mt={theme.spacing(3)} mb={theme.spacing(1)}>
        <Typography component="h2" variant="h6">
          Create Project
        </Typography>
      </Box>
      <Divider/>
      <Paper elevation={1} sx={{ mt:4, mx:3, p: 3, borderRadius:"20px" }}>
        <Typography variant='subtitle1'>PROJECT TITLE:</Typography>
        <Divider/>
        <Box sx={{my:3, display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap'}}>
          <ProjectType {...{
            projectType,
            setProjectType
          }}/>
          <Typography mr={2}>  TO  </Typography>
          <PropertyType {...{
            propertyType,
            setPropertyType
          }}/>
          <Typography mr={2}> AT </Typography>
          <TextField
              id="standard-multiline-flexible"
              label="Blk/Hse No"
              value={buildingNo}
              onChange={(e:ChangeEvent<HTMLInputElement>)=> setBuildingNo(e.target.value.toUpperCase())}
              variant="standard"
              sx={{mr:2, minWidth:'8ch', width:()=>{
                if(buildingNo) return buildingNo.length + 3 + "ch" 
                else return "12ch"
              }, "& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},"& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}}}
            
          />
          <TextField
              id="standard-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              value={streetAddress}
              onChange={(e:ChangeEvent<HTMLInputElement>)=> setStreetAddress(e.target.value.toUpperCase())}
              variant="standard"
              sx={{mr:2, width:()=>{
                if(streetAddress) return streetAddress.length + 3 + "ch" 
                else return "300px"
              }, minWidth:'150px', "& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},"& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}, }}
            
          />
          <TextField
            id="unit-no"
            label="Apt/Unit No"
            value={unitNo}
            onChange={(e:ChangeEvent<HTMLInputElement>)=> setUnitNo(e.target.value.toUpperCase())}
            variant="standard"
            sx={{minWidth:'10ch', width:()=>{
              if(unitNo) return unitNo.length + 3 + "ch" 
              else return "10ch"
            }, mr:2, "& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},"& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}}}
          />
          <Typography mr={2}> SINGAPORE </Typography>
          <TextField
            id="postal-code"
            label="Postal Code"
            value={postalCode}
            onChange={(e:ChangeEvent<HTMLInputElement>)=> setPostalCode(e.target.value.toUpperCase())}
            variant="standard"
            inputProps={{pattern:"[0-9]*", maxlength:"6"}}
            sx={{mr:2, minWidth:'10ch', width:()=>{
              if(postalCode) return postalCode.length + 3 + "ch" 
              else return "10ch"
            }, "& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},"& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}}}
          />
        </Box>
      </Paper>
      <Box my={3} mx={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3, borderRadius:"20px" }}>
              <Typography variant='subtitle1'>PROJECT DETAILS:</Typography>
              <Divider/>
              <ProjectDetails
              {...{
                projectPeriod,
                setProjectPeriod
              }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, borderRadius:"20px" }}>
              <Typography variant='subtitle1'>PROJECT DOCUMENTS:</Typography>
              <Divider/>
            </Paper>
          </Grid>
        </Grid>
        <Button
        variant="contained"
        // onClick={handleNext}
        sx={{ mt: 3, ml: 1 }}
        >
        Create
      </Button>
      </Box>
    </Box>
  );
}

CreateProject.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}



export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(CreateProject)
