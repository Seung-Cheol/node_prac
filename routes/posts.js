const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Post = require('../schemas/post')


router.get("/", async (req, res) => {
  try {
    const list = await Post.find({}).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    console.log(list)
    res.json({data:list})
  } catch (e) {
    res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
  }
});

router.post("/", auth, (req, res) => {
    try {
      const {user} = res.locals.user
      const {title, content} = req.body;
      Post.create({
        user,
        title,
        content,
      }).catch(()=>res.status(500).json({'msg':'db접속불량'}));
      res.json({"msg":"입력성공"})
    } catch (e) {
        res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    }
  });


router.get("/:postId", (req,res) => {
  try{
    const {postId} = req.params
    const get = Post.findOne({postId:postId})
    res.json({data:get})
    } catch(e) {
        res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    }
})

router.put("/:postId", auth, (req,res) => {
  try{
    const {postId} = req.params
    const {content,title} = req.body
    Post.updateOne({postId:postId},{content,title,updateAt:Date.now()}).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    res.json({"msg":"수정완료"})
  } catch(e) {
    res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
  }
})

router.delete("/:postId", auth, (req,res) => {
  try{
    const {postId} = req.params
    Post.deleteOne({postId:postId}).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    res.json({"msg":"삭제완료"})
  } catch(e) {
    res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
  }
})



module.exports = router