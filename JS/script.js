//CASINO CRAPS game
function playCasinoCraps(){
	var gameBox = document.getElementById("CasinoCraps");
	var dice1, dice2,num1,num2, point, rollAgain1, rollAgain2, point, clearStats, loses, wins;
	var loseCount=0;
	var winCount = 0;
	var rollCount =0;
	
	/*
	create 4 boxes
	box 1 contains 2 dice rolled
	box 2 contain 2 dice numbers for the first time
	box 3 contain dice numbers for other times if the user do not win/lose in the first time
	box 4 contains rolll and statistic buttons */
	
	var column = document.getElementsByClassName("box");
	var diceBox = document.getElementsByClassName("diceBox");
	
	function createBoard(){
		for(var i=0; i< 4; i++){
			var col = document.createElement("div");
			col.setAttribute("id","column"+(1+i));
			gameBox.appendChild(col);
			col.className = "box";
		}
		//box 1
		for(var i=0; i<2; i++){
			var diceBox = document.createElement("div");
			column[0].appendChild (diceBox);
			diceBox.className = "diceBox";
		}
		
		//box 2
		column[1].appendChild(document.createTextNode("You rolled: "));
		num1 = document.createElement("span");
		num2 = document.createElement("span");
		column[1].appendChild(num1);
		column[1].appendChild(num2);
		
		//box 3
		column[2].appendChild(document.createTextNode("Roll again! "));
		rollAgain1 = document.createElement("span");
		rollAgain2 = document.createElement("span");
		column[2].appendChild(rollAgain1);
		column[2].appendChild(rollAgain2);
		
		//box 4
		rollButton = document.createElement("button");
		rollButton.appendChild(document.createTextNode("Roll the dice"));
		clearStats = document.createElement("button");
		clearStats.appendChild(document.createTextNode("Clear stats"));
		column[3].appendChild(rollButton);
		column[3].appendChild(clearStats);
		column[3].appendChild(document.createTextNode("Statistics"));
		loses = document.createElement("p");
		wins = document.createElement("p");
		column[3].appendChild(loses);
		column[3].appendChild(wins);
		
	}
	createBoard();

	/*
	every time user plays, the rolllCount increase by 1, it will be reseted when each game is overred
	
	if player roll dice for the first time
		if the dice total of the first roll is equal to 7 or 11, user wins
		if the dice total is equal to 2 or 3 or 12, user loses
		otherwise, user has to roll dices again,
					the point now is equal to the dice total of the first roll
					the counter will increase 1 unit
	roll again
		the counter is greater or equal to 2
		if the dice total id equal to 7, display lose
		if the dice total is equal to the point, display win
		keep roll dices until user wins or loses
	*/
	rollButton.onclick = function rollDices (){
		
		rollCount ++;
		if(rollCount == 1){
			//clear the 3 column dices if user plays another round
			rollAgain1.innerHTML  ="";
			rollAgain2.innerHTML ="";
		
			dice1 = Math.floor((Math.random() * 6) + 1);
			dice2 = Math.floor((Math.random() * 6) + 1);
			var total = dice1 + dice2;
			diceBox[0].innerText = dice1;
			diceBox[1].innerText = dice2;
			num1.innerText = dice1;
			num2.innerText = dice2;
			console.log("first time: "+dice1 +"  "+ dice2);
			if (total == 7 || total == 11){
				winCount ++;
				console.log("win");
				rollCount = 0;
			} else if (total == 2 || total == 3 || total == 12) {
				loseCount++;
				console.log("You lose");
				rollCount =0;
			}else{
				point = total;
				console.log("Your point is :"+point);
			}
		}else{
		
				dice1 = Math.floor((Math.random() * 6) + 1);
				dice2 = Math.floor((Math.random() * 6) + 1);
				
				var total = dice1 + dice2;
				diceBox[0].innerText = dice1;
				diceBox[1].innerText = dice2;
				console.log("Rolling dice: " +
				  dice1 + " + " + dice2 + " = " + total);
			    //display dices rolled
				rollAgain1.innerHTML = dice1;
				rollAgain2.innerHTML = dice2;
			// if total == point, announce winner 
				if (total == point) {
				  console.log("You made your point. You win.");
				  winCount++;
				  rollCount =0;
			// else if total is 7, announce loser and reset the roll count
				} else if (total == 7) {
				  console.log("That's a 7. You lose.");
				  loseCount++;
				  rollCount = 0;
				}
			// otherwise, keep keep rolling
		
		}
		
		loses.innerText = "Loses: "+loseCount;
		wins.innerText = "Wins: "+ winCount;	
	}


	//reset statistic to 0 : 0 whenever we click the clear statistic button	
	clearStats.onclick = function (){
		loseCount = 0;
		winCount = 0;
		loses.innerText = "Loses: " +loseCount;
		wins.innerText = "Wins: " + winCount;
	}
}




