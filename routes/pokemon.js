import { Router } from "express";
import PokemonModel from "../models/pokemonModel.js";
import authGuard from "../authGuard.js";
import pokemonController from "../controller/pokemonController.js";
import UserModel from "../models/userModel.js";
import multer from "multer";

const pokemonRouter = Router();


//IMAGE

const storage = multer.diskStorage({
  // destination pour le fichier
  destination:function(req,file,callback){
    callback(null,'./assets/uploads/images' )
  },
  //ajouter le retour de l'extension
  filename:function (req,file,callback) {
    callback(null,Date.now() + file.originalname)
  },
})
//upload parametre pour multer
const upload = multer({
  storage:storage,
  limits:{
    fieldSize:1024*1024*3,
  },
});


// AJOUTER

pokemonRouter.get("/addPokemon", authGuard, async (req, res) => {
  try {
    await PokemonModel.findOne({ _id: req.params.id }, req.body);
    res.render("addPokemon.twig");
  } catch (error) {
    res.send(error);
  }
});

pokemonRouter.post("/addPokemon",upload.single('image'), async (req, res) => {
  try {
    await pokemonController.setPokemon(req)
    res.redirect('/pokedex')
  } catch (error) {
    res.send(error);
  }
});



// POKEDEX AFFICHAGE

pokemonRouter.get("/pokedex", authGuard, async (req, res) => {
  let pokemon = await PokemonModel.find({trainer: req.session.user});
  let userConnected = await UserModel.findOne({ _id: req.session.user });
  if (userConnected) {
    userConnected = userConnected.lastname;
  }
  res.render("pokedex.twig", {

    pokemon: pokemon,
    userConnected: userConnected,
  });
});

// SUPPRIMER

pokemonRouter.get('/deletePokemon/:id', async (req, res) => {
  try {
    await PokemonModel.deleteOne({ _id: req.params.id });
    res.redirect('/pokedex')
  } catch (error) {
    res.send(error);
  }
});


// MODIFIER


pokemonRouter.get('/updatePokemon/:id', authGuard, async (req, res) => {
  try {
    let user = await PokemonModel.findOne({ _id: req.params.id })
    res.render('updatePokemon.twig', {
      user: user
    })
  } catch (error) {
    res.send(error)
  }
})

pokemonRouter.post("/updatePokemon/:id", async (req, res) => {
  try {
    await PokemonModel.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/pokedex")
  } catch (error) {
    res.send(error)
  }
})

export default pokemonRouter;