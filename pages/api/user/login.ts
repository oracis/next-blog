import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "configs";
import { ISession } from "pages/api/index";

const sendCode = async (req: NextApiRequest, res: NextApiResponse) => {
  const { smsCode } = req?.body;
  const session = req.session as ISession;
  const savedSmsCode = session.smsCode;
  if (smsCode === savedSmsCode) {
    return res.status(200).json({
      code: 0,
      msg: "",
      data: "Verify Successfully",
    });
  } else {
    return res.status(200).json({
      code: 0,
      msg: "Sms Code is not matched!",
      data: "",
    });
  }
};

export default withIronSessionApiRoute(sendCode, ironOptions);
