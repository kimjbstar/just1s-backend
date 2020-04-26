export const UserOrderbys = {
  ID__DESC: {
    cursor: "User.id",
    orderBy: [["id", "desc"]]
  }
};

export enum UserSNSType {
  EMAIL = "EMAIL",
  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",
  NAVER = "NAVER"
}
export enum UserStatus {
  NORMAL = "NORMAL",
  WITHDRAWN = "WITHDRAWN"
}
