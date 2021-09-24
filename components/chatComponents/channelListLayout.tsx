import { memo, FC, useState, MouseEvent } from 'react';
import Link from 'next/link'
import type { ChannelListMessengerProps } from 'stream-chat-react';
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  IconButton,
  Divider,
  Collapse,
  Typography,
  Button,
  Popover,
} from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment';


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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverId, setPopoverId] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(event.currentTarget.id)
    console.log("test")
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverId(null)
  };

  const channelLabel = (type) => {
    switch (type) {
      case 'public' :
        return (
          <ListSubheader>
            Public Channels
          </ListSubheader>
          )
      case 'project' :
        return (
          <ListSubheader>
            Projects
          </ListSubheader>
          )
      case 'messaging' :
        return (
              <ListItem
                disableGutters="true"
                secondaryAction={
                  <Link href="/message/new" passHref>
                    <IconButton
                      sx={{mr:'4'}}
                      id = "Add"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose} 
                    >
                      <AddCommentIcon color='grey'/>
                      <Popover
                      id="Add"
                      sx={{
                        pointerEvents: 'none',
                      }}
                      open={popoverId == "Add"}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>New Message</Typography>
                    </Popover>
                    </IconButton>
                  </Link>
                }
              >
                <ListSubheader>
                Direct Messages
                </ListSubheader>
              </ListItem>
          
          )
    }
  }

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
        {channelLabel(type)} loading....
        </p>
      </div>
    );
  }

  return (
    <Box>
          
      <List dense='true' disablePadding sx={{maxWidth:'240px', overflow:'hidden'}}>

        {channelLabel(type)}
        {children}
      </List>
      
    </Box>
  );
};

export const ChannelListLayout = memo(ChannelList);