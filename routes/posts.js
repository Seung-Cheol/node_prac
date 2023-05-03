const express = require('express')
const router = express.Router()

const Post = require('../schemas/post')

router.post("/", (req, res, next) => {
    try {
      const {postId, user, title, content} = req.body;
      Post.create({
        postId,
        user,
        title,
        content,
      });
      res.json({"msg":"수정성공"})
    } catch (e) {
      e.status = 400
      next(e)
    }
  });


router.get("/:postId", (req,res,next) => {
  try{
    const {postId} = req.params
    const get = Post.find({postId:postId})
    res.json({get})
    } catch(e) {
      e.status = 400
      next(e)
    }
})

router.put("/:postId", (req,res,next) => {
  try{
    const {postId} = req.params
    const {user,content,title} = req.body
    Post.updateOne({postId:postId},{user,content,title})
    res.json({"msg":"수정완료"})
  } catch(e) {
    e.status = 400
    next(e)
  }
})

router.delete("/:postId", (req,res,next) => {
  try{
    const {postId} = req.params
    Post.updateOne({postId:postId})
    res.json({"msg":"수정완료"})
  } catch(e) {
    e.status=400
    next(e)
  }
})



module.exports = router