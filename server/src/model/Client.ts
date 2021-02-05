import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
   
});


const Client = mongoose.model('Client', clientSchema);
export { Client };