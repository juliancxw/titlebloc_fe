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

import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import { ChannelContainer } from '../components/chatComponents/channelContainer'

import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType,
} from './app';



export type AttachmentType = Record<string, unknown>;
export type ChannelType = Record<string, unknown>;
export type CommandType = LiteralStringForUnion;
export type EventType = Record<string, unknown>;
export type MessageType = Record<string, unknown>;
export type ReactionType = Record<string, unknown>;
export type UserType = { image?: string };



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
    <div>
      <Channel> 
          <Window> 
            <ChannelHeader /> 
            <MessageList /> 
            <MessageInput Input={MessageInputFlat} /> 
          </Window> 
          <Thread /> 
        </Channel> 
      {/* <ChannelContainer/> */}
    </div>
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
