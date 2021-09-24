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
import { FindContractors } from './findContractors'
import { FindProjects } from './findProjects'
import { CreateProject } from './createProject'

type mainContentProps = {
  mainContent: string;
  setMainContent: React.Dispatch<React.SetStateAction<string>>;
};

import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType,
} from '../pages/app';

export const MainContent = ({mainContent, setMainContent}: mainContentProps) => {

  const { channel } = useChatContext<
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
>();


  switch(mainContent) {
    case "Chat":
      return(
        <Channel> 
          <Window> 
            <ChannelHeader /> 
            <MessageList /> 
            <MessageInput Input={MessageInputFlat} /> 
          </Window> 
          <Thread /> 
        </Channel> 
      )
    case "FindContractors":
        return (
          <FindContractors
          {... {
            setMainContent
          }}
          />
        )
    case "FindProjects":
      return (
        <FindProjects/>
      )
    case "CreateProject":
    return (
      <CreateProject/>
    )
  }
}