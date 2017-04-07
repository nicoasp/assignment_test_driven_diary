function Diary(){
	this._entries = [];
	this.entry = function(body, date){
		var newMessage = {};
		newMessage.body = body;
		newMessage.time = date || Date.now();
		newMessage.tags = [];

		let tagFinder = /#\w+/g
		let matches = body.match(tagFinder);

		if (matches) {
			matches.forEach((match) => {
				newMessage.tags.push(match.slice(1));
			})
		}
		
		this._entries.push(newMessage);
	}
	this.entries = function() {
	    return this._entries;
	}
}




module.exports = Diary;



/***
 * File data structure
 * [
        {
            "time": Date(),
            "body": "<string>",
            "tags": []
        },...
    ]
 }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ***/