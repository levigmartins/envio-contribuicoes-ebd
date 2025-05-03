import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI não definida nas variáveis de ambiente.');

const cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;

    return cached.conn;
}