import React from "react";
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
   font-size: 2rem;
   font-weight: 600;
`;

const Loading = () => {
   return <Container>Loading...</Container>;
};

export default Loading;
