import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "./redux/slice/user.slice.js";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Loading from "./pages/Loading.jsx";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import conf from "./conf/conf.js";
import { darkTheme, lightTheme } from "./utility/Theme.js";
import { loadingEnd } from "./redux/slice/loading.slice.js";

const Container = styled.div`
   display: flex;
   flex-direction: column;
   /* width: 100%; */
   height: 100vh;
   /* border: 3px solid purple; */
`;
function App() {
   const [darkMode, setDarkMode] = useState(0);
   const userStatus = useSelector((state) => state.user.status);
   const loading = useSelector((state) => state.loading.status);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const getCurrentUser = async () => {
      try {
         const res = await axios.get(`${conf.api}/auth/user`, {
            withCredentials: true,
         });

         console.log(res.data.data.user);
         dispatch(loadingEnd());
         dispatch(loginUser(res.data.data.user));
      } catch (error) {
         console.log(error);
         dispatch(loadingEnd());
         dispatch(logoutUser());
      }
   };

   useEffect(() => {
      getCurrentUser();
      if (!loading && !userStatus) {
         navigate("/auth/login");
      }
      console.log("App");
   }, [userStatus]);

   return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
         <Container>
            {loading ? <Loading /> : ""}
            {userStatus ? <Navbar /> : ""}
            <Outlet />
         </Container>
      </ThemeProvider>
   );
}

export default App;
