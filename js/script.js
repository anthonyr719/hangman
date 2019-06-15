var mainContainer = document.getElementsByClassName('mainContainer')[0],
	canvas = document.getElementById('canvas'),
	testWord = document.getElementsByClassName('testWord')[0],
	keyboard = document.querySelectorAll('.keyboard div div'),
	gameOver = document.querySelector('.gameOver'),
	youWon = document.querySelector('.youWon');

var words = ["Dog", "Cat", "Spider", "Kangaroo", "Owl", "Toad", "Elephant", "Cheetah", "Ant", "Eagle", "Emu", "Panda", "Rabbit", "Walrus", "Camel", "Penguin", "Anteater", "Mouse", "Possum", "Orangutan", "Cougar", "Dolphin", "Monkey"],
	context = canvas.getContext('2d'),
	randomNumber,
	misses = 0,
	bodyParts = [drawHead, drawSpine, drawLeftHand, drawRightHand, drawLeftLeg, drawRightLeg];

function drawStand() {
	
	context.beginPath();
	
	context.moveTo(60, 300);
	context.lineTo(60, 2);
	context.lineTo(170, 2);
	context.lineTo(170, 25);
	
	context.lineWidth = 4;
	context.strokeStyle = '#607D8B';
	context.stroke();

}
drawStand();

function drawHead() {
	
	context.beginPath();
	context.arc( 170, 60, 35, 0, 2 * Math.PI );
	
	context.moveTo(155, 50);
	context.arc( 155, 50, 2, 0, 2 * Math.PI );
	
	context.moveTo(185, 50);
	context.arc( 185, 50, 2, 0, 2 * Math.PI );
	
	context.moveTo(160, 75);
	context.lineTo(180, 75);

	context.lineWidth = 3;
	context.strokeStyle = '#C51109';
	context.stroke();	

}

function drawSpine() {
	
	context.beginPath();
	
	context.moveTo(170, 95);
	context.lineTo(170, 200);
	
	context.lineWidth = 3;
	context.strokeStyle = '#C51109';
	context.stroke();
}

function drawLeftHand() {
	
	context.beginPath();
	
	context.moveTo(170, 135);
	context.lineTo(120, 105);
	
	context.lineWidth = 3;
	context.strokeStyle = '#C51109';
	context.stroke();

}

function drawRightHand() {

	context.beginPath();
	
	context.moveTo(170, 135);
	context.lineTo(220, 105);
	
	context.lineWidth = 3;
	context.strokeStyle = '#C51109';
	context.stroke();

}

function drawLeftLeg() {

	context.beginPath();
	
	context.moveTo(170, 200);
	context.lineTo(220, 230);
	
	context.lineWidth = 3;
	context.strokeStyle = '#C51109';
	context.stroke();

}

function drawRightLeg() {

	context.beginPath();
	
	context.moveTo(170, 200);
	context.lineTo(120, 230);
	
	context.lineWidth = 3;
	context.strokeStyle = '#C51109';
	context.stroke();

}

randomNumber = Math.floor( Math.random() * words.length );

var word = words[ randomNumber ].split('');

for (var i = 0; i < word.length; i++) {
	
	var testChar = document.createElement( 'div' );
	testChar.innerHTML = " ";
	testWord.appendChild( testChar );
}


for ( var i = 0; i < keyboard.length; i++) {
	keyboard[i].addEventListener('click', game);
}		

function game(e){
	
	for (var i = 0; i < word.length; i++) {
		
		if (e.target.innerHTML === word[i].toLowerCase()) {
			var guessedChar = document.querySelectorAll('.testWord div');
			guessedChar[i].innerHTML = word[i];
			e.target.style.backgroundColor = "#4CAF50";
			e.target.style.color = "#FFF";
		}

	}
	
	if (word.indexOf(e.target.innerHTML.toLowerCase()) === -1 
		&& word.indexOf(e.target.innerHTML.toUpperCase()) === -1) {
		
		e.target.style.backgroundColor = "#E62117";
		e.target.style.color = "#FFF";
		
		e.target.removeEventListener('click', game);

		bodyParts[misses]();
		misses++;
	
	}

	var currentStatus = [];
	for (var j = 0; j < word.length; j++) {		
		currentStatus[j] = document.querySelectorAll('.testWord div')[j].innerHTML;
	}
	
	if (currentStatus.toString() == word.toString()) {
		
		mainContainer.style.opacity = 0.3;
		youWon.style.display = "block";

		for (var i = 0; i < keyboard.length; i++) {
			keyboard[i].removeEventListener('click', game);
		}
	}

	if (misses === 6) {
		
		for (var i = 0; i < word.length; i++) {
			var missedChar = document.querySelectorAll('.testWord div');
			if (missedChar[i].innerHTML == " ") {
				missedChar[i].innerHTML = word[i];
				missedChar[i].setAttribute("style", "color: #FF5722;");
			};
		}

		mainContainer.style.opacity = 0.3;
		gameOver.style.display = "block";

		for (var i = 0; i < keyboard.length; i++) {
			keyboard[i].removeEventListener('click', game);
		}

	} 

}

gameOver.addEventListener('click', reload);

youWon.addEventListener('click', reload);

function reload(){

  // window.location.reload();
  window.location.href = window.location.href;
}