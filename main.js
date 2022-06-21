//set up the board into its initial state
init()





function init() {
    const canvas = document.getElementById("can");
    const GRID_WIDTH = 30;

    //create the grid of unused cells
    for (let i=0;i<GRID_WIDTH;i++) {
        for (let j=0;j<GRID_WIDTH;j++) {
            let d = document.createElement("div");
            d.classList.add("grid-square");
            d.classList.add("unused");
            canvas.appendChild(d);

            //choose an approximate center and randomly create walls in other positions
            j==Math.floor(GRID_WIDTH/2) && i==Math.floor(GRID_WIDTH/2) ? d.classList.add("center") :
            j==Math.floor(GRID_WIDTH/2) && i==0 ? d.classList.add("start") :
            Math.random() > 0.8 ? d.classList.add("wall") : null;

            //allow the target "center" to be moved
            d.addEventListener("click", function() {
                if (d.classList.contains("center")) {
                    d.classList.remove("center");
                } else {
                    Array.from(document.getElementsByClassName("center")).forEach(box => {
                        box.classList.remove("center");
                    });
                    d.classList.add("center");
                }
            });

        }

        let br = document.createElement("br");
        canvas.appendChild(br);
    }
}