function GameHandler($inElt, options) {
    var self = this;
    this.$elt = $inElt;
    this.options = options;
    this.$commandInput = $inElt.find('.js-command-input');
    this.playerData = { roomsVisited: [] };
    this.roomFireBase = null;
    this.occupantsFireBase = null;

    this.start = function () {
        //self.options.renderEngine.drawBackground(self.options.renderEngine.pattern);
        self.firstMove = true;
        self.$elt.on('keypress', '.js-command-input', self.handleCommandInput);
        self.move(null, true);        
    };

    this.handleCommandInput = function(e) {
        if(e.charCode != 13)
            return;

        var input = options.parser.parse(e.target.value);        
        self.$commandInput.val('');        

        switch(input.action.toUpperCase())
        {
            case 'N':
            case 'NE':
            case 'NW':            
            case 'E':
            case 'W':
            case 'S':
            case 'SE':
            case 'SW':
                self.move(input.action);               
                break;
            case 'SC':
                self.showCoordinates();
                break;
            case 'LOGOUT':
                self.logout();
                break;
            case 'SAVE':
                self.saveGame();
                break;
            case 'LOAD':
                self.loadGame();
                break;
            default:
                alert('don\'t know what ' + input.action + ' is.  Target is ' + input.target);
        }
    };

    this.showCoordinates = function() {
        self.options.renderEngine.renderString(self.currentPosition.id);
    };

    this.move = function(moveDirection){
        var movementPossible = false;
        if(!self.firstMove)            
            movementPossible = self.currentPosition.exits.hasOwnProperty(moveDirection.toLowerCase());        
        if(self.firstMove || movementPossible)
        {
            self.removeFireBaseListeners();
            var previousRoom = self.firstMove ? null : self.currentPosition;
            if(previousRoom){
                var removePlayerFromRoomFB = new Firebase(self.options.firebaseUrl + 'rooms/' + previousRoom.id + '/players/' + self.options.authData.uid);
                removePlayerFromRoomFB.remove();
            }
            var newPosition = self.firstMove ? options.position.x + "," + options.position.y + "," + options.position.z : self.currentPosition.exits[moveDirection.toLowerCase()].id;
            var roomUrl = self.options.firebaseUrl + 'rooms/' + newPosition;
            self.roomFireBase = new Firebase(roomUrl);
            self.roomFireBase.once('value', function(snap) {
                self.currentPosition = snap.val();
                self.roomFireBase.child('players').child(self.options.authData.uid).set('true');
                self.playerData.roomsVisited[self.currentPosition.id] = true;
                self.options.renderEngine.render(self.currentPosition, self.firstMove ? null : previousRoom);                
                self.previousRoom = previousRoom;
                self.occupantsFireBase = new Firebase(roomUrl + '/players');
                self.occupantsFireBase.on('child_added', function(snapshot) {
                    var newPlayer = snapshot.val();
                    if(newPlayer != self.options.authData.uid) {
                        var playersEnteringRoomString = newPlayer + ' is in the room.';                    
                        self.options.renderEngine.renderString(playersEnteringRoomString);
                    }
                });
                self.occupantsFireBase.on('child_removed', function(snapshot) {
                    var leavingPlayer = snapshot.val();
                    if(leavingPlayer != self.options.authData.uid) {
                        var playersLeavingRoomString = leavingPlayer + ' left the room.';                    
                        self.options.renderEngine.renderString(playersLeavingRoomString);
                    }
                });
            });
            
            self.firstMove = false;
        }
        else
        {
            self.options.renderEngine.renderRefusal();
        }        
    };

    this.removeFireBaseListeners = function(){
        if(self.occupantsFireBase) {
                self.occupantsFireBase.off('value');
                self.occupantsFireBase.off('child_removed');
                self.occupantsFireBase.off('child_changed');
        }
    };

    this.logout = function() {
        self.options.authenticationHandler.logout();
    };

    this.saveGame = function() {
        var fb = new Firebase(self.options.firebaseUrl + '/users/' + self.options.authData.uid);        
        var gameState =
        {
            roomsVisited: self.playerData.roomsVisited,
            currentRoom: self.currentPosition.id
        };
        fb.set(gameState);    
    }

    this.loadGame = function() {
        self.options.renderEngine.renderString('LOADING...');
        var fb = new Firebase(self.options.firebaseUrl + '/users/' + self.options.authData.uid);
        fb.once('value', function(dataSnapshot) {
            var gameState = dataSnapshot.val();
            self.options.renderEngine.resetMap();

             $.each(gameState.roomsVisited, function(k, v) {
                var roomUrl = self.options.firebaseUrl + 'rooms/' + k;
                var fb = new Firebase(roomUrl);
                fb.once('value', function(snap) {
                    var room = snap.val();
                    self.options.renderEngine.render(room, room, true);
                    self.renderCurrentRoom(gameState.currentRoom);
                    if(gameState.currentRoom === k)
                        self.currentPosition = room;
                });
            });            
        });
    }

    this.renderCurrentRoom = function(currentRoom) {
        var roomUrl = self.options.firebaseUrl + 'rooms/' + currentRoom;
        var fb = new Firebase(roomUrl);
        fb.once('value', function(snap) {
            var room = snap.val();
            self.options.renderEngine.render(room, null);
            self.options.renderEngine.renderString('Load complete');
        });
    }

    this.refresh = function() {
        var removePlayerFromRoomFB = new Firebase(self.options.firebaseUrl + 'rooms/' + previousRoom.id + '/players/' + self.options.authData.uid);
        removePlayerFromRoomFB.remove();
    }
}