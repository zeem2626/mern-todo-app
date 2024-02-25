import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../redux/slice/user.slice.js";
import conf from "../conf/conf.js";
import { asyncHandler } from "../utility/asyncHandler.utility.js";

const Container = styled.div`
   display: flex;
   flex-grow: 1;
   justify-content: center;
   align-items: self-start;
   background: linear-gradient(
      to right,
      ${({ theme }) => theme.soft},
      ${({ theme }) => theme.medium}
   );
`;

const Wrapper = styled.form`
   display: flex;
   flex-direction: column;
   position: relative;
   top: 15%;
   gap: 3.5rem;
   width: 95%;
   max-width: 34rem;
   background-color: ${({ theme }) => theme.bgHard};
   color: ${({ theme }) => theme.textMedium};
   padding: 3rem 2rem 5rem 2rem;
   font-size: 1.5rem;
   border-radius: 1rem;
   text-align: center;
`;

const Input = styled.input`
   padding: 0.7rem 0.5rem;
   border: 1px solid ${({ theme }) => theme.textSoft}4;
   color: ${({ theme }) => theme.textMedium};
   background-color: transparent;
   border-radius: 1rem;
   outline: none;
`;
const Button = styled.button`
   padding: 0.7rem;
   background-color: ${({ theme }) => theme.medium};
   border: none;
   width: 80%;
   margin: auto;
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

const Login = () => {
   const [userName, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const userStatus = useSelector((state) => state.user.status);
   const loading = useSelector((state) => state.loading.status);
   const navigate = useNavigate();

   const login = async (e) => {
      try {
         e.preventDefault();
         const invalid = [userName, password].some((elem) => elem.trim() == "");
         if (userName.trim()=="" || password.trim()=="") {
            alert("Incomplete Details");
            return;
         }

         const res = await axios.post(`${conf.api}/auth/login`, {
            userName,
            password,
         }, {withCredentials: true});

         dispatch(loginUser(res.data.data.user));
         console.log(res.data.data.user);
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
            <h1>Login</h1>
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
            <Link to="/auth/register" style={{textDecoration:"none"}}>   
              <P>Register</P>
            </Link>
            <Button onClick={(e) => login(e)}>Login</Button>
         </Wrapper>
      </Container>
   );
};

export default Login;
