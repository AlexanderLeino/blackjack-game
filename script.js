// We need to assign a value of ten to J, Q, K , and 11 to A [X]
// Need to make a reset variable button for: currentHandValueUser && currentHandValueCpu and also resets function dealCards()
//Need to create a function that allows us to check the initiial hand values for cpu and user and if cpu or user has 21 then said player wins

var suits = ['diamonds', 'spades', 'clubs', 'hearts']
var cardValues = ['2', '3', '4', '5', '6' , '7' , '8', '9','10' ,'J' ,'Q', 'K', 'A']
var randomNumber
var randomNumber2
var userHand = []
var cpuHand = []
const deck = getDeck()
var userValuesArray = []
var cpuValuesArray = []
var card = {}
var sumForUser = 0
var sumForCpu = 0
var hasFirstAce = false
var hasSecondAce = false
var hasThirdAce = false
var hasFourthAce = false
var endTurnBtn = document.getElementById('stay').addEventListener('click',cpuTurn)
var availableChips = 500
var currentPotValue = 0
var wagerForNextHand = 25
var data = window.localStorage

//Getting Elements on HTML
var gameStatus = document.getElementById('gameStatus')
var gameStatusContainer = document.getElementById('gameStatus-Container')
var betForNextHand = document.getElementById('betForNextHand')
var userChipValue = document.getElementById('currentChipCount').innerText = availableChips
betForNextHand.innerText = wagerForNextHand

//Event Listners
var increaseBet = document.getElementById('increaseBtn')
var decreaseBet = document.getElementById('decreaseBtn')
// increaseBet.addEventListener('click',betSettler)
// decreaseBet.addEventListener('click', betSettler)
// wagerForNextHand +=25, availableChips -= 25
// wagerForNextHand-=25, availableChips += 25
// function betSettler () {
    //     if(increaseBet === true){
        //         console.log('It worked')
        //     }
        //     console.log(increaseBet.click)
        //     data.removeItem('userChipValue', userChipValue)
        //     data.setItem('userChipValue', userChipValue)
        //     console.log(availableChips)
        //     console.log(wagerForNextHand)
        // }
        
        
        function startGame (){
            gameStatus.innerText = 'Increase or decrease your bet for next hand and to play the next hand you can either press "Place Bet" or "Deal Cards"'
        }
        //Need to create a function that is able to extract the values from the values property for each player. 
        function userRequestedCard(){
            randomNumber = Math.floor(Math.random()* deck.length)
            sumForUser += deck[randomNumber].weight
            userHand.push(deck[randomNumber])
            console.log(`Sum for the user ${sumForUser}`)
            if (sumForUser > 21){
                for (var a = 0; a < userHand.length; a++){
                    console.log(`Lets see if this is an "A" ${userHand[a].value}`)
                    if(userHand[a].value === "A"){
                        if(userHand[a].is1 === false){
                            userHand[a].is1 = true
                            sumForUser -= 10
                            console.log(sumForUser)
                            break
                        }    
                    }
                }
                renderCards()  
            } 
            if (sumForUser > 21 && userHand.value != "A"){
                endRound()
            }
            if (sumForUser === 21){
                { endRound()
                    
                }
            }
        }
        function renderCards (){
            var playerHandDisplay = document.getElementById('player-hand-display')
            var cpuHandDisplay = document.getElementById('cpu-hand-display')
            console.log(userHand)
            console.log(userHand.length)
            for(var i = 0; i < userHand.length; i++){
                var playingCard = document.createElement('div')
                playingCard.setAttribute('class',"col-1 m-2 ms-3 users-card")
                playerHandDisplay.appendChild(playingCard)
                
                var topGem = document.createElement('i')
                topGem.setAttribute('id', 'top-gem')
                topGem.setAttribute('class','fas fa-gem')
                playingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('id','bottom-gem')
                bottomGem.setAttribute('class','fas fa-gem')
                playingCard.appendChild(bottomGem)

                var topNum = document.createElement('div')
                topNum.setAttribute('id', 'cardnumber-top')
                topNum.innerHTML = userHand[i].value
                playingCard.appendChild(topNum)

                var bottomNum = document.createElement('div')
                bottomNum.setAttribute('id', 'cardnumber-bottom')
                bottomNum.innerHTML = userHand[i].value
                playingCard.appendChild(bottomNum)
    }        
            for(var y = 0; y < cpuHand.length; y++){
            var playingCardCpu = document.createElement('div')
            playingCardCpu.setAttribute('class',"col-1 m-2 ms-3 users-card")
            cpuHandDisplay.appendChild(playingCardCpu)
    }
}
function endRound() {
    if (sumForUser < sumForCpu && sumForCpu <= 21){
        gameStatus.innerText = ''
        gameStatus.innerText = 'The cpu won!'
        gameStatusContainer.style.background = 'red'

    }
    if (sumForUser > sumForCpu && sumForUser > 21) {
        gameStatus.innerText = ''
        gameStatus.innerText = 'You lost because your hand value exceeded 21'
        gameStatusContainer.style.background = 'red'
    }
    if (sumForUser > sumForCpu && sumForUser <= 21){
        console.log('Congrats you won!')
        gameStatus.innerText = ''
        gameStatus.innerText = 'Congrats you won!'
        gameStatusContainer.style.background = 'chartreuse'   
    }
    else if (sumForUser < sumForCpu && sumForCpu > 21){
        console.log('Congats you won because the cpu busted')
        gameStatus.innerText = ''
        gameStatus.innerText = 'You Won because the CPU hand value exceeded 21'
        gameStatusContainer.style.background = 'chartreuse'
    }
    
    else if (sumForUser === sumForCpu) {
        console.log('Congats on the tie')
        gameStatus.innerText = ''
        gameStatus.innerText = 'Its a push since CPU hand value equaled the value of the cards in your hand.'
        gameStatusContainer.style.background = 'yellow'
   
    }
    sumForUser = 0
    sumForCpu = 0
    userHand = []
    cpuHand = []
    userValuesArray = []
    cpuValuesArray = []
}

