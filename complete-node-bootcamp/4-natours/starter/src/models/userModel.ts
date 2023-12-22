import mongoose, { Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

//name, email, photo, password, passwordConfirm

interface IUserDoc {
  name: string;
  email: string;
  photo: string;
  role: 'user' | 'guide' | 'lead-guide' | 'admin';
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
}

interface IUserMethods {
  correctPassword: (
    candidatePassword: string,
    userPass: string
  ) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestamp: number) => boolean;
}

type UserModel = Model<IUserDoc, {}, IUserMethods>;

const userSchema = new Schema<IUserDoc, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, //Nunca se muestra
  },
  passwordConfirm: {
    type: String || undefined,
    required: [true, 'Please confirm your password'],
    validate: {
      //This only works on SAVE!!
      validator: function (this: IUserDoc, el: string): boolean {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  //Only run this pass if pass was actually modified

  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete confirm password
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPass
) {
  return await bcrypt.compare(candidatePassword, userPass);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000 + '',
      10
    );
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
