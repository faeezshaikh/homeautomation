'use strict';
angular.module('socialShareModule', [ 'ngCordova' ]).service('shareService', [ '$cordovaSocialSharing', function($cordovaSocialSharing) {
	var url = 'https://goo.gl/wU62Xm';
	var appstoreLink = [ url ];
	var message = "Check out this cool service from Ameren. It lets you control your power, garage door, home security and a lot more from anywhere on earth" + url;
	var tweet = "Check out this cool service from Ameren. It lets you control your power, garage door, home security and a lot more from anywhere on earth";
	var subject = "Check out this cool app from Ameren";
//	var appImage = [ 'data/img/icon.png' ];
	var appImage = null;

//	http://stackoverflow.com/questions/33106359/socialsharing-phonegap-plugin-cansharevia-check-whether-whatsapp-is-available

	var platform = 'android';
	var viaByKeyAndPlatform = {
		    facebook: {
		        ios: 'com.apple.social.facebook',
		        android: 'com.facebook.katana'
		    },
		    whatsapp: {
		        ios: 'whatsapp', // but for iOS9 a whitelisting is necessary for the whatsapp:// url.
		        android: 'com.whatsapp'
		    },
		    twitter: {
		        ios: 'com.apple.social.twitter',
		        android: 'com.twitter.android'
		    }
		};
	
	function isSharingPossible(network) {
		var channel,fn;
		channel = viaByKeyAndPlatform[network][platform];
		console.log('Channel = ' , channel);
		if(network == 'facebook') {
			fn = shareWithFb;
		}
		if(network == 'twitter') {
			fn = shareWithTwitter;
		}
		if(network == 'whatsapp') {
			fn = shareWithWhatsapp;
		}
		
		$cordovaSocialSharing.canShareVia(channel, 'Testing for FB', null, null).then(function(result) {
			fn();
		}, function(err) {
			// An error occurred. Show a message to the user
			alert('No '+ network + ' app installed on your device');
		});
		
		function shareWithFb() {
			$cordovaSocialSharing.shareViaFacebook(message, appImage, appstoreLink).then(function(result) {
				// Success!
			}, function(err) {

			});
		}
		
		function shareWithTwitter() {
			$cordovaSocialSharing.shareViaTwitter(tweet, appImage, url).then(function(result) {
				// Success!
			}, function(err) {
			});
		}
		
		function shareWithWhatsapp() {
			$cordovaSocialSharing.shareViaWhatsApp(message, appImage, appstoreLink).then(function(result) {
				// Success!
			}, function(err) {
			});
		}
	}
	return {

		shareOnFb : function() {
			isSharingPossible('facebook');
		},

		shareOnTwitter : function() {
			isSharingPossible('twitter');
		},

		shareOnWhatsapp : function() {
			isSharingPossible('whatsapp');
		},
		shareViaSms : function() {
			// access multiple numbers in a string like: '0612345678,0687654321'
			$cordovaSocialSharing.shareViaSMS(message, "").then(function(result) {
				// Success!
			}, function(err) {
				// An error occurred. Show a message to the user
				alert('No SMS client found your device');
			});

		},
		shareViaEmail : function() {
			// toArr, ccArr and bccArr must be an array, file can be either
			// null, string or array
			$cordovaSocialSharing.shareViaEmail(message, subject, "", "", "", null).then(function(result) {
				// Success!
			}, function(err) {
				// An error occurred. Show a message to the user
				alert('No Email app installed on your device');
			});
		}
	}
} ]);
