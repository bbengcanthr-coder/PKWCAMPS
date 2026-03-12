const canvas = document.getElementById("board")
const ctx = canvas.getContext("2d")

let components = []
let wires = []

let selected = null

document.querySelectorAll(".component").forEach(comp => {

comp.addEventListener("dragstart", e=>{
e.dataTransfer.setData("type", comp.dataset.type)
})

})

canvas.addEventListener("dragover", e=>{
e.preventDefault()
})

canvas.addEventListener("drop", e=>{

const type = e.dataTransfer.getData("type")

const rect = canvas.getBoundingClientRect()

components.push({
type:type,
x:e.clientX-rect.left,
y:e.clientY-rect.top
})

draw()

})

canvas.addEventListener("click", e=>{

const rect = canvas.getBoundingClientRect()
const x = e.clientX - rect.left
const y = e.clientY - rect.top

let hit = components.find(c =>
Math.abs(c.x-x)<20 && Math.abs(c.y-y)<20)

if(hit){

if(selected==null){
selected=hit
}
else{

wires.push([selected,hit])
selected=null
checkCircuit()
}

}

draw()

})

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

components.forEach(c=>{

ctx.fillStyle="#00ffc3"
ctx.beginPath()
ctx.arc(c.x,c.y,15,0,Math.PI*2)
ctx.fill()

ctx.fillStyle="#000"
ctx.fillText(c.type,c.x-15,c.y+30)

})

ctx.strokeStyle="#00ffc3"
ctx.lineWidth=2

wires.forEach(w=>{

ctx.beginPath()
ctx.moveTo(w[0].x,w[0].y)
ctx.lineTo(w[1].x,w[1].y)
ctx.stroke()

})

}

function checkCircuit(){

let types = components.map(c=>c.type)

if(
types.includes("battery") &&
types.includes("switch") &&
types.includes("resistor") &&
types.includes("lamp") &&
wires.length>=3
){

document.getElementById("result").innerText="ไฟติดแล้ว ⚡💡"
document.getElementById("result").style.color="yellow"

}
else{

document.getElementById("result").innerText="วงจรยังไม่ถูกต้อง"
document.getElementById("result").style.color="red"

}

}
