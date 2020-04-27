'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Hashtags", deps: []
 * createTable "Music", deps: []
 * createTable "Performs", deps: []
 * createTable "Users", deps: []
 * createTable "Decks", deps: [Users]
 * createTable "DeckHashtags", deps: [Decks, Hashtags]
 * createTable "DeckMusics", deps: [Decks, Music]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2020-04-26T14:09:50.395Z",
    "comment": ""
};

var migrationCommands = [

    {
        fn: "createTable",
        params: [
            "Hashtags",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING(256)
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
            "Music",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "allowNull": false,
                    "type": Sequelize.STRING(256)
                },
                "artist": {
                    "allowNull": false,
                    "type": Sequelize.STRING(256)
                },
                "link": {
                    "allowNull": false,
                    "type": Sequelize.STRING(256)
                },
                "averageScore": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "belogsDecksCount": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "performsCount": {
                    "allowNull": false,
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
            "Performs",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "deckMusicId": {
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "type": Sequelize.INTEGER
                },
                "answer": {
                    "type": Sequelize.STRING
                },
                "isCorrect": {
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
            "Users",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "snsType": {
                    "type": Sequelize.ENUM('EMAIL', 'FACEBOOK', 'INSTAGRAM', 'NAVER')
                },
                "status": {
                    "type": Sequelize.ENUM('NORMAL', 'WITHDRAWN')
                },
                "snsKey": {
                    "type": Sequelize.STRING
                },
                "email": {
                    "type": Sequelize.STRING
                },
                "imgUrl": {
                    "type": Sequelize.STRING
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "createdDecksCount": {
                    "type": Sequelize.INTEGER
                },
                "performedMusicsCount": {
                    "type": Sequelize.INTEGER
                },
                "performedDecksCount": {
                    "type": Sequelize.INTEGER
                },
                "averageScore": {
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
            "Decks",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "allowNull": false,
                    "type": Sequelize.STRING(256)
                },
                "hitsCount": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "averageScore": {
                    "allowNull": false,
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
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
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
            "DeckHashtags",
            {
                "deckId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Decks",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "DeckHashtags_hashtagId_deckId_unique",
                    "type": Sequelize.INTEGER
                },
                "hashtagId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Hashtags",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "DeckHashtags_hashtagId_deckId_unique",
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
            "DeckMusics",
            {
                "deckId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Decks",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "DeckMusics_musicId_deckId_unique",
                    "type": Sequelize.INTEGER
                },
                "musicId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Music",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "DeckMusics_musicId_deckId_unique",
                    "type": Sequelize.INTEGER
                },
                "second": {
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
        params: ["Decks"]
    },
    {
        fn: "dropTable",
        params: ["DeckHashtags"]
    },
    {
        fn: "dropTable",
        params: ["DeckMusics"]
    },
    {
        fn: "dropTable",
        params: ["Hashtags"]
    },
    {
        fn: "dropTable",
        params: ["Music"]
    },
    {
        fn: "dropTable",
        params: ["Performs"]
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