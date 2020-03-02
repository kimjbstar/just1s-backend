import { UserCar } from "./../models/user_car.model";
import { StoreKeyword } from "./../models/store_keyword";
import { User } from "./../models/user.model";
import { Store } from "./../models/store.model";
import { Keyword } from "./../models/keyword.model";
import { Car } from "./../models/car.model";
import { CarTrim } from "./../models/car_trim.model";
import { CarModel } from "./../models/car_model.model";
import { CarModelgroup } from "./../models/car_modelgroup.model";
import { CarBrand } from "./../models/car_brand.model";
import { Sequelize } from "sequelize-typescript";
import { NbaseMigration } from "./nbase-migration";
import { Company } from "./../models/company.model";
import {
  OldCategoryTypeMap,
  OldCategoryStatusMap,
  OldCompanyNationalityMap,
  OldCarModelSizeTypeMap,
  OldCategoryKeywordMap,
  OldStoreLevelMap,
  OldStoreStatusMap,
  OldUserStatusMap,
  OldUserRoleMap,
  OldStoreKeywordStatusMap,
  OldUserCarFuelTypeMap
} from "./old-map";

import * as inflection from "inflection";
import * as path from "path";
import { Category } from "@src/models/category.model";

const bootstrap = async () => {
  const srcConnection = new Sequelize({
    database: "carring",
    username: "kimjbstar",
    password: "12091457",
    dialect: "mysql",
    host: "localhost"
  });

  const modelPath = path.join(__dirname, "../models");

  const dstConnection = new Sequelize({
    database: "nbase",
    username: "kimjbstar",
    password: "12091457",
    dialect: "mysql",
    host: "localhost",
    models: [modelPath],
    modelMatch: (_filename, _member) => {
      const filename = inflection.camelize(_filename.replace(".model", ""));
      const member = _member;
      return filename === member;
    },
    timezone: "+09:00"
  });

  if (Object.keys(dstConnection.models).length < 1) {
    throw "[nBase] matched Models not found, maybe model path problem..";
  }
  // await dstConnection.sync({ alter: true });
  // await dstConnection.sync({ force: true });

  // const migrationCategory = new NbaseMigration<Category>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: Category,
  //   tableName: "categories",
  //   srcQuery: `SELECT categories.*
  //     FROM categories
  //     ORDER BY categories.id`,
  //   renamePolicy: {
  //     stores_cnt: "storesCount",
  //     companies_cnt: "companiesCount"
  //   },
  //   transformPolicy: {
  //     type: value => OldCategoryTypeMap[value],
  //     status: value => OldCategoryStatusMap[value]
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCategory.run();

  // const migrationCompany = new NbaseMigration<Company>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: Company,
  //   tableName: "companies",
  //   srcQuery: `SELECT companies.*
  //     FROM companies
  //     ORDER BY companies.id`,
  //   renamePolicy: {
  //     type: "nationality",
  //     ad_link: "linkUrl"
  //   },
  //   transformPolicy: {
  //     type: value => OldCompanyNationalityMap[value]
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCompany.run();

  // const migrationCarBrand = new NbaseMigration<CarBrand>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: CarBrand,
  //   tableName: "car_brands",
  //   srcQuery: `SELECT car_brands.*
  //     FROM car_brands
  //     ORDER BY car_brands.id`,
  //   renamePolicy: {
  //     certified: "isCartified",
  //     cars_cnt: "carsCount"
  //   },
  //   transformPolicy: {
  //     certified: value => value == 1
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCarBrand.run();

  // const migrationCarModelgroup = new NbaseMigration<CarModelgroup>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: CarModelgroup,
  //   tableName: "car_modelgroups",
  //   srcQuery: `SELECT car_modelgroups.*
  //     FROM car_modelgroups
  //     ORDER BY car_modelgroups.id`,
  //   renamePolicy: {
  //     certified: "isCartified",
  //     cars_cnt: "carsCount",
  //     brand_id: "carBrandId",
  //     orderno: "orderNo"
  //   },
  //   transformPolicy: {
  //     certified: value => value == 1
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCarModelgroup.run();

  // const migrationCarModel = new NbaseMigration<CarModel>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: CarModel,
  //   tableName: "car_models",
  //   srcQuery: `SELECT car_models.*
  //     FROM car_models
  //     ORDER BY car_models.id`,
  //   renamePolicy: {
  //     certified: "isCartified",
  //     cars_cnt: "carsCount",
  //     brand_id: "carBrandId",
  //     modelgroup_id: "carModelgroupId"
  //   },
  //   transformPolicy: {
  //     certified: value => value == 1,
  //     size_type: value => OldCarModelSizeTypeMap[value]
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCarModel.run();

  // const migrationCarTrim = new NbaseMigration<CarTrim>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: CarTrim,
  //   tableName: "car_trims",
  //   srcQuery: `SELECT car_trims.*
  //     FROM car_trims
  //     ORDER BY car_trims.id`,
  //   renamePolicy: {
  //     certified: "isCartified",
  //     cars_cnt: "carsCount",
  //     brand_id: "carBrandId",
  //     modelgroup_id: "carModelgroupId",
  //     model_id: "modelId"
  //   },
  //   transformPolicy: {
  //     certified: value => value == 1
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCarTrim.run();

  // const migrationCar = new NbaseMigration<Car>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: Car,
  //   tableName: "cars",
  //   srcQuery: `SELECT cars.*
  //     FROM cars
  //     ORDER BY cars.id`,
  //   renamePolicy: {
  //     certified: "isCartified",
  //     cars_cnt: "carsCount",
  //     brand_id: "carBrandId",
  //     modelgroup_id: "carModelgroupId",
  //     model_id: "carModelId",
  //     trim_id: "carTrimId"
  //   },
  //   transformPolicy: {
  //     certified: value => value == 1
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationCar.run();

  // const migrationKeyword = new NbaseMigration<Keyword>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: Keyword,
  //   tableName: "keywords",
  //   srcQuery: `SELECT keywords.*
  //   FROM keywords
  //   ORDER BY keywords.parent_id > 0, keywords.id`,
  //   renamePolicy: {
  //     orderno: "orderNo",
  //     stores_cnt: "storesCount"
  //   },
  //   transformPolicy: {
  //     status: value => OldCategoryKeywordMap[value],
  //     parent_id: value => (value != 0 ? value : null)
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationKeyword.run();

  // const migrationUser = new NbaseMigration<User>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: User,
  //   tableName: "users",
  //   srcQuery: `SELECT users.*
  //   FROM users
  //   ORDER BY users.id`,
  //   renamePolicy: {},
  //   transformPolicy: {
  //     role: value => OldUserRoleMap[value],
  //     status: value => OldUserStatusMap[value]
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationUser.run();

  // const migrationStore = new NbaseMigration<Store>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: Store,
  //   tableName: "stores",
  //   srcQuery: `SELECT stores.*
  //   FROM stores
  //   ORDER BY stores.id`,
  //   renamePolicy: {
  //     likes_cnt: "likesCount",
  //     mf_likes_cnt: "adminLikesCount",
  //     reviews_cnt: "reviewsCount"
  //   },
  //   transformPolicy: {
  //     level: value => OldStoreLevelMap[value],
  //     status: value => OldStoreStatusMap[value],
  //     category_id: value => (value > 0 ? value : null),
  //     company_id: value => (value > 0 ? value : null),
  //     owner_id: value => (value > 0 ? value : null)
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationStore.run();

  // const migrationStoreKeyword = new NbaseMigration<StoreKeyword>({
  //   srcConnection,
  //   dstConnection,
  //   entityClass: StoreKeyword,
  //   tableName: "store_keywords",
  //   srcQuery: `SELECT store_keywords.*
  //   FROM store_keywords
  //   WHERE type = 100
  //   ORDER BY store_keywords.id`,
  //   renamePolicy: {
  //     expired_date: "endDate"
  //   },
  //   transformPolicy: {
  //     status: value => OldStoreKeywordStatusMap[value]
  //   },
  //   newFieldPolicy: {},
  //   subtablePolicies: []
  // });
  // migrationStoreKeyword.run();

  await UserCar.sync({ force: true });
  const migrationUserCar = new NbaseMigration<UserCar>({
    srcConnection,
    dstConnection,
    entityClass: UserCar,
    tableName: "usercars",
    srcQuery: `SELECT usercars.*, IF(insr_expired_date != '', insr_expired_date, null) as insr_expired_date
    FROM usercars
    ORDER BY usercars.id`,
    renamePolicy: {
      model_id: "carModelId"
    },
    transformPolicy: {
      fuel_type: value => OldUserCarFuelTypeMap[value]
    },
    newFieldPolicy: {},
    subtablePolicies: []
  });
  migrationUserCar.run();

  // end
};
bootstrap();
