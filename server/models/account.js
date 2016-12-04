import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import Promise from 'bluebird';

const Account = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    // index: true,
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
});

Account.plugin(passportLocalMongoose);

const accountModel = mongoose.model('Account', Account);

// promise override
accountModel.register = Promise.promisify(accountModel.register, { context: accountModel });

export default accountModel;
