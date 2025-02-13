class App {
    constructor() {
        this.gameobjects = []
        this.Renderer = null
        this.MainLoop = null
        this.InitWebpage()
    }
    SetTitle(title) {
        document.getElementById("title").innerHTML = title
    }
    AppendRenderer(renderer) {
        this.Renderer = renderer
        this.Renderer.Game = this
    }
    InitWebpage() {
        this.canvas = document.createElement("canvas")
        this.canvas.width = "500px"
        this.canvas.height = "500px"
        this.canvas.onclick = this.OnClick()
        document.body.appendChild(this.canvas)
    }
    OnClick() {
        console.log("Clicked!!")
    }
    AddGameObject(obj) {
        this.gameobjects.push(obj)
        obj.Game = this
        if(this.MainLoop != null) {
            obj.Start()
        }
    }
    Start() {
        if(this.Renderer == null) {
            console.error("FE-ERROR: RENDERER NOT PRESENT")
        }else {
            this.Renderer.Start()
            this.gameobjects.forEach(obj => {
                obj.Start()
            })
            this.BeginUpdate()
        }
    }
    SetCanvasDimensions(vec) {
        this.canvas.width = vec[0] + "px"
        this.canvas.height = vec[1] + "px"
    }
    BeginUpdate() {
        this.MainLoop = setInterval(() => {
            this.Update()
        }, 0);
    }
    Update() {
        this.Renderer.Update()
        this.gameobjects.forEach(obj => {
            obj.Update()
        })
    }
}

class TimeClass {
    constructor() {
        this.inittime = Date.now
    }
    DeltaTime() {
        return Date.now - this.inittime
    }
    Sleep(time) {
        setTimeout(() => {}, time)
    }
}

class GameObject {
    constructor() {
        this.Position = (0,0)
        this.Rotation = 0
        this.Scale = (0,0)
        this.Components = []
    }
    Start() {

    }
    Update() {

    } 
    GetComponent(componentname) {
        // Iterate through the component list to get the component by name
        for(x in this.Components) {
            if(this.Components[x].Name == componentname) {
                return this.Components[x]
            }
        }
        return null
    }
    AppendComponent(component) {
        this.Components.push(component)
    }
}

class RendererClass {
    constructor() {
        this.Game = null
        this.Workers = []
    }
    SliceWork() {
        let Diter = 0
        let Result = []
        for(worker in this.Workers) {
            Result.push([])
        }
        for(obj in this.Game.gameobjects) {
            if(Diter == this.Workers.length) { Diter = 0 }

            let gameobj = this.Game.gameobjects[obj]
            if(gameobj != null) {
                Result[0].push(gameobj)
            }

            Diter+=1
        }
        return Result
    }

    PopulateWorkers() {
        for(let x=0;x<=RENDERTHREADS;x++) {
            this.Workers.push(new Worker('renderworker.js'))
        }
    }

    Start() {
        this.PopulateWorkers()
    }

    Update() {
        this.BroadcastRenderCalls()
    }

    BroadcastRenderCalls() {
        for(worker in this.Workers) {
            this.Workers[worker].postMessage({"action": "render", "data": this.SliceWork()})
        }
    }
}

class SquareRenderer {
    constructor() {
        this.Name = "Renderer"
        this.Color = "#000000"
        this.Type = "Square"
    }
    SetColor(color) {

    }
    GetColor() {

    }
}

let Game = new App()
Game.AppendRenderer(new RendererClass())

let Time = new TimeClass()