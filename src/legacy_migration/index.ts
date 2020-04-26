// import { ReviewReply } from "../models/_legacy/review_reply.model";
// import { ReviewImage } from "../models/_legacy/review_image.model";
// import { ReviewLike } from "../models/_legacy/review_like.model";
// import { ReviewHit } from "../models/_legacy/review_hit.model";
// import { ReviewCategory } from "../models/_legacy/review_category.model";
// import { PostReply } from "../models/_legacy/post_reply.model";
// import { PostHit } from "../models/_legacy/post_hit.model";
// import { PostImage } from "../models/_legacy/post_image.model";
// import { PostLike } from "../models/_legacy/post_like.model";
// import { Post } from "../models/_legacy/post.model";
// import { StoreLike } from "../models/_legacy/store_like.model";
// import { StoreImage } from "../models/_legacy/store_image.model";
// import { UserCar } from "../models/_legacy/user_car.model";
// import { StoreKeyword } from "../models/_legacy/store_keyword.model";
// import { User } from "../models/_legacy/user.model";
// import { Store } from "../models/_legacy/store.model";
// import { Keyword } from "../models/_legacy/keyword.model";
// import { Car } from "../models/_legacy/car.model";
// import { CarTrim } from "../models/_legacy/car_trim.model";
// import { CarModel } from "../models/_legacy/car_model.model";
// import { CarModelgroup } from "../models/_legacy/car_modelgroup.model";
// import { CarBrand } from "../models/_legacy/car_brand.model";
// import { Sequelize } from "sequelize-typescript";
// import { NbaseMigration } from "./nbase-migration";
// import { Company } from "../models/_legacy/company.model";
// import {
//   OldCategoryTypeMap,
//   OldCategoryStatusMap,
//   OldCompanyNationalityMap,
//   OldCarModelSizeTypeMap,
//   OldCategoryKeywordMap,
//   OldStoreLevelMap,
//   OldStoreStatusMap,
//   OldUserStatusMap,
//   OldUserRoleMap,
//   OldStoreKeywordStatusMap,
//   OldUserCarFuelTypeMap,
//   OldStoreImageTypeMap,
//   OldPostTypeMap,
//   OldPostSubTypeMap,
//   OldPostStatusMap,
//   OldReviewCategoryData,
//   OldReviewTypeMap,
//   OldReviewStatusMap
// } from "./old-map";

// import * as inflection from "inflection";
// import * as path from "path";

// const bootstrap = async () => {
//   const srcConnection = new Sequelize({
//     database: "carring",
//     username: "kimjbstar",
//     password: "12091457",
//     dialect: "mysql",
//     host: "localhost"
//   });

//   const modelPath = path.join(__dirname, "../models");
//   const dstConnection = new Sequelize({
//     database: "nbase",
//     username: "kimjbstar",
//     password: "12091457",
//     dialect: "mysql",
//     host: "localhost",
//     models: [modelPath],
//     modelMatch: (_filename, _member) => {
//       const filename = inflection.camelize(_filename.replace(".model", ""));
//       const member = _member;
//       return filename === member;
//     },
//     timezone: "+09:00"
//   });

//   if (Object.keys(dstConnection.models).length < 1) {
//     throw "[nBase] matched Models not found, maybe model path problem..";
//   }
//   // await dstConnection.sync({ alter: true });
//   // await dstConnection.sync({ force: true });

//   // const migrationCategory = new NbaseMigration<Category>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Category,
//   //   tableName: "categories",
//   //   srcQuery: `SELECT categories.*
//   //     FROM categories
//   //     ORDER BY categories.id`,
//   //   renamePolicy: {
//   //     stores_cnt: "storesCount",
//   //     companies_cnt: "companiesCount"
//   //   },
//   //   transformPolicy: {
//   //     type: value => OldCategoryTypeMap[value],
//   //     status: value => OldCategoryStatusMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCategory.run();

//   // const migrationCompany = new NbaseMigration<Company>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Company,
//   //   tableName: "companies",
//   //   srcQuery: `SELECT companies.*
//   //     FROM companies
//   //     ORDER BY companies.id`,
//   //   renamePolicy: {
//   //     type: "nationality",
//   //     ad_link: "linkUrl"
//   //   },
//   //   transformPolicy: {
//   //     type: value => OldCompanyNationalityMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCompany.run();

