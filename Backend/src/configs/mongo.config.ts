import mongoose from 'mongoose'

export async function connectDb(){
    try {
        await mongoose.connect('mongodb://admin:password@mongo:27017/inker?authSource=admin')
        console.log('Connected to mongodb 🚀')
    } catch (error) {
        console.log('Mongo Error, ',error)
    }
}

