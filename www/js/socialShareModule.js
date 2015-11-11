'use strict';
angular.module('socialShareModule', [ 'ngCordova' ]).service('shareService', [ '$cordovaSocialSharing', function($cordovaSocialSharing) {
	var url = 'https://goo.gl/wU62Xm';
	var appstoreLink = [ url ];
	var message = "Just thought you might want to check this app out. I found it pretty useful preparing for the AWS Certified Developer exam. " + url;
	var tweet = "Great app to help you prepare for the AWS Certified Developer exam. Check it out in Google Play ";
	var subject = "Check out this app in Google Play";
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
