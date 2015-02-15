function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

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
	          type   : 'length[7]',
	          prompt : 'Your password must be at least 6 characters'
	        }
	      ]
	    }
	  });

	$('input[type="password"]').keyup(function () {
		var $this = $(this);
		var score = scorePassword($this.val());

		if (score > 80)
	        return "strong";
	    if (score > 60)
	        return "good";
	    if (score >= 30)
	        return "weak";
	});
})();