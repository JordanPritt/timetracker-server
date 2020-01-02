import mongoose, { Schema, Document } from 'mongoose';
import { hash } from 'bcrypt';
import stage from "../config.json";
import { NextFunction } from 'express';

export interface IUserModel extends Document {
  name: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  status: string
}

const UserSchema: Schema = new Schema({
  name: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  },
  firstName: {
    type: 'String',
    required: false,
    trim: true
  },
  lastName: {
    type: 'String',
    required: false,
    trim: true
  },
  email: {
    type: 'String',
    required: false,
    trim: true
  },
  status: {
    type: 'String',
    required: false,
    trim: true
  },
});

// encrypt password before save
UserSchema.pre<IUserModel>('save', function (next: NextFunction) {
  const user: IUserModel = this;
  if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    hash(user.password, stage.saltingRounds, function (err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

export default mongoose.model<IUserModel>('User', UserSchema);