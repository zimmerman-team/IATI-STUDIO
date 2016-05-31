require('babel-core/register')

var migrate = require('migrate');
var mongoose = require("mongoose")
mongoose.Promise = global.Promise; // use ES6 promises

var config = require('./config/config')
config = config.default

mongoose.connect(config.database.url)
var connection = mongoose.connection;

connection.once('open', function() {

    var set = migrate.load(
        'migrations/.migrate',
        'migrations',
        connection.db // inject db in up(), down()
    );

    set.up(function (err) {
        if (err) console.error(err)
        if (err) throw err;

        console.log('Migration completed');
    });
})

