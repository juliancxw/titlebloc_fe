import {useEffect,useState } from 'react'; 
import { StreamChat } from 'stream-chat'; 
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
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from 'firebase/app';

export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };
 // Firebase Configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
// }
// initializeApp(firebaseConfig)

 

const sort = { last_message_at: -1 }; 
const theme = 'messaging light'; 
 
const Paginator = (props) => <InfiniteScrollPaginator threshold={300} {...props} />; 
 
const App = () => {
  const AuthUser = useAuthUser()
  const userId = AuthUser.id
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const filters = { type: 'team', members: { $in: [userId] }}; 
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
    // return () => {
    //   chatClient?.disconnectUser();
    // };
    
  }, [])

  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme={theme}> 
    <ChannelList filters={filters} sort={sort} Paginator={Paginator} /> 
    <Channel> 
      <Window> 
        <ChannelHeader /> 
        <MessageList Message={MessageTeam} /> 
        <MessageInput Input={MessageInputFlat} /> 
      </Window> 
      <Thread /> 
    </Channel> 
  </Chat> 
  )
}

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
 
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(App); 
