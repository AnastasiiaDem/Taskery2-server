import User from '../model/UserModel';
import Token from '../model/TokenModel';
import mongoose from 'mongoose';

const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const {firstName, lastName, email, password, role} = req.body;
  
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({message: `Properties are required`});
  
  if (await User.findOne({email: email}).exec())
    return res.status(409).json({
      message: {
        messageEn: `User with such email (${email}) exists`,
        messageUa: `Користувач з даною електронною поштою (${email}) вже зареєстрований`
      }
    });
  
  // const hashPassword = await bcrypt.hashSync(password, 8);
  const id = new mongoose.Types.ObjectId();
  
  const newUser = new User({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role
  });
  
  const userToken = new Token({
    userId: id,
    refreshToken: '',
    requestedTime: Date.now(),
  });
  
  newUser.save((err, data) => {
    if (err) return res.status(500).json({error: err});
  });
  
  userToken.save((err, data) => {
    if (err) res.status(500).json({error: err});
    return res.status(200).json({message: 'User is registered', data: data});
  });
};

export default createUser;
