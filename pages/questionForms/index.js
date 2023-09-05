import { getSession, signOut } from "next-auth/react";


import QuestionsAndAnswersForms from '../../src/components/QuestionsAndAnswersForms'




const QuestionForms = () => {
  return (
  
      <QuestionsAndAnswersForms />
      
  );
};

QuestionForms.requireAuth = true;

export async function getServerSideProps({ req }) {
  const { accessToken, user } = await getSession({ req });

  let token = "";
  accessToken ? (token = accessToken) : (token = user.email);

  let img = "";
  user.image ? (img = user.image) : (img = null);

  return {
    props: {
      userEmail: token,
      image: img,
    },
  };
}

export default QuestionForms;
