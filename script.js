// We need to assign a value of ten to J, Q, K , and 11 to A [X]
// Need to make a reset variable button for: currentHandValueUser && currentHandValueCpu and also resets function dealCards()
//Need to create a function that allows us to check the initiial hand values for cpu and user and if cpu or user has 21 then said player wins
var suits = ['diamonds', 'spades', 'clubs', 'hearts']
var cardValues = ['2', '3', '4', '5', '6' , '7' , '8', '9','10' ,'J' ,'Q', 'K', 'A']
let cardColors = ['Red', 'Black']
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
let nextCardBtn = document.getElementById('nextCardBtn')
nextCardBtn.disabled = true

var playerHandDisplay = document.getElementById('player-hand-display')
var cpuHandDisplay = document.getElementById('cpu-hand-display')
let currentHandValueDisplay = document.getElementById('currentHandValue')
let currentCpuHandValue = document.getElementById('cpuCurrentHandValue')

// These selections are for the two containers that contain the cpus and the users current hand values. 
let userActualHandValueContainer = document.getElementById('currentHandValueContainer')
let cpuActual = document.getElementById('cpuActual')

//Needed to delcare cpu's face down card in global scope to be able to manipulate when endRound() is called
let firstTopGem
let firstBottomGem
let firstTopNum
let firstBottomNum
let cardBack

let gameInProgress = false
let roundHasEnded = true

// using local storage for be handling

//Getting Elements on HTML
var gameStatus = document.getElementById('gameStatus')
var gameStatusContainer = document.getElementById('gameStatus-Container')
let heading_gameStatus = document.getElementById('heading-gameStatus')
//Sets Game Status immediately  
gameStatus.innerText = 'Increase or decrease your bet for next hand and to play the next hand simply press "Next Hand"!'

var increaseBetBtn = document.getElementById('increaseBtn')
var decreaseBetBtn = document.getElementById('decreaseBtn')
increaseBetBtn.addEventListener('click', increaseBet)
decreaseBetBtn.addEventListener('click', decreaseBet)

/// Betting constructors
let currentBet = 0

let currentBetEL = document.getElementById('betForNextHand')
let chipCountEL = document.getElementById('currentChipCount')

currentBetEL.innerText = currentBet

let localStorage = window.localStorage
// data.setItem('userChipCount',chipCount )


let userHandDisplayArray = []
let cpuHandDisplayArray = []

//On Page Load I want to check localStorage. 
function onPageLoad(){
    
    let userChips = localStorage.getItem('chipCount')
    
    //This will check to see if the user has an item in local storage with the key 'userChipCount'
    if(userChips && userChips > 0){

        userChips = parseInt(userChips)
        chipCountEL.innerText = userChips
       
        
    } else {
        
        userChips = 500
        localStorage.setItem('chipCount', userChips)
        chipCountEL.innerText = userChips
        
    }

}

function increaseBet(){
    let userChips = localStorage.getItem('chipCount')

    if(userChips && userChips > 0 && gameInProgress === false){
        console.log('Hey at least we are increasing the bet')
        userChips = parseInt(userChips)
        userChips -= 50
        chipCountEL.innerText = userChips
        currentBet += 50
        currentBetEL.innerText = currentBet
        localStorage.setItem('chipCount', userChips)


        chipCountEL.innerText = userChips
        
    } else {
        //This just prevents the button from increasing the count if the user has 0 chips left
            return
    }
}

function decreaseBet(){
    let userChips = localStorage.getItem('chipCount')
    console.log(userChips)

    if(currentBet >= 50 && gameInProgress === false){
        console.log('Hey at least we are increasing the bet')
        userChips = parseInt(userChips)
        userChips += 50
        chipCountEL.innerText = userChips
        currentBet -= 50
        currentBetEL.innerText = currentBet
        localStorage.setItem('chipCount', userChips)


        chipCountEL.innerText = userChips
        
    } else {
        //This just prevents the button from increasing the count if the user has 0 chips left
            return
    }
}

