const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io()

// message from server
socket.on('message', message => {
  outputMessage(message)

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight

})

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Get message text
  let msg = e.target.elements.msg.value

  msg = msg.trim()

  if (!msg) {
    return false
  }

  // Emit message to server
  socket.emit('chatMessage', msg)

  // Clear input
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// output message to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time} </span</p>
<p class="text">
  ${message.text}
</p>`
document.querySelector('.chat-messages').appendChild(div)
}
