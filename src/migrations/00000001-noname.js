'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "ReviewCategories", deps: []
 * createTable "CarBrands", deps: []
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
 * createTable "ReviewHits", deps: []
 * createTable "Users", deps: []
 * createTable "CarModelgroups", deps: [CarBrands]
 * createTable "Keywords", deps: [Categories]
 * createTable "Companies", deps: [Categories]
 * createTable "Stores", deps: [Users, Categories, Companies]
 * createTable "CarModels", deps: [CarBrands, CarModelgroups]
 * createTable "Posts", deps: [Users]
 * createTable "CarTrims", deps: [CarBrands, CarModelgroups, CarModels]
 * createTable "Reviews", deps: [CarModels, ReviewCategories, Users, Stores]
 * createTable "UserCars", deps: [Companies]
 * createTable "Cars", deps: [CarBrands, CarModelgroups, CarModels, CarTrims]
 * addIndex "likes-count-index" to table "Stores"
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2020-03-31T13:26:59.493Z",
    "comment": ""
};

var migrationCommands = [

    {
        fn: "createTable",
        params: [
            "ReviewCategories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "parentId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "CarBrands",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "storeId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "storeId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                },
                "type": {
                    "type": Sequelize.ENUM('NORMAL', 'CONTRACT', 'PRICE')
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "parentId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "reviewId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "postId": {
                    "type": Sequelize.INTEGER
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "postId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "parentId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "reviewId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "reviewId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "parentId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.DECIMAL
                },
                "lng": {
                    "type": Sequelize.DECIMAL
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "categoryId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "companyId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "carModelgroupId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModelgroups",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
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
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "carModelgroupId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModelgroups",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "carModelId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModels",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "type": {
                    "type": Sequelize.ENUM('CUSTOMER', 'STORE'),
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "notContains": {
                            "msg": "광고는 포함되선 안됩니다.",
                            "args": "광고"
                        },
                        "notEmpty": true
                    },
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "workingHours": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false
                },
                "beforeImgUrl": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "repImgUrl": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "repliesCount": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false
                },
                "likesCount": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false
                },
                "hitsCount": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false
                },
                "adminHitsCount": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "isNumeric": true
                    },
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('HIDDEN', 'NORMAL'),
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "carModelId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModels",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "reviewCategoryId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "ReviewCategories",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "storeId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Stores",
                        "key": "id"
                    },
                    "allowNull": true
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
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
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarBrands",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "carModelgroupId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModelgroups",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "carModelId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarModels",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "carTrimId": {
                    "type": Sequelize.INTEGER,
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "CarTrims",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "Stores",
            [{
                "name": "likesCount"
            }],
            {
                "indexName": "likes-count-index"
            }
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
