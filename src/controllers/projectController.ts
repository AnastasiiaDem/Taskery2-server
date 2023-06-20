import User from '../model/UserModel';
import Token from '../model/TokenModel';
import Project from '../model/ProjectModel';
import mongoose from 'mongoose';
import Task from '../model/TaskModel';
//додавання проєкту в бд
export const createProject = async (req, res) => {
  const {projectName, description, status, assignedUsers, createdAt, updatedAt, budget} = req.body;
  
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({error: 'error no cookies'});
  
  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({refreshToken: refreshToken}).exec();
  const foundUser = await User.findById(foundToken?.userId);
  if (!foundUser) return res.status(403).json({error: 'error user not found'});
  if (!projectName || !description || !status || !createdAt)
    return res.status(400).json({message: `Properties are required`});
  
  const id = new mongoose.Types.ObjectId();
  const newProject = new Project({
    _id: id,
    userId: foundUser._id,
    projectName: projectName,
    description: description,
    status: status,
    assignedUsers: assignedUsers,
    createdAt: createdAt,
    updatedAt: updatedAt,
    budget: budget
  });
  newProject.save((err, data) => {
    if (err) {
      return res.status(500).json({error: err});
    }
    return res.status(200).json(data);
  });
};
//оновлення проєкту в бд
export const updateProject = async (req, res) => {
  const id = req.params.id;
  !id && res.status(400).json({error: 'no id'});
  
  const {projectName, description, status, assignedUsers, createdAt, updatedAt, budget} = req.body;
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({error: 'error no cookies'});
  
  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({refreshToken: refreshToken}).exec();
  const foundUser = await User.findById(foundToken?.userId);
  if (!foundUser) return res.status(403).json({error: 'error user not found'});
  
  if (!projectName || !description || !status || !createdAt)
    return res.status(400).json({message: `Properties are required`});
  
  const update = {
    ...(projectName ? {projectName: projectName} : {}),
    ...(description ? {description: description} : {}),
    ...(status ? {status: status} : {}),
    ...(assignedUsers ? {assignedUsers: assignedUsers} : {}),
    ...(createdAt ? {createdAt: createdAt} : {}),
    ...(updatedAt ? {updatedAt: updatedAt} : {}),
    ...(budget ? {budget: budget} : {}),
  };
  try {
    const result = await Project.findByIdAndUpdate(id, update, {new: true});
    res.status(200).json({message: 'Project is updated'});
  } catch (error: any) {
    console.log(error);
    res.status(400).json({error: error});
  }
};
//видалення проєкту з бд
export const deleteProject = async (req, res) => {
  const id = req.params.id;
  !id && res.status(400).json({error: 'no id'});
  
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({error: 'error no cookies'});
  
  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({refreshToken: refreshToken}).exec();
  const foundUser = await User.findById(foundToken?.userId);
  if (!foundUser) return res.status(403).json({error: 'error user not found'});
  try {
    const result = await Project.findByIdAndDelete(id);
    const result2 = await Task.deleteMany({projectId: id});
    res.status(200).json({message: 'Project is deleted'});
  } catch (error: any) {
    res.status(400).json({error: error});
  }
};
//отримання списку усіх проєктів з бд
export const getProjects = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({error: 'error no cookies'});
  
  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({refreshToken: refreshToken}).exec();
  const foundUser = await User.findById(foundToken?.userId);
  if (!foundUser) return res.status(403).json({error: 'error user not found'});
  
  try {
    const projects = await Project.find({});
    if (projects.length == 0) return res.status(400).json({message: 'No content'});
    res.status(200).json({projects: projects});
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error});
  }
};
//отримання даних поточного проєкту з бд
export const getCurrentProject = async (req, res) => {
  const id = req.params.id;
  !id && res.status(400).json({error: 'no id'});
  
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({error: 'error no cookies'});
  
  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({refreshToken: refreshToken}).exec();
  const foundUser = await User.findById(foundToken?.userId);
  if (!foundUser) return res.status(403).json({error: 'error user not found'});
  
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(400).json({message: 'No content'});
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error});
  }
};

