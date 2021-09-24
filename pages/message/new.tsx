import { useState, Fragment, ChangeEvent } from 'react';
import { useChatContext } from 'stream-chat-react';
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material'
import { useTheme, } from '@mui/material/styles';

import {
  withAuthUser,
  AuthAction,
} from 'next-firebase-auth'
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, onSnapshot, query } from "firebase/firestore"

import AppLayout from '../../components/appLayout'
import { UserList } from '../../components/chatComponents/userList';


const NewMessage = () => {
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

  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>([client.userID || '']);
  const router = useRouter()
  const createChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("submitting")
    if (!selectedUsers?.length) return;

    try {
      const newChannel = await client.channel("messaging",  {
        members: selectedUsers,
        channelType: 'messaging',
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
          Send a Direct Message
        </Typography>
      </Box>
      <Divider/>
      <Paper elevation={1} sx={{ mt:4, mx:3, p: 3, borderRadius:"20px" }}>
        <Typography variant='subtitle1'>Select reciepients</Typography>
        <Divider/>
        <UserList {...{setSelectedUsers}}/>
      </Paper>
      <Box mx={3} sx={{textAlign:'right'}}>
        <Button
          variant="contained"
          onClick={createChannel}
          sx={{ mt: 3, ml: 1 }}
          >
          Send
        </Button>
      </Box>
        
      
    </Box>
  );
}

NewMessage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}



export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(NewMessage)
