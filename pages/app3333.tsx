import { useEffect, useState } from 'react';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
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
import { AppHeader } from '../components/appHeader'
import { NavDrawer } from '../components/navDrawer'
import { MainContent } from '../components/mainContentContainer'
import { MiniDrawer } from '../components/workspaceDrawer'


export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };

// Stream Chat Theme
const streamTheme = 'messaging light'; 



const App = (props) => {

  // ---- States ----
  // Side Drawer State
  const [mobileMode, setMobileMode] = useState(false);
  // Workspace
  const [workspace, setWorkspace] = useState(false);
  // Main Content State
  const [mainContent, setMainContent] = useState("Chat");
  // Stream Chat Client Initiation
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  const AuthUser = useAuthUser()
  const userId = AuthUser.id
  const theme = useTheme();
  console.log(AuthUser)
  useEffect(() => {
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
      console.log(client)
      setChatClient(client);
      
    }
    streamInit()
    console.log(chatClient)
    return () => {
      chatClient?.disconnectUser();
    };
    
  }, [])

  if (!chatClient) return null;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Chat client={chatClient} theme={streamTheme}>
      <Box>
          <AppHeader {... {
          mobileMode, 
          setMobileMode,
          }}/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Box sx={{ alignItems: 'flex-start'}}>
          <NavDrawer {... {
            mobileMode, 
            setMobileMode,
            userId,
            setMainContent
          }}/>
        </Box>
        <Box sx={{
          borderRadius: '25px',
          flexGrow: 1,
          padding: theme.spacing(3),
          background: '#f7f9fa',
        }}>
          <MainContent {... {
            mainContent,
            setMainContent
          }}/>
        </Box>
      </Box>
      </Chat> 
    </Box>
  )
}

// Note that this is a higher-order function.
// export const getServerSideProps = withAuthUserTokenSSR()()

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  console.log(AuthUser)
 
  return {
    props: {
      favoriteColor: "test",
    },
  }
})

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(App)