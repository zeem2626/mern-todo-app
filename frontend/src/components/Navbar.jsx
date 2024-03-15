import React from "react";
import styled from "styled-components";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import conf from "../conf/conf.js";
import { logoutUser } from "../redux/slice/user.slice.js";


const Container = styled.div`
   /* background-color: ${({ theme }) => theme.medium}; */
   /* background-color: transparent; */
   background-color: #5fa8f5;
   color: #fff;
   display: flex;
   /* background: linear-gradient(
      to right,
      ${({ theme }) => theme.soft},
      ${({ theme }) => theme.medium}
   ); */
   justify-content: center;
   `;

const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem;
   width: 100%;
   max-width: 80rem;
   /* max-height: 5rem; */
`;

const Button = styled.button`
  border: none;
  /* background-color:  ${({ theme }) => theme.bgMedium};  */
  /* background-color:  ${({ theme }) => theme.hard};  */
  background-color: #e85d74;
  font-weight: 600;
  color:  ${({ theme }) => theme.bgHard}; 
  border-radius: 1rem;
  padding: 0.3rem 1.5rem;
`;

const Navbar = () => {
  const userStatus = useSelector(state=>state.user.status)
  const userData = useSelector(state=>state.user.data)
  const dispatch = useDispatch();

   const logout = async () => {
     try {
       const res = await axios.post(`${conf.api}/auth/logout`,{}, {withCredentials: true});

       console.log(res);
       dispatch(logoutUser());
      } catch (error) {
        console.log(error);
      }
    };
    
    const check = async () => {
      console.log(userData.fullName);
      console.log(userStatus);
    }
   return (
      <Container>
         <Wrapper>
            <h1>Hello, {userData?.fullName.split(" ")[0]}</h1>
            <Button onClick={logout}>
               <HiOutlineLogout style={{ fontSize: "2rem" }} />
            </Button>
            {/* <Button onClick={check}>Check</Button> */}
         </Wrapper>
      </Container>
   );
};

export default Navbar;
