const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const content = $('#content');
const chatOp = $('.chat-op');
const chat = $('.chat');
const chatOpBtn = $('#chat-op-btn');
const bodyChat = $('.chatcontent')
const btnSend = $('.bi.bi-send-fill')
const inputUser = $('.text-user')
const messagesList = $('.messages-list')
const chatBox = $('.chatcontent')

class User{
    constructor(uid,usr,pwd,email,displayName,photoURL,rooms){
      this.uid = uid
      this.usr = usr
      this.pwd = pwd
      this.email = email
      this.displayName = displayName
      this.photoURL = photoURL
      this.rooms = Object.assign([],rooms)
    }
  }
  
  class Room{
    constructor(roomName, roomID,members, type,photoURL,lastMessage){
      this.roomName = roomName
      this.roomID = roomID
      this.members = members
      this.type = type
      this.photoURL = photoURL
      this.lastMessage = lastMessage
      this.theme = '#0084ff'
    }
    setTheme(theme){
      this.theme = theme
    }
    setLastOnline(time){
  
    }
  }
  
  class Message{
    constructor(chatContent,roomID,timeSend,senderID){
      this.chatContent = chatContent
      this.roomID = roomID
      this.timeSend = timeSend
      this.senderID = senderID
      this.seen = false
    }
  }
  
  class MessagesList{
    constructor(){
      this.listMsg = []
    }
    push(msg){
      this.listMsg.push(msg)
    }
    getMessagesRoom(roomID){
      let res = this.listMsg.filter((message)=>{
          return message.roomID == roomID
      })
      return res
    }
  }