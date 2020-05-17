export enum UserListOrderBys {
  ID__DESC = "ID__DESC"
}
export const MapUserListOrderBys = {
  [UserListOrderBys.ID__DESC]: "최신순"
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

export enum UserRole {
  NORMAL = "NORMAL",
  STAFF = "STAFF",
  MASTER = "MASTER"
}
