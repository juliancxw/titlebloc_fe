import { StreamChat, LiteralStringForUnion } from 'stream-chat'; 
import { getFunctions, httpsCallable } from "firebase/functions";


export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };


export const StreamInit = async (userId: string) => {
  // // Initialize Stream Chat
  // const client = StreamChat.getInstance<
  //   TeamAttachmentType,
  //   TeamChannelType,
  //   TeamCommandType,
  //   TeamEventType,
  //   TeamMessageType,
  //   TeamReactionType,
  //   TeamUserType
  // >(process.env.NEXT_PUBLIC_STREAM_KEY!);

  // Get user token and connect user

  const functions = getFunctions();
  const getUserToken = httpsCallable(functions, 'userToken');
  const userTokenResult = await getUserToken({ userId })
  const userToken = userTokenResult.data
  // console.log(userId)
  // const connected = await client.connectUser({ id: userId }, userToken as string); 
  // console.log(connected)
  return userToken
}