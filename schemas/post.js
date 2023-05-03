const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postId : {
      type : String,
      reqired : true,
      unique : true
    },
    user:{
      type: String
    },
    title:{
      type:String
    },
    content:{
      type:String
    }
})


  module.exports = mongoose.model('Posts', postSchema);