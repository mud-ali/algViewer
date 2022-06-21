//global variables
let canMoveTarget = true;
let moveCount = 0;
//set up the board into its initial state
init()

//Testing with wasd momvement
// TODO: Replace with automated movement
document.body.addEventListener("keydown", function(e) {
    if (e.key == "w") {
        move(-1, "up");
    } else if (e.key == "s") {
        move(1, "up");
    } else if (e.key == "a") {
        move(-1, "right");
    } else if (e.key == "d") {
        move(1, "right");
    }
});


function move(amt, dir) {
    //get & parse the current position of the piece
    let currentPosition = getCurrentPosition();
    
    let x = parseInt(currentPosition[0]);
    let y = parseInt(currentPosition[1]);

    console.log(x,y);

    if (dir == "up") {
        y += amt;
    } else if (dir == "right") {
        x += amt;
    }

    // actually move the square

    let newSpot = document.getElementsByClassName(`${x}-${y}`)[0];
    
    console.log(x,y,newSpot);
    if (newSpot && !newSpot.classList.contains("wall")) {
        document.getElementsByClassName('start')[0].classList.remove('start');
        newSpot?.classList.add("start");
        moveCount++;
    }
    //TODO: else play a thunk noise

    if (newSpot.classList.contains("center")) {
        alert(`yay won with ${moveCount} moves`);
        history.go(0);    
    }
}


//helper functions
function getCurrentPosition() {
    let piece = document.getElementsByClassName("start")[0];
    let currentPosition = piece.classList[2].split("-");

    return currentPosition;
}

//setup functions
function init() {
    const canvas = document.getElementById("can");
    const GRID_WIDTH = 29;
    const GRID_HEIGHT = 15
    let startChosen = false;

    //create the grid of unused cells
    for (let i=0;i<GRID_HEIGHT;i++) {
        for (let j=0;j<GRID_WIDTH;j++) {
            let d = document.createElement("div");
            d.classList.add("grid-square");
            d.classList.add("unused");
            d.classList.add(`${j}-${i}`);
            canvas.appendChild(d);


            //allow the target "center" to be moved
            //https://stackoverflow.com/questions/10000083/javascript-event-handler-with-parameters
            d.addEventListener("click", (d)=>{
                moveCenter(d.target);
            });
            
            //choose a center (destination) and randomly create walls in other positions
            if ((Math.random() > 0.995 || (j==GRID_WIDTH-2 && i==GRID_HEIGHT-2)) && !startChosen) {
                d.classList.add("start");
                startChosen = !startChosen;
            } else if (j==Math.floor(GRID_WIDTH/2) && i==0) 
                d.classList.add("center")
            else if (j>2 && i>2 && i<GRID_HEIGHT-2 && j<GRID_WIDTH-2 && Math.random() > 0.8)
                d.classList.add("wall");

            //remove the event listener when the enter key is pressed
        }
        
        let br = document.createElement("br");
        canvas.appendChild(br);
    }

    document.body.addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            canMoveTarget = false;
        }
    }, {once : true} );
}
function moveCenter(d) {
    if ( d.classList.contains("wall") 
    || d.classList.contains("start")
    || !canMoveTarget )
        return;

    Array.from(document.getElementsByClassName("center")).forEach(box => {
        box.classList.remove("center");
    });
    d.classList.add("center");
}