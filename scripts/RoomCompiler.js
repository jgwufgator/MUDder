function RoomCompiler(rooms, movementHandler) {

	self = this;
	self.rooms = rooms;
	self.movementHandler = movementHandler;

	this.init = function(){
		self.parseRooms();
		self.compileRooms();
	};

	this.parseRooms = function() {
		console.log('rooms.length: ' + rooms.length);
		for(i = 0; i < rooms.length; i++)
		{		
			if(rooms[i].id)
			{
				var id = rooms[i].id;
				console.log('Iteration: ' + i + ', id: ' + id + ', desc: ' + rooms[i].desc);
				var split = id.split(',');
				rooms[i].position = {};
				rooms[i].position.x = parseInt(split[0]);
				rooms[i].position.y = parseInt(split[1]);
				rooms[i].position.z = parseInt(split[2]);
			}
		}
	};

	this.compileRooms = function() {
		$.each(rooms, self.findChildren);
	};

	this.findChildren = function(index, room) {
		$.each(room.exits, function(exitDirection, exitRoom) {
			var exitRoom = self.getExitRoom(room.position, exitDirection);
			if(exitRoom){
				room.exits[exitDirection].id = exitRoom.id;
				room.exits[exitDirection].remoteDesc = exitRoom.remoteDesc;
			}
			else{
				console.log('Did not find room for id: ' + room.id + ', exit direction: ' + exitDirection); 
			}
	    });
	};

    this.getExitRoom = function(position, direction){
        var nextPosition = self.movementHandler.getNextPosition( { x: position.x, y: position.y, z: position.z }, direction);
        var exitRoom = self.movementHandler.getRoom(self.rooms, nextPosition);
        return exitRoom;
    };
}