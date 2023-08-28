import { Inter } from 'next/font/google'

import { getSession, signOut } from "next-auth/react";
import dbConnect from "../src/utils/dbConnect";
import { Button } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Button onClick={() => {
        signOut({
          callbackUrl: "/auth/signin"
        })
      }}>Sair</Button>
      <h1>Teste</h1>
    </>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();

  let token = "";
  session.accessToken
    ? (token = session.accessToken)
    : (token = session.user.email);

  console.log(session);
  console.log(token);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    }
  }

}

export default Home;
