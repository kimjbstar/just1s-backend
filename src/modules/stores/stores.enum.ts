export const StoreOrderbys = {
  ID__DESC: {
    cursor: "Store.id",
    orderBy: [["id", "desc"]]
  }
};

export enum StoreLevel {
  NORMAL = "NORMAL",
  AFFILIATE = "AFFILIATE",
  EXCELLENT = "EXCELLENT"
}

export enum StoreStatus {
  WATING = "WATING",
  HIDDEN = "HIDDEN",
  NORMAL = "NORMAL",
  DELETED = "DELETED"
}
