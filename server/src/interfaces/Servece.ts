import mongoose from "mongoose";

interface IService extends mongoose.Document {
    name: string
    img: string
    price: number
}

export { IService };