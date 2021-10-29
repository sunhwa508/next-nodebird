const express = require("express");

const { Post, User, Image, Comment, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const hashtag = require("../models/hashtag");
const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(png)
      const basename = path.basename(file.originalname, ext); // 제로초
      //같은 파일명이 덮어씌워지는 현상을 방지하기 위함.
      done(null, basename + new Date().getTime() + ext); // 제로초 1232435346.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    //해시태그 등록
    if (hashtag) {
      // '#노드 #익스프레스 안녕하세요.'.match(/#[^\s#]+/g);
      // ["#노드", '#익스프레스]
      const result = await Promise.all(
        hashtags.map(tag => Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })),
      ); //[[노드, true],[리액트, true]]
      await post.addHashtags(result.map(v => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        //이미지를 여러개올리면 image : [제로초.png, image.png]
        const images = await Promise.all(req.body.image.map(image => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User,
          // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/images", isLoggedIn, upload.array("image"), async (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: parseInt(post.id, 10), UserId: parseInt(req.user.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: parseInt(post.id, 10), UserId: parseInt(req.user.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, userId: req.user.id },
    });
    res.json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }

  res.json({ id: 1 });
});

module.exports = router;
