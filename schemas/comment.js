const mongoose = require('mongoose')

const commentSchema =new mongoose.Schema({
    postId : {
      type: String,
      reqired : true,
      unique: true
    },
    commentId:{
      type: String,
      required : true,
    },
    reply: String,
    user: String
  });


  module.exports = mongoose.model('comment', commentSchema);