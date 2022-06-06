import { NextApiRequest, NextApiResponse } from "next";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";
import { withIronSessionApiRoute } from "iron-session/next";
import request from "service/request";
import { ironOptions } from "configs";
import { ISession, SmsResult } from "pages/api/index";

const sendCode = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to = "", templateId = 1 } = req.body;
  const accountSid = "8aaf0708809721d0018110bf7e502922";
  const authToken = "3071f5b21b544867a3852edd6adc4def";
  const appId = "8aaf0708809721d0018110bf7f332929";
  const timeStamp = format(new Date(), "yyyyMMddHHmmss");
  const sig = md5(`${accountSid}${authToken}${timeStamp}`);
  const authorization = encode(`${accountSid}:${timeStamp}`);
  const smsCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSid}/SMS/TemplateSMS?sig=${sig}`;

  try {
    const data: SmsResult = await request.post(
      url,
      {
        to,
        appId,
        templateId,
        datas: [smsCode, 5],
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    const { statusCode, statusMsg } = data;

    console.log("smsCode", smsCode);
    const session = req.session as ISession;
    session.smsCode = smsCode;
    await session.save();

    if (statusCode === "000000") {
      const session = req.session as ISession;
      session.smsCode = smsCode;
      await session.save();
      return res.status(200).json({
        code: 0,
        msg: "",
        data: process.env.NODE_ENV === "development" ? smsCode : "",
      });
    } else {
      return res.status(200).json({
        code: statusCode,
        msg: statusMsg,
        data: "",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: -1,
      msg: error || "Unknown Error",
      data: "",
    });
  }
};

export default withIronSessionApiRoute(sendCode, ironOptions);
