function Diary(){
	this.entries = [];
	this.entry = function(body, date){
		var newMessage = {};
		newMessage.body = body;
		newMessage.time = Date.now();
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