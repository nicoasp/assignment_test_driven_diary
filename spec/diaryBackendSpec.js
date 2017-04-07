const Diary = require('../diaryBackend');



describe('Diary', function(){

	describe('entry function', function(){
		var diary, date1;

		beforeEach(function(){
			diary = new Diary();
			diary.entry("Brad is everything to me.");
			date1 = Date.now();
			diary.entry("<3 Braaaad <3");
		})

		it('contains entry message', function() {		
			let bodies = diary.entries.map((entry) => {
				return entry.body;
			})
			expect(bodies).toContain("Brad is everything to me.");
		})

		it('contains another entry message', function() {
			let bodies = diary.entries.map((entry) => {
				return entry.body;
			})
			expect(bodies).toContain("<3 Braaaad <3");
		})

		it ('records the date', function(){

		})
	})




})