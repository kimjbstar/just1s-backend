export const UserOrderbys = {
  ID__DESC: {
    cursor: "User.id",
    orderBy: [["id", "desc"]]
  }
};

export enum UserRole {
  NORMAL = "NORMAL",
  BUSINESS = "BUSINESS",
  STAFF = "STAFF",
  ADMIN = "ADMIN"
}

export enum UserStatus {
  NORMAL = "NORMAL",
  WITHDRAWN = "WITHDRAWN"
}
