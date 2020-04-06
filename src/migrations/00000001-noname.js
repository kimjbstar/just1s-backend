'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "CarBrands", deps: []
 * createTable "Users", deps: []
 * createTable "StoreLikes", deps: []
 * createTable "StoreKeywords", deps: []
 * createTable "StoreImages", deps: []
 * createTable "Categories", deps: []
 * createTable "ReviewReplies", deps: []
 * createTable "ReviewLikes", deps: []
 * createTable "PostHits", deps: []
 * createTable "PostImages", deps: []
 * createTable "PostLikes", deps: []
 * createTable "PostReplies", deps: []
 * createTable "ReviewImages", deps: []
 * createTable "ReviewCategories", deps: []
 * createTable "ReviewHits", deps: []
 * createTable "CarModelgroups", deps: [CarBrands]
 * createTable "Keywords", deps: [Categories]
 * createTable "Companies", deps: [Categories]
 * createTable "Stores", deps: [Users, Categories, Companies]
 * createTable "CarModels", deps: [CarBrands, CarModelgroups]
 * createTable "CarTrims", deps: [CarBrands, CarModelgroups, CarModels]
 * createTable "Cars", deps: [CarBrands, CarModelgroups, CarModels, CarTrims]
 * createTable "Reviews", deps: [CarModels, ReviewCategories, Users, Stores]
 * createTable "UserCars", deps: [Companies]
 * createTable "Posts", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2020-04-05T11:40:49.083Z",
    "comment": ""
};

