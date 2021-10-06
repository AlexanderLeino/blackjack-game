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
// variables to help with game logic
var hasFirstAce = false
var hasSecondAce = false
var hasThirdAce = false
var hasFourthAce = false

//Variables for html buttons
var endTurnBtn = document.getElementById('stay').addEventListener('click',cpuTurn)
var nextHandBtn = document.getElementById('nextHandBtn')

var availableChips = 500
var currentPotValue = 0
var wagerForNextHand = 25

var playerHandDisplay = document.getElementById('player-hand-display')
var cpuHandDisplay = document.getElementById('cpu-hand-display')
let currentHandValueDisplay = document.getElementById('currentHandValue')
let currentCpuHandValue = document.getElementById('cpuCurrentHandValue')
//Needed to delcare cpu's face down card in global scope to be able to manipulate when endRound() is called
let firstTopGem
let firstBottomGem
let firstTopNum
let firstBottomNum
let cardBack


let roundHasEnded = true

// Declaring these variables to be able to remove the children form the parent div for each card created 

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
increaseBet.addEventListener('click',betSettler)
decreaseBet.addEventListener('click', betSettler)
wagerForNextHand +=25, availableChips -= 25
wagerForNextHand-=25, availableChips += 25

let userHandDisplayArray = []
let cpuHandDisplayArray = []
// dealerRevealFirstCard(firstTopGem,firstBottomGem,firstTopNum, firstBottomNum, cardBack)

function  dealerRevealFirstCard(){
        cardBack.remove()
        firstTopGem.style.visibility = 'visible'
        firstBottomGem.style.visibility = 'visible'
        firstTopNum.style.visibility = 'visible'
        firstBottomNum.style.visibility = 'visible'
        

        console.log(firstTopGem)
        console.log(firstBottomGem)
        console.log(firstTopNum)
        console.log(firstBottomNum) 
}
function betSettler () {
}

