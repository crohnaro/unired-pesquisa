import { getSession, signOut } from "next-auth/react";
import dbConnect from "../src/utils/dbConnect";
import { Button, Container } from "@mui/material";

import TemplateDefault from '../src/template/Default'

const Home = () => {
  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <h1>Home</h1>
      </Container>
      
      
    </TemplateDefault>
  );
};

Home.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();

  let token = session?.accessToken || session?.user?.email || "";

  console.log(session);
  console.log(token);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}

export default Home;
