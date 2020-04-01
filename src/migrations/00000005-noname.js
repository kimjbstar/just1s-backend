'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "newCol1" from table "Cars"
 * removeColumn "newCol3" from table "Cars"
 * removeColumn "newCol4" from table "Cars"
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2020-04-01T11:01:32.125Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Cars", "newCol1"]
    },
    {
        fn: "removeColumn",
        params: ["Cars", "newCol3"]
    },
    {
        fn: "removeColumn",
        params: ["Cars", "newCol4"]
    }
];

var rollbackCommands = [{
        fn: "addColumn",
        params: [
            "Cars",
            "newCol1",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Cars",
            "newCol3",
            {
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Cars",
            "newCol4",
            {
                "type": Sequelize.INTEGER
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