function cpuTurn() {
    console.log(`The current value of the cpus hand is: ${sumForCpu}`)
    if (sumForCpu > 21){
        for (var c = 0; c < cpuHand.length; c++){
            console.log(`Lets see if this is an "A" ${cpuHand[c].value}`)
            if(cpuHand[c].value === "A"){
                if(cpuHand[c].is1 === false){
                    cpuHand[c].is1 = true
                    sumForCpu -= 10
                    break
                }    
            }
        }
    }
    if ( sumForCpu >= 17) {
        endRound()
    }
    else if ( sumForCpu > 21 && cpuHand[c].value != "A"){
        endRound()
    }
    else {
        randomNumber = Math.floor(Math.random()* deck.length)
        sumForCpu += deck[randomNumber].weight
        cpuHand.push(deck[randomNumber])
        console.log(cpuHand)
        cpuTurn()
    }
    
    console.log(cpuHand)
    console.log(sumForCpu)
    }

function initialHandValues (uH,cH){ ///Calculates the initial values for hands and then checks if either player or cpu has 21
    for (i = 0; i < 2; i++){
userValuesArray.push(uH[i].weight)
cpuValuesArray.push(cH[i].weight)
/// getting iniitial sum for user *Test*
sumForUser += userValuesArray[i]
sumForCpu += cpuValuesArray[i]
if (sumForUser > 21){
    for (var a = 0; a < userHand.length; a++){
        console.log(`Lets see if this is an "A" ${userHand[a].value}`)
        if(userHand[a].value === "A"){
            if(userHand[a].is1 === false){
                userHand[a].is1 = true
                sumForUser -= 10
                break
            }    
        }
    }
}
if (sumForCpu > 21){
    for (var c = 0; c < cpuHand.length; c++){
        console.log(`Lets see if this is an "A" ${cpuHand[c].value}`)
        if(cpuHand[c].value === "A"){
            if(cpuHand[c].is1 === false){
                cpuHand[c].is1 = true
                sumForCpu -= 10
                break
            }    
        }
    }
    console.log(userHand)
        console.log(cpuHand)
        console.log(sumForUser)
        console.log(sumForCpu)
} 

} /////Everything currently console.log correct from 22-28
console.log(userValuesArray)
console.log(cpuValuesArray)
console.log(sumForUser)
console.log(sumForCpu)

gameStatus.innerText = 'You can either choose to get dealt another card or you can press stay to end your turn and let the computer play out its hand'
if (sumForUser === 21){
    endRound()
}
if (sumForCpu === 21) {
    endRound()
    }
}

function dealCards() //This function assigns a hand to each player
{
for(i = 0; i < 2; i++){
randomNumber = Math.floor(Math.random()* deck.length)
randomNumber2 = Math.floor(Math.random()* deck.length)
//console.log(randomNumber)
//console.log(randomNumber2)
userHand.push(deck[randomNumber])
cpuHand.push(deck[randomNumber2])}
//console.log(userHand)
//console.log(cpuHand)
initialHandValues(userHand, cpuHand)
renderCards()

}



function shuffle(array) {                             
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

}
function getDeck()
{
   const deck = new Array();

    for(var i = 0; i < suits.length; i++)
{
    for(var x = 0; x < cardValues.length; x++)
{
    var weight = parseInt(cardValues[x]); ///This assigns numeric values to face cards = 10 + 'A' = 11
    if (cardValues[x] == 'J' || cardValues[x] == 'Q' || cardValues[x] == 'K')
        weight = 10;
    if (cardValues[x] == 'A')
    {
        weight = 11;
        
    }
 var card = {value : cardValues[x], Suit: suits[i], weight: weight, is1: false};
    deck.push(card);
        }
        } shuffle(deck)
      
    return deck;
}
startGame()