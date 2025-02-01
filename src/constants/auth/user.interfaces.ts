import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
	first_name: string,
	last_name: string,
	email: string,
	password: string
}

export interface UserModel extends mongoose.Model<UserDoc> {}