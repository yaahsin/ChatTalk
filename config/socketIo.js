module.exports = io => {
  const formatMessage = require('../utils/messages')
  const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('../utils/users')
  const botName = 'chatBot'

  // run when client connects
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room)

      socket.join(user.room)

      // welcome current user
      socket.emit('message', formatMessage(botName, 'welcome to chatBot'))

      // broadcast when a user connects
      socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))

      // send user and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    })

    // listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id)

      io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    // runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id)

      if (user) {
        io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left chat`))

        // send user and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        })
      }
    })

  })
}