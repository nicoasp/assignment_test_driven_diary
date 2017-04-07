const Diary = require('../diaryBackend');



describe('Diary', function(){
    
	describe('entry function', function(){
		var diary;

		beforeEach(function(){
			diary = new Diary();
		});

		describe('entries with only body', function(){
			var date;

			beforeEach(function(){
				diary.entry("Brad is everything to me.");
				date = Date.now();
				diary.entry("<3 Braaaad <3");
			});			

			it('stores a message', function() {				
				let bodies = diary.entries.map((entry) => {
					return entry.body;
				})
				expect(bodies).toContain("Brad is everything to me.");
			})

			it('stores a different message', function() {				
				let bodies = diary.entries.map((entry) => {
					return entry.body;
				})
				expect(bodies).toContain("<3 Braaaad <3");
			})

			it ('records the date', function(){
	      let time = diary.entries[0].time;			
				expect(time).toBeCloseTo(date);
			});
		});

		describe('entries with date', function(){
			it ('accepts a date object and adds it to the entry', function() {
		    let date = Date.parse("Mon, 25 Dec 1995 13:30:00 GMT");
		    diary.entry("YOYOYOYOYOYOYO", date);
		    		    
		    let time1 = diary.entries[0].time;
        expect(time1).toEqual(date);
			});
		});

		describe('entries with tags', function(){

			beforeEach(function(){
				diary.entry("I'm standing outside Brad's house #yolo");
				diary.entry("OMG. What have I done? #sorrynotsorry");
			});						

			it ('records the right tag for a message', function(){
				let body = "I'm standing outside Brad's house #yolo";
				let entry = diary.entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual(['yolo']);
			})

			it ('records the right tag for a different message', function(){
				let body = "OMG. What have I done? #sorrynotsorry";
				let entry = diary.entries.find((el) => {
					return el.body === body;
				})
				expect(entry.tags).toEqual(['sorrynotsorry']);
			})			
		})
		
		
	});
});