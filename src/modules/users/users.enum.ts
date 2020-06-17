export enum UserListOrderBys {
  ID__DESC = "ID__DESC",
  ID__ASC = "ID__ASC"
}
export const MapUserListOrderBys = {
  [UserListOrderBys.ID__DESC]: "최신순",
  [UserListOrderBys.ID__ASC]: "오래된순"
};

export enum UserSNSType {
  EMAIL = "EMAIL",
  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",
  NAVER = "NAVER",
  KAKAO = "KAKAO"
}
export enum UserStatus {
  NORMAL = "NORMAL",
  WITHDRAWN = "WITHDRAWN"
}

export enum UserRole {
  NORMAL = "NORMAL",
  STAFF = "STAFF",
  MASTER = "MASTER"
}
