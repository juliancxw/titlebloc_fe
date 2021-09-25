import AppLayout from '../components/appLayout'
import {
  withAuthUser,
  AuthAction,
} from 'next-firebase-auth'
import { ChannelContainer } from '../components/chatComponents/channelContainer'


const Page = () => {

  return (
    <>      
      <ChannelContainer/>  
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}


export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(Page)
