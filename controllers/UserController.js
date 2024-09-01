

import User from "../models/User.js";
import { hashSync, compareSync } from "bcrypt";
import Record from "../models/Record.js";

export const index = async (req, res) => {
  if(req.session.user) return res.redirect('/dashboard');
  if (req.method == 'POST') {
    const { user_name, password } = req.body;
    const exist = await User.findOne({
      where: {
        user_name: user_name
      }
    },{raw:true})
    if (!exist){
      req.flash('msg','User Not Exist')
      return res.redirect('/')
    } 
    const correctPass = compareSync(password, exist.password)
    if (!correctPass) {
      req.flash('msg','incorrect password')
      return res.redirect('/')
    } 
    req.session.user = exist;
    return res.redirect('/dashboard')
  }
  return res.render('index',{
    msg:req.flash('msg')
  })
}

export const register = async (req, res) => {
  try {
    if (req.session.user) return res.redirect('/dashboard');

    const { user_name, password } = req.body;

    if (req.method === 'POST') {
      const exist = await User.findOne({
        where: { user_name: user_name }
      });

      if (exist) {
        req.flash('msg', 'Username already exists');
        return res.redirect('/register');
      }

      const hashPass = hashSync(password, 10);
      await User.create({
        user_name: user_name,
        password: hashPass
      });

      req.flash('msg', 'Registration successful! Please log in.');
      return res.redirect('/');
    }

    return res.render('register', {
      msg: req.flash('msg')
    });
  } catch (error) {
    console.log('Error: ', error);
    req.flash('msg', 'Something went wrong. Please try again.');
    return res.redirect('/register');
  }
}


export const dashboard = async (req,res)=>{
  try{
    if(!req.session.user) return res.redirect('/');
    const user = req.session.user;
    const records = await Record.findAll({
      where:{
        id:user.id
      }
    },{raw:true})
    return res.render('dashboard',{
      msg:'Login Success',
      records:records,
      user
    })
  }catch(error){
    console.log('error: ', error);
  }
}

export const addRecord = async (req,res)=>{
  try{
    if(!req.session.user) return res.redirect('/');
    const user = req.session.user;
    const {type,amount,date,comment} = req.body;
      await Record.create({
        user_id:user.id,
        type:type,
        amount:amount,
        date:date,
        comment:comment
      });
    return res.redirect('/dashboard')
  }catch(error){
    console.log('error: ', error);
  }
}

export const logout = async(req,res)=>{
  try{
    req.session.destroy();
    return res.redirect('/')
  }catch(error){
    console.log('error: ', error);
  }
}