//Fade out the text and start button after a user clicks "Start"
$("#startButton").click(function(){

    $("#instruction").fadeOut();

    appearAfterDelay();
 
})

function appearAfterDelay() {
        
    setTimeout(makeShapeAppear, Math.random() * 2000);
               
}

//Show timer
//Set up random figure position
function makeShapeAppear() {

    document.getElementById("timerDiv").style.display = "block";
        
    document.getElementById("figure").style.top = Math.floor(Math.random() * 300)+"px";
        
    document.getElementById("figure").style.left = Math.floor(Math.random() * 700)+"px";
        
    document.getElementById("figure").style.display = "block";
        
    random_bg_color();
                        
    randomShape ()
    
    start = new Date().getTime(); // get time when a figure has appeared
          
    return start;
                      
        
}
    
//Set up random figure color
function random_bg_color() {
        
    var x = Math.floor(Math.random() * 255);
    var y = Math.floor(Math.random() * 255);
    var z = Math.floor(Math.random() * 255);
    var bgColor = "rgb(" + x + "," + y + "," + z   + ")";
    document.getElementById("figure").style.background = bgColor;
        
}
   
//Set up random shape size and form
function randomShape () {
        
    var i = Math.floor(Math.random() * 2);
        
    var width = Math.floor(Math.random() * 250) + 5;
         
    if (i == 1) {
            
        document.getElementById("figure").style.width = width +"px";
        
        document.getElementById("figure").style.height = width +"px";
            
        document.getElementById("figure").style.borderRadius = "initial";
              
    } else {
            
        document.getElementById("figure").style.width = width +"px";
        
        document.getElementById("figure").style.height = width +"px";
            
        document.getElementById("figure").style.borderRadius = "50%";
            
        }
        
}
    
var allResults = []; //global array to write all time results
    
//Get the best time score
function bestTime (time) {
        
    allResults.push(time);
        
    var bestResult = Math.min(...allResults);
        
    document.getElementById("bestResult").innerHTML = bestResult + " s";

    return bestResult;
                                        
}

//User clicks on a figure, a figure disappears, the time score is calculated, the best score is updated
document.getElementById("figure").onclick = function() {
        
    document.getElementById("figure").style.display = "none";
        
    var end = new Date().getTime();
                        
    var timeTaken = (end - start)/1000;
                
    document.getElementById("timeTaken").innerHTML = timeTaken + " s";
        
    appearAfterDelay();
        
    bestTime(timeTaken);
        
    return timeTaken;

};