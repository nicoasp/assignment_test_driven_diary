const diaryData = ("./data/testdata");


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
    		it("returns the correct number of entries", function() {
    		    expect(diary.entries().length).toEqual(5);
    		});
    		
    		
	    });
	    
	    
	    
	})
	
});