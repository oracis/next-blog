import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "configs";
import { User, Article, Comment } from "db/entity/";
import { ISession } from "pages/api/index";
import { prepareConnection } from "db";

const publish = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content = "", articleId } = req?.body;
  const session = req.session as ISession;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const commentRepo = db.getRepository(Comment);
  const articleRepo = db.getRepository(Article);
  const user = await userRepo.findOne({
    id: session?.userId,
  });

  const article = await articleRepo.findOne({
    id: articleId,
  });

  const comment = new Comment();
  comment.content = content;
  comment.create_date = new Date();
  comment.update_date = new Date();
  if (user) {
    comment.user = user;
  }

  if (article) {
    comment.article = article;
  }

  const savedComment = await commentRepo.save(comment);
  if (savedComment) {
    return res.status(200).json({
      code: 0,
      msg: "",
      data: savedComment,
    });
  } else {
    return res.status(200).json({
      code: -1,
      msg: "Fail to push",
      data: "",
    });
  }
};

export default withIronSessionApiRoute(publish, ironOptions);
