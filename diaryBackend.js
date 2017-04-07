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
	this.tags = function() {
		let _tags = [];
		this._entries.forEach((entry) => {
			entry.tags.forEach((tag) => {
				if (!_tags.includes(tag)) {
					_tags.push(tag);
				}
			})
		})
		return _tags.sort();
	}
	this.entriesWithTag = function(tag) {
		let _entriesWithTag = [];
		this._entries.forEach((entry) => {
			if (entry.tags.includes(tag)) {
				_entriesWithTag.push(entry);
			}
		})
		return _entriesWithTag;
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