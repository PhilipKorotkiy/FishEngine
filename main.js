
// Prestart
Game.SetTitle("Test")
Game.SetCanvasDimensions((512,256))
let green = new GameObject()
green.AppendComponent(new SquareRenderer())
// Begin the gameloop
Game.Start()