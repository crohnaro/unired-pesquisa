import { getSession, signOut } from "next-auth/react";
import dbConnect from "../src/utils/dbConnect";
import { Button } from "@mui/material";

import TemplateDefault from '../src/template/Default'

const Home = () => {
  return (
    <TemplateDefault>
      <h1>Home</h1>
      <Button
        onClick={() => {
          signOut({
            callbackUrl: "/auth/signin",
          });
        }}
      >
        Sair
      </Button>
      <h1>Teste</h1>
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
