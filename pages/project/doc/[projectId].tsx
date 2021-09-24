import { useState, Fragment, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useChatContext } from 'stream-chat-react';
import { useRouter } from 'next/router'
import {
  withAuthUser,
  AuthAction,
} from 'next-firebase-auth'
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, onSnapshot, query } from "firebase/firestore"
import moment from 'moment';
import { ImageDropzone } from 'react-file-utils';
import AppLayout from '../../../components/appLayout'



const ProjectDocument = () => {
  const theme = useTheme();
  
  const router = useRouter()


  const createProject = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const convertedProjectPeriod = moment().toString(projectPeriod)
    if (!selectedUsers?.length) return;
    let projectId
    const addressArray = streetAddress.split(" ")
    const addressSplice = addressArray.shift()
    const addressTrimed = addressArray.join(" ")
    const addressShort = addressSplice + " " + addressTrimed.match(/\b(\w)/g).join(' ')
    const projectSlug = buildingNo +" " + addressShort +" "+ unitNo
    try {
      const db = await getFirestore()
      console.log(db)
      projectId= await addDoc(collection(db, "projects"), {
        
        projectType: projectType,
        propertyType: propertyType,
        buildingNo: buildingNo,
        streetAddress: streetAddress,
        unitNo: unitNo,
        postalCode: postalCode,
        fullAddress: `${buildingNo} ${streetAddress} ${unitNo} SINGAPORE ${postalCode}`, 
        projectPeriod: convertedProjectPeriod,
        projectTitle: `${projectType} TO ${propertyType} AT ${buildingNo} ${streetAddress} ${unitNo} SINGAPORE ${postalCode}`,
        projectSlug: projectSlug,
      });
   
    }
    catch(error) {
      console.log(error)
    } 
    console.log(projectId.id)
  
    try {
      const newChannel = await client.channel("project",  {
        members: selectedUsers,
        channelType: 'project',
        name: `${projectType} TO ${propertyType} AT ${buildingNo} ${streetAddress} ${unitNo} SINGAPORE ${postalCode}`,
        projectId: projectId.id,
        projectSlug: projectSlug,
        projectType: projectType,
      });
  
      await newChannel.watch();
      setSelectedUsers([client.userID || '']);
      setActiveChannel(newChannel);
      router.push('/app')
    } catch (err) {
      console.log(err);
    }
  };





  return (
    <Box>
      <Box mx={theme.spacing(3)} mt={theme.spacing(3)} mb={theme.spacing(1)}>
        <Typography component="h2" variant="h6">
          PROJECT DOCUMENTS
        </Typography>
      </Box>
      <Divider/>
      <Paper elevation={1} sx={{ mt:4, mx:3, p: 3, borderRadius:"20px" }}>
        <Typography variant='subtitle1'>PROJECT TITLE:</Typography>
        <Divider/>
        <Box sx={{my:3, display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap'}}>
         
        </Box>
      </Paper>
      <Box my={3} mx={3}>
        <Grid
          container spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3, borderRadius:"20px" }}>
              <Typography variant='subtitle1'>PROJECT COLLABORATORS:</Typography>
              <Divider/>
              
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} >
            <Paper elevation={1} sx={{ p: 3, borderRadius:"20px", height:'100%' }}>
              <Typography variant='subtitle1'>PROJECT DETAILS:</Typography>
              <Divider/>
              
            </Paper>
          </Grid>
        </Grid>
        <Box mx={3} sx={{textAlign:'right'}}>
          <Button
            variant="contained"
            onClick={createProject}
            sx={{ mt: 3, ml: 1 }}
            >
            CREATE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

ProjectDocument.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}



export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(ProjectDocument)
