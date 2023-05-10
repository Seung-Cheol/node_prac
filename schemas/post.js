const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:{
      type:String,
      unique:true
    },
    title:{
      type:String
    },
    content:{
      type:String
    },
    creatAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
      }
})

postSchema.virtual("postId").get(function () {
    return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
  });
postSchema.set("toJSON", { virtuals: true });

  module.exports = mongoose.model('Post', postSchema);