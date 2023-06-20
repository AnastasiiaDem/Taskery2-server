import {STATUS} from "../config/roles";

export {};
import mongoose, {Schema} from 'mongoose';

interface ITask {
  _id: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
  title: string;
  description: string;
  status: STATUS;
  deadline: string;
}

export const TaskSchema = new Schema<ITask>({
  _id: Schema.Types.ObjectId,
  employeeId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  projectId: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
  title: {type: String, require: true},
  description: {type: String, required: true},
  status: {type: String, enum: STATUS, required: true},
  deadline: {type: String, require: true}
});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
