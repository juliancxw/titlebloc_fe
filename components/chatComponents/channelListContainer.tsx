import { ChannelList, ChannelListProps, LoadMorePaginator, LoadMorePaginatorProps } from 'stream-chat-react';
import { ChannelListLayout } from './channelListLayout'
import { ChannelListPreview } from './channelListPreview'
import type { Channel, ChannelFilters, LiteralStringForUnion, ChannelSort } from 'stream-chat';
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
  return channels.filter((channel) => channel.type === 'team');
};
const customChannelMessagingFilter = (channels: Channel[]) => {
  return channels.filter((channel) => channel.type === 'messaging');
};
export const ChannelListContainer: FC<Props> = (props) => {

  const { userId } = props;

  const filters: ChannelFilters[] = [
    { type: 'team', members: { $in: [userId] } },
    { type: 'messaging', members: { $in: [userId] } },
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
          <ChannelListLayout {...listProps} type='team'/>
        )}
        Preview={(previewProps) => (
          <ChannelListPreview
            {...previewProps}
            type='team'
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