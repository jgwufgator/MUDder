function GameHandler($inElt, options) {
    var self = this;
    this.$elt = $inElt;
    this.options = options;
    this.$commandInput = $inElt.find('.js-command-input');
    this.playerData = { roomsVisited: [], questsSolved: [], experience: 0, runes: [] };
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
            case 'SAY':
                self.say(input.target);
                break;
            case 'HINT':
                self.say('hint');
                break;            
            case 'STATUS':
                self.showStatus();                
                break;
            case 'HELP':
                self.showHelp();
                break;
            case 'CHANT':
                self.chant(input.target);
                break;
            default:
                self.say(input.action);
                break;
        }
    };

    this.showHelp = function() {
        self.options.renderString('Available commands are N, NE, NW, E, W, S, SE, SW, LOGOUT, SAVE, LOAD, SAY, HINT, STATUS, CHANT, and HELP.');
    };

    this.showStatus = function (){
         self.options.renderEngine.renderString(self.playerData.experience + ' experience');
         self.options.renderEngine.renderString('Rooms visited: ' + Object.keys(self.playerData.roomsVisited).length + '\r\n');
        var statusString = 'Runes: ';
        if(self.playerData.runes.length > 0) {
            for(var i = 0; i < self.playerData.runes.length; i++){
                statusString += '"' + self.playerData.runes[i] + '"';
                if(i != self.playerData.runes.length - 1)
                    statusString += ", ";
                else
                    statusString += ".\r\n";
            }
            if(self.playerData.runes.length === 12)
            {
                self.options.renderEngine.renderString('Unscramble the runes and "CHANT" the secret incantation!');
            }
        }
        else
            statusString += 'none.';

        self.options.renderEngine.renderString(statusString);
    };

    this.showCoordinates = function() {
        self.options.renderEngine.renderString(self.currentPosition.id);
    };

    this.say = function(target) {        
        if(self.inQuest) {
            if(self.currentPosition.quest.answer.toLowerCase().search(target.toLowerCase()) >= 0 ) {
                self.inQuest = false;
                self.playerData.questsSolved[self.currentPosition.id] = true;
                self.playerData.experience += 1;
                self.options.renderEngine.renderString('You have solved this quest!');
                if(self.currentPosition.quest.id != 5) {
                    self.playerData.runes.push(self.currentPosition.quest.reward);
                    self.options.renderEngine.renderString('Your reward is a "' + self.currentPosition.quest.reward + '" rune and +1 experience.');
                }
                self.options.renderEngine.renderString('You may now leave the area.');                  
            }
            else if(target.toLowerCase() == 'hint')
                self.options.renderEngine.renderString('Your hint is: ' + self.currentPosition.quest.hint + '.');
        }
        else {
            if(target)
                alert('don\'t know what ' + target + ' is.');
            else
                self.options.renderEngine.renderString(target);
        }
    };

    this.move = function(moveDirection){
        var movementPossible = false;
        if(self.inQuest) {
            self.options.renderEngine.renderString('You may not leave the area until you solve the current area\'s quest!');
            return;
        }
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
                self.roomFireBase.child('players').child(self.options.authData.uid).set(authData.username);
                self.playerData.roomsVisited[self.currentPosition.id] = true;
                self.options.renderEngine.render(self.currentPosition, self.firstMove ? null : previousRoom);                
                self.previousRoom = previousRoom;
                self.occupantsFireBase = new Firebase(roomUrl + '/players');
                if(self.currentPosition.quest && !self.playerData.questsSolved[self.currentPosition.id]) {
                    self.inQuest = true;
                    self.options.renderEngine.renderString('Answer this riddle:  ' + self.currentPosition.quest.riddle + '.');
                }
                self.occupantsFireBase.on('child_added', function(snapshot) {
                    var newPlayerId = snapshot.name();
                    if(newPlayerId != self.options.authData.uid) {
                        var playersEnteringRoomString = snapshot.val() + ' is in the room.';                    
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
        self.options.renderEngine.renderString('Saving...');
        var fb = new Firebase(self.options.firebaseUrl + '/users/' + self.options.authData.uid);        
        var gameState =
        {
            roomsVisited: self.playerData.roomsVisited,
            currentRoom: self.currentPosition.id,
            questsSolved: self.playerData.questsSolved,
            experience: self.playerData.experience,
            runes: self.playerData.runes
        };
        fb.set(gameState);
        self.options.renderEngine.renderString('Saved.');
    };

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
    };

    this.renderCurrentRoom = function(currentRoom) {
        var roomUrl = self.options.firebaseUrl + 'rooms/' + currentRoom;
        var fb = new Firebase(roomUrl);
        fb.once('value', function(snap) {
            var room = snap.val();
            self.options.renderEngine.render(room, null);
            self.options.renderEngine.renderString('Load complete');
        });
    };

    this.refresh = function() {
        var removePlayerFromRoomFB = new Firebase(self.options.firebaseUrl + 'rooms/' + previousRoom.id + '/players/' + self.options.authData.uid);
        removePlayerFromRoomFB.remove();
    };

    self.chant = function(target) {
        var chantUrl = self.options.firebaseUrl + 'rooms/' + target;
        var fb = new Firebase(chantUrl);
        fb.once('value', function(snap) {
            if(snap.exists()) {
                var treasureRoom = snap.val();
                self.options.renderEngine.renderString('You won.  Yippee!');
            }            
        });
    };
}