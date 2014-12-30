(function () {
	'use strict';

	$('.ui.form')
	  .form({
	    username: {
	      identifier : 'username',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter a username'
	        }
	      ]
	    },
	    password: {
	      identifier : 'password',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter a password'
	        },
	        {
	          type   : 'length[6]',
	          prompt : 'Your password must be at least 6 characters'
	        }
	      ]
	    },
	    email: {
	      identifier : 'email',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter an email'
	        },
	        {
	          type   : 'email',
	          prompt : 'Please enter a valid email'
	        }
	      ]
	    }
	  });
})();