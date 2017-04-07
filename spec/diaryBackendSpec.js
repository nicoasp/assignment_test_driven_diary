const Diary = require('../diaryBackend');



describe('Diary', function(){
    
	describe('entry function', function(){
		var diary, date1;

		beforeEach(function(){
			diary = new Diary();
		})

		it('contains entry message', function() {
			diary.entry("Brad is everything to me.");
			let bodies = diary.entries.map((entry) => {
				return entry.body;
			})
			expect(bodies).toContain("Brad is everything to me.");
		})

		it('contains another entry message', function() {
			diary.entry("<3 Braaaad <3");
			let bodies = diary.entries.map((entry) => {
				return entry.body;
			})
			expect(bodies).toContain("<3 Braaaad <3");
		})

		it ('records the date', function(){
		    let message = "Hiiiiiiii";
			diary.entry(message);

			date1 = Date.now();

            let time = diary.entries[0].time;
			
			expect(time).toBeCloseTo(date1);

		});
		
		it ('accepts a date object and adds it to the entry', function() {
		    let date = Date.parse("Mon, 25 Dec 1995 13:30:00 GMT");
		    diary.entry("YOYOYOYOYOYOYO", date);
		    
		    
		    
		    let time1 = diary.entries[0].time;
            expect(time1).toEqual(date);

		    
		    
		})
		
		
	});
});