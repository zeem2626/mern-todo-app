import { ApiError } from "../utility/ApiError.utility.js";
import { ApiResponse } from "../utility/ApiResponse.utility.js";
import { asyncHandler } from "../utility/asyncHandler.utility.js";
import { Task } from "../models/task.model.js";

const getTasks = asyncHandler(async (req, res, next) => {
   const user = req.user;

   const allTasks = await Task.find({ ownerId: user._id });

   res.status(200).json(
      new ApiResponse(200, "Tasks fetched successfully ", allTasks)
   );
});

const addTask = asyncHandler(async (req, res, next) => {
   const { ownerId, title, content, dueDate } = req.body;

   let invalid = [ownerId, title, content, dueDate].some(
      (elem) => !elem || elem.trim() == ""
   );
   if (invalid) {
      throw new ApiError(400, "Give required details");
   }

   const newTask = await Task.create({ ownerId, title, content, dueDate });

   res.status(200).json(
      new ApiResponse(200, "Task created successfully ", newTask)
   );
});

const updateTask = asyncHandler(async (req, res, next) => {
   const { title, content, dueDate } = req.body;
   const { taskId } = req.params;

   let invalid = [title, content, dueDate].some(
      (elem) => !elem || elem.trim() == ""
   );
   if (invalid) {
      throw new ApiError(400, "Give required details");
   }

   const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, content, dueDate },
      { new: true }
   );

   res.status(200).json(
      new ApiResponse(200, "Task updated successfully ", updatedTask)
   );
});

const deleteTask = asyncHandler(async (req, res, next) => {
   const { taskId } = req.params;

   if (!taskId) {
      throw new ApiError(400, "Give task ID");
   }

   const deletedTask = await Task.findByIdAndDelete(taskId);

   res.status(200).json(new ApiResponse(200, "Task deleted successfully "));
});

const searchTask = asyncHandler(async (req, res, next) => {
   const search = req.query.q?.trim().split(" ");
   let tasks = [];
   await Promise.all(
      search.map(async (word) => {
         const searchedTask = await Task.find({
            title: { $regex: word, $options: "i" },
         });
         searchedTask.forEach((elem) => {
            tasks.push(elem);
         });
      })
   );

   res.status(200).json(new ApiResponse(200, "Searched tasks accessed", tasks));
});

export { getTasks, addTask, updateTask, deleteTask, searchTask };
