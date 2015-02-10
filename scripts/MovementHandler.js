function MovementHandler() {
	self = this;

	this.getNextPosition = function(currentPosition, moveDirection, rooms) {
        var moveDirection = moveDirection.toUpperCase();
        var nextPosition = {};
        nextPosition.x = currentPosition.x;
        nextPosition.y = currentPosition.y;
        nextPosition.z = currentPosition.z;
        
        if(moveDirection.indexOf('N') >= 0)
            nextPosition.y -= 1;
        if(moveDirection.indexOf('S') >= 0)
            nextPosition.y += 1;
        if(moveDirection.indexOf('E') >= 0)
            nextPosition.x += 1;
        if(moveDirection.indexOf('W') >= 0)
            nextPosition.x -= 1;
        return nextPosition;//self.getRoom(nextPosition);      
    };

    this.getRoom = function(rooms, position){
        var found;
        var result = rooms.some(function(obj) {
            if((obj.position.x === position.x) &&  (obj.position.y === position.y)) {
                found = obj;
                return true;
            }
        });
        return found;
    };
};