//   // const migrationCarBrand = new NbaseMigration<CarBrand>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: CarBrand,
//   //   tableName: "car_brands",
//   //   srcQuery: `SELECT car_brands.*
//   //     FROM car_brands
//   //     ORDER BY car_brands.id`,
//   //   renamePolicy: {
//   //     certified: "isCartified",
//   //     cars_cnt: "carsCount"
//   //   },
//   //   transformPolicy: {
//   //     certified: value => value == 1
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCarBrand.run();

//   // const migrationCarModelgroup = new NbaseMigration<CarModelgroup>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: CarModelgroup,
//   //   tableName: "car_modelgroups",
//   //   srcQuery: `SELECT car_modelgroups.*
//   //     FROM car_modelgroups
//   //     ORDER BY car_modelgroups.id`,
//   //   renamePolicy: {
//   //     certified: "isCartified",
//   //     cars_cnt: "carsCount",
//   //     brand_id: "carBrandId",
//   //     orderno: "orderNo"
//   //   },
//   //   transformPolicy: {
//   //     certified: value => value == 1
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCarModelgroup.run();

//   // const migrationCarModel = new NbaseMigration<CarModel>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: CarModel,
//   //   tableName: "car_models",
//   //   srcQuery: `SELECT car_models.*
//   //     FROM car_models
//   //     ORDER BY car_models.id`,
//   //   renamePolicy: {
//   //     certified: "isCartified",
//   //     cars_cnt: "carsCount",
//   //     brand_id: "carBrandId",
//   //     modelgroup_id: "carModelgroupId"
//   //   },
//   //   transformPolicy: {
//   //     certified: value => value == 1,
//   //     size_type: value => OldCarModelSizeTypeMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCarModel.run();

//   // const migrationCarTrim = new NbaseMigration<CarTrim>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: CarTrim,
//   //   tableName: "car_trims",
//   //   srcQuery: `SELECT car_trims.*
//   //     FROM car_trims
//   //     ORDER BY car_trims.id`,
//   //   renamePolicy: {
//   //     certified: "isCartified",
//   //     cars_cnt: "carsCount",
//   //     brand_id: "carBrandId",
//   //     modelgroup_id: "carModelgroupId",
//   //     model_id: "modelId"
//   //   },
//   //   transformPolicy: {
//   //     certified: value => value == 1
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCarTrim.run();

//   // const migrationCar = new NbaseMigration<Car>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Car,
//   //   tableName: "cars",
//   //   srcQuery: `SELECT cars.*
//   //     FROM cars
//   //     ORDER BY cars.id`,
//   //   renamePolicy: {
//   //     certified: "isCartified",
//   //     cars_cnt: "carsCount",
//   //     brand_id: "carBrandId",
//   //     modelgroup_id: "carModelgroupId",
//   //     model_id: "carModelId",
//   //     trim_id: "carTrimId"
//   //   },
//   //   transformPolicy: {
//   //     certified: value => value == 1
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationCar.run();

//   // const migrationKeyword = new NbaseMigration<Keyword>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Keyword,
//   //   tableName: "keywords",
//   //   srcQuery: `SELECT keywords.*
//   //   FROM keywords
//   //   ORDER BY keywords.parent_id > 0, keywords.id`,
//   //   renamePolicy: {
//   //     orderno: "orderNo",
//   //     stores_cnt: "storesCount"
//   //   },
//   //   transformPolicy: {
//   //     status: value => OldCategoryKeywordMap[value],
//   //     parent_id: value => (value != 0 ? value : null)
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationKeyword.run();

//   // const migrationUser = new NbaseMigration<User>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: User,
//   //   tableName: "users",
//   //   srcQuery: `SELECT users.*
//   //   FROM users
//   //   ORDER BY users.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {
//   //     role: value => OldUserRoleMap[value],
//   //     status: value => OldUserStatusMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationUser.run();

