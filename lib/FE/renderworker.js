self.onmessage = function (event) { 
    let Canvas = document.getElementById("gamewindow")
    let Ctx = Canvas.getContext("2d");
    let Data = event.data
    if(Data.action == "render") {
        for(obj in Data.data) {
            let gameobj = Data.data[obj]
            let objrenderer = gameobj.GetComponent("Renderer")
            if(objrenderer != null) {
                if(objrenderer.type == "square") {
                    Ctx.fillStyle = objrenderer.Color
                    Ctx.fillRect(gameobj.Position[0], gameobj.Position[1], gameobj.Scale[0], gameobj.Scale[1]);
                }
            }
        }
    }
}