import { Box } from "@mui/material";

import Header from "../partials/Header/Header";

const Default = ({ children }) => {
  return (
    <>
      <Header />
        <Box sx={{marginTop: '100px'}}>
            {children}
        </Box>
    </>
  );
};

export default Default;