//   // const migrationStore = new NbaseMigration<Store>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Store,
//   //   tableName: "stores",
//   //   srcQuery: `SELECT stores.*
//   //   FROM stores
//   //   ORDER BY stores.id`,
//   //   renamePolicy: {
//   //     likes_cnt: "likesCount",
//   //     mf_likes_cnt: "adminLikesCount",
//   //     reviews_cnt: "reviewsCount"
//   //   },
//   //   transformPolicy: {
//   //     level: value => OldStoreLevelMap[value],
//   //     status: value => OldStoreStatusMap[value],
//   //     category_id: value => (value > 0 ? value : null),
//   //     company_id: value => (value > 0 ? value : null),
//   //     owner_id: value => (value > 0 ? value : null)
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationStore.run();

//   // const migrationStoreKeyword = new NbaseMigration<StoreKeyword>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: StoreKeyword,
//   //   tableName: "store_keywords",
//   //   srcQuery: `SELECT store_keywords.*
//   //   FROM store_keywords
//   //   WHERE type = 100
//   //   ORDER BY store_keywords.id`,
//   //   renamePolicy: {
//   //     expired_date: "endDate"
//   //   },
//   //   transformPolicy: {
//   //     status: value => OldStoreKeywordStatusMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationStoreKeyword.run();

//   // const migrationUserCar = new NbaseMigration<UserCar>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: UserCar,
//   //   tableName: "usercars",
//   //   srcQuery: `SELECT usercars.*, IF(insr_expired_date != '', insr_expired_date, null) as insr_expired_date
//   //   FROM usercars
//   //   ORDER BY usercars.id`,
//   //   renamePolicy: {
//   //     model_id: "carModelId"
//   //   },
//   //   transformPolicy: {
//   //     fuel_type: value => OldUserCarFuelTypeMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationUserCar.run();

//   // await StoreImage.sync({ force: true });
//   // const migrationStoreImage = new NbaseMigration<StoreImage>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: StoreImage,
//   //   tableName: "store_images",
//   //   srcQuery: `SELECT store_images.*
//   //   FROM store_images
//   //   ORDER BY store_images.id`,
//   //   renamePolicy: {
//   //     img_url: "url"
//   //   },
//   //   transformPolicy: {
//   //     type: value => OldStoreImageTypeMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationStoreImage.run();

//   // await StoreLike.sync({ force: true });
//   // const migrationStoreLike = new NbaseMigration<StoreLike>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: StoreLike,
//   //   tableName: "store_likes",
//   //   srcQuery: `SELECT store_likes.*
//   //   FROM store_likes
//   //   ORDER BY store_likes.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {},
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationStoreLike.run();

//   // await Post.sync({ force: true });
//   // const migrationPost = new NbaseMigration<Post>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Post,
//   //   tableName: "posts",
//   //   srcQuery: `SELECT posts.*
//   //   FROM posts
//   //   WHERE type in (500,901,902,903,904,910)
//   //   ORDER BY posts.id`,
//   //   renamePolicy: {
//   //     reviews_cnt: "reviewsCount",
//   //     replies_cnt: "repliesCount",
//   //     likes_cnt: "likesCount",
//   //     hits_cnt: "hitsCount",
//   //     mf_hits_cnt: "adminHitsCount",
//   //     board_id: "subType"
//   //   },
//   //   transformPolicy: {
//   //     type: value => OldPostTypeMap[value],
//   //     board_id: value => OldPostSubTypeMap[value],
//   //     status: value => OldPostStatusMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationPost.run();

//   // await PostHit.sync({ force: true });
//   // const migrationPostHit = new NbaseMigration<PostHit>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: PostHit,
//   //   tableName: "post_hits",
//   //   srcQuery: `SELECT post_hits.*, IF(INSTR(post_hits.user_id, 'ip')>0, post_hits.user_id, '') as ip_address
//   //   FROM post_hits
//   //   JOIN posts ON posts.id = post_hits.post_id
//   //   WHERE posts.type in (500,901,902,903,904,910)
//   //   ORDER BY post_hits.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {
//   //     user_id: value => (value > 0 ? value : null)
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationPostHit.run();

//   // await PostLike.sync({ force: true });
//   // const migrationPostLike = new NbaseMigration<PostLike>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: PostLike,
//   //   tableName: "post_likes",
//   //   srcQuery: `SELECT post_likes.*
//   //   FROM post_likes
//   //   JOIN posts ON posts.id = post_likes.post_id
//   //   WHERE posts.type in (500,901,902,903,904,910)
//   //   ORDER BY post_likes.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {},
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationPostLike.run();

