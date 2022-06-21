init()

function init() {
    const canvas = document.getElementById("can");
    const GRID_WIDTH = 30;

    for (let i=0;i<GRID_WIDTH;i++) {
        for (let j=0;j<GRID_WIDTH;j++) {
            let d = document.createElement("div");
            d.classList.add("grid-square");
            d.classList.add("unused");
            canvas.appendChild(d);

            j==GRID_WIDTH/2 && i==GRID_WIDTH/2 ? d.classList.add("center") : null;

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