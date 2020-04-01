export const OldCategoryTypeMap = {
  1: "STORE",
  2: "COMPANY",
  3: "STORE_COMPANY"
};

export const OldCategoryStatusMap = {
  "10": "ENABLED",
  "-1": "DISABLED"
};

export const OldCompanyNationalityMap = {
  k: "DOMESTIC",
  f: "OVERSEAS"
};

export const OldCarModelSizeTypeMap = {
  "10": "SMALL",
  "20": "SEMI_MEDIUM",
  "30": "MEDIUM",
  "40": "SEMI_LARGE",
  "50": "LARGE",
  "60": "EXTRA_LARGE"
};

export const OldCategoryKeywordMap = {
  "10": "ENABLED",
  "-10": "DISABLED"
};

export const OldUserRoleMap = {
  "100": "NORMAL",
  "200": "BUSINESS",
  "900": "STAFF",
  "999": "ADMIN"
};

export const OldUserStatusMap = {
  "1": "NORMAL",
  "-1": "WITHDRAWN"
};

export const OldStoreLevelMap = {
  "1": "NORMAL",
  "2": "AFFILIATE",
  "3": "EXCELLENT"
};

export const OldStoreStatusMap = {
  "5": "WAITING",
  "9": "HIDDEN",
  "10": "NORMAL",
  "-10": "DELETED"
};

export const OldStoreKeywordStatusMap = {
  "10": "NORMAL",
  "-1": "DELETED"
};

export const OldUserCarFuelTypeMap = {
  "0": "UNKNOWN",
  "101": "GOOD_GASOLINE",
  "102": "GASOLINE",
  "200": "DIESEL",
  "300": "LPG",
  "400": "HYBRID",
  "500": "EV"
};

export const OldStoreImageTypeMap = {
  "1": "NORMAL",
  "2": "CONTRACT",
  "3": "PRICE"
};

//Post.php

export const OldPostTypeMap = {
  "500": "FREE",
  "901": "NOTICE",
  "902": "HELP",
  "903": "FAQ",
  "904": "TERM",
  "910": "STORY"
};

export const OldPostSubTypeMap = {
  "0": "UNKNOWN",
  "1": "NEWS",
  "2": "LIFE",
  "3": "CARRING_TV",
  "4": "MOTOR_SPORTS"
};

export const OldPostStatusMap = {
  "-1": "HIDDEN",
  "0": "HIDDEN",
  "10": "NORMAL"
};

export const OldReviewTypeMap = {
  "100": "CUSTOMER",
  "200": "STORE"
};

export const OldReviewStatusMap = {
  "-1": "HIDDEN",
  "0": "HIDDEN",
  "10": "NORMAL"
};

export const OldReviewCategoryData = [
  { id: 100, name: "퍼포먼스 튜닝" },
  { id: 101, name: "엔진출력", parentId: 100 },
  { id: 102, name: "흡배기", parentId: 100 },
  { id: 103, name: "서스펜션", parentId: 100 },
  { id: 114, name: "브레이크", parentId: 100 },
  { id: 200, name: "드레스업 튜닝" },
  { id: 201, name: "썬팅", parentId: 200 },
  { id: 202, name: "바디킷", parentId: 200 },
  { id: 204, name: "LED램프", parentId: 200 },
  { id: 205, name: "방음(방청)", parentId: 200 },
  { id: 206, name: "언더코팅", parentId: 200 },
  { id: 300, name: "외장관리" },
  { id: 301, name: "카스킨", parentId: 300 },
  { id: 302, name: "PPF", parentId: 300 },
  { id: 303, name: "광택", parentId: 300 },
  { id: 304, name: "유리막코팅", parentId: 300 },
  { id: 400, name: "편의장치" },
  { id: 401, name: "내비게이션", parentId: 400 },
  { id: 402, name: "블랙박스", parentId: 400 },
  { id: 403, name: "카오디오", parentId: 400 },
  { id: 404, name: "리무진시트", parentId: 400 },
  { id: 405, name: "차유리", parentId: 400 },
  { id: 500, name: "세차/디테일링" },
  { id: 501, name: "손세차", parentId: 500 },
  { id: 502, name: "디테일링", parentId: 500 },
  { id: 503, name: "셀프세차", parentId: 500 },
  { id: 104, name: "출장워시", parentId: 500 },
  { id: 105, name: "프리미엄워시", parentId: 500 },
  { id: 106, name: "핫딜", parentId: 500 },
  { id: 600, name: "외장수리/덴트" },
  { id: 601, name: "외장수리/덴트", parentId: 600 },
  { id: 602, name: "도색", parentId: 600 },
  { id: 603, name: "판금", parentId: 600 },
  { id: 604, name: "라이트 복원", parentId: 600 },
  { id: 700, name: "차수리/정비" },
  { id: 701, name: "국산차정비", parentId: 700 },
  { id: 702, name: "수입차정비", parentId: 700 },
  { id: 800, name: "타이어/휠수리" },
  { id: 801, name: "타이어", parentId: 800 },
  { id: 802, name: "휠", parentId: 800 },
  { id: 803, name: "휠수리", parentId: 800 },
  { id: 900, name: "오일교환" },
  { id: 901, name: "엔진오일", parentId: 900 },
  { id: 902, name: "미션오일", parentId: 900 },
  { id: 903, name: "브레이크오일", parentId: 900 },
  { id: 904, name: "수입오일", parentId: 900 },
  { id: 1000, name: "DIY/기타시공" },
  { id: 1001, name: "DIY", parentId: 1000 },
  { id: 1002, name: "기타시공", parentId: 1000 },
  { id: 1100, name: "테마튜닝" },
  { id: 1101, name: "푸드트럭제작", parentId: 1100 },
  { id: 1102, name: "캠핑카제작", parentId: 1100 },
  { id: 1103, name: "커스텀디자인", parentId: 1100 },
  { id: 1200, name: "긴급출동" },
  { id: 1201, name: "출장배터리", parentId: 1200 },
  { id: 1202, name: "출장펑크", parentId: 1200 },
  { id: 1300, name: "렌트카" },
  { id: 1301, name: "렌트카매장", parentId: 1300 }
];
