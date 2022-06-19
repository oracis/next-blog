import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { Cookie } from "next-cookie";
import { ironOptions } from "configs";
import { ISession } from "pages/api/index";
import { clearCookies } from "utils";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = Cookie.fromApiRoute(req, res);
  const session = req.session as ISession;
  session.destroy();
  clearCookies(cookie);
  return res.status(200).json({
    code: 0,
    msg: "Logout successfully",
    data: "",
  });
};

export default withIronSessionApiRoute(logout, ironOptions);
