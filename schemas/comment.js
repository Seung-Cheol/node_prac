const mongoose = require('mongoose')

const commentSchema =new mongoose.Schema({
    postId : {
      type: String,
      reqired : true
    },
    reply: String,
    user: String,
    creatAt:{
        type:Date,
        default:Date.now()
        },
    updateAt:{
        type:Date,
        default:Date.now()
        }
  });

  commentSchema.virtual("commentId").get(function () {
    return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
  });
  commentSchema.set("toJSON", { virtuals: true });


  module.exports = mongoose.model('Comment', commentSchema);