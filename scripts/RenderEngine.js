function RenderEngine($outputDiv, $canvasElt) {
	var self = this;

	this.$outputDiv = $outputDiv;
	this.$canvasElt = $canvasElt;
	this.scaleFactor = 16;
	this.margin = 16;

	this.init = function(){
		self.resetMap();
	};

	this.resetMap = function() {
		$('.map-canvas').clearCanvas();
		$('.shadowLayer').drawRect({
			fillStyle: '#000000',
			fromCenter: false,
			x: 0,
			y: 0,
			width: 440,
			height: 600
		});
	};

	this.renderLoadedMap = function(gameState) {

	};

	this.clearCanvases = function() {
	};

	// this.pattern = $('#mapCanvas0').createPattern({
	// 	  source: $('#greengrass')[0],
	// 	  repeat: 'repeat',		  
	// 	  //load: self.drawBackground
	// 	});

	this.drawBackground = function(){};/*function(pattern){
		$('#mapCanvas0').drawRect({
				fillStyle: pattern,
				x: 0,
				y: 0,
				fromCenter: false,				
				width: 440,
				height: 600});
	};*/

	this.scrollToBottom = function() {
		self.$outputDiv.scrollTop(self.$outputDiv[0].scrollHeight);		
	};

	this.render = function(room, previousRoom, fromLoad) {
		if(!fromLoad) {
			var desc = (room.desc.length === 0) ? 'You are in the ' + room.remoteDesc + '.' : room.desc;
			self.$outputDiv.append('<p class="js-room-description">' + desc + '</p>');
			self.renderExits(room);
			self.scrollToBottom();
		}		
		self.renderRoomOnCanvas(room, previousRoom);		
	};

	this.renderString = function(s) {
		self.$outputDiv.append('<p class="js-refusal">' + s+ '</p>');
		self.scrollToBottom();
	};

	this.renderRefusal = function() {
		self.$outputDiv.append('<p class="js-refusal">You can\'t go that way.</p>');
		self.scrollToBottom();
	};

	this.renderExits = function(room) {
		var exitString = '<p>Available exits:</p>';  //'Available exits: ';
		$.each(room.exits, function(key, value) {
			exitString += '<p>' + key.toUpperCase() + ' - ' + value.remoteDesc + '</p>';
		});		
		self.$outputDiv.append('<div class="js-room-exits">' + exitString + '</div>');
		self.$outputDiv.append('<br>');
		console.log(exitString);
	};

	this.generateExitString = function(direction, description) {
		return '<p>' + direction.toUpperCase() + ' - ' + description + '</p>'; 
	};

	this.showFloorCanvas = function(currentFloor){
		var allFloors = $('.map-canvas');
		$.each(allFloors, function(i, value) {
			var $floor = $(allFloors[i]);
			var levelClass = $floor.attr("class").split(' ');

			if($floor.hasClass('level' + currentFloor) || $floor.hasClass('level' + currentFloor + 'Shadow'))
				$floor.show();
			else if($floor.hasClass('base-level') === false)
			{
				$floor.hide();
			}
		});
	};

	this.drawVector = function(x, y, z, angle, length){
			$('.map-canvas.level' + z).drawVector({
				strokeStyle: '#000',
				strokeWidth: 4,
				x: self.margin + x,
				y: self.margin + y,
				a1: angle,
				l1: length
			});
		};

	this.renderPlayers = function(players) {

	};
	
	this.renderRoomOnCanvas = function(room, previousRoom){
		var scaleFactor = self.scaleFactor;
		if(room) {
			$('.map-canvas.level'+ room.position.z).drawRect({
				fillStyle: '#33CC33',
				x: self.margin + room.position.x * 2 * self.scaleFactor,
				y: self.margin + room.position.y * 2 * self.scaleFactor,
				width: self.scaleFactor,
				height: self.scaleFactor,
				fromCenter: false
			});
			$('.map-canvas.level'+ room.position.z + 'Shadow').clearCanvas({			
				x: room.position.x * 2 * self.scaleFactor,
				y: room.position.y * 2 * self.scaleFactor,
				width: self.scaleFactor * 3,
				height: self.scaleFactor * 3,
				fromCenter: false
			});
			self.showFloorCanvas(room.position.z);

			var sqrtOfTwo = Math.sqrt(2);

			$.each(room.exits, function(key, value){
					switch(key){
						case 'n':
							self.drawVector(room.position.x * 2 * scaleFactor + 0.5 * scaleFactor, room.position.y * 2 * scaleFactor, room.position.z, 0, scaleFactor);
							break;
						case 's':
							self.drawVector(room.position.x * 2 * scaleFactor + 0.5 * scaleFactor, room.position.y * 2 * scaleFactor + scaleFactor, room.position.z, 180, scaleFactor);
							break;
						case 'nw':
						case 'wn':
							self.drawVector(room.position.x * 2 * scaleFactor, room.position.y * 2 * scaleFactor, room.position.z, -45, scaleFactor * sqrtOfTwo);
							break;
						case 'ne':
						case 'en':
							self.drawVector(room.position.x * 2 * scaleFactor + scaleFactor, room.position.y * 2 * scaleFactor, room.position.z, 45, scaleFactor * sqrtOfTwo);
							break;
						case 'e':
							self.drawVector(room.position.x * 2 * scaleFactor + scaleFactor, room.position.y * 2 * scaleFactor + 0.5 * scaleFactor, room.position.z, 90, scaleFactor);
							break;
						case 'w':
							self.drawVector(room.position.x * 2 * scaleFactor, room.position.y * 2 * scaleFactor + 0.5 * scaleFactor, room.position.z, -90, scaleFactor);
							break;
						case 'sw':
						case 'ws':
							self.drawVector(room.position.x * 2 * scaleFactor, room.position.y * 2 * scaleFactor + scaleFactor, room.position.z, -135, scaleFactor * sqrtOfTwo);
							break;
						case 'se':
						case 'es':
							self.drawVector(room.position.x * 2 * scaleFactor + scaleFactor, room.position.y * 2 * scaleFactor + scaleFactor, room.position.z, 135, scaleFactor * sqrtOfTwo);
							break;
						default:
							break;
					}
				} 
			);
		}
		if(previousRoom /*&& (room.position.z === previousRoom.position.z)*/)
			$('.map-canvas.level'+ previousRoom.position.z).drawRect({
				fillStyle: '#0066ff',
				x: self.margin + previousRoom.position.x * 2 * self.scaleFactor,
				y: self.margin + previousRoom.position.y * 2 * self.scaleFactor,				
				width: self.scaleFactor,
				height: self.scaleFactor,
				fromCenter: false
			});


		// $('#map-canvas').drawEllipse({
		// 	fillStyle: 'rgba(0, 0, 153, 0.5)',
		// 	opacity: 0.1,
		// 	x: self.margin + room.position.x * 2 * self.scaleFactor,
		// 	y: self.margin + room.position.y * 2 * self.scaleFactor,
		// 	width: scaleFactor, height: scaleFactor
		// });

		
	};	
}