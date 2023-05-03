const { postRoute,commentRoute } = require('./routes');
const express = require('express');
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();
app.use(express.json())
app.use('/posts',[postRoute])
app.use('/comments/:postId',[commentRoute])

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});