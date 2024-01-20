const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.fillStyle = 'black'
context.fillRect(0, 0, canvas.width, canvas.height)
// console.log(context)

class Player {
  constructor({position, velocity}) {
    this.position = position // i.e. {x, y}
    this.velocity = velocity
  }

  drawPlayer() {
    // check player model is centered:
    // context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
    // context.fillStyle = "orange"
    // context.fill()

    context.moveTo(this.position.x + 30, this.position.y)
    context.lineTo(this.position.x - 10, this.position.y - 10)
    context.lineTo(this.position.x - 10, this.position.y + 10)
    context.closePath()

    context.strokeStyle = "springgreen"
    context.stroke()
  }
}

const player = new Player({
  position: {x: canvas.width / 2, y: canvas.height / 2},
  velocity: {x: 0, y: 0},
})

player.drawPlayer()
console.log(player)