//TIC TAC TOE game
function playTicTacToe(){
	var cell =  document.getElementsByClassName("TTTCell");
	var gameBox = document.getElementById("TicTacToe");
	var emptyCells = 9;
	var endGame = false;
	var table, gameOverMessage, showWinner;

	function makeBoard(){
		var startButton = document.createElement("button");
		startButton.setAttribute("id","start");
		gameBox.appendChild(startButton);
		startButton.appendChild(document.createTextNode("Click to start a game"));
		
		var tableName = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
		 
		table = document.createElement("table");
		table.className = "TTTBoard";
		gameBox.appendChild(table);
		for(var i =0; i<3; i++){
			var row = document.createElement("tr");
			table.appendChild(row);
			for(var j=0; j<3; j++){
				var col = document.createElement("td");
				row.appendChild(col);
				col.className = "TTTCell";
				var data = document.createTextNode(tableName[(i*3) +j]);
				col.appendChild(data);
			}
		}	
		
		gameOverMessage = document.createElement("div");
		gameOverMessage.setAttribute("id", "endGameDialog");
		gameOverMessage.appendChild(document.createTextNode("GAME OVER!"));

		showWinner = document.createElement("p");
		gameOverMessage.appendChild(showWinner);
		showWinner.setAttribute("id","displayWinner");
		
		gameOverMessage.appendChild(document.createTextNode("-Click anywhere to dismiss this message--"));
		gameBox.appendChild(gameOverMessage);
	}
	makeBoard();


	
		/*
	determine the player turn bases on counter
	counter starts from 0, 2 players take turns
	*/
	
	var count =0; 
	function whichPlayer(){
	var player;
		(count % 2 == 0)? player ="X": player="O";
		return player;
	}
	

	
	/*
	this function is used to find the winner of each round
	when we get the winner
	
	the result will be display at the bottom
	*/
	//This is all winning set to determine winner
	var winCase = [[0,1,2], [3,4,5],[6,7,8],
				   [0,3,6], [1,4,7],[2,5,8],
				   [0,4,8], [2,4,6]];
		
	function findWinner(){
		for(var i =0; i< winCase.length; i++){
			if(cell[winCase[i][0]].textContent !="" &&
				cell[winCase[i][0]].textContent == cell[winCase[i][1]].textContent && 
				cell[winCase[i][1]].textContent == cell[winCase[i][2]].textContent){
					endGame = true;
					for(var a=0; a<3; a++){
						cell[winCase[i][a]].style.background= "Gray";
					}
					
					gameOverMessage.style.display = "block";
					showWinner.appendChild(document.createTextNode(whichPlayer() +" wins!"));
					document.getElementsByTagName("body")[0].addEventListener("click", resetGame);
			}
		}
		if(emptyCells ==0 && !endGame){
			gameOverMessage.style.display = "block";
			showWinner.appendChild(document.createTextNode(" no one wins!"));
			document.getElementsByTagName("body")[0].addEventListener("click", resetGame);
		}
	}
	
		/*
	whenever we click any cell, the player name will be displayed on that cell
	
	*/
	function clickCell(){
		if(!endGame && this.textContent ==""){
			this.innerText = whichPlayer();
			emptyCells--;
			findWinner();
			count++;
		}
	}	
	

	

	function startGame(){
			for(var i=0; i<cell.length; i++)
				cell[i].innerHTML = "";
				
			for(var i=0; i< cell.length; i++){
				cell[i].addEventListener("click", clickCell);
				}
	}
	document.getElementById("start").addEventListener("click", startGame);
	

	
	function resetGame () {
		location.reload();

	}
}






