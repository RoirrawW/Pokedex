import mongoose from 'mongoose'

const PokemonSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Pas de nom"]
    },
    level: {
        type:Number,
        required: [true, "Pas de niveau"]
    },
    type: {
        type:String,
        required: [true, "Pas de type"]
    },
    trainer: {
        type:String,
        required: [true, "Pas de dresseur"]
    },
    img:{
        type:String,
        default: "racaillou.png"
    }
})

const PokemonModel = mongoose.model('pokemons', PokemonSchema)
export default PokemonModel