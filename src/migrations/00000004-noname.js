'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "newCol4" to table "Cars"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2020-04-01T05:49:06.853Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Cars",
        "newCol4",
        {
            "type": Sequelize.INTEGER
        }
    ]
}];

var rollbackCommands = [{
    fn: "removeColumn",
    params: ["Cars", "newCol4"]
}];

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
