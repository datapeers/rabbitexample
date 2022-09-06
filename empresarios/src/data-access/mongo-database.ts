import mongoose from "mongoose";

export const database = async (connection: string) => {
    return mongoose.connect(connection);
};