var migrationCommands = [

    {
        fn: "createTable",
        params: [
            "CarBrands",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "imgUrl": {
                    "type": Sequelize.STRING
                },
                "orderNo": {
                    "type": Sequelize.INTEGER
                },
                "carsCount": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "role": {
                    "type": Sequelize.ENUM('NORMAL', 'BUSINESS', 'STAFF', 'ADMIN')
                },
                "email": {
                    "type": Sequelize.STRING
                },
                "stringId": {
                    "type": Sequelize.STRING
                },
                "pw": {
                    "type": Sequelize.STRING
                },
                "imgUrl": {
                    "type": Sequelize.STRING
                },
                "nickname": {
                    "type": Sequelize.STRING
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "phoneNumber": {
                    "type": Sequelize.STRING
                },
                "desc": {
                    "type": Sequelize.STRING
                },
                "status": {
                    "type": Sequelize.ENUM('NORMAL', 'WITHDRAWN')
                },
                "blockedUntil": {
                    "type": Sequelize.DATE
                },
                "toGetPushed": {
                    "type": Sequelize.BOOLEAN
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "StoreLikes",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "storeId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "StoreKeywords",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "storeId": {
                    "type": Sequelize.INTEGER
                },
                "keywordId": {
                    "type": Sequelize.INTEGER
                },
                "beginDate": {
                    "type": Sequelize.DATEONLY
                },
                "endDate": {
                    "type": Sequelize.DATEONLY
                },
                "status": {
                    "type": Sequelize.ENUM('NORMAL', 'DELETED')
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "StoreImages",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "storeId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "type": {
                    "type": Sequelize.ENUM('NORMAL', 'CONTRACT', 'PRICE')
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "type": {
                    "type": Sequelize.ENUM('STORE', 'COMPANY', 'STORE_COMPANY')
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "orderNo": {
                    "type": Sequelize.INTEGER
                },
                "status": {
                    "type": Sequelize.ENUM('ENABLED', 'DISABLED')
                },
                "storesCount": {
                    "type": Sequelize.INTEGER
                },
                "companiesCount": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ReviewReplies",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "reviewId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "content": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "parentId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ReviewLikes",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "reviewId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "PostHits",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "postId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "ipAddress": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "PostImages",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "postId": {
                    "type": Sequelize.INTEGER
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "PostLikes",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "postId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "PostReplies",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "postId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "content": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "parentId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ReviewImages",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "reviewId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ReviewCategories",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "parentId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ReviewHits",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "reviewId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "CarModelgroups",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "carsCount": {
                    "type": Sequelize.INTEGER
                },
                "encarCode": {
                    "type": Sequelize.STRING
                },
                "orderNo": {
                    "type": Sequelize.INTEGER
                },
                "carBrandId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Keywords",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "imgUrl": {
                    "type": Sequelize.STRING
                },
                "status": {
                    "type": Sequelize.ENUM('ENABLED', 'DISABLED')
                },
                "orderNo": {
                    "type": Sequelize.STRING
                },
                "storesCount": {
                    "type": Sequelize.STRING
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "parentId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Companies",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "nationality": {
                    "type": Sequelize.ENUM('UNKNOWN', 'DOMESTIC', 'OVERSEAS')
                },
                "repPhoneNumber": {
                    "type": Sequelize.STRING
                },
                "imgUrl": {
                    "type": Sequelize.STRING
                },
                "titleImgUrl": {
                    "type": Sequelize.STRING
                },
                "sampleImgUrl": {
                    "type": Sequelize.STRING
                },
                "linkUrl": {
                    "type": Sequelize.STRING
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Stores",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "level": {
                    "type": Sequelize.ENUM('NORMAL', 'AFFILIATE', 'EXCELLENT')
                },
                "status": {
                    "type": Sequelize.ENUM('WATING', 'HIDDEN', 'NORMAL', 'DELETED')
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "stringId": {
                    "type": Sequelize.STRING
                },
                "tel": {
                    "type": Sequelize.STRING
                },
                "phoneNumber": {
                    "type": Sequelize.STRING
                },
                "lat": {
                    "type": Sequelize.DECIMAL(11, 7)
                },
                "lng": {
                    "type": Sequelize.DECIMAL(11, 7)
                },
                "repImgUrl": {
                    "type": Sequelize.STRING
                },
                "desc": {
                    "type": Sequelize.STRING
                },
                "descImgUrl": {
                    "type": Sequelize.STRING
                },
                "address1": {
                    "type": Sequelize.STRING
                },
                "address2": {
                    "type": Sequelize.STRING
                },
                "openingHours": {
                    "type": Sequelize.STRING
                },
                "likesCount": {
                    "type": Sequelize.INTEGER
                },
                "adminLikesCount": {
                    "type": Sequelize.STRING
                },
                "reviewsCount": {
                    "type": Sequelize.STRING
                },
                "ownerId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "companyId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "CarModels",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "yearBegin": {
                    "type": Sequelize.STRING
                },
                "yearEnd": {
                    "type": Sequelize.STRING
                },
                "carsCount": {
                    "type": Sequelize.INTEGER
                },
                "sizeType": {
                    "type": Sequelize.ENUM('SMALL', 'SEMI_MEDIUM', 'MEDIUM', 'SEMI_LARGE', 'LARGE', 'EXTRA_LARGE')
                },
                "carBrandId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "carModelgroupId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModelgroups",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "CarTrims",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "wd": {
                    "type": Sequelize.ENUM('UNKNOWN', '2WD', '4WD')
                },
                "highestPrice": {
                    "type": Sequelize.INTEGER
                },
                "carBrandId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "carModelgroupId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModelgroups",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "carModelId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModels",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Cars",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "fullName": {
                    "type": Sequelize.STRING
                },
                "brandName": {
                    "type": Sequelize.STRING
                },
                "modelgroupName": {
                    "type": Sequelize.STRING
                },
                "modelName": {
                    "type": Sequelize.STRING
                },
                "trimName": {
                    "type": Sequelize.STRING
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "carBrandId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "carModelgroupId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModelgroups",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "carModelId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModels",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "carTrimId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarTrims",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Reviews",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "type": {
                    "allowNull": false,
                    "type": Sequelize.ENUM('CUSTOMER', 'STORE')
                },
                "title": {
                    "validate": {
                        "notContains": {
                            "msg": "광고는 포함되선 안됩니다.",
                            "args": "광고"
                        },
                        "notEmpty": true
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "workingHours": {
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "price": {
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "beforeImgUrl": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "repImgUrl": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "repliesCount": {
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "likesCount": {
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "hitsCount": {
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "adminHitsCount": {
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.ENUM('HIDDEN', 'NORMAL')
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "carModelId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModels",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "reviewCategoryId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ReviewCategories",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "storeId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Stores",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "UserCars",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "carModelId": {
                    "type": Sequelize.INTEGER
                },
                "carNumber": {
                    "type": Sequelize.STRING
                },
                "fuelType": {
                    "type": Sequelize.ENUM('UNKNOWN', 'GOOD_GASOLINE', 'GASOLINE', 'DIESEL', 'LPG', 'HYBRID', 'EV')
                },
                "carYearMonth": {
                    "type": Sequelize.STRING
                },
                "mileage": {
                    "type": Sequelize.INTEGER
                },
                "insrExpiredDate": {
                    "type": Sequelize.DATEONLY
                },
                "insrCompanyId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Posts",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "type": {
                    "type": Sequelize.ENUM('FREE', 'NOTICE', 'HELP', 'FAQ', 'TERM', 'STORY')
                },
                "subType": {
                    "type": Sequelize.ENUM('UNKNOWN', 'NEWS', 'LIFE', 'CARRING_TV', 'MOTOR_SPORTS')
                },
                "status": {
                    "type": Sequelize.ENUM('NORMAL', 'HIDDEN')
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "type": Sequelize.STRING
                },
                "content": {
                    "type": Sequelize.STRING
                },
                "repImgUrl": {
                    "type": Sequelize.STRING
                },
                "link": {
                    "type": Sequelize.STRING
                },
                "repliesCount": {
                    "type": Sequelize.INTEGER
                },
                "likesCount": {
                    "type": Sequelize.INTEGER
                },
                "hitsCount": {
                    "type": Sequelize.INTEGER
                },
                "adminHitsCount": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

var rollbackCommands = [{
        fn: "dropTable",
        params: ["Posts"]
    },
    {
        fn: "dropTable",
        params: ["CarBrands"]
    },
    {
        fn: "dropTable",
        params: ["CarModelgroups"]
    },
    {
        fn: "dropTable",
        params: ["CarTrims"]
    },
    {
        fn: "dropTable",
        params: ["Cars"]
    },
    {
        fn: "dropTable",
        params: ["Categories"]
    },
    {
        fn: "dropTable",
        params: ["Companies"]
    },
    {
        fn: "dropTable",
        params: ["Keywords"]
    },
    {
        fn: "dropTable",
        params: ["PostHits"]
    },
    {
        fn: "dropTable",
        params: ["PostImages"]
    },
    {
        fn: "dropTable",
        params: ["PostLikes"]
    },
    {
        fn: "dropTable",
        params: ["PostReplies"]
    },
    {
        fn: "dropTable",
        params: ["CarModels"]
    },
    {
        fn: "dropTable",
        params: ["ReviewCategories"]
    },
    {
        fn: "dropTable",
        params: ["ReviewHits"]
    },
    {
        fn: "dropTable",
        params: ["ReviewImages"]
    },
    {
        fn: "dropTable",
        params: ["ReviewLikes"]
    },
    {
        fn: "dropTable",
        params: ["ReviewReplies"]
    },
    {
        fn: "dropTable",
        params: ["Reviews"]
    },
    {
        fn: "dropTable",
        params: ["StoreImages"]
    },
    {
        fn: "dropTable",
        params: ["StoreKeywords"]
    },
    {
        fn: "dropTable",
        params: ["StoreLikes"]
    },
    {
        fn: "dropTable",
        params: ["Stores"]
    },
    {
        fn: "dropTable",
        params: ["UserCars"]
    },
    {
        fn: "dropTable",
        params: ["Users"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < rollbackCommands.length)
                {
                    let command = rollbackCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
