import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      sx = {{
        backgroundImage:'url("../../assets/backgroundimg.jpg")',
        backgroundPosition: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Box
        backgroundColor={theme.palette.background.alt}
        alignItems = "center"
        justifyContent = "center"
        flexDirection = "column"
        display = "center"
        maxWidth = {150}
        margin = "0 auto"
      >
        {/* <Box
          
        /> */}
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} //if on mobile - set 93%
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem" //rounded corners
        backgroundColor={theme.palette.background.alt}
      >
        <Box
          component = "img"
          sx = {{
            align : "center",
            width : "auto",
            height : "180px",
            margin : "0px 0px 20px 0px",
          }}
          alt = "Logo"
          src = "../../assets/logo.png"
        />
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Connect and Inspire!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
