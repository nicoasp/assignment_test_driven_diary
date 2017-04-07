function Diary(){
	this.entries = [];
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
		
		this.entries.push(newMessage);
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