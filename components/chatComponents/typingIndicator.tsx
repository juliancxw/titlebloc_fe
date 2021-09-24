import { FC } from 'react'
import { useChatContext, useTypingContext } from 'stream-chat-react';


import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from './channelListContainer';

export const TypingIndicator: FC<{ type: string }> = (props) => {
  const { type } = props;

  const { client } = useChatContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const { typing } = useTypingContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  if (!client || !typing) return null;

  if (type === 'list') {
    return (
      <div className='typing-indicator__list'>
        <div className='dots'>
          <div className='dot' />
          <div className='dot' />
          <div className='dot' />
        </div>
      </div>
    );
  }

  const users = Object.values(typing)
    .filter(({ user }) => user?.id !== client.user?.id)
    .map(({ user }) => user?.name || user?.id);

  if (!users.length) return null;

  let text = 'Someone is typing';

  if (users.length === 1) {
    text = `${users[0]} is typing`;
  } else if (users.length === 2) {
    text = `${users[0]} and ${users[1]} are typing`;
  } else if (users.length > 2) {
    text = `${users[0]} and ${users.length - 1} more are typing`;
  }

  return (
    <div className='typing-indicator__input'>
      <div className='dots'>
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
      </div>
      <div className='typing-indicator__input__text'>{text}</div>
    </div>
  );
};