function  dealerRevealFirstCard(){
    cardBack.remove()
    firstTopGem.style.visibility = 'visible'
    firstBottomGem.style.visibility = 'visible'
    firstTopNum.style.visibility = 'visible'
    firstBottomNum.style.visibility = 'visible'
    
}



function startGame (){
    if(sumForUser > 0 && sumForCpu > 0){
        location.reload()
        sumForUser = 0
        sumForCpu = 0
        userHand = []
        cpuHand = []
        userValuesArray = []
        cpuValuesArray = []
        increaseBetBtn.disabled = false
        decreaseBetBtn.disabled = false
        
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
        //Placed the code on line 160 here to avoid errors occurring if user were to win before cpu had a turn when calculating visible cpu handvalue
        currentCpuHandValue.innerText = sumForCpu-cpuHand[0].weight
        for(var i = 0; i < userHand.length; i++){
            
            var userPlayingCard = document.createElement('div')
            userPlayingCard.setAttribute('class',"col-1 m-2 ms-5 users-card")
            playerHandDisplay.appendChild(userPlayingCard)
            
            console.log(userHand[i].value)
            switch (userHand[i].value){
                case 'J':
                    var facePlate = document.createElement('img')
                    facePlate.setAttribute('src', './cardAssets/JackSmall.png')
                    facePlate.setAttribute('class', 'faceCards')
                    userPlayingCard.append(facePlate)
                    
                    break;
                
                case 'Q':
                    var facePlate = document.createElement('img')
                    facePlate.setAttribute('src', './cardAssets/Queen Small.png')
                    facePlate.setAttribute('class', 'faceCards')
                    userPlayingCard.append(facePlate)    
                    break;

                case 'K':
                    var facePlate = document.createElement('img')
                    facePlate.setAttribute('src', './cardAssets/KingSmall.png')
                    facePlate.setAttribute('class', 'faceCards')
                    userPlayingCard.append(facePlate)
    
                }
            
            
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
            switch(userHand[i].color){
                case 'black':
                topNum.classList.add('black')
                topGem.classList.add('black')
                bottomNum.classList.add('black')
                bottomGem.classList.add('black')
                break;
                
                case 'red':
                topNum.classList.add('red')
                topGem.classList.add('red')
                bottomNum.classList.add('red')
                bottomGem.classList.add('red')
                break;   
            }
        }
        
    }
    else {
        
        var userPlayingCard = document.createElement('div')
        userPlayingCard.setAttribute('class',"col-1 m-2 ms-5 users-card")
        playerHandDisplay.appendChild(userPlayingCard)
        switch (newCard.value){
            case 'J':
                var facePlate = document.createElement('img')
                facePlate.setAttribute('src', './cardAssets/JackSmall.png')
                facePlate.setAttribute('class', 'faceCards')
                userPlayingCard.append(facePlate)
                
                break;
            
            case 'Q':
                var facePlate = document.createElement('img')
                facePlate.setAttribute('src', './cardAssets/Queen Small.png')
                facePlate.setAttribute('class', 'faceCards')
                userPlayingCard.append(facePlate)    
                break;

            case 'K':
                var facePlate = document.createElement('img')
                facePlate.setAttribute('src', './cardAssets/KingSmall.png')
                facePlate.setAttribute('class', 'faceCards')
                userPlayingCard.append(facePlate)

            }
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
        switch(newCard.color){
            case 'black':
            topNum.classList.add('black')
            topGem.classList.add('black')
            bottomNum.classList.add('black')
            bottomGem.classList.add('black')
            break;
            
            case 'red':
            topNum.classList.add('red')
            topGem.classList.add('red')
            bottomNum.classList.add('red')
            bottomGem.classList.add('red')
            break;   
        }
    } 
    currentHandValueDisplay.innerText = sumForUser
    
}
function renderCpuCards(firstCardCpu,newCardCpu){
    if (firstCardCpu){
        for(var y = 0; y < cpuHand.length; y++){
            if(y === 0){
                var cpuPlayingCard = document.createElement('div')
                cpuPlayingCard.setAttribute('class',"col-1 m-2 ms-5 users-card")
                cpuHandDisplay.appendChild(cpuPlayingCard)
                
                cardBack = document.createElement('img')
                cardBack.setAttribute('src','./Bicycle Cards.png')
                cardBack.setAttribute('class','firstCardCpu')
                cpuPlayingCard.appendChild(cardBack)
                // switch (cpuHand[y].value){
                //     case 'J':
                //         var cpuFirstFacePlate = document.createElement('img')
                //         cpuFirstFacePlate.setAttribute('src', './cardAssets/JackSmall.png')
                //         cpuFirstFacePlate.setAttribute('class', 'faceCards')
                //         cpuFirstFacePlate.append(cpuFirstFacePlate)
                //         cpuFirstFacePlate.style.visibility = 'hidden'
                        
                //         break;
                    
                //     case 'Q':
                //         var cpuFirstFacePlate = document.createElement('img')
                //         cpuFirstFacePlate.setAttribute('src', './cardAssets/Queen Small.png')
                //         cpuFirstFacePlate.setAttribute('class', 'faceCards')
                //         cpuPlayingCard.append(cpuFirstFacePlate)
                //         cpuFirstFacePlate.style.visibility = 'hidden'    
                //         break;
    
                //     case 'K':
                //         var cpuFirstFacePlate = document.createElement('img')
                //         cpuFirstFacePlate.setAttribute('src', './cardAssets/KingSmall.png')
                //         cpuFirstFacePlate.setAttribute('class', 'faceCards')
                //        cpuPlayingCard.append(facePlate)
                //        cpuFirstFacePlate.style.visibility = 'hidden'
        
                //     }
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

                switch(cpuHand[y].color){
                    case 'black':
                    firstTopNum.classList.add('black')
                    firstTopGem.classList.add('black')
                    firstBottomNum.classList.add('black')
                    firstBottomGem.classList.add('black')
                    break;
                    
                    case 'red':
                    firstTopNum.classList.add('red')
                    firstTopGem.classList.add('red')
                    firstBottomNum.classList.add('red')
                    firstBottomGem.classList.add('red')
                    break;
                    
                }
                // switch (cpuHand[y].value){
                //     case 'J':
                //         var facePlate = document.createElement('img')
                //         facePlate.setAttribute('src', './cardAssets/JackSmall.png')
                //         facePlate.setAttribute('class', 'faceCards')
                //         cpuPlayingCard.append(facePlate)
                        
                //         break;
                    
                //     case 'Q':
                //         var facePlate = document.createElement('img')
                //         facePlate.setAttribute('src', './cardAssets/Queen Small.png')
                //         facePlate.setAttribute('class', 'faceCards')
                //         cpuPlayingCard.append(facePlate)    
                //         break;
    
                //     case 'K':
                //         var facePlate = document.createElement('img')
                //         facePlate.setAttribute('src', './cardAssets/KingSmall.png')
                //         facePlate.setAttribute('class', 'faceCards')
                //        cpuPlayingCard.append(facePlate)
        
                //     }
            }
            else {
                var cpuPlayingCard = document.createElement('div')
                cpuPlayingCard.setAttribute('class',"col-1 m-2 ms-5 users-card")
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
                switch(cpuHand[y].color){
                    case 'black':
                            topNum.classList.add('black')
                            topGem.classList.add('black')
                            bottomNum.classList.add('black')
                            bottomGem.classList.add('black')
                            break;
                            
                            case 'red':
                            topNum.classList.add('red')
                            topGem.classList.add('red')
                            bottomNum.classList.add('red')
                            bottomGem.classList.add('red')
                            break;      
                }

            }
        }
    } else {
        var cpuPlayingCard = document.createElement('div')
        cpuPlayingCard.setAttribute('class',"col-1 m-2 ms-5 users-card")
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
    switch(newCardCpu.color){
        case 'black':
                topNum.classList.add('black')
                topGem.classList.add('black')
                bottomNum.classList.add('black')
                bottomGem.classList.add('black')
                break;
                
                case 'red':
                topNum.classList.add('red')
                topGem.classList.add('red')
                bottomNum.classList.add('red')
                bottomGem.classList.add('red')
                break;      
    }
    }
}
function endRound(){
    let userChips = localStorage.getItem('chipCount')
    userChips = parseInt(userChips)
    nextCardBtn.disabled = true
    currentCpuHandValue.innerText = sumForCpu
    currentHandValueDisplay.innerText = sumForUser
    setTimeout(forcePageReload, 1500)
   
    if (sumForUser < sumForCpu && sumForCpu <= 21){
        gameStatus.innerText = ''
        gameStatus.innerText = 'The cpu won!'
        heading_gameStatus.style.background = 'red'
        cpuActual.style.background = 'red'
        
    }
    else if (sumForUser > sumForCpu && sumForUser > 21) {
        gameStatus.innerText = ''
        gameStatus.innerText = 'You lost because your hand value exceeded 21'
        heading_gameStatus.style.background = 'red'
        cpuActual.style.background = 'red'
        
    }
    else if (sumForUser > sumForCpu && sumForUser <= 21){
        console.log('Congrats you won!')
        gameStatus.innerText = ''
        gameStatus.innerText = 'Congrats you won!'
        heading_gameStatus.style.background = 'chartreuse'
        userActualHandValueContainer.style.background = 'chartreuse'
        userChips = userChips + (currentBet *  2)
        localStorage.setItem('chipCount', userChips)
        
        
    }
    else if (sumForUser < sumForCpu && sumForCpu > 21){
        gameStatus.innerText = ''
        gameStatus.innerText = 'You Won because the CPU hand value exceeded 21'
        heading_gameStatus.style.background = 'chartreuse'
        userActualHandValueContainer.style.background = 'chartreuse'
        userChips = userChips + (currentBet *  2)
        localStorage.setItem('chipCount', userChips)
        
    }
    
    else {
        console.log('Congats on the tie')
        gameStatus.innerText = ''
        gameStatus.innerText = 'Its a push since CPU hand value equaled the value of the cards in your hand.'
        heading_gameStatus.style.background = 'yellow'
        userActualHandValueContainer.style.background = 'yellow'
        cpuActual.style.background = 'yellow'
        userChips = currentBet + userChips
        localStorage.setItem('chipCount', userChips)
        
    }
    nextHandBtn.disabled = false
    dealerRevealFirstCard()
    gameInProgress = false
    
}

function forcePageReload() {
    window.location.reload()
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
    {   nextCardBtn.disabled = false
        gameInProgress = true
        increaseBetBtn.disabled = true
        decreaseBetBtn.disabled = true
        for(i = 0; i < 2; i++){
            randomNumber = Math.floor(Math.random()* deck.length)
            randomNumber2 = Math.floor(Math.random()* deck.length)
            
            userHand.push(deck[randomNumber])
            cpuHand.push(deck[randomNumber2])}
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
                let deck = new Array();
                
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
                        var card = {value : cardValues[x], Suit: suits[i], weight: weight, is1: false,};
                        deck.push(card);
                        
                        // for (let c = 0; c < deck.length; c++){
                        //     if (deck.indexOf(c))
                        // }
                    }

                }
                let colorPicker = 'black'
                deck.map(card => {
                    if (colorPicker === 'black'){
                        card.color = 'black'
                        
                        colorPicker = 'red'
                    } else {
                        card.color = 'red'
                        colorPicker = 'black'
                        
                    }
                })
                shuffle(deck)
                return deck;
            }


onPageLoad()