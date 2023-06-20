import {STATUS} from "../config/roles";

export {};
import mongoose, {Schema} from 'mongoose';

interface IProject {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  projectName: string;
  description: string;
  status: STATUS;
  assignedUsers: Array<any>;
  createdAt: string;
  updatedAt: string;
  budget: number;
}

export const ProjectSchema = new Schema<IProject>({
  _id: Schema.Types.ObjectId,
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  projectName: {type: String, require: true},
  status: {type: String, enum: STATUS, required: true},
  description: {type: String, required: true},
  assignedUsers: {type: [], required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  budget: {type: Number, required: true},
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
