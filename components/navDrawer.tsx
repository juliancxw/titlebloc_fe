import { useState } from 'react';
import {
  Toolbar,
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
  useMediaQuery,
} from '@mui/material'
import { makeStyles, useTheme, Theme, createStyles } from '@mui/material/styles';
import {  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  Public as PublicIcon,
  AssignmentIndOutlined as AssignmentIndOutlinedIcon,
  HomeWorkOutlined as HomeWorkOutlinedIcon,
  NextWeekOutlined as NextWeekOutlinedIcon,
  WorkOutlineOutlined as WorkOutlineOutlinedIcon,
  ArchiveOutlined as ArchiveOutlinedIcon,
  QuestionAnswerOutlined as QuestionAnswerOutlinedIcon,
  ExpandLess, ExpandMore,
} from '@mui/icons-material/';
import { ChannelList, ChannelListProps, LoadMorePaginator, LoadMorePaginatorProps, InfiniteScrollPaginator } from 'stream-chat-react';
import { ChannelSort } from 'stream-chat';
import { ChannelListContainer } from './chatComponents/channelListContainer'

type Props = Omit<ChannelListProps, 'filters'> & {
  mobileMode: boolean;
  setMobileMode: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  filters: object;
  Paginator: InfiniteScrollPaginatorProps;
};



const drawerWidth = 240;



export const NavDrawer = ({mobileMode, setMobileMode, userId, mobileMenuOpen, setMobileMenuOpen, }: Props) => {



  const theme = useTheme();
  

  const handleDrawerToggle = () => {
    setMobileMode(!mobileMode);
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index, page) => {
    setSelectedIndex(index);

  };
  const handleActiveClick = (channel) => {

    
  };
  const [active, setActive] = useState()

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItemButton 
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, "FindContractors")}  
        >
          <ListItemIcon><AssignmentIndOutlinedIcon/></ListItemIcon>
          <ListItemText primary="Find Contractors" />
        </ListItemButton>
        <ListItemButton 
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, "FindProjects")}  
        >
          <ListItemIcon><HomeWorkOutlinedIcon/></ListItemIcon>
          <ListItemText primary="Find Projects" />
        </ListItemButton>
      </List>
      <Divider />
      <ChannelListContainer {...{
        userId
      }}/>
      {/* <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon><WorkOutlineOutlinedIcon/></ListItemIcon>
          <ListItemText primary="Project Enquires" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
         
        </Collapse>
        <ListItem button onClick={() => handleActiveClick("adsfasdf")} >
          <ListItemIcon><NextWeekOutlinedIcon/></ListItemIcon>
          <ListItemText primary="On-going Projects" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ArchiveOutlinedIcon/></ListItemIcon>
          <ListItemText primary="Project Archive" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><QuestionAnswerOutlinedIcon/></ListItemIcon>
          <ListItemText primary="Direct Chats" />
        </ListItem>
      </List> */}
     </Box>
  )

  // Mobile Drawer
  if (useMediaQuery(theme.breakpoints.down('md'))){
    setMobileMode(true)
    return (
      <Box
        sx={{ 
          flexGrow: 1,
          display: 'flex',
        }}
        aria-label="drawer"
      >
        <Drawer
          
          variant="temporary"
          open={mobileMenuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          
          {drawer}
        </Drawer>
      </Box>

    )
  }

  else{
    setMobileMode(false)
    return (
      <Box
      sx={{ 
        flexGrow: 1,
        display: 'flex',
      }}
      aria-label="drawer"
     >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: 'flex',
            [`& .MuiDrawer-paper`]: { width: drawerWidth, border: '0', position: 'static'  },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    );
  }
  
}
