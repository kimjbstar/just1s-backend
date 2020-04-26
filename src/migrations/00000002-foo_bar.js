'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "blockedUntil" from table "Users"
 * removeColumn "toGetPushed" from table "Users"
 * removeColumn "phoneNumber" from table "Users"
 * removeColumn "stringId" from table "Users"
 * removeColumn "nickname" from table "Users"
 * removeColumn "role" from table "Users"
 * removeColumn "desc" from table "Users"
 * removeColumn "pw" from table "Users"
 * dropTable "Keywords"
 * dropTable "CarModelgroups"
 * dropTable "CarModels"
 * dropTable "Companies"
 * dropTable "CarTrims"
 * dropTable "UserCars"
 * dropTable "Posts"
 * dropTable "Cars"
 * dropTable "Stores"
 * dropTable "Reviews"
 * dropTable "ReviewHits"
 * dropTable "ReviewCategories"
 * dropTable "PostHits"
 * dropTable "StoreKeywords"
 * dropTable "CarBrands"
 * dropTable "ReviewReplies"
 * dropTable "ReviewImages"
 * dropTable "PostLikes"
 * dropTable "Categories"
 * dropTable "PostImages"
 * dropTable "StoreImages"
 * dropTable "StoreLikes"
 * dropTable "PostReplies"
 * dropTable "ReviewLikes"
 * addColumn "averageScore" to table "Users"
 * addColumn "snsType" to table "Users"
 * addColumn "performedMusicsCount" to table "Users"
 * addColumn "createdDecksCount" to table "Users"
 * addColumn "snsKey" to table "Users"
 * addColumn "performedDecksCount" to table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "foo bar",
    "created": "2020-04-26T12:14:54.312Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Users", "blockedUntil"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "toGetPushed"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "phoneNumber"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "stringId"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "nickname"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "role"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "desc"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "pw"]
    },
    {
        fn: "dropTable",
        params: ["Keywords"]
    },
    {
        fn: "dropTable",
        params: ["CarModelgroups"]
    },
    {
        fn: "dropTable",
        params: ["CarModels"]
    },
    {
        fn: "dropTable",
        params: ["Companies"]
    },
    {
        fn: "dropTable",
        params: ["CarTrims"]
    },
    {
        fn: "dropTable",
        params: ["UserCars"]
    },
    {
        fn: "dropTable",
        params: ["Posts"]
    },
    {
        fn: "dropTable",
        params: ["Cars"]
    },
    {
        fn: "dropTable",
        params: ["Stores"]
    },
    {
        fn: "dropTable",
        params: ["Reviews"]
    },
    {
        fn: "dropTable",
        params: ["ReviewHits"]
    },
    {
        fn: "dropTable",
        params: ["ReviewCategories"]
    },
    {
        fn: "dropTable",
        params: ["PostHits"]
    },
    {
        fn: "dropTable",
        params: ["StoreKeywords"]
    },
    {
        fn: "dropTable",
        params: ["CarBrands"]
    },
    {
        fn: "dropTable",
        params: ["ReviewReplies"]
    },
    {
        fn: "dropTable",
        params: ["ReviewImages"]
    },
    {
        fn: "dropTable",
        params: ["PostLikes"]
    },
    {
        fn: "dropTable",
        params: ["Categories"]
    },
    {
        fn: "dropTable",
        params: ["PostImages"]
    },
    {
        fn: "dropTable",
        params: ["StoreImages"]
    },
    {
        fn: "dropTable",
        params: ["StoreLikes"]
    },
    {
        fn: "dropTable",
        params: ["PostReplies"]
    },
    {
        fn: "dropTable",
        params: ["ReviewLikes"]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "averageScore",
            {
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "snsType",
            {
                "type": Sequelize.ENUM('EMAIL', 'FACEBOOK', 'INSTAGRAM', 'NAVER')
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "performedMusicsCount",
            {
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "createdDecksCount",
            {
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "snsKey",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "performedDecksCount",
            {
                "type": Sequelize.INTEGER
            }
        ]
    }
];

var rollbackCommands = [{
        fn: "removeColumn",
        params: ["Users", "snsKey"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "averageScore"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "performedDecksCount"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "performedMusicsCount"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "createdDecksCount"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "snsType"]
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
                "status": {
                    "type": Sequelize.ENUM('NORMAL', 'DELETED')
                },
                "endDate": {
                    "type": Sequelize.DATEONLY
                },
                "storeId": {
                    "type": Sequelize.INTEGER
                },
                "beginDate": {
                    "type": Sequelize.DATEONLY
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "keywordId": {
                    "type": Sequelize.INTEGER
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
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "content": {
                    "type": Sequelize.STRING
                },
                "parentId": {
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                },
                "reviewId": {
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
            "ReviewImages",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "reviewId": {
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
            "StoreImages",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "type": {
                    "type": Sequelize.ENUM('NORMAL', 'CONTRACT', 'PRICE')
                },
                "storeId": {
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
            "ReviewLikes",
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
                "reviewId": {
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
                "parentId": {
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
            "StoreLikes",
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
                "storeId": {
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
            "ReviewHits",
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
                "reviewId": {
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
            "PostImages",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "url": {
                    "type": Sequelize.STRING
                },
                "postId": {
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
            "Categories",
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
                "type": {
                    "type": Sequelize.ENUM('STORE', 'COMPANY', 'STORE_COMPANY')
                },
                "status": {
                    "type": Sequelize.ENUM('ENABLED', 'DISABLED')
                },
                "orderNo": {
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
                "storesCount": {
                    "type": Sequelize.INTEGER
                },
                "companiesCount": {
                    "type": Sequelize.INTEGER
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
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
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
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "ipAddress": {
                    "type": Sequelize.STRING
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
                "parentId": {
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
                "encarCode": {
                    "type": Sequelize.STRING
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "carBrandId": {
                    "references": {
                        "key": "id",
                        "model": "CarBrands"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
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
                "parentId": {
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
                "categoryId": {
                    "references": {
                        "key": "id",
                        "model": "Categories"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "storesCount": {
                    "type": Sequelize.STRING
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
                "yearEnd": {
                    "type": Sequelize.STRING
                },
                "sizeType": {
                    "type": Sequelize.ENUM('SMALL', 'SEMI_MEDIUM', 'MEDIUM', 'SEMI_LARGE', 'LARGE', 'EXTRA_LARGE')
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
                },
                "yearBegin": {
                    "type": Sequelize.STRING
                },
                "carBrandId": {
                    "references": {
                        "key": "id",
                        "model": "CarBrands"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "carModelgroupId": {
                    "references": {
                        "key": "id",
                        "model": "CarModelgroups"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
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
                "lat": {
                    "type": Sequelize.DECIMAL(11, 7)
                },
                "lng": {
                    "type": Sequelize.DECIMAL(11, 7)
                },
                "tel": {
                    "type": Sequelize.STRING
                },
                "desc": {
                    "type": Sequelize.STRING
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "level": {
                    "type": Sequelize.ENUM('NORMAL', 'AFFILIATE', 'EXCELLENT')
                },
                "status": {
                    "type": Sequelize.ENUM('WATING', 'HIDDEN', 'NORMAL', 'DELETED')
                },
                "ownerId": {
                    "references": {
                        "key": "id",
                        "model": "Users"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "address1": {
                    "type": Sequelize.STRING
                },
                "address2": {
                    "type": Sequelize.STRING
                },
                "stringId": {
                    "type": Sequelize.STRING
                },
                "companyId": {
                    "references": {
                        "key": "id",
                        "model": "Companies"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "repImgUrl": {
                    "type": Sequelize.STRING
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "categoryId": {
                    "references": {
                        "key": "id",
                        "model": "Categories"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "descImgUrl": {
                    "type": Sequelize.STRING
                },
                "likesCount": {
                    "type": Sequelize.INTEGER
                },
                "phoneNumber": {
                    "type": Sequelize.STRING
                },
                "openingHours": {
                    "type": Sequelize.STRING
                },
                "reviewsCount": {
                    "type": Sequelize.STRING
                },
                "adminLikesCount": {
                    "type": Sequelize.STRING
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
                "imgUrl": {
                    "type": Sequelize.STRING
                },
                "linkUrl": {
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
                "categoryId": {
                    "references": {
                        "key": "id",
                        "model": "Categories"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "nationality": {
                    "type": Sequelize.ENUM('UNKNOWN', 'DOMESTIC', 'OVERSEAS')
                },
                "titleImgUrl": {
                    "type": Sequelize.STRING
                },
                "sampleImgUrl": {
                    "type": Sequelize.STRING
                },
                "repPhoneNumber": {
                    "type": Sequelize.STRING
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
                "price": {
                    "allowNull": false,
                    "validate": {
                        "isNumeric": true
                    },
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "allowNull": false,
                    "validate": {
                        "notEmpty": true,
                        "notContains": {
                            "msg": "광고는 포함되선 안됩니다.",
                            "args": "광고"
                        }
                    },
                    "type": Sequelize.STRING
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.ENUM('HIDDEN', 'NORMAL')
                },
                "userId": {
                    "references": {
                        "key": "id",
                        "model": "Users"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "type": Sequelize.INTEGER
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "storeId": {
                    "references": {
                        "key": "id",
                        "model": "Stores"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "hitsCount": {
                    "allowNull": false,
                    "validate": {
                        "isNumeric": true
                    },
                    "type": Sequelize.INTEGER
                },
                "repImgUrl": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "carModelId": {
                    "references": {
                        "key": "id",
                        "model": "CarModels"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "type": Sequelize.INTEGER
                },
                "likesCount": {
                    "allowNull": false,
                    "validate": {
                        "isNumeric": true
                    },
                    "type": Sequelize.INTEGER
                },
                "beforeImgUrl": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "repliesCount": {
                    "allowNull": false,
                    "validate": {
                        "isNumeric": true
                    },
                    "type": Sequelize.INTEGER
                },
                "workingHours": {
                    "allowNull": false,
                    "validate": {
                        "isNumeric": true
                    },
                    "type": Sequelize.INTEGER
                },
                "adminHitsCount": {
                    "allowNull": false,
                    "validate": {
                        "isNumeric": true
                    },
                    "type": Sequelize.INTEGER
                },
                "reviewCategoryId": {
                    "references": {
                        "key": "id",
                        "model": "ReviewCategories"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "type": Sequelize.INTEGER
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
                "link": {
                    "type": Sequelize.STRING
                },
                "type": {
                    "type": Sequelize.ENUM('FREE', 'NOTICE', 'HELP', 'FAQ', 'TERM', 'STORY')
                },
                "title": {
                    "type": Sequelize.STRING
                },
                "status": {
                    "type": Sequelize.ENUM('NORMAL', 'HIDDEN')
                },
                "userId": {
                    "references": {
                        "key": "id",
                        "model": "Users"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "content": {
                    "type": Sequelize.STRING
                },
                "subType": {
                    "type": Sequelize.ENUM('UNKNOWN', 'NEWS', 'LIFE', 'CARRING_TV', 'MOTOR_SPORTS')
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "hitsCount": {
                    "type": Sequelize.INTEGER
                },
                "repImgUrl": {
                    "type": Sequelize.STRING
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "likesCount": {
                    "type": Sequelize.INTEGER
                },
                "repliesCount": {
                    "type": Sequelize.INTEGER
                },
                "adminHitsCount": {
                    "type": Sequelize.INTEGER
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
                "wd": {
                    "type": Sequelize.ENUM('UNKNOWN', '2WD', '4WD')
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
                "carBrandId": {
                    "references": {
                        "key": "id",
                        "model": "CarBrands"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "carModelId": {
                    "references": {
                        "key": "id",
                        "model": "CarModels"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "highestPrice": {
                    "type": Sequelize.INTEGER
                },
                "carModelgroupId": {
                    "references": {
                        "key": "id",
                        "model": "CarModelgroups"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
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
                "trimName": {
                    "type": Sequelize.STRING
                },
                "brandName": {
                    "type": Sequelize.STRING
                },
                "carTrimId": {
                    "references": {
                        "key": "id",
                        "model": "CarTrims"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "modelName": {
                    "type": Sequelize.STRING
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "carBrandId": {
                    "references": {
                        "key": "id",
                        "model": "CarBrands"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "carModelId": {
                    "references": {
                        "key": "id",
                        "model": "CarModels"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "isCertified": {
                    "type": Sequelize.BOOLEAN
                },
                "modelgroupName": {
                    "type": Sequelize.STRING
                },
                "carModelgroupId": {
                    "references": {
                        "key": "id",
                        "model": "CarModelgroups"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
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
                "mileage": {
                    "type": Sequelize.INTEGER
                },
                "fuelType": {
                    "type": Sequelize.ENUM('UNKNOWN', 'GOOD_GASOLINE', 'GASOLINE', 'DIESEL', 'LPG', 'HYBRID', 'EV')
                },
                "carNumber": {
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
                "carModelId": {
                    "type": Sequelize.INTEGER
                },
                "carYearMonth": {
                    "type": Sequelize.STRING
                },
                "insrCompanyId": {
                    "references": {
                        "key": "id",
                        "model": "Companies"
                    },
                    "allowNull": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "type": Sequelize.INTEGER
                },
                "insrExpiredDate": {
                    "type": Sequelize.DATEONLY
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "toGetPushed",
            {
                "type": Sequelize.BOOLEAN
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "blockedUntil",
            {
                "type": Sequelize.DATE
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "pw",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "desc",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "role",
            {
                "type": Sequelize.ENUM('NORMAL', 'BUSINESS', 'STAFF', 'ADMIN')
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "nickname",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "stringId",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "phoneNumber",
            {
                "type": Sequelize.STRING
            }
        ]
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
