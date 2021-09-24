import { memo, FC } from 'react';
import type { ChannelListMessengerProps } from 'stream-chat-react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  Collapse,
  Typography,
  Button,
} from '@mui/material'
import { AddBoxSharp } from '@mui/icons-material';
export type ChannelListProps = ChannelListMessengerProps & {
  type: string;
};


const ChannelList: FC<ChannelListProps> = (props) => {
  const {
    children,
    error = false,
    loading,
    type,
  } = props;

  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Public Channels' : 'Messages'} loading....
        </p>
      </div>
    );
  }

  return (
    <Box>
          
      <List dense='true' disablePadding sx={{maxWidth:'240px', overflow:'hidden'}}>
        <ListSubheader>
        {type === 'team' ? 'Public Channels' : 'Direct Messages'}
        </ListSubheader>
        {children}
      </List>
      
    </Box>
  );
};

export const ChannelListLayout = memo(ChannelList);