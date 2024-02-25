import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../redux/slice/user.slice";
import { format } from "timeago.js";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";
import conf from "../conf/conf";

// const Container = styled.div`
//    border: 1px solid red;
// `;
const Wrapper = styled.div`
   border: 1px solid ${({ theme }) => theme.textSoft}1;
   background-color: #e3fffd;
   max-width: 80rem;
   width: 95%;

   /* text-align:center */
   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
   display: flex;
   flex-direction: column;
   /* align-items: center; */
   /* justify-content: start; */
   gap: 0.8rem;
   border-radius: 1rem;
   padding: 1rem;
`;

const TextArea = styled.textarea`
   border: 1px solid
      ${({ readOnly, theme }) => (readOnly ? "#0000000" : theme.textSoft)}2;
   outline: none;
   background-color: transparent;
   border-radius: 1rem;
   color: #111;
   padding: 0.3rem 0.5rem;
`;
const Input = styled.input`
   border: 1px solid
      ${({ readOnly, theme }) => (readOnly ? "#0000000" : theme.textSoft)}2;
   outline: none;
   /* flex-grow: 1; */
   background-color: transparent;
   border-radius: 1rem;
   padding: 0.4rem 0.5rem;
   /* margin: 0.3rem 0; */
   color: #111;
   /* max-width: 80%; */
   /* margin-right: 1rem; */
   /* white-space: nowrap; */
   /* text-overflow: ellipsis; */
   /* line-height: 3rem; */
`;
const DropIcon = styled.div`
   /* width: 100%; */
   /* height: 100%; */
   height: 2rem;
   /* width: 4rem; */
`;

const P = styled.p`
   font-size: 1rem;
`;

const ItemHeader = styled.div`
   display: flex;
   justify-content: space-between;
`;

const ItemFooter = styled.div`
   display: flex;
   justify-content: space-between;
`;

const Button = styled.button`
   font-size: 1.6rem;
   padding: 0.2rem 1rem;
   /* display: flex; */
   border: none;
   cursor: pointer;
   border-radius: 1rem;
   background-color: transparent;
   background-color: #3d8;
   color: ${({ theme }) => theme.textSoft};
   /* color: ${({ theme }) => theme.bgHard}; */
`;

const ButtonWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;
`;

const TodoItem = ({ taskId, todoTitle, todoContent, todoDueDate, fetchTasks }) => {
   const [openTask, setOpenTask] = useState(0);
   const [zIndex, setzIndex] = useState(1);
   const [readOnly, setReadOnly] = useState(true);

   const [title, setTitle] = useState(todoTitle);
   const [content, setContent] = useState(todoContent);
   const [dueDate, setDueDate] = useState(todoDueDate);

   const dispatch = useDispatch();
   const allTasks = useSelector((state) => state.task.data);

   const editTask = () => {
      setzIndex(-1 * zIndex);
      setReadOnly(!readOnly);
   };

   const saveTask = async () => {
      setzIndex(-1 * zIndex);
      const res = await axios.put(
         `${conf.api}/task/${taskId}`,
         { title, content, dueDate },
         { withCredentials: true }
      );

      console.log(res.data);

      setReadOnly(!readOnly);
   };

   const deleteTask = async () => {
      const res = await axios.delete(`${conf.api}/task/${taskId}`, {
         withCredentials: true,
      });

      fetchTasks();
      console.log(res.data);
   };

   const check = () => {
      console.log(allTasks);
   };

   return (
      <Wrapper key={taskId}>
         <ItemHeader>
            <Input
               readOnly={readOnly}
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               style={{ fontSize: "1.4rem", fontWeight: "600" }}
            />
            <DropIcon>
               <FaChevronDown
                  onClick={() => setOpenTask(!openTask)}
                  style={{
                     cursor: "pointer",
                     fontSize: "1.4rem",
                     height: "100%",
                     width: "100%",
                  }}
               />
            </DropIcon>
         </ItemHeader>
         <Input
            type="date"
            readOnly={readOnly}
            style={{ fontSize: "10px" }}
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            // value={format(dueDate)}
         />
         {openTask ? (
            <>
               <TextArea
                  readOnly={readOnly}
                  value={content}
                  rows="5"
                  // cols="5"
                  onChange={(e) => setContent(e.target.value)}
               />

               <ItemFooter style={{ fontSize: "1rem" }}>
                  <ButtonWrapper>
                     <Button
                        onClick={editTask}
                        style={{ position: "absolute", zIndex: zIndex }}
                     >
                        <MdEdit />
                     </Button>
                     <Button onClick={saveTask}>
                        <FaCheck />
                     </Button>
                     <Button onClick={deleteTask}>
                        <MdDelete />
                     </Button>
                  </ButtonWrapper>
               </ItemFooter>
            </>
         ) : (
            ""
         )}
      </Wrapper>
   );
};

export default TodoItem;
