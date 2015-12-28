$(function() {
	
	/* 
	 * Simple function to calculate how many days are between today and
	 * the release date: 2016-09-22
	 */
	var getDaysUntilRelease = function() {
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var releaseDate = new Date(2017,03,23);
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
	
	/**
	 * Calculate alignment for progress bar breakpoints based on the amount of
	 * days in between
	 */
	var progressFullWidth = $('.progress-bar').width();
	var totalDaysProgress = 955; // From 11-08-2014 to 23-03-2016 which is the release date
	var currentProgressWidth = 100 - ((days * 100) / totalDaysProgress);
	$('.progress-bar .progress').animate({ width: currentProgressWidth + '%' }, 2000);
	
	var daysJdkModular = 115;		// From 11-08-2014 to 03-12-2014
	var daysStarWars = 267;			// From 11-08-2014 to 04-05-2015
	var daysFeatureComplete = 653;	// From 11-08-2014 to 25-05-2016
	var daysAllTestsRun2 = 730;		// From 11-08-2014 to 10-08-2016
	var daysZeroBugs = 802;			// From 11-08-2014 to 21-10-2016
	var daysFinalRc = 876;			// From 11-08-2014 to 03-01-2017
	$('.divider.jdk-modular').css({ left: (daysJdkModular * 100 / totalDaysProgress) + '%' });
	$('.divider.star-wars').css({ left: (daysStarWars * 100 / totalDaysProgress) + '%' });
	$('.divider.feature-complete').css({ left: (daysFeatureComplete * 100 / totalDaysProgress) + '%' });
	$('.divider.all-tests-run2').css({ left: (daysAllTestsRun2 * 100 / totalDaysProgress) + '%' });
	$('.divider.zero-bug-bounce').css({ left: (daysZeroBugs * 100 / totalDaysProgress) + '%' });
	$('.divider.final-rc').css({ left: (daysFinalRc * 100 / totalDaysProgress) + '%' });
	
	/* Setup "Tweet this" button action */
	var tweetText = 'Only ' + days + ' days left until #Java9 is released!';
	$('a.twitter-share-button').attr('data-text', tweetText);
	$('.tweet-this').attr('href', 'https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=Only%20' + days + '%20days%20left%20until%20%23Java9%20is%20released!&tw_p=tweetbutton&url=http%3A%2F%2Fjava9countdown.xyz&via=takipid')
	
	
	/* Subscribe to blog form */
	var submitSubscribeForm = function () {
		var email = $('#subscribeEmail').val();
		var listId = 'c8411940bf';
		var listGroup = 'Source';
		var groupName = 'Java9.xyz';
		var url = 'http://mailchimp.takipi.com/subscribe/' + listId;
		$.post(url, {
			email: email,
			listGroup: listGroup,
			groupNames: groupName
		}, function(response) {
			if (response.result == 'success') {
				$('.thanks-msg').html('Thanks!');
				$('.subscribe-form .subscribe-input').hide();
				$('.thanks-msg').fadeIn();
			} else if (response.result == 'already-subscribed') {
				$('.thanks-msg').html("You were already subscribed to this list, thanks!");
				$('.subscribe-form .subscribe-input').hide();
				$('.thanks-msg').fadeIn();
			}
		});
	}
	/* Enter key handler */
	$('#subscribeEmail').on('keyup', function(e) {
		var keycode = (e.keyCode ? e.keyCode : e.which);
		if (keycode == '13') {
			$('.subscribe-button').attr('disabled', true);
			submitSubscribeForm();
		}
	});
	/* Subscribe button handler */
	$('.subscribe-button').click(function(e) {
		e.preventDefault();
		$(this).attr('disabled', true);
		submitSubscribeForm();
	});
	
	/* Post container click handler */
	$('.post-container').click(function(e) {
		var link = $(this).find('a.read-more').attr('href');
		window.open(link);
	});
	
	/* Delay the loading of the social sharing buttons to make the odometer run smoothly */
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
