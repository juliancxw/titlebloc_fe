import { useState, MouseEvent } from 'react';
import Link from 'next/link'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  Toolbar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Divider,
  Collapse,
  Typography,
  useMediaQuery,
  Popover,
  Avatar,
} from '@mui/material'
import {
  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  Public as PublicIcon,
  Add as AddIcon,
} from '@mui/icons-material/';




const drawerWidth = 60;


export const WorkspaceDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverId, setPopoverId] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(event.currentTarget.id)
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverId(null)
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index, page) => {
    setSelectedIndex(index);

  };

  return (
    <Box
      sx={{ 
        flexGrow: 1,
        display: 'flex',
        height: '100%',
      }}
    >      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'static', },
        }}
      >
        <List>
          <ListItemButton
            id = "Global"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0, "FindContractors")}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose} 
            sx={{ justifyContent: 'center' }}
          >
              <ListItemIcon  sx={{ fontSize: 40, justifyContent: 'center' }} ><PublicIcon/></ListItemIcon>
              <Popover
                  id="Global"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={popoverId == "Global"}
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
                  <Typography sx={{ p: 1 }}>Global Workspace</Typography>
                </Popover>
            </ListItemButton>
        </List>
        <Divider />
        <List>
          {['Project 1', 'Project 2', 'Project 3', 'Project 4'].map((text, index) => (
            <ListItem button 
                key={text}
                id={text}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{  justifyContent: 'center'  }} 
            >
             
                <Avatar sx={{  width: 40, height: 40, justifyContent: 'center'  }} variant="rounded">
                  <Typography sx={{ p: 1 }}>{text[0]}</Typography>
                </Avatar>
            
              <Popover
                id={text}
                sx={{
                  pointerEvents: 'none',
                }}
                open={popoverId == text}
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
                <Typography sx={{ p: 1 }}>{text}</Typography>
              </Popover>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <Link href="/project/create" passHref>
            <ListItemButton
                id = "Add"
                component="a"
                selected={selectedIndex === 0}
                // onClick={onClick}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ justifyContent: 'center' }}
              >
                <ListItemIcon sx={{justifyContent: 'center' }}><AddIcon/></ListItemIcon>
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
                    <Typography sx={{ p: 1 }}>Create New Project</Typography>
                  </Popover>
              </ListItemButton>
            </Link>
        </List>
      </Drawer>
     
    </Box>
  );
}
