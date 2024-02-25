import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import AddTask from "../components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import conf from "../conf/conf";
import { taskFetched } from "../redux/slice/task.slice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
   background: linear-gradient(
      to right,
      ${({ theme }) => theme.soft},
      ${({ theme }) => theme.medium}
   );
   display: flex;
   flex-direction: column;
   min-height: 100vh;
   align-items: center;
   gap: 1rem;
   padding: 4rem 1rem;
`;


const Home = () => {
   const dispatch = useDispatch();
   const userStatus = useSelector((state) => state.user.status);
   const loading = useSelector((state) => state.loading.status);
   const allTasks = useSelector((state) => state.task.data);
   const navigate = useNavigate()

   const fetchTasks = async () => {
      try {
         const res = await axios.get(`${conf.api}/task`, {
            withCredentials: true,
         });

         // console.log(res.data.data);
         dispatch(taskFetched(res.data.data));
      } catch (error) {
         console.log(error);
      }
   };


   useEffect(() => {
    if(!loading && !userStatus){
      navigate("/auth/login")
      return 
    }
      fetchTasks();
      console.log("Home");
   }, [loading, userStatus]);

   return (
      <Container>
         <AddTask fetchTasks={fetchTasks} />

         {allTasks.map((elem) => (
            <TodoItem
               key={elem._id}
               taskId={elem._id}
               todoTitle={elem.title}
               todoContent={elem.content}
               todoDueDate={elem.dueDate}
               fetchTasks={fetchTasks}
            />
         ))}
      </Container>
   );
};

export default Home;
