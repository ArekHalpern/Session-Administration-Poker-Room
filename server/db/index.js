//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Table = require('./models/Table')
const Player = require('./models/Player')
const Seat = require('./models/Seat');

//associations could go here!
Player.belongsTo(Table);  // each player belongs to a table (null if not seated)
Table.hasMany(Player, { as: 'Waitlist', foreignKey: 'waitlistTableId' });  // waitlist as a special association
Table.hasMany(Seat, { as: 'tableSeats' });  // One table has many seats
Seat.belongsTo(Table);  // Each seat belongs to one table
Player.hasOne(Seat);  // Each player has one seat
Seat.belongsTo(Player);  // Each seat belongs to one player

module.exports = {
  db,
  models: {
    User,
    Table,
    Player,
    Seat
  },
}
