class User{
    constructor(uid,usr,pwd,email,displayName,photoURL,rooms){
      this.uid = uid
      this.usr = usr
      this.pwd = pwd
      this.email = email
      this.displayName = displayName
      this.photoURL = photoURL
      this.rooms = Object.assign([],rooms)
      this.linkProfile = "https://www.facebook.com/berlin.03"
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

  