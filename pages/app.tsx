import { ReactElement, useEffect } from 'react'
import AppLayout from '../components/appLayout'
import { 
  Channel, 
  ChannelHeader, 
  MessageInput, 
  MessageInputFlat, 
  MessageList, 
  Thread, 
  Window, 
  useChatContext,
} from 'stream-chat-react'; 
import { Box } from '@mui/material'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import { ChannelContainer } from '../components/chatComponents/channelContainer'
import { CustomMessageInput } from '../components/chatComponents/customMessageInput'



export type AttachmentType = Record<string, unknown>;
export type ChannelType = Record<string, unknown>;
export type CommandType = LiteralStringForUnion;
export type EventType = Record<string, unknown>;
export type MessageType = Record<string, unknown>;
export type ReactionType = Record<string, unknown>;
export type UserType = { image?: string };

export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };

const Page = () => {

  const AuthUser = useAuthUser()
  const userId = AuthUser.id

  const { channel } = useChatContext<
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType
>();

  return (
    <>
      {/* <Channel
        Input={CustomMessageInput}
      > 
          <Window> 
            <ChannelHeader /> 
            <MessageList /> 
            <MessageInput Input={MessageInputFlat} /> 
          </Window> 
          <Thread /> 
        </Channel>  */}
        
          <ChannelContainer/>
        
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}


export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(Page)
