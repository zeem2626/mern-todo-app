import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
   width: 100%;
   height: 100vh;
   position: fixed;
   background-color: #33333377;
   color: #fff;
   z-index: 2;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1.6rem;
   font-weight: 600;
`;

const Loading = () => {
   const [serverWarning, setServerNotify] = useState("");
   const loading = useSelector((state) => state.loading.status);

   const notification = async () => {
      setTimeout(() => {
         if (loading) {
            setServerNotify("Server is initialising...");
         } else {
            setServerNotify("");
         }
      }, 2 * 1000);
   };

   useEffect(()=>{
    notification();
   })

   return (
      <Container>
         <h1>Loading...</h1>
         <h1>{serverWarning}</h1>
      </Container>
   );
};

export default Loading;
