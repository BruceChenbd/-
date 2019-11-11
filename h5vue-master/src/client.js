import io from 'socket.io-client'
const Chat = {
  msgObj = document.getElementsByClassName("body-wrapper")[0],
  username: null,
  socket: null,
  msgArr: [],
  // 让浏览器滚动条保持在最底部
  scrollToBottom: function () {
    window.scrollTo(0,900000)
  },
  logout: function () {
    this.socket.disconnect()
  },
  submit: function (obj) {
    this.socket.emit('sendMsg', obj)
  },
  message: function (username) {
    console.log('message')
    this.socket.on('to' + username, function (obj) {
      Chat.msgArr.push(obj)
      console.log('CHAT.msgArr', obj)
    })
  },
  init: function (username) {
    this.socket = io.connect('http://127.0.0.1:5200', {'force new connection' : true})
    this.socket.on('open', function() {
      console.log('已连接')
    })
    this.socket.emit('addUser', username)
  }
}
export default Chat
