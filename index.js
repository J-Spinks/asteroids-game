const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.fillStyle = 'black'
context.fillRect(0, 0, canvas.width, canvas.height)


class Player {
  constructor({position, velocity}) {
    this.position = position // i.e. {x, y}
    this.velocity = velocity
    this.rotation = 0
  }

  drawPlayer() {
    // check player model is centered:
    context.save()
    context.translate(this.position.x, this.position.y)
    context.rotate(this.rotation)
    context.translate(-this.position.x, -this.position.y)
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
    context.fillStyle = "orange"
    context.fill()
    context.beginPath()
    context.moveTo(this.position.x + 30, this.position.y)
    context.lineTo(this.position.x - 10, this.position.y - 10)
    context.lineTo(this.position.x - 10, this.position.y + 10)
    context.closePath()

    context.strokeStyle = "springgreen"
    context.stroke()
    context.restore()
  }

  update() {
    this.drawPlayer()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

  }
}

const player = new Player({
  position: {x: canvas.width / 2, y: canvas.height / 2},
  velocity: {x: 0, y: 0},
})

player.drawPlayer()
// console.log(player)

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const SPEED = 3
const DECELERATION = 0.93

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
  // console.log(animate)
  player.update()


  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED
    player.velocity.y = Math.sin(player.rotation) * SPEED
  } else if (!keys.w.pressed) {
    player.velocity.x *= DECELERATION
    player.velocity.y *= DECELERATION
  }

  if (keys.d.pressed) player.rotation += 0.04
    else if (keys.a.pressed) player.rotation -= 0.04

}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      keys.w.pressed = true
      break;
    case 'KeyA':
      keys.a.pressed = true
      break;
    case 'KeyD':
      keys.d.pressed = true
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      console.log("w was pressed")
      keys.w.pressed = false
      break;
    case 'KeyA':
      keys.a.pressed = false
      break;
    case 'KeyD':
      keys.d.pressed = false
      break;
  }
})
