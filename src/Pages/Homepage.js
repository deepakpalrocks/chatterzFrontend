import {
  Box,
  Container,
  Button,
   ButtonGroup,
   Image
} from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useEffect } from "react";

function Homepage() {


  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user){
      history.push("/chats");
    }
  }, [history]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [auth,setAuth]=useState(false);
  const loginWithGoogle=async ()=>{
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      async (userCred)=>{
        console.log(userCred);
        console.log(userCred.user.uid);

        
          const email=userCred.user.email;
          const name=userCred.user.displayName;
          const pic=userCred.user.photoURL;

          try{
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "https://chatterz-backend.deepakpalrocks.repl.co/api/user",
              {
                name,
                email,
                pic,
              },
              config
            );
            console.log(data);
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            // setPicLoading(false);
            window.location.replace("/chats");
          }
          catch(error){
            console.log(error);
            toast({
              title: " Error Occured !",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }

      }
    );
  }
  return (
    <Container maxW="xl" centerContent>
      
    <Box
      d="flex"
      // justifyContent="center"
      alignItems="center"
      p={3}
      bg="rgb(225,231,254)"
      w="100%"
      h="70%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      flexDirection={{ base: "row", md: "column" }}
    >
      <Box p="10% 0% 0% 0%" textAlign={"center"} fontSize={30}>Welcome to ChatterZ app </Box>
      <Box p="0% 0% 10% 0%" textAlign={"center"} fontSize={30}>-Created by Deepak Pal-</Box>
      <Box p='3%'textAlign={"center"}>Login/Signup to continue</Box>
      
      <Button   isLoading={loading} colorScheme='white' bg='white'color='black' onClick={loginWithGoogle}>
        

        <Image fit='cover' height='60%' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"></Image>
        
        Continue With Google</Button>
      </Box>
      </Container>
  );
}

export default Homepage;