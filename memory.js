let cardArray = [ 
  { name: "one", img: "1.gif", }, 
  { name: "one", img: "1.gif", },
  { name: "two", img: "2.gif", },
  { name: "two", img: "2.gif", }, 
  { name: "three", img: "3.gif", },
  { name: "three", img: "3.gif", }, 
  { name: "four", img: "4.gif", },
  { name: "four", img: "4.gif", },
  { name: "five", img: "5.gif", },
  { name: "five", img: "5.gif", },
  { name: "six", img: "6.gif", },
  { name: "six", img: "6.gif", }, 
  ]; 
  
  //define variables and get DOM element
  
  let grid = document.querySelector(".grid"); 
  let scoreBoard = document.querySelector(".scoreBoard"); 
  let popup = document.querySelector(".popup"); 
  let clickBoard = document.querySelector(".clickBoard"); 
  let imgs; 
  let cardsId = []; 
  let cardsSelected = []; 
  let cardsWon = 0; 
  let clicks = 0;
  

  document.addEventListener("DOMContentLoaded", function () {
    //define functions 
    
    createBoard(grid, cardArray); 
    arrangeCard();
    
    //add a click function for images 
    
    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(img => 
    img.addEventListener("click", flipCard)
    ) 
    });
    

    //createBoard function

function createBoard(grid, array) { 
  popup.style.display = "none"; 
  array.forEach((arr, index) => { 
  let img = document.createElement("img"); 
  img.setAttribute("src", "moon.gif");
  img.setAttribute("data-id", index); 
  grid.appendChild(img); 
  })
  }
  
  // arrangeCard function
  
  function arrangeCard() { 
  cardArray.sort(() => 0.5 - Math.random())
  }
  
  // flip Card function
  
  function flipCard() { 
  let selected = this.dataset.id;
  cardsSelected.push(cardArray[selected].name); 
  cardsId.push(selected); 
  this.classList.add("flip"); 
  this.setAttribute("src", cardArray[selected].img); 
  if (cardsId.length === 2) { 
  setTimeout(checkForMatch, 500);
  } 
  }




  //custom alert
  //alert won
  function CustomAlert(){
    this.alert = function(message,title){
      document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
  
      let dialogoverlay = document.getElementById('dialogoverlay');
      let dialogbox = document.getElementById('dialogbox');
      
      let winH = window.innerHeight;
      dialogoverlay.style.height = winH+"px";
      
      dialogbox.style.top = "100px";
  
      dialogoverlay.style.display = "block";
      dialogbox.style.display = "block";
      
      document.getElementById('dialogboxhead').style.display = 'block';
  
      if(typeof title === 'undefined') {
        document.getElementById('dialogboxhead').style.display = 'none';
      } else {
        document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
      }
      document.getElementById('dialogboxbody').innerHTML = message;
      document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">Play again</button>';
    }
    
    this.ok = function(){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogoverlay').style.display = "none";
      window.location.reload();
    }
  }
  
  let customAlert = new CustomAlert();
  // checkForMatch function

function checkForMatch() { 
  let imgs = document.querySelectorAll("img"); 
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) { 
  cardsWon += 1; 
  scoreBoard.innerHTML = cardsWon; 
  setTimeout(checkWon,500) 
  } else { 
  imgs[firstCard].setAttribute("src", "moon.gif");
  imgs[secondCard].setAttribute("src", "moon.gif"); 
   imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip"); 
  } 
  cardsSelected = []; 
  cardsId = []; 
  clicks += 1; 
  clickBoard.innerHTML = clicks; 
  }
  
  function checkWon() {
  if (cardsWon == cardArray.length / 2) {
    customAlert.alert("Congratulations, you won after "+ clicks +" attempts" );
    setTimeout(()=> popup.style.display = "flex" ,300); 
  }
  }


  // The replay function

function replay() { 
  arrangeCard(); 
  grid.innerHTML = "";
  createBoard(grid, cardArray);
  cardsWon = 0;
  clicks = 0; 
  clickBoard.innerHTML = 0; 
  scoreBoard.innerHTML = 0; 
  popup.style.display = "none"; 
  Location.reload();

  }

  