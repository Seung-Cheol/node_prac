const express = require('express')
const router = express.Router()

const Post = require('../schemas/post')


router.get("/", async (req, res, next) => {
  try {
    const list = await Post.find({})
    console.log(list)
    res.json({data:list})
  } catch (e) {
    e.status = 400
    next(e)
  }
});

router.post("/:postId", (req, res, next) => {
    try {
      const postId = req.params;
      const {user, title, content} = req.body;
      Post.create({
        postId,
        user,
        title,
        content,
      });
      res.json({"msg":"입력성공"})
    } catch (e) {
      e.status = 400
      next(e)
    }
  });


router.get("/:postId", (req,res,next) => {
  try{
    const {postId} = req.params
    const get = Post.find({postId:postId})
    res.json({data:get})
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