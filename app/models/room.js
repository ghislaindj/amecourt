var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    roomsJson = require('../json/rooms.json');

var cottagePrice = {
    weekPrice : { type: String },
    title : { type: String }
};

var RoomSchema = new Schema({
  name: String,
  customId: Number,
  cottage: Boolean,
  roomsCount: Number,
  guestsCount: Number,
  beds: String,
  avgPrice: String,
  description: String,
  roomPrices: [String],
  cottagePrices: [cottagePrice]
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