//set up the board into its initial state
init()





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
                console.log(d);
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
            document.body.addEventListener("keydown", function(e) {
                if (e.key == "Enter") {
                    d.removeEventListener("click", moveCenter);
                }
            });
        }

        let br = document.createElement("br");
        canvas.appendChild(br);
    }
}
function moveCenter(d) {
    if (d.classList.contains("center") || d.classList.contains("start") || d.classList.contains("wall")) {
        d.classList.remove("center");
    } else {
        Array.from(document.getElementsByClassName("center")).forEach(box => {
            box.classList.remove("center");
        });
        d.classList.add("center");
    }
}