function playBingo(){
	var gameBox = document.getElementsByTagName("main")[0];

	//create the game board
	var newcard, caller, showNumber;
	var cell =  document.getElementsByClassName("BingoCell");
	function makeBoard(){
		newCardBtn = document.createElement("button");
		gameBox.appendChild(newCardBtn);
		newCardBtn.appendChild(document.createTextNode("Concentrate New Card"));

		caller = gameBox.appendChild(document.createElement("button"));
		caller.appendChild(document.createTextNode("caller"));

		var table = document.createElement("table");
		gameBox.appendChild(table);
		table.className = "BingoBoard";

		var header = table.appendChild(document.createElement("tr"));
		var BINGO = ["B","I","N","G","O"];
		for(var i =0; i<5; i++){
			var gameTitle =  document.createElement("th");
			gameTitle.appendChild(document.createTextNode(BINGO[i]));
			header.appendChild(gameTitle);
		}
		//create rows and columns
		for(var i =0; i<5; i++){
			var row = document.createElement("tr");
			table.appendChild(row);
			for(var j=0; j<5; j++){
				var col = document.createElement("td");
				row.appendChild(col);
				col.className = "BingoCell";
			}
		}

		showNumber = gameBox.appendChild(document.createElement("p"));
		showNumber.setAttribute("id", "showNumber");
		showNumber.appendChild(document.createTextNode("Click caller to get number"));
	}
	makeBoard();


	/*
		This function will display a new card
		every card has 5 columns, 5 rows => 25 cell
		the cell in the middle of the table is free
	*/
						   //B  I  N  G  O
	var colPlace = new Array(0, 1, 2, 3, 4,
							 0, 1, 2, 3, 4,
							 0, 1, 2, 3, 4,
							 0, 1, 2, 3, 4,
							 0, 1, 2, 3, 4);

	var usedNums = new Array(76);
	function createCard(){
		//a free cell in the middle
		cell[12].innerHTML ="Free";
		cell[12].style.background = "Gray";

		for( var i=0; i< 25; i++){
			if(i != 12){
				var checkNum ;
				do {
					checkNum = (colPlace[i]*15) + Math.floor(Math.random()*15) + 1;
				} while (usedNums[checkNum]);

				usedNums[checkNum] = true;
				cell[i].innerHTML = checkNum;
			}
		}
	}


	function callNumbers () {
		if(hasWinner == false){
			numCalled = Math.floor(Math.random()*75) + 1;;
			showNumber.textContent = numCalled;
			for(var i =0; i< cell.length; i++){
				if(cell[i].textContent == numCalled)
					cell[i].style.background = "Gray";
			}
			checkWinner();
		}
	}
	caller.addEventListener("click", callNumbers);

	//check row
	//check columns
	//check 


	/*
		0  1  2  3  4 
		5  6  7  8  9
		10 11 12 13 14
		15 16 17 18 19
		20 21 22 23 24 
		
	*/

	 var comboWins = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],
					[15,16,17,18,19],[20,21,22,23,24],[0,5,10,15,20],
					[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
					[0,6,12,18,24],[4,8,12,16,20]];

	var hasWinner = false;
	function checkWinner(){
		for(var i =0; i< 12; i++){
			for(var j =0; j< 4; j++){
				if(cell[comboWins[i][j]].style.backgroundColor != "" &&
				cell[comboWins[i][j]].style.backgroundColor == cell[comboWins[i][j+1]].style.backgroundColor){
					hasWinner = true;
				}
				else {
					hasWinner =false;
					break;
				}
			}
			if(hasWinner == true){
				console.log("Win");
				showNumber.textContent = "BINGO";
				break;	
			}
		}
	}

	function playGame(){
		createCard();
		
	}
	playGame();

	newCardBtn.onclick = function (){ location.reload()};

}



