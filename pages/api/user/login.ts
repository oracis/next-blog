import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { Cookie } from "next-cookie";
import { ironOptions } from "configs";
import { User, UserAuth } from "db/entity/";
import { ISession } from "pages/api/index";
import { prepareConnection } from "db";
import { setCookies } from "utils";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = Cookie.fromApiRoute(req, res);
  const { smsCode = "", phone = "", identify_type = "phone" } = req?.body;
  const session = req.session as ISession;
  const savedSmsCode = session.smsCode;
  const db = await prepareConnection();
  const userAuthRepo = db.getRepository(UserAuth);
  const userAuth = await userAuthRepo.findOne(
    {
      identify_type,
      identifier: phone,
    },
    {
      relations: ["user"],
    }
  );

  if (String(smsCode) === String(savedSmsCode)) {
    if (userAuth) {
      const {
        user: { id, nickname, avatar },
      } = userAuth;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      setCookies(cookie, { userId: id, nickname, avatar });
      return res.status(200).json({
        code: 0,
        msg: "Login Sucessfully",
        data: { userId: id, nickname, avatar },
      });
    } else {
      const user = new User();
      user.nickname = `User_${Math.floor(Math.random() * 1000)}`;
      user.avatar = "/images/avata.png";
      user.job = "Not available";
      user.introduce = "Not available";

      const userAuth = new UserAuth();
      userAuth.identify_type = identify_type;
      userAuth.credential = smsCode;
      userAuth.identifier = phone;
      userAuth.user = user;

      const userAuthResult = await userAuthRepo.save(userAuth);

      const {
        user: { id, nickname, avatar },
      } = userAuthResult;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      setCookies(cookie, { userId: id, nickname, avatar });

      return res.status(200).json({
        code: 0,
        msg: "New User created, Login sucessfully",
        data: { userId: id, nickname, avatar },
      });
    }
  } else {
    return res.status(200).json({
      code: -1,
      msg: "Sms Code is not matched!",
      data: "",
    });
  }
};

export default withIronSessionApiRoute(login, ironOptions);
