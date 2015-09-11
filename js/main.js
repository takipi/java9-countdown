$(function() {
	
	var getDaysUntilRelease = function() {
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var releaseDate = new Date(2016,09,22);
		var today = new Date();

		var diffDays = Math.round(Math.abs((releaseDate.getTime() - today.getTime())/(oneDay)));
		return diffDays;
	};
	
	var days = getDaysUntilRelease();
	
	/** Init Odometer **/
	var el = document.querySelector('.odometer');
	var odometer = new Odometer({
		el: el,
		value: 999999
	});
	odometer.update(days);
	
	
	
	var progressFullWidth = $('.progress-bar').width();
	var totalDaysProgress = 774; // From 11-08-2014 to 22-09-2016 which is the release date
	var currentProgressWidth = (days * 100) / totalDaysProgress;
	$('.progress-bar .progress').animate({ width: currentProgressWidth + '%' }, 2000);
	
	var daysJdkModular = 115;		// From 11-08-2014 to 03-12-2014
	var daysFeatureComplete = 487;	// From 11-08-2014 to 10-12-2015
	var daysAllTestsRun2 = 543;		// From 11-08-2014 to 04-02-2016
	var daysZeroBugs = 620;			// From 11-08-2014 to 21-04-2016
	var daysFinalRc = 711;			// From 11-08-2014 to 21-07-2016

	$('.divider.jdk-modular').css({ left: (daysJdkModular * 100 / totalDaysProgress) + '%' });
	$('.divider.feature-complete').css({ left: (daysFeatureComplete * 100 / totalDaysProgress) + '%' });
	$('.divider.all-tests-run2').css({ left: (daysAllTestsRun2 * 100 / totalDaysProgress) + '%' });
	$('.divider.zero-bug-bounce').css({ left: (daysZeroBugs * 100 / totalDaysProgress) + '%' });
	$('.divider.final-rc').css({ left: (daysFinalRc * 100 / totalDaysProgress) + '%' });
	
	var tweetText = 'Only ' + days + ' days left until #Java9 is released!';
	$('a.twitter-share-button').attr('data-text', tweetText);
	$('.tweet-this').attr('href', 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A8082%2F&ref_src=twsrc%5Etfw&text=Only%20' + days + '%20days%20left%20until%20%23Java9%20is%20released!&tw_p=tweetbutton&url=http%3A%2F%2Fjava9.xyz&via=takipid')
	
	
	
	/* Subscribe to blog form */
	$('.subscribe-button').click(function(e) {
		e.preventDefault();
		$(this).attr('disabled', true);
		var email = $('#subscribeEmail').val();
		var listId = 'fdcf16a8bd';
		var listGroup = 'Source';
		var groupName = 'Java9.xyz';
		var url = 'http://localhost:3000/subscribe/' + listId;
		$.post(url, {
			email: email,
			listGroup: listGroup,
			groupNames: groupName
		}, function(response) {
			if (response.result == 'success') {
				$('.thanks-msg').html('Thanks!');
				$('.subscribe-form form').hide();
				$('.thanks-msg').fadeIn();
			} else if (response.result == 'already-subscribed') {
				$('.thanks-msg').html("You were already subscribed to this list, thanks!");
				$('.subscribe-form form').hide();
				$('.thanks-msg').fadeIn();
			}
		});
	});
	
	/* Post container click handler */
	$('.post-container').click(function(e) {
		var link = $(this).find('a.read-more').attr('href');
		window.open(link);
	});
	
	setTimeout(function() {
		var $social = $("<div>");
		$social.load('social.html', function() {
			$(this).find('a.twitter-share-button').attr('data-text', tweetText);
			var $this = $(this);
			setTimeout(function() {
				$('#container .social').html($this.html());
				$('#container .social').fadeTo(500, 1);
			}, 2000);
		});
		
		
	}, 2000);
	
});
