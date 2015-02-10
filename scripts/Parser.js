function Parser(options) {
    var self = this;
    this.tokenizer = options.tokenizer;

    this.parse = function(input) {
        var tokenizedInput = self.tokenize(input);
        var returnedInput = { action: tokenizedInput[0],
            target: ''
        };
        if(tokenizedInput[1])
            returnedInput.target = tokenizedInput[1];        
        return returnedInput;
    };

    this.tokenize = function(input) {
        return input.split(self.tokenizer);
    };
}