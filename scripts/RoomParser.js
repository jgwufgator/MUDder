function RoomParser(rooms){
	console.log('rooms.length: ' + rooms.length);
	for(i = 0; i < rooms.length; i++)
	{		
		if(rooms[i].id)
		{
			var id = rooms[i].id;
			console.log('Iteration: ' + i + ', id: ' + id + ', desc: ' + (rooms[i].desc.length == 0) ? rooms[i].shortDesc : rooms[i].desc);
			var split = id.split(',');
			rooms[i].position = {};
			rooms[i].position.x = parseInt(split[0]);
			rooms[i].position.y = parseInt(split[1]);
			rooms[i].position.z = parseInt(split[2]);
		}
	}
}