import React from "react";
import styled from "styled-components";

const Container = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 2.4rem;
   font-weight: 600;
`;
const Error = () => {
   return <Container>Page Not Found 404 </Container>;
};

export default Error;
