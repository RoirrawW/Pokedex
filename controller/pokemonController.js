import pokemonModel from "../models/pokemonModel.js"
export class pokemonController {

    static async setPokemon(req, res) {
        try {
            req.body.trainer = req.session.user
            req.body.img = req.file.filename;
            const newPokemon = new pokemonModel(req.body);
            await newPokemon.save();
            return newPokemon
        } catch (error) {
            return error
        }
    }
}

export default pokemonController