function startGame (){
    gameStatus.innerText = 'Increase or decrease your bet for next hand and to play the next hand you can either press "Place Bet" or "Deal Cards"'
    if(sumForUser > 0 && sumForCpu > 0){
        location.reload()
        
        
        
        sumForUser = 0
        sumForCpu = 0
        userHand = []
        cpuHand = []
        userValuesArray = []
        cpuValuesArray = []
        
        dealCards()
        
    }
    else {
        
        dealCards()
    }
    
    
    
}
//Need to create a function that is able to extract the values from the values property for each player. 
function userRequestedCard(){
    randomNumber = Math.floor(Math.random()* deck.length)
    sumForUser += deck[randomNumber].weight
    userHand.push(deck[randomNumber])
    console.log(`Sum for the user ${sumForUser}`)
    currentHandValueDisplay.innerText = sumForUser
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
        
    } 
    if (sumForUser > 21 && userHand.value != "A"){
        endRound()
    }
    if (sumForUser === 21){
        { endRound()
            
        }
    }
    renderCards(false,deck[randomNumber])  
}
function renderCards (firstCard, newCard){
    if (firstCard){
        for(var i = 0; i < userHand.length; i++){
            console.log(userHand[i].Suit)
            var userPlayingCard = document.createElement('div')
            userPlayingCard.setAttribute('class',"col-1 m-2 ms-3 users-card")
            playerHandDisplay.appendChild(userPlayingCard)
            
            switch(userHand[i].Suit){
           
            case 'diamonds':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-diamond-fill',)
                userPlayingCard.appendChild(topGem)
    
                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-diamond-fill')
                userPlayingCard.appendChild(bottomGem)
                break;

            case 'hearts':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-heart-fill',)
                userPlayingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-heart-fill')
                userPlayingCard.appendChild(bottomGem)
                break;

            case 'spades':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-spade-fill',)
                userPlayingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-spade-fill')
                userPlayingCard.appendChild(bottomGem)
                break;
            
            case 'clubs':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-club-fill',)
                userPlayingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-club-fill')
                userPlayingCard.appendChild(bottomGem)
                break;
            }

            
            var topNum = document.createElement('div')
            topNum.setAttribute('class', 'cardnumber-top')
            topNum.innerHTML = userHand[i].value
            userPlayingCard.appendChild(topNum)
            
            var bottomNum = document.createElement('div')
            bottomNum.setAttribute('class', 'cardnumber-bottom')
            bottomNum.innerHTML = userHand[i].value
            userPlayingCard.appendChild(bottomNum)
        }
        
    }
    else {
        
        var userPlayingCard = document.createElement('div')
        userPlayingCard.setAttribute('class',"col-1 m-2 ms-3 users-card")
        playerHandDisplay.appendChild(userPlayingCard)
        
        switch(newCard.Suit){
           
            case 'diamonds':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-diamond-fill',)
                userPlayingCard.appendChild(topGem)
    
                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-diamond-fill')
                userPlayingCard.appendChild(bottomGem)
                break;

            case 'hearts':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-heart-fill',)
                userPlayingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-heart-fill')
                userPlayingCard.appendChild(bottomGem)
                break;

            case 'spades':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-spade-fill',)
                userPlayingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-spade-fill')
                userPlayingCard.appendChild(bottomGem)
                break;
            
            case 'clubs':
                var topGem = document.createElement('i')
                // Create a switch statement
                topGem.setAttribute('class', 'topGem bi bi-suit-club-fill',)
                userPlayingCard.appendChild(topGem)

                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-club-fill')
                userPlayingCard.appendChild(bottomGem)
                break;
            }

        var topNum = document.createElement('div')
        topNum.setAttribute('class', 'cardnumber-top')
        topNum.innerHTML = newCard.value
        userPlayingCard.appendChild(topNum)
        
        var bottomNum = document.createElement('div')
        bottomNum.setAttribute('class', 'cardnumber-bottom')
        bottomNum.innerHTML = newCard.value
        userPlayingCard.appendChild(bottomNum)
    } 
    currentHandValueDisplay.innerText = sumForUser
    currentCpuHandValue.innerText = sumForCpu-cpuHand[0].weight
    console.log(cpuHand[0].value)
}
function renderCpuCards(firstCardCpu,newCardCpu){
    if (firstCardCpu){
        for(var y = 0; y < cpuHand.length; y++){
            if(y === 0){
                var cpuPlayingCard = document.createElement('div')
                cpuPlayingCard.setAttribute('class',"col-1 m-2 ms-3 users-card")
                cpuHandDisplay.appendChild(cpuPlayingCard)
                
                cardBack = document.createElement('img')
                cardBack.setAttribute('src','./Bicycle Cards.png')
                cardBack.setAttribute('class','firstCardCpu')
                cpuPlayingCard.appendChild(cardBack)
            switch(cpuHand[y].Suit){
            
                case 'diamonds':
                firstTopGem = document.createElement('i')
                firstTopGem.setAttribute('class', 'topGem  bi bi-suit-diamond-fill dealersFirstCard',)
                firstTopGem.setAttribute('id', 'firstDealerCardTopG')
                cpuPlayingCard.appendChild(firstTopGem)
                
                firstBottomGem = document.createElement('i')
                firstBottomGem.setAttribute('class','bottomGem  bi bi-suit-diamond-fill dealersFirstCard')
                firstBottomGem.setAttribute('id','dealersFirstCardBotGem')
                cpuPlayingCard.appendChild(firstBottomGem)
                break;

                case 'spades':
                firstTopGem = document.createElement('i')
                firstTopGem.setAttribute('class', 'topGem bi bi-suit-spade-fill dealersFirstCard',)
                firstTopGem.setAttribute('id', 'firstDealerCardTopG')
                cpuPlayingCard.appendChild(firstTopGem)
                
                firstBottomGem = document.createElement('i')
                firstBottomGem.setAttribute('class','bottomGem bi bi-suit-spade-fill dealersFirstCard')
                firstBottomGem.setAttribute('id','dealersFirstCardBotGem')
                cpuPlayingCard.appendChild(firstBottomGem)
                break;

                case 'hearts':
                    firstTopGem = document.createElement('i')
                    firstTopGem.setAttribute('class', 'topGem bi bi-suit-heart-fill dealersFirstCard',)
                    firstTopGem.setAttribute('id', 'firstDealerCardTopG')
                    cpuPlayingCard.appendChild(firstTopGem)
                    
                    firstBottomGem = document.createElement('i')
                    firstBottomGem.setAttribute('class','bottomGem bi bi-suit-heart-fill dealersFirstCard')
                    firstBottomGem.setAttribute('id','dealersFirstCardBotGem')
                    cpuPlayingCard.appendChild(firstBottomGem)
                    break;
                
                    
                case 'clubs':
                    firstTopGem = document.createElement('i')
                    firstTopGem.setAttribute('class', 'topGem bi bi-suit-club-fill dealersFirstCard',)
                    firstTopGem.setAttribute('id', 'firstDealerCardTopG')
                    cpuPlayingCard.appendChild(firstTopGem)
                        
                    firstBottomGem = document.createElement('i')
                    firstBottomGem.setAttribute('class','bottomGem bi bi-suit-club-fill dealersFirstCard')
                    firstBottomGem.setAttribute('id','dealersFirstCardBotGem')
                    cpuPlayingCard.appendChild(firstBottomGem)
                    break;
                        
                
            }
                firstTopNum = document.createElement('div')
                firstTopNum.setAttribute('class', 'cardnumber-top dealersFirstCard')
                firstTopNum.innerHTML = cpuHand[y].value
                firstTopNum.setAttribute('id', 'dealersFirstCardTopNum')
                cpuPlayingCard.appendChild(firstTopNum)
                
                firstBottomNum = document.createElement('div')
                firstBottomNum.setAttribute('class', 'cardnumber-bottom dealersFirstCard')
                firstBottomNum.setAttribute('id', 'dealersFirstCardBotNum')
                firstBottomNum.innerHTML = cpuHand[y].value
                // bottomNum.style.visibility = 'hidden'
                cpuPlayingCard.appendChild(firstBottomNum)
            }
            else {
                var cpuPlayingCard = document.createElement('div')
                cpuPlayingCard.setAttribute('class',"col-1 m-2 ms-3 users-card")
                cpuHandDisplay.appendChild(cpuPlayingCard)
            
                switch(cpuHand[y].Suit){
            
                case 'hearts':
                var topGem = document.createElement('i')
                topGem.setAttribute('class', 'topGem bi bi-suit-heart-fill',)
                cpuPlayingCard.appendChild(topGem)
                
                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-heart-fill')
                cpuPlayingCard.appendChild(bottomGem)
                break;

                case 'spades':
                    var topGem = document.createElement('i')
                    topGem.setAttribute('class', 'topGem bi bi-suit-spade-fill',)
                    cpuPlayingCard.appendChild(topGem)
                    
                    var bottomGem = document.createElement('i')
                    bottomGem.setAttribute('class','bottomGem bi bi-suit-spade-fill')
                    cpuPlayingCard.appendChild(bottomGem)
                    break;
                
                case 'diamonds':
                    var topGem = document.createElement('i')
                    topGem.setAttribute('class', 'topGem  bi bi-suit-diamond-fill',)
                    cpuPlayingCard.appendChild(topGem)
                    
                    var bottomGem = document.createElement('i')
                    bottomGem.setAttribute('class','bottomGem  bi bi-suit-diamond-fill')
                    cpuPlayingCard.appendChild(bottomGem)
                    break;
                
                case 'clubs':
                    var topGem = document.createElement('i')
                    topGem.setAttribute('class', 'topGem  bi bi-suit-club-fill',)
                    cpuPlayingCard.appendChild(topGem)
                    
                    var bottomGem = document.createElement('i')
                    bottomGem.setAttribute('class','bottomGem bi bi-suit-club-fill')
                    cpuPlayingCard.appendChild(bottomGem)
                    break;
            }
                
                var topNum = document.createElement('div')
                topNum.setAttribute('class', 'cardnumber-top')
                topNum.innerHTML = cpuHand[y].value
                cpuPlayingCard.appendChild(topNum)
                
                var bottomNum = document.createElement('div')
                bottomNum.setAttribute('class', 'cardnumber-bottom')
                bottomNum.innerHTML = cpuHand[y].value
                cpuPlayingCard.appendChild(bottomNum)
            }
        }
    } else {
        var cpuPlayingCard = document.createElement('div')
        cpuPlayingCard.setAttribute('class',"col-1 m-2 ms-3 users-card")
        cpuHandDisplay.appendChild(cpuPlayingCard)
    switch(newCardCpu.Suit) {
            case 'hearts':
                var topGem = document.createElement('i')
                topGem.setAttribute('class', 'topGem bi bi-suit-heart-fill',)
                cpuPlayingCard.appendChild(topGem)
            
            var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-heart-fill')
                cpuPlayingCard.appendChild(bottomGem)
                break;

            case 'spades':
                var topGem = document.createElement('i')
                topGem.setAttribute('class', 'topGem bi bi-suit-spade-fill',)
                cpuPlayingCard.appendChild(topGem)
                
                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-spade-fill')
                cpuPlayingCard.appendChild(bottomGem)
                break;
            
            case 'diamonds':
                var topGem = document.createElement('i')
                topGem.setAttribute('class', 'topGem  bi bi-suit-diamond-fill',)
                cpuPlayingCard.appendChild(topGem)
                
                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem  bi bi-suit-diamond-fill')
                cpuPlayingCard.appendChild(bottomGem)
                break;
            
            case 'clubs':
                var topGem = document.createElement('i')
                topGem.setAttribute('class', 'topGem  bi bi-suit-club-fill',)
                cpuPlayingCard.appendChild(topGem)
                
                var bottomGem = document.createElement('i')
                bottomGem.setAttribute('class','bottomGem bi bi-suit-club-fill')
                cpuPlayingCard.appendChild(bottomGem)
                break;

    }
        
        var topNum = document.createElement('div')
        topNum.setAttribute('class', 'cardnumber-top')
        topNum.innerHTML = newCardCpu.value
        cpuPlayingCard.appendChild(topNum)
        
        var bottomNum = document.createElement('div')
        bottomNum.setAttribute('class', 'cardnumber-bottom')
        bottomNum.innerHTML = newCardCpu.value
        cpuPlayingCard.appendChild(bottomNum)
    }
}
function endRound()
{   console.log(userHand)
    console.log(cpuHand)
    currentCpuHandValue.innerText = sumForCpu
    currentHandValueDisplay.innerText = sumForUser
    if (sumForUser < sumForCpu && sumForCpu <= 21){
        gameStatus.innerText = ''
        gameStatus.innerText = 'The cpu won!'
        gameStatusContainer.style.background = 'red'
        
    }
    else if (sumForUser > sumForCpu && sumForUser > 21) {
        gameStatus.innerText = ''
        gameStatus.innerText = 'You lost because your hand value exceeded 21'
        gameStatusContainer.style.background = 'red'
    }
    else if (sumForUser > sumForCpu && sumForUser <= 21){
        console.log('Congrats you won!')
        gameStatus.innerText = ''
        gameStatus.innerText = 'Congrats you won!'
        gameStatusContainer.style.background = 'chartreuse'   
    }
    else if (sumForUser < sumForCpu && sumForCpu > 21){
        gameStatus.innerText = ''
        gameStatus.innerText = 'You Won because the CPU hand value exceeded 21'
        gameStatusContainer.style.background = 'chartreuse'
    }
    
    else {
        console.log('Congats on the tie')
        gameStatus.innerText = ''
        gameStatus.innerText = 'Its a push since CPU hand value equaled the value of the cards in your hand.'
        gameStatusContainer.style.background = 'yellow'
        
    }
    nextHandBtn.style.color ='black'
    nextHandBtn.disabled = false
    dealerRevealFirstCard()   
}

function cpuTurn() {
    currentCpuHandValue.innerText = sumForCpu
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
        currentCpuHandValue.innerText = sumForCpu
        renderCpuCards(false,deck[randomNumber])
        cpuTurn()
    }
    
    //renderCards()
}

function initialHandValues (uH,cH){ ///Calculates the initial values for hands and then checks if either player or cpu has 21
    for (i = 0; i < 2; i++){
        userValuesArray.push(uH[i].weight)
        cpuValuesArray.push(cH[i].weight)
        /// getting iniitial sum for user *Test*
        sumForUser += userValuesArray[i]
        sumForCpu += cpuValuesArray[i]
        if (sumForUser > 21){
            for (let a = 0; a < userValuesArray.length; a++){
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
            gameStatus.innerText = 'You can either choose to get dealt another card or you can press stay to end your turn and let the computer play out its hand'
        } }renderCards(true)
        renderCpuCards(true) /////Everything currently console.log correct from 22-28
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
            
            userHand.push(deck[randomNumber])
            cpuHand.push(deck[randomNumber2])}
            nextHandBtn.style.color ='white'
            nextHandBtn.disabled = true
            
            
            initialHandValues(userHand, cpuHand)
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