//   // await PostImage.sync({ force: true });
//   // const migrationPostImage = new NbaseMigration<PostImage>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: PostImage,
//   //   tableName: "post_images",
//   //   srcQuery: `SELECT post_images.*
//   //   FROM post_images
//   //   JOIN posts ON posts.id = post_images.post_id
//   //   WHERE posts.type in (500,901,902,903,904,910)
//   //   ORDER BY post_images.id`,
//   //   renamePolicy: {
//   //     img_url: "url"
//   //   },
//   //   transformPolicy: {},
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationPostImage.run();

//   // await PostReply.sync({ force: true });
//   // const migrationPostReply = new NbaseMigration<PostReply>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: PostReply,
//   //   tableName: "post_replies",
//   //   srcQuery: `SELECT post_replies.*
//   //   FROM post_replies
//   //   JOIN posts ON posts.id = post_replies.post_id
//   //   WHERE posts.type in (500,901,902,903,904,910)
//   //   ORDER BY post_replies.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {
//   //     parent_id: value => (value > 0 ? value : null)
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationPostReply.run();

//   // await ReviewCategory.sync({ force: true });
//   // await ReviewCategory.bulkCreate(OldReviewCategoryData);

//   // await Review.sync({ force: true });
//   // const migrationReview = new NbaseMigration<Review>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: Review,
//   //   tableName: "reviews",
//   //   srcQuery: `SELECT reviews.*
//   //   FROM reviews
//   //   WHERE hotdeal_id = 0
//   //   ORDER BY reviews.id`,
//   //   renamePolicy: {
//   //     replies_cnt: "repliesCount",
//   //     likes_cnt: "likesCount",
//   //     hits_cnt: "hitsCount",
//   //     mf_hits_cnt: "adminHitsCount",
//   //     model_id: "carModelId",
//   //     category_id: "reviewCategoryId"
//   //   },
//   //   transformPolicy: {
//   //     model_id: value => (value > 0 ? value : null),
//   //     status: value => OldReviewStatusMap[value];
//   //     type: value => OldReviewTypeMap[value]
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationReview.run();

//   // await ReviewHit.sync({ force: true });
//   // const migrationReviewHit = new NbaseMigration<ReviewHit>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: ReviewHit,
//   //   tableName: "review_hits",
//   //   srcQuery: `SELECT review_hits.*
//   //   FROM review_hits
//   //   ORDER BY review_hits.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {
//   //     user_id: value => (value > 0 ? value : null)
//   //   },
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationReviewHit.run();

//   // await ReviewLike.sync({ force: true });
//   // const migrationReviewLike = new NbaseMigration<ReviewLike>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: ReviewLike,
//   //   tableName: "review_likes",
//   //   srcQuery: `SELECT review_likes.*
//   //   FROM review_likes
//   //   ORDER BY review_likes.id`,
//   //   renamePolicy: {},
//   //   transformPolicy: {},
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationReviewLike.run();

//   // await ReviewImage.sync({ force: true });
//   // const migrationReviewImage = new NbaseMigration<ReviewImage>({
//   //   srcConnection,
//   //   dstConnection,
//   //   entityClass: ReviewImage,
//   //   tableName: "review_images",
//   //   srcQuery: `SELECT review_images.*
//   //   FROM review_images
//   //   ORDER BY review_images.id`,
//   //   renamePolicy: {
//   //     img_url: "url"
//   //   },
//   //   transformPolicy: {},
//   //   newFieldPolicy: {},
//   //   subtablePolicies: []
//   // });
//   // migrationReviewImage.run();

//   await ReviewReply.sync({ force: true });
//   const migrationReviewReply = new NbaseMigration<ReviewReply>({
//     srcConnection,
//     dstConnection,
//     entityClass: ReviewReply,
//     tableName: "review_replies",
//     srcQuery: `SELECT review_replies.*
//     FROM review_replies
//     ORDER BY review_replies.id`,
//     renamePolicy: {},
//     transformPolicy: {
//       parent_id: (value) => (value > 0 ? value : null)
//     },
//     newFieldPolicy: {},
//     subtablePolicies: []
//   });
//   migrationReviewReply.run();

//   // end
// };
// bootstrap();
