const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const config = require('./config');

console.log('init sequelize');

function generateId() {
    return uuid().split('-').join('');
}
var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    operatorsAliases: false
});
const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.created_at = {
        type: Sequelize.DOUBLE,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.DOUBLE,
        allowNull: false
    };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log('will create entity...' + obj);
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.created_at = now;
                    obj.updatedAt = now;
                } else {
                    console.log('will update entity...');
                    obj.updatedAt = now;
                }
            }
        }
    });
}
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
var exp = {
    defineModel: defineModel,
    sync: () => {
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({
                force: true
            });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}
exp.ID = ID_TYPE;
exp.generateId = generateId;
module.exports = exp;
