const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 900
canvas.height = 500

let nodes = []
let wires = []
let startNode = null

const voltage = 12
let current = 0

class Node{

constructor(x,y,type){

this.x=x
this.y=y
this.type=type
this.radius=10

}

draw(){

ctx.beginPath()

if(this.type=="battery")
ctx.fillStyle="#ff5555"

else if(this.type=="bulb")
ctx.fillStyle="#ffff55"

else
ctx.fillStyle="#00ffcc"

ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
ctx.fill()

}

}

function createLevel(){

nodes=[]

nodes.push(new Node(100,250,"battery"))

nodes.push(new Node(400,150,"junction"))
nodes.push(new Node(400,350,"junction"))

nodes.push(new Node(700,250,"bulb"))

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

nodes.forEach(n=>n.draw())

ctx.strokeStyle="#00ffcc"

wires.forEach(w=>{
ctx.beginPath()
ctx.moveTo(w.x1,w.y1)
ctx.lineTo(w.x2,w.y2)
ctx.stroke()
})

}

canvas.addEventListener("mousedown",e=>{

const rect = canvas.getBoundingClientRect()

const mx = e.clientX-rect.left
const my = e.clientY-rect.top

nodes.forEach(n=>{

const dist = Math.hypot(mx-n.x,my-n.y)

if(dist<15){

startNode=n

}

})

})

canvas.addEventListener("mouseup",e=>{

if(!startNode) return

const rect = canvas.getBoundingClientRect()

const mx = e.clientX-rect.left
const my = e.clientY-rect.top

nodes.forEach(n=>{

const dist = Math.hypot(mx-n.x,my-n.y)

if(dist<15 && n!==startNode){

wires.push({
x1:startNode.x,
y1:startNode.y,
x2:n.x,
y2:n.y
})

checkCircuit()

}

})

startNode=null

})

function checkCircuit(){

let battery=false
let bulb=false

wires.forEach(w=>{

nodes.forEach(n=>{

if(n.type=="battery") battery=true
if(n.type=="bulb") bulb=true

})

})

if(battery && bulb){

current = voltage / 10

document.getElementById("current").innerText=current

alert("⚡ วงจรสมบูรณ์ หลอดไฟติด!")

}

}

function resetGame(){

wires=[]
current=0

document.getElementById("current").innerText=0

}

function gameLoop(){

draw()
requestAnimationFrame(gameLoop)

}

createLevel()

gameLoop()
