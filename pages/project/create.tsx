import { useState, ChangeEvent } from 'react';
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
import { getFirestore, addDoc, collection, } from "firebase/firestore"
import moment from 'moment';
import AppLayout from '../../components/appLayout'
import ProjectType from '../../components/createProjectForms/projectType'
import PropertyType from '../../components/createProjectForms/propertyType'
import ProjectDetails from '../../components/createProjectForms/projectDetails'
import { UserList } from '../../components/chatComponents/userList';



const CreateProject = () => {
  const theme = useTheme();
  const { client, setActiveChannel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();
  const [projectType, setProjectType] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [buildingNo, setBuildingNo] = useState<string | null>(null);
  const [streetAddress, setStreetAddress] = useState<string | null>(null);
  const [unitNo, setUnitNo] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState<string | null>(null);
  const [projectPeriod, setProjectPeriod ] = useState<DateRange<Date>>([null, null]);
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>([client.userID || '']);
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
              <UserList {...{setSelectedUsers}}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} >
            <Paper elevation={1} sx={{ p: 3, borderRadius:"20px", height:'100%' }}>
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
