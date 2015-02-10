function GameHandler($inElt, options) {
    var self = this;
    this.$elt = $inElt;
    this.options = options;
    this.$commandInput = $inElt.find('.js-command-input');
    this.playerData = { roomsVisited: [] };

    this.start = function () {
        //self.options.renderEngine.drawBackground(self.options.renderEngine.pattern);
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
            default:
                alert('don\'t know what ' + input.action + ' is.  Target is ' + input.target);
        }
    };

    this.showCoordinates = function() {
        self.options.renderEngine.renderString(self.currentPosition.id);
    };

    this.move = function(moveDirection, first){
        var movementPossible = false;
        if(!first)            
            movementPossible = self.currentPosition.exits.hasOwnProperty(moveDirection.toLowerCase());        
        if(first || movementPossible)
        {
            var previousRoom = first ? null : self.currentPosition;
            var newPosition = first ? options.position.x + "," + options.position.y + "," + options.position.z : self.currentPosition.exits[moveDirection.toLowerCase()].id;            
            var fb = new Firebase(self.options.firebaseUrl + newPosition);
            fb.once('value', function(snap) {
                self.currentPosition = snap.val();
                self.playerData.roomsVisited.push(self.currentPosition.position);
                self.options.renderEngine.render(self.currentPosition, first ? null : previousRoom);
                self.previousRoom = previousRoom;
            });
        }
        else
        {
            self.options.renderEngine.renderRefusal();
        }        
    };
}