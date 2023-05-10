const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    user:{
      type: String,
      unique : true,
      required: true
    },
    password:{
      type:String,
      required:true
    },
    creatAt:{
        type:Date,
        default:Date.now()
      },
})

memberSchema.virtual("userId").get(function () {
    return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
  });
memberSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('Member', memberSchema);