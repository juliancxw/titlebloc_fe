import { FC } from 'react'
import { ChannelList } from 'stream-chat-react';
import { ChannelListLayout } from './channelListLayout'
import { ChannelListPreview } from './channelListPreview'
import type { Channel, ChannelFilters,  ChannelSort } from 'stream-chat';
import { Box } from '@mui/material'


import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from '../../pages/app';

type Props = {
  userId: string;
};

const customChannelTeamFilter = (channels: Channel[]) => {
  return channels.filter((channel) => channel.type === 'public');
};
const customChannelMessagingFilter = (channels: Channel[]) => {
  return channels.filter((channel) => channel.type === 'messaging');
};
const customChannelProjectFilter = (channels: Channel[]) => {
  return channels.filter((channel) => channel.type === 'project');
};
export const ChannelListContainer: FC<Props> = (props) => {

  const { userId } = props;

  const filters: ChannelFilters[] = [
    { type: 'public', members: { $in: [userId] } },
    { type: 'messaging', members: { $in: [userId] } },
    { type: 'project', members: { $in: [userId] } },
  ];
  const options = { state: true, watch: true, presence: true};
  const sort: ChannelSort<ChannelType> = { last_message_at: -1, updated_at: -1 };

  return(
    <Box sx={{ width:'100%'}}>
      <ChannelList
        channelRenderFilterFn={customChannelTeamFilter}
        filters={filters[0]}
        sort={sort}
        options={options}
        List={(listProps) => (
          <ChannelListLayout {...listProps} type='public' />
        )}
        Preview={(previewProps) => (
          <ChannelListPreview
            {...previewProps}
            type='public'
           
          />
        )}
      />
      
      <ChannelList
        channelRenderFilterFn={customChannelProjectFilter}
        filters={filters[2]}
        sort={sort}
        options={options}
        setActiveChannelOnMount={false}
        List={(listProps) => (
          <ChannelListLayout {...listProps} type='project'/>
        )}
        Preview={(previewProps) => (
          <ChannelListPreview
            {...previewProps}
            type='project'
          />
        )}
      />
      
      <ChannelList
        channelRenderFilterFn={customChannelMessagingFilter}
        filters={filters[1]}
        sort={sort}
        options={options}
        setActiveChannelOnMount={false}
        List={(listProps) => (
          <ChannelListLayout {...listProps} type='messaging'/>
        )}
        Preview={(previewProps) => (
          <ChannelListPreview
            {...previewProps}
            type='messaging'
          />
        )}
      /> 
    </Box>
  )

}