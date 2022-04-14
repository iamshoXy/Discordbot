import mongoose, { Schema } from 'mongoose';

interface IUser {
    authorId: string;
    totalEXP: number;
}

const UserSchema: Schema = new Schema({
    authorId: { type: String, required: true, unique: true },
    level: { type: Number, requireD: true },
    totalEXP: { type: Number, required: true }
});
  
const User = mongoose.model<IUser>('User', UserSchema);
export default User;