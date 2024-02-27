import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import conf from "../conf/conf";

const Container = styled.form`
   width: 95%;
   max-width: 80rem;
   /* margin: auto; */
   display: flex;
   flex-direction: column;
   gap: 1rem;
   /* justify-content: center; */
   background-color: #fff;
   padding: 1.5rem 0.5rem;
   border-radius: 1rem;
   align-items: center;
`;
const TextArea = styled.textarea`
   width: 100%;
   outline: none;
   border: 1px solid #11111115;
   /* border: none; */
   border-radius: 1rem;
   padding: 0.8rem 1rem;
`;
const Input = styled.input`
   width: 100%;
   /* width: 86%; */
   outline: none;
   border: 1px solid #11111115;
   /* border: none; */
   border-radius: 1rem;
   padding: 0.8rem 1rem;
`;
const Button = styled.button`
   border: none;
   border-radius: 1rem;
   padding: 0.6rem 1rem;
   width: 50%;
   max-width: 15rem;
   background-color: #45ec98;
`;

const AddTask = ({ fetchTasks }) => {
   const dispatch = useDispatch();
   //  const userStatus = useSelector((state) => state.user.status);
   const userData = useSelector((state) => state.user.data);
   const allTasks = useSelector((state) => state.task.data);
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [dueDate, setDueDate] = useState("");

   const addTask = async (e) => {
      e.preventDefault();
      if (!userData) {
         alert("Login to add task");
         return;
      }

      const invalid = [title, content, dueDate].some(
         (elem) => !elem || elem.trim() == ""
      );
      if (invalid) {
         alert("Incomplete Details");
         return;
      }

      const res = await axios.post(
         `${conf.api}/task`,
         { ownerId: userData._id, title, content, dueDate },
         { withCredentials: true }
      );

      console.log(res.data);
      setTitle("");
      setContent("");
      setDueDate("");
      fetchTasks();
   };

   useEffect(() => {
      console.log("AddTask");
   }, []);

   return (
      <Container>
         <p>Add New Task</p>
         <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
         />
         <TextArea
            placeholder="Your Task"
            onChange={(e) => setContent(e.target.value)}
         />
         <Input
            type="date"
            placeholder="Due Date"
            onChange={(e) => setDueDate(e.target.value)}
         />
         <Button onClick={(e) => addTask(e)}>
            <FaPlus />
         </Button>
      </Container>
   );
};

export default AddTask;
