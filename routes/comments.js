const express = require('express');
const router = express.Router();

const Comment = require('../schemas/comment')


router.post("/", (req,res,next) => {
    try{
    const {postId} = req.params
    const {commentId,user, reply} = req.body
    Comment.create({
        postId : postId,
        commentId : commentId,
        user : user,
        reply : reply
    })
    res.json({"msg":"입력성공"})
}
    
    catch(e) {
        e.status = 400
        next(e)
    }
})


router.get("/", async (req,res,next) => {
    try{
    const {postId} = req.params
    const postget = await Comment.find({
        postId : postId
    })
    res.json({data:postget});
    } catch(e) {
        e.status = 400
        next(e)
    }
})

router.put("/:commentId", (req,res,next) => {
    try{
    const {postId,commentId} = req.params
    const {user,reply} = req.body
    Comment.updateOne({postId:postId,commentId:commentId},{user:user,reply:reply})
    res.json({"msg":"수정성공"})
    }
    catch(e) {
        e.status = 400
        next(e)
    }

})

router.delete("/:commentId", (req,res,next) => {
    try{
    const commentId = req.params
    Comment.deleteOne({
        commentId:commentId
    })
    res.json({"msg":"삭제성공"})
    } catch(e) {
        e.status = 400
        next(e)
    }
})
module.exports = router;


