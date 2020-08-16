const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const chocolatSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    // rating: { type: Number, default: 0, min:[1, "Wouldn't purchase again"], max: [5,"C'est manifique!"]},
    rating: Number,
    //this is referenced in chocolatController for the id of the person logging in (added as req.body.user = req.session.userId)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

//models USE a schema to be created
// const Chocolat = mongoose.model('Chocolat', chocolatSchema);
//we query the database with the model 
const Chocolat = mongoose.model('Chocolat', chocolatSchema)
///chocolats' name of collection that automatically gets created in mongo
module.exports = Chocolat;