import { Router } from "express";
import UserModel from "../models/userModel.js";
import authGuard from "../authGuard.js";
import { userController } from "../controller/userController.js";
import {cryptPassword,comparePassword} from "../bcrypt.js";


const userRouter = Router();


// INSCRIPTION

userRouter.get("/registration", async (req, res) => {
  try {
    await UserModel.findOne({ _id: req.params.id }, req.body);
    res.render("registration.twig");
  } catch (error) {
    res.send(error);
  }
});

userRouter.post('/registration', async (req, res) => {
  try {
    await userController.setRegistration(req)
    res.redirect('/')   
  } catch (error) {
    console.log(error);
  }
})

// CONNEXION

userRouter.get("/", async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id }, req.body);
    res.render("login.twig", {
      user: user,
    });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post('/', async (req, res) => {
  let user = await userController.login(req)
  if (user) {
    req.session.user = user._id
    res.redirect('/pokedex')
  } else {
    req.session.error = "vous n'etes pas connecté"
    res.redirect("/")
  }
})


// DECONNEXION

userRouter.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/');
});

export default userRouter;
