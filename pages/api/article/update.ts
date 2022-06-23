import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "configs";
import { Article } from "db/entity/";
import { prepareConnection } from "db";

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title = "", content = "", id } = req?.body;
  const db = await prepareConnection();
  const articleRepo = db.getRepository(Article);
  const article = await articleRepo.findOne({
    where: {
      id,
    },
    relations: ["user"],
  });

  if (article) {
    article.title = title;
    article.content = content;
    article.update_date = new Date();
    const updatedArticle = await articleRepo.save(article);
    if (updatedArticle) {
      return res.status(200).json({
        code: 0,
        msg: "",
        data: updatedArticle,
      });
    } else {
      return res.status(200).json({
        code: -1,
        msg: "Fail to udpate",
        data: "",
      });
    }
  } else {
    return res.status(200).json({
      code: -1,
      msg: "Article Not Found",
      data: "",
    });
  }
};

export default withIronSessionApiRoute(update, ironOptions);
