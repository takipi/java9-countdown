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
	
	var daysFeatureComplete = 487;	// From 11-08-2014 to 10-12-2015
	var daysAllTestsRun2 = 543;		// From 11-08-2014 to 04-02-2016
	var daysZeroBugs = 620;			// From 11-08-2014 to 21-04-2016
	var daysFinalRc = 711;			// From 11-08-2014 to 21-07-2016

	$('.divider.feature-complete').css({ left: (daysFeatureComplete * 100 / totalDaysProgress) + '%' });
	$('.divider.all-tests-run2').css({ left: (daysAllTestsRun2 * 100 / totalDaysProgress) + '%' });
	$('.divider.zero-bug-bounce').css({ left: (daysZeroBugs * 100 / totalDaysProgress) + '%' });
	$('.divider.final-rc').css({ left: (daysFinalRc * 100 / totalDaysProgress) + '%' });
	
		
	$('a.twitter-share-button').attr('data-text', 'Only ' + days + ' days left until #Java9 is released!');
	$('.tweet-this').attr('href', 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A8082%2F&ref_src=twsrc%5Etfw&text=Only%20' + days + '%20days%20left%20until%20%23Java9%20is%20released!&tw_p=tweetbutton&url=http%3A%2F%2Fjava9.xyz&via=takipid')
	
	
	
	
	$('.subscribe-button').click(function() {
		var email = $('#subscribeEmail').val();
		var data = {
			"email_address": email,
			"status": "subscribed"
		}
		$.ajax({
			beforeSend: function(xhr) {
				xhr.setRequestHeader ("Authorization", "Basic XXXXXX");
			}
		})
	});
	
	setTimeout(function() {
		$(".social").load('social.html');
		setTimeout(function() {
			$(".social").fadeTo(500, 1);
		}, 2000)
	}, 2000);
	
});
