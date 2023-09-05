import { getSession, signOut } from "next-auth/react";
import dbConnect from "../src/utils/dbConnect";
import { Button, Container } from "@mui/material";

import TemplateDefault from '../src/template/Default'

import QuestionsAndAnswerForms from '../src/components/QuestionsAndAnswersForms'

const Home = () => {
  return (
    <TemplateDefault>
      
      <QuestionsAndAnswerForms />
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