//CONCENTRATION GAME

function playConcentration(){
	var tile = document.getElementsByClassName("tile");
	var gameBox = document.getElementById("Concentration");
	var timerButton;

	/* cardNums contains all tile images but double size (a pair of each image)
		whenever we use getCardNum(), a random number will be returned
		and deleted from cardNums list
		It means getCardNum can be used for maximum 36 times
	*/
	var cardNums = [];
	function shuffle (){
		for(var i=1; i<= 18; i++){
			cardNums.push(i);
			cardNums.push(i);
		}
		for(var i=0; i< 36; i++){
			var random = Math.floor(Math.random() * cardNums.length);
			var a = cardNums[random];
			cardNums[random] = cardNums[i];
			cardNums[i] = a;
		}
	}
	
	/* create the game board including timer button, new game button, and
		36 tiles, 6 tiles per row
		each tile has same back image

	*/
	function makeBoard(){
		timerButton = gameBox.appendChild(document.createElement("button"));
		timerButton.setAttribute("id", "timerButton");
		timerButton.appendChild(document.createTextNode("Timer"));

		var startButton = gameBox.appendChild(document.createElement("button"));
		startButton.setAttribute("id", "newGame");
		startButton.appendChild(document.createTextNode("New Game"));

		shuffle();
		for(var i=0; i< 6; i++){
			var row = document.createElement("section");
			for(var j=0; j< 6; j++){
				var col = document.createElement("div");
				col.className = "tile";
				col.setAttribute("id", cardNums[6*i +j]);
			
				col.style.backgroundImage = "url('images/cards/card0.jpg')";
				row.appendChild(col);
			}
			gameBox.appendChild(row);
		}
	}
	makeBoard();



	//the timer is created whenever we click it
	timerButton.onclick = function(){
		var timeUp = document.createElement("label");

		var totalSeconds = 0;
		var x = setInterval(setTime, 1000);

		function setTime() {
		  ++totalSeconds;
		  timeUp.innerHTML = pad(parseInt(totalSeconds / 60)) +" : " +  pad(totalSeconds % 60);
		}

		function pad(val) {
		  var valString = val + "";
		  if (valString.length < 2) {
			return "0" + valString;
		  } else {
			return valString;
		  }
		}

		gameBox.appendChild(timeUp);
		
	};
	
	
	/* Check selected images, there are maximum 2 selected images
		change selected tile's class name to "tile selected"
	Match: 
		if 2 selected tiles have same id (same front image)
		=> change their class name to tile matched and
		leave the front images up
	Not match:
		flip images back (remove the front images)
		change to their original class name which is "tile"
		the counter will be reset to 0 if we click 2 unmatched tiles 
		set the time to be able to see the images before they are flipped
	
	
	*/
	var count =0;
	function checkSelections (selection){
		if (count < 2) {
			selection.classList.add('selected');
			count++;
		}if(count == 2){
			var selected = document.getElementsByClassName("tile selected");
			if (selected[0].id == selected[1].id){
				selected[1].className = "tile matched";
				selected[0].className = "tile matched";
			} else {
				setTimeout(function (){
					selected[1].innerHTML = '';
					selected[0].innerHTML = '';
					selected[1].className = "tile";
					selected[0].className = "tile";
				}, 800);
			}
			count =0;
		}
	}
	
	/* when we click any tile, the front image will be displayed
		then all selected images will be checked
		to see if they are match or not
	
	*/

	
	function startGame(){
		for(var i=0; i< tile.length; i++){
			tile[i].addEventListener("click", function () {
				if(this.innerHTML == ""){
					var image = document.createElement("img");
					image.src = 'images/cards/card'+this.id+'.jpg';
					this.appendChild(image);
					
					checkSelections(this);
		
				}
			});
		}
	}
	startGame();


	document.getElementById("newGame").onclick = function (){ location.reload()};
}
