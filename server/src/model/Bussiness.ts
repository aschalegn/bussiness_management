import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema({

});


const Business = mongoose.model('Business', businessSchema);
export { Business };