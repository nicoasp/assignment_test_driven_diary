function Diary(){
	this.entries = [];
	this.entry = function(body){
		var newMessage = {};
		newMessage.body = body;
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