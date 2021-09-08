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
}

function endRound() {
    if (sumForUser < sumForCpu && sumForCpu <= 21){
        console.log('Damn son the pc just roasted you')
    }
    if (sumForUser > sumForCpu && sumForUser > 21) {
        console.log('damn you just got busted')
    }
    if (sumForUser > sumForCpu && sumForUser <= 21){
        console.log('Congrats on winning through all the trials and turbulations')
    }
    else if (sumForUser < sumForCpu && sumForCpu > 21){
        console.log('Congats you won because the cpu busted')
    }
    
    else if (sumForUser === sumForCpu) {
        console.log('Congats on the tie')
        
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
} /////Everything currently console.log correct from 22-28
console.log(userValuesArray)
console.log(cpuValuesArray)
console.log(sumForUser)
console.log(sumForCpu)
if (sumForUser === 21){
    console.log('Congrats You got 21')
    endRound()
}
if (sumForCpu === 21) {
    console.log('Unfortunately the cpu won')
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