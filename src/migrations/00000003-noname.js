'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "newCol2" from table "Cars"
 * addColumn "newCol3" to table "Cars"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2020-04-01T05:44:20.963Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Cars", "newCol2"]
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
    }
];

var rollbackCommands = [{
        fn: "removeColumn",
        params: ["Cars", "newCol3"]
    },
    {
        fn: "addColumn",
        params: [
            "Cars",
            "newCol2",
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
