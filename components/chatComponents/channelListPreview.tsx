import { FC } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  Button,
} from '@mui/material'
import { Avatar, ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react';
import { TeamTypingIndicator } from './customTypingIndicator';
import Link from 'next/link'


import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from '../../pages/app';

type Props = ChannelPreviewUIComponentProps & {
  type: string;
};

export const ChannelListPreview: FC<Props> = (props) => {
  const { channel, setActiveChannel, type } = props;

  const { channel: activeChannel, client } = useChatContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const ChannelPreview = () => (
    <ListItemText>
      # {channel?.data?.name || channel?.data?.id || 'random'}
    </ListItemText>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID,
    );
    const defaultName = 'Johnny Blaze';

    if (!members.length || members.length === 1) {
      const member = members[0];
      return (
        <>
          <Avatar
            image={member.user?.image}
            name={member.user?.name || member.user?.id}
            size={24}
          />
          <ListItemText>{member?.user?.name || member?.user?.id || defaultName}</ListItemText>
          <TeamTypingIndicator type='list' />
        </>
      );
    }

    return (
      <>
        <Box component='span' sx={{ position: 'relative',
          zIndex: '2',
          bottom: '6px',
        }}>
          <Avatar
            image={members[0].user?.image}
            name={members[0].user?.name || members[0].user?.id}
            size={18}
          />
        </Box>
        <Box component='span' sx={{ position: 'relative',
          zIndex: '1',
          right:'10px',
          bottom: '0px',
        }}>
        <Avatar
          image={members[1].user?.image}
          name={members[1].user?.name || members[1].user?.id}
          size={18}
        />
        </Box>
        <ListItemText sx={{maxWidth:'150px', overflow:'hidden'}}>
          {members[0].user?.name || members[0].user?.id || defaultName},{' '}
          {members[1].user?.name || members[1].user?.id || defaultName}
        </ListItemText>
      </>
    );
  };

  return (
    <ListItem disablePadding>
      <Link href="/app">
      <ListItemButton
      selected={channel?.id === activeChannel?.id}
      onClick={(e)=>{
        if (setActiveChannel) {
          setActiveChannel(channel);
        }
      }}
      >
        {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
      </ListItemButton>
      </Link>
    </ListItem>
   
  );
};
