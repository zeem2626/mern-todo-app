import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import conf from "../conf/conf.js"

const Container = styled.div`
   display: flex;
   flex-grow: 1;
   justify-content: center;
   align-items: self-start;
   background: linear-gradient(to right, ${({ theme }) => theme.soft}, ${({ theme }) => theme.medium}); 
`;

const Wrapper = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   top: 15%;
   gap: 3.5rem;
   width: 95%;
   max-width: 35rem;
   background-color: ${({ theme }) => theme.bgHard};
   color: ${({ theme }) => theme.textMedium};
   padding: 3rem 2rem 5rem 2rem;
   font-size: 1.5rem;
   border-radius: 1rem;
`;

const Input = styled.input`
   padding: 0.7rem 0.5rem;
   border: 1px solid ${({ theme }) => theme.textSoft}4;
   color: ${({ theme }) => theme.textMedium};
   background-color: transparent;
   border-radius: 1rem;
   width: 95%;
   outline: none;
`;
const Button = styled.button`
   padding: 0.7rem;
   background-color: ${({ theme }) => theme.medium};
   border: none;
   width: 80%;
   color: ${({ theme }) => theme.bgHard};
   font-weight: 600;
   font-size: 1.6rem;
   border-radius: 1rem;
   cursor: pointer;
`;

const P = styled.p`
  color: ${({ theme }) => theme.medium};
  cursor: pointer;
`

const Register = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const loading = useSelector((state) => state.loading.status);
  const navigate = useNavigate();
    
  const register = async (e) => {
    try {
       e.preventDefault();
       const invalid = [fullName, userName, password].some((elem) => elem.trim() == "");
       if (invalid) {
          alert("Incomplete Details");
          return;
       }

       const res = await axios.post(`${conf.api}/auth/register`, {
        fullName,
          userName,
          password,
       });

      //  dispatch(loginUser(res.data.data.user));
      console.log(res.data.data);
      navigate("/auth/login")
      alert("User Register successfully, Login to continue");
    } catch (error) {
      //  console.log(error.response.data);
       alert(error.response?.data?.message);
    }
 };

 useEffect(() => {
  console.log("Login");
  if(!loading && userStatus){
    navigate("/")
  }
  console.log("Login");
}, [userStatus]);

   return (
      <Container>
         <Wrapper>
            <h1>Sign Up</h1>
            <Input
               type="text"
               placeholder="Fullname"
               onChange={(e) => setFullname(e.target.value)}
            />
            <Input
               type="text"
               placeholder="Username"
               onChange={(e) => setUsername(e.target.value)}
            />
            <Input
               type="password"
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/auth/login" style={{textDecoration:"none"}}>   
              <P>Login</P>
            </Link>
            <Button onClick={(e)=>register(e)}>Register</Button>
         </Wrapper>
      </Container>
   );
};

export default Register;
