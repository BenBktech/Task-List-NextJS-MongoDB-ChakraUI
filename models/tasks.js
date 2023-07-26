import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  task: {
    type: String,
    required: [true, 'Task is required.'],
  },
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;