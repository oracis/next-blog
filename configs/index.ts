export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME || "SID",
  password: process.env.SESSION_PASSWORD || "kfnuvanVcJhMprLm0Md5zHdUtWH9qii8",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
