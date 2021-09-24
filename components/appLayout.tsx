import { useEffect, useState } from 'react';
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
} from 'next-firebase-auth'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { getFunctions, httpsCallable } from "firebase/functions";
import { StreamChat, LiteralStringForUnion } from 'stream-chat'; 
import { 
  Chat, 
  Channel, 
  ChannelHeader, 
  ChannelList, 
  InfiniteScrollPaginator, 
  MessageInput, 
  MessageInputFlat, 
  MessageList, 
  MessageTeam, 
  Thread, 
  Window, 
} from 'stream-chat-react'; 
import 'stream-chat-react/dist/css/index.css';
import { FullscreenExit } from '@mui/icons-material';
import { AppHeader } from './appHeader'
import { NavDrawer } from './navDrawer'
import { WorkspaceDrawer } from './workspaceDrawer'




export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };

type LayoutProps = {
  children: React.ReactNode;
}

// Stream Chat Theme
const streamTheme = 'team light'; 


const AppLayout: React.FC = ({children}: LayoutProps) => {

  // ---- States ----
  // Side Drawer State
  const [mobileMode, setMobileMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Stream Chat Client Initiation
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  const AuthUser = useAuthUser()
  const userId = AuthUser.id
  const theme = useTheme();

  // Get User Token from Firebase and initialise Stream Chat
  useEffect(() => {
    if (!AuthUser.id) return null
    const streamInit = async () => {
      const client = await StreamChat.getInstance<
        TeamAttachmentType,
        TeamChannelType,
        TeamCommandType,
        TeamEventType,
        TeamMessageType,
        TeamReactionType,
        TeamUserType
      >(process.env.NEXT_PUBLIC_STREAM_KEY!);
      const functions = getFunctions();
      const getUserToken = httpsCallable(functions, 'userToken');
      const userTokenResult = await getUserToken({ userId: AuthUser.id })
      const userToken = userTokenResult.data as string
      await client.connectUser({ id: AuthUser.id, name: AuthUser.displayName, }, userTokenResult.data);
      setChatClient(client);
    }
    streamInit()
    return () => {
      chatClient?.disconnectUser();
    };
  },[AuthUser])

  if (!chatClient) return null;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Chat client={chatClient} theme={streamTheme}>
      <Box>
          <AppHeader {... {
          mobileMode, 
          setMobileMode,
          mobileMenuOpen,
          setMobileMenuOpen,
          }}/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Box sx={{ alignItems: 'flex-start'}}>
          {!mobileMode
          ? <WorkspaceDrawer/>
          : <div/>
          }

        </Box>
        <Box sx={{ alignItems: 'flex-start'}}>
          <NavDrawer {... {
            mobileMode, 
            setMobileMode,
            mobileMenuOpen,
            setMobileMenuOpen,
            userId
          }}/>
        </Box>
        <Box sx={{
          // display:'flex',
          // flexDirection:'column',
          borderRadius: '25px',
          flexGrow: 1,
          padding: 0,
          background: '#f7f9fa',
        }}>
          {children}
        </Box>
      </Box>
      </Chat> 
    </Box>
  )
}


export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(AppLayout)

