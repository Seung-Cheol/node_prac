const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Comment = require('../schemas/comment')


router.post("/", auth, (req,res) => {
    try{
    const {postId} = req.params
    const {user, reply} = req.body
    Comment.create({
        postId : postId,
        user : user,
        reply : reply
    }).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    res.json({"msg":"입력성공"})
}
    
    catch(e) {
        res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    }
})


router.get("/", async (req,res) => {
    try{
    const {postId} = req.params
    const postget = await Comment.find({
        postId : postId
    }).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    res.json({data:postget});
    } catch(e) {
        res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    }
})

router.put("/:commentId", auth, (req,res) => {
    try{
    const {commentId} = req.params
    const {reply} = req.body
    Comment.updateOne(
        {commentId:commentId},
        {reply:reply,updateAt:Date.now()}).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    res.json({"msg":"수정성공"})
    }
    catch(e) {
        res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    }

})

router.delete("/:commentId", auth, (req,res) => {
    try{
    const commentId = req.params
    Comment.deleteOne({
        commentId:commentId
    }).catch(()=>res.status(500).json({'msg':'db접속불량'}))
    res.json({"msg":"삭제성공"})
    } catch(e) {
        res.status(400).json({'msg':'예상치 못한 오류가 발생했습니다'})
    }
})
module.exports = router;

