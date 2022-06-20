import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "configs";
import { User, Article } from "db/entity/";
import { ISession } from "pages/api/index";
import { prepareConnection } from "db";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title = "", content = "" } = req?.body;
  const session = req.session as ISession;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const articleRepo = db.getRepository(Article);
  const user = await userRepo.findOne({
    id: session?.userId,
  });

  const article = new Article();
  article.title = title;
  article.content = content;
  article.views = 0;
  article.create_date = new Date();
  article.update_date = new Date();
  article.is_deleted = false;
  if (user) {
    article.user = user;
  }

  const savedArticle = await articleRepo.save(article);
  if (savedArticle) {
    return res.status(200).json({
      code: 0,
      msg: "",
      data: savedArticle,
    });
  } else {
    return res.status(200).json({
      code: -1,
      msg: "Fail to create",
      data: "",
    });
  }
};

export default withIronSessionApiRoute(create, ironOptions);
