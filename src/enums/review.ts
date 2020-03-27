export enum ReviewStatus {
  HIDDEN = "HIDDEN",
  NORMAL = "NORMAL"
}

export enum ReviewType {
  CUSTOMER = "CUSTOMER",
  STORE = "STORE"
}

export const ReviewOrderbys = {
  ID__DESC: {
    cursor: "Review.id",
    orderBy: [["id", "desc"]]
  }
};
