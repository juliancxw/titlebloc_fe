// index.tsx
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


import {
  withAuthUser,
  AuthAction,
} from 'next-firebase-auth'

const Home = () => {


  return <div></div>;
}

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(Home)
