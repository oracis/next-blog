interface CookieInfo {
  userId: number;
  nickname: string;
  avatar: string;
}

function getCookieOption() {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 60 * 1000);
  const path = "/";
  return { expires, path };
}

export const setCookies = (
  cookie: any,
  { userId, nickname, avatar }: CookieInfo
) => {
  const cookieOption = getCookieOption();

  cookie.set("userId", userId, cookieOption);
  cookie.set("nickname", nickname, cookieOption);
  cookie.set("avatar", avatar, cookieOption);
};

export const clearCookies = (cookie: any) => {
  const cookieOption = getCookieOption();

  cookie.set("userId", "", cookieOption);
  cookie.set("nickname", "", cookieOption);
  cookie.set("avatar", "", cookieOption);
};
