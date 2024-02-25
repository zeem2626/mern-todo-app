import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
   {
      ownerId: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      dueDate: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export { Task };
