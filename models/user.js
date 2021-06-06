const mongoose= require('mongoose');

 const UserSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{ type:String,required:true,
    },
    middlename:{ type:String, required:false,
    },
    lastname:{ type:String, required:false,
    },
    email:{type:String, required:true, unique: true, 
    },
    password:{type:String, required:false
    },
    phoneNumber:{ type:String,  required:false
    },
    created: { type: Date, default: Date.now
      }
 });
 module.exports = mongoose.model('User', UserSchema);