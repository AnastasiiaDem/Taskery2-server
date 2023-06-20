import Request from '../model/RequestModel';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

export const sendRequest = async (req, res) => {
  const {userId, firstName, lastName, email, description} = req.body;
  
  if (!userId || !firstName || !lastName || !email || !description)
    return res.status(400).json({message: `Properties are required`});
  
  const id = new mongoose.Types.ObjectId();
  
  const newRequest = new Request({
    _id: id,
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    description: description
  });
  
  newRequest.save((err, data) => {
    if (err) {
      return res.status(500).json({error: err});
    }
    return res.status(200).json(data);
  });
};

export const sendRespond = async (req, res) => {
  const {firstName, lastName, email, description, respond} = req.body;
  
  
  let html = '';
  let subject = '';
  
  subject = 'The Respond To Your Request // Taskery.com';
  
  html = '<style>' +
    '.email-text {display: flex; align-items: flex-start; justify-content: flex-start;flex-direction: column; width: 500px;}' +
    '</style>' +
    '    <div class="email-text" style="font-size: 15px;"> \n' +
    '    <p>Hi, <b style="font-size: 20px;">' + firstName + ' ' + lastName + '</b></p>\n' +
    '    <p style="font-style: italic; text-align: center;">Thank you for contacting us. <b style="color: rgb(76 126 253) !important;">Taskery.com</b> website</p>\n' +
    '    <p><u>Your request was</u>: ' + description + '</p>\n' +
    '    <p>RESPOND: <b>' + respond + '</b></p>\n' +
    '  </div>';
  
  // subject = 'Відповідь на ваш запит // Taskery.com';
  //
  // html = '<style>' +
  //   '.email-text {display: flex; align-items: flex-start; justify-content: flex-start;flex-direction: column; width: 500px;}' +
  //   '</style>' +
  //   '    <div class="email-text" style="font-size: 15px;"> \n' +
  //   '    <p>Добрий день, <b style="font-size: 20px;">' + firstName + ' ' + lastName + '</b></p>\n' +
  //   '    <p style="font-style: italic; text-align: center;">Дякую за звернення. <b style="color: rgb(76 126 253) !important;">Taskery.com</b></p>\n' +
  //   '    <p><u>Ваш запит</u>: ' + description + '</p>\n' +
  //   '    <p>ВІДПОВІДЬ: <b>' + respond + '</b></p>\n' +
  //   '  </div>';
  
  
  return new Promise<any>((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    });
    const mail_config = {
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
      
    };
    // @ts-ignore
    transporter.sendMail(mail_config, (err, data) => {
      if (err) {
        return res.status(400).json({message: 'An error has occurred'});
      }
      return res.status(200).json({message: 'The email was sent successfully'});
    });
  });
};

export const getRequests = async (req, res) => {
  Request.find({}, function (err, data) {
    
    if (data.length === 0 || err) return res.status(400).json({message: 'There is no any requests'});
    
    return res.status(200).json(data);
  });
};

export const deleteRequest = async (req, res) => {
  const id = req.params.id;
  
  !id && res.status(400).json({error: 'no id'});
  
  try {
    const result = await Request.findByIdAndDelete(id);
    res.status(200).json({message: 'Request is deleted'});
  } catch (error) {
    res.status(400).json({error});
  }
};
