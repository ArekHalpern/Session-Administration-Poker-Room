//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Table = require('./models/Table')
const Player = require('./models/Player')

//associations could go here!
Player.belongsTo(Table);  // each player belongs to a table (null if not seated)
Table.hasMany(Player, { as: 'Waitlist', foreignKey: 'waitlistTableId' });  // waitlist as a special association

module.exports = {
  db,
  models: {
    User,
    Table,
    Player
  },
}
