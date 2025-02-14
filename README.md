# FISH ENGINE
#### Created by: Philip Korotkiy
Welcome to fishengine! A simple yet fast game engine entirely written on javascript!
I created this for my ***goofy freinds***- but use it as you wish 😄

## Configuring the engine
- **RENDERTHREADS** This tells the program how many async processes to open for rendering.

### How to modify scripts
For example, you want the gameobject to say "Hello" at start.
You begin by modifing the start function, and then saying something into console.\
`Gameobject.Start = function () => {
console.log("Hello")
}`\
**You can also have things update every frame:**\
`Gameobject.Update = function () => {
console.log("Frames")
}`\
> [!TIP]
> Sometimes you need consistent movement, like players.
> Use `Time.DeltaTime()` because movement would matter frame-by-frame, you want movement to be consistent for every framerate.


// Gameobjects


// User Input
This is how to get Click events.
Game.Onclick = function (canvascoordinates) => {

}
The click event sends canvascoordinates, But you can also use a clickcollider on an object.

What is you want keyboard input??
Game.OnKeyDown = function () => {
    
}
