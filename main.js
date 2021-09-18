$(document).ready(function() {
	$('.icon-sun').animate({color: "#FFE4A4"});

//Generate a random number
	var answer = Math.floor((Math.random()*100)+1); 
	console.log(answer);


//Ask player for their guess
	function startGame(answer) {
		$('#submit').click(function(e) {
			e.preventDefault();
			var guess = $('#playerguess').val();
			validateGuess(guess);
		});
	}
	startGame();


//Validate player guess as proper value
	function validateGuess(guess) {
		if(guess < 1 || guess > 100 || isNaN(guess)) {	
    	$('.error').removeClass('hide');
    	$('#hint').addClass('hide');
	  } else {
	  	console.log("Guess submission is valid: " + guess + " is the guess");
	  	$('.error').addClass('hide');
	  	$('#hint').removeClass('hide');
	  	distance(guess);
	  }
	}


//Check if guess is a correct, an initial guess or an ongoing guess
	var distanceLast = null;
			
	function distance(guess) {
		var distanceNew = Math.abs(guess-answer);
			if (guess == answer) {
				$('.icon-sun').addClass('win');
				$('.icon-sun').animate({color: "#FFE4A4"});
				$('#hint').html('<span class="wintext">YOU WIN!<br> That answer is just right.</span>');
				$('#replay').removeAttr('disabled');
			} else if (distanceLast == null) {
				guessInitial(guess);
			} else {
				guesses(guess, distanceNew, distanceLast);
			}
		distanceLast = distanceNew
	}


//Check if player initial guess is too high or too low
	function guessInitial(guess) {
		if(guess == answer) {
			$('.icon-sun').addClass('win');
			$('#hint').html('<span class="wintext">YOU WIN!<br> That answer is just right.</span>');
		} else if(guess < answer) {
			$('#hint').html(guess + ' is too low!<br>Try again:');
			$('.icon-sun').animate({color:"#7FFFFF"});
		} else {
			$('#hint').html(guess + ' is too high!<br>Try again:');
			$('.icon-sun').animate({color:"#FFC26D"});
		}
	}


//Compare distance of last guess and newest guess
		function guesses(guess, distanceNew, distanceLast) {
			console.log(distanceNew + "new");
			console.log(distanceLast + "last");
			if (distanceNew < distanceLast) {
				console.log('Getting warmer, try again');
				$('#hint').html('<span class="hottext">' + guess + '</span> is getting warmer...<br>Try again:');
				$('.icon-sun').animate({color:"#E67E22"});
				$('.icon-sun').effect('shake');
			} else {
				console.log('Getting colder, try again');
				$('#hint').html('<span class="coldtext">' + guess + '</span> is getting colder...<br>Try again:');
				$('.icon-sun').animate({color:"#003485"});
				$('.icon-sun').effect('shake');
			}
		}


//Restart the game with the replay button
	function replay() {
		$('#replay').click(function(e) {
			e.preventDefault();
			$('.icon-sun').removeClass('win');
			$('#hint').html('Select a number<br>between 1 and 100:');
			$('#replay').attr('disabled', true);
			answer = Math.floor((Math.random()*100)+1);
			console.log(answer);
			distanceLast == null;
			startGame(answer);
		});
	}
	replay();

});