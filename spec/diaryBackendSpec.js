const diaryData = ("./data/testdata");
const fs = require('fs');


const Diary = require('../diaryBackend');



describe('Diary', function(){
  var diary;

	beforeEach(function(){
		diary = new Diary();
	});
	describe('entry function', function(){
		
		describe('entries with only body', function(){
			var date;

			beforeEach(function(){
				diary.entry("Brad is everything to me.");
				date = Date.now();
				diary.entry("<3 Braaaad <3");
			});			

			it('stores a message', function() {				
				let bodies = diary._entries.map((entry) => {
					return entry.body;
				})
				expect(bodies).toContain("Brad is everything to me.");
			})

			it('stores a different message', function() {				
				let bodies = diary._entries.map((entry) => {
					return entry.body;
				})
				expect(bodies).toContain("<3 Braaaad <3");
			})

			it ('records the date', function(){
	        let time = diary._entries[0].time;			
			expect(time).toBeCloseTo(date);
			});
		});

		describe('entries with date', function(){
			it ('accepts a date object and adds it to the entry', function() {
		       let date = Date.parse("Mon, 25 Dec 1995 13:30:00 GMT");
		       diary.entry("YOYOYOYOYOYOYO", date);
		    		    
		       let time1 = diary._entries[0].time;
               expect(time1).toEqual(date);
			});
		});

		describe('entries with tags', function(){

			beforeEach(function(){
				diary.entry("I'm standing outside Brad's house #yolo");
				diary.entry("OMG. What have I done? #sorrynotsorry");
				diary.entry("What if dogs were not dogs? #dogs I done? #sorrynotsorry");
				diary.entry("What if dogs were not dogs? ###dogs");
				diary.entry(" # some stuff i guess");
			});						

			it ('records the right tag for a message', function(){
				let body = "I'm standing outside Brad's house #yolo";
				let entry = diary._entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual(['yolo']);
			})

			it ('records the right tag for a different message', function(){
				let body = "OMG. What have I done? #sorrynotsorry";
				let entry = diary._entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual(['sorrynotsorry']);
			})
			it ('records multiple tags', function(){
				let body = "What if dogs were not dogs? #dogs I done? #sorrynotsorry";
				let entry = diary._entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual(['dogs', 'sorrynotsorry']);
			})
			it ('records tags with multiple leading #s', function(){
				let body = "What if dogs were not dogs? ###dogs";
				let entry = diary._entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual(['dogs']);
			})
			it ('ignores standlone #', function(){
				let body = " # some stuff i guess";
				let entry = diary._entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual([]);
			})
		})
		
		
	});
	
	describe("entries function", function() {
	    
	    describe("if entries is empty", function() {
        it("returns an empty array", function() {
            expect(diary.entries()).toEqual([]);
        });
	        
	    });
	    describe("if entries are present", function() {
	        
    	  beforeEach(function(){
    			diary.entry("I'm standing outside Brad's house #yolo");
    			diary.entry("OMG. What have I done? #sorrynotsorry");
    			diary.entry("What if dogs were not dogs? #dogs I done? #sorrynotsorry");
				diary.entry("What if dogs were not dogs? ###dogs");
				diary.entry(" # some stuff i guess");
    		});
    		
    		it("returns the correct number of entries", function() {
    		  expect(diary.entries().length).toEqual(5);
    		});

    		it("entries have body, date and tags", function() {
    			let keys = Object.keys(diary.entries()[0]).sort();
    		  expect(keys).toEqual(['body', 'tags', 'time']);
    		});
    		    		
	    });	    	    
	});

	describe('tags method', function() {

		describe('if no entries', function(){
			it ('returns an empty array', function(){
				expect(diary.tags()).toEqual([]);
			})
		})

		describe("if no tags", function(){
  	  beforeEach(function(){
  			diary.entry("I'm standing outside Brad's house");
  			diary.entry("OMG. What have I done?");
  			diary.entry("What if dogs were not dogs? I done?");
				diary.entry("What if dogs were not dogs?");
				diary.entry(" # some stuff i guess");
  		});			

			it('returns an empty array', function(){
				expect(diary.tags()).toEqual([]);
			})
		})

		describe('if tags present', function() {
		  beforeEach(function(){
  			diary.entry("I'm standing outside Brad's house #yolo");
  			diary.entry("OMG. What have I done? #sorrynotsorry");
  			diary.entry("What if dogs were not dogs? #dogs I done? #sorrynotsorry");
				diary.entry("What if dogs were not dogs? ###dogs");
				diary.entry(" # some stuff i guess");
  		});

  		it('returns a list of unique tags', function() {
  			expect(diary.tags()).toEqual(['dogs', 'sorrynotsorry', 'yolo']);
  		})
		})
	})

	describe('entriesWithTag method', function() {

	  beforeEach(function(){
			diary.entry("I'm standing outside Brad's house #yolo");
			diary.entry("OMG. What have I done? #sorrynotsorry");
			diary.entry("What if dogs were not dogs? #dogs I done? #sorrynotsorry");
			diary.entry("What if dogs were not dogs? ###dogs");
			diary.entry(" # some stuff i guess");
		});


		it ("returns an empty array if tag doesn't exist", function(){
			expect(diary.entriesWithTag('bananas')).toEqual([]);
		});

		it ("returns the correct number of entries if tag exists", function(){
			expect(diary.entriesWithTag('dogs').length).toEqual(2);
		});


	});
// 	describe("get entries by today method", function() {
	    
// 	    it("returns ")
	    
// 	});
	describe("date method", function() {
    let date;
    beforeEach(function(){
      date = Date.parse("Mon, 25 Dec 1995 13:30:00 GMT");
			diary.entry("I'm standing outside Brad's house #yolo", date);
			diary.entry("OMG. What have I done? #sorrynotsorry", date);
			diary.entry(" # some stuff i guess", date);
			diary.entry(" # some stuff i guess", Date.parse("Mon, 25 Dec 1995 00:30:00 GMT"));
		});
		
		it("returns any empty array if there are no entries for that date", function() {
		    expect(diary.date(Date.now())).toEqual([]);
		})
		
		    
		it("returns entries for the specified dated", function() {
		    expect(diary.date(date).length).toEqual(4);
		});
	    	    
	});

	describe("today method", function() {
    let date;
    beforeEach(function(){

		});
		
		it("returns any empty array if there are no entries for today", function() {
		  date = Date.parse("Mon, 25 Dec 1995 13:30:00 GMT");
			diary.entry("I'm standing outside Brad's house #yolo", date);
			diary.entry("OMG. What have I done? #sorrynotsorry", date);
			diary.entry(" # some stuff i guess", date);
			diary.entry(" # some stuff i guess", Date.parse("Mon, 25 Dec 1995 00:30:00 GMT"));
		  expect(diary.today()).toEqual([]);
		})
		
		    
		it("returns entries for today", function() {
			date = Date.now();
			diary.entry("I'm standing outside Brad's house #yolo", date);
			diary.entry("OMG. What have I done? #sorrynotsorry", date);
			diary.entry(" # some stuff i guess", date);
			diary.entry(" # some stuff i guess", Date.parse("Mon, 25 Dec 1995 00:30:00 GMT"));
		  expect(diary.today().length).toEqual(3);
		});
	    	    
	});

	describe('search by word method', function(){
		beforeEach(function(){
			diary.entry("I'm standing outside Brad's house #yolo");
			diary.entry("OMG. What have I done? #sorrynotsorry");
			diary.entry("What if dogs were not dogs? #dogs I done? #sorrynotsorry");
			diary.entry("What if dogs were not dogs? ###dogs");
			diary.entry(" # some stuff i guess");
		});
		
		it("returns empty array if word not found", function(){
			expect(diary.search("bunnies")).toEqual([]);
		})

		it("returns list of entries with given word", function(){
			expect(diary.search("what").length).toEqual(3);
		})

	})

	describe('save and load', function(){
		let stringifiedEntries;

		beforeEach(function(){
			diary.entry("I'm standing outside Brad's house #yolo");
			diary.entry("OMG. What have I done? #sorrynotsorry");
			diary.entry("What if dogs were not dogs? #dogs I done? #sorrynotsorry");
			diary.entry("What if dogs were not dogs? ###dogs");
			diary.entry(" # some stuff i guess");
			diary.save('savetest.json');
			stringifiedEntries = JSON.stringify(diary._entries);
		})

		it('saves the file correctly', function(){
			let savedDiary = fs.readFileSync('./files/savetest.json', 'utf8');
			expect(savedDiary).toEqual(stringifiedEntries);
		})

		it('loads the file correctly', function(){			
			diary.load('savetest.json');
			let loadedStringifiedEntries = JSON.stringify(diary._entries);
			expect(loadedStringifiedEntries).toEqual(stringifiedEntries);
		})

	})

	
});







