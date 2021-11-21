const express = require("express");
const { Op } = require("sequelize");
const { Post, User, Image, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // GET /posts
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } //21 20 19 18 ... 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
