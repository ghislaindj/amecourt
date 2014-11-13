var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    roomsJson = require('../json/rooms.json');

var RoomSchema = new Schema({
  name: String,
  price: Number,
  customId: Number,
  cottage: Boolean,
  roomsCount: Number,
  beds: String,
  avgPrice: String,
  description: String,
  roomPrices: Array,
  cottagePrices: Array
});

var room = mongoose.model('Room', RoomSchema);

room.formage = {
    label: 'Chambres',
    singular: 'Chambre',
    list: ['name', 'price']
};

seedRooms();

function seedRooms() {
    room.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            roomsJson.rooms.forEach(function(roomJson) {
              roomJson.customId = roomJson.id;
              room.create(roomJson);
            });
        }
    });
}

exports.module = room;