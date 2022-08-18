import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    lastname: {
        type:String,
        required: [true, "Pas de nom"]
    },
    firstname: {
        type:String,
        required: [true, "Pas de prénom"]
    },
    mail: {
        type:String,
        required: [true, "Pas d'adresse e-mail"]
    },
    password: {
        type:String,
        required: [true, "Pas de mot de passe"]
    },
    pokemon: []
})

const UserModel = mongoose.model('User', userSchema)
export default UserModel