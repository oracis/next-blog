export interface UserInfo {
  userId?: number;
  nickname?: string;
  avatar?: string;
}

export interface UserStore {
  userInfo: UserInfo;
  setUserInfo: (value: UserInfo) => void;
}

const userStore = (): UserStore => ({
  userInfo: {},
  setUserInfo: function (value) {
    this.userInfo = value;
  },
});

export default userStore;
