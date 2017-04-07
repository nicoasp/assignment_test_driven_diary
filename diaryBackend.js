const fs = require('fs');

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
	this.date = function(date) {
    let inputDateString = new Date(date).toDateString();	    
    let _entriesForDate = [];
    this._entries.forEach((entry) => {
    	let entryDateString = new Date(entry.time).toDateString();
      if (entryDateString == inputDateString) {
          _entriesForDate.push(entry);
      }
    });
    return _entriesForDate;
	};

	this.today = function(){
		return this.date(Date.now());
	}

	this.search = function(word){
		let regex = new RegExp('[^a-zA-Z0-9]*' + word + '[^a-zA-Z0-9]*', 'i');
		let _entriesWithWord = [];
		this._entries.forEach((entry) => {
			if (regex.test(entry.body)) {
				_entriesWithWord.push(entry);
			}
		})
		return _entriesWithWord;
	}

	this.save = function(filename) {
		let dataToSave = JSON.stringify(this._entries)
		fs.writeFileSync(`./files/${filename}`, dataToSave, 'utf8');
	}

	this.load = function(filename) {
		let loadedEntries = fs.readFileSync(`./files/${filename}`);
		loadedEntries = JSON.parse(loadedEntries);
		this._entries = loadedEntries;
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