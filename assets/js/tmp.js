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


//Mockup data
rooms = []
rooms.push(new Room("Bùi Anh Công","room1","","private","test3.jpg","Công : ủa alo"))
rooms.push(new Room("Trịnh Phương Thảo","room2","","private","test1.jpg","Bạn : cute z tr"))
rooms.push(new Room("Nguyễn Tuấn Anh","room3","","private","test7.jpg",""))
rooms.push(new Room("Hội ae cây chuối","room4","","group","test8.jpg",""))
rooms[1].setTheme("#e5155a")
thisRoom = Object.assign({},rooms[0])

users = []
users.push(new User("user01","admin","1","mail@mail.com","Nguyễn Ngọc Đan Trường","test1.jpg",rooms))
users.push(new User("user02","admin2","1","mail@mail.com","Bùi Anh Công","test3.jpg",rooms))
users.push(new User("user03","admin3","1","mail@mail.com","Trịnh Phương Thảo","test1.jpg",rooms))
users.push(new User("user04","admin4","1","mail@mail.com","Nguyễn Tuấn Anh","test7.jpg",rooms))
thisUser = Object.assign({},users[0])

listMsg = new MessagesList()
listMsg.push(new Message("Chào bạn","room1","1:13","user01"))
listMsg.push(new Message("Hi bạn","room1","1:14","user02"))
listMsg.push(new Message("Hi bạn","room1","1:15","user01"))
listMsg.push(new Message("@all Hi mng","room4","1:15","user01"))
listMsg.push(new Message("Hi","room4","1:15","user02"))
listMsg.push(new Message("Nhóm gì the?","room4","1:15","user03"))
listMsg.push(new Message("Hello","room4","1:15","user04"))

//Function load Messages
new Promise(res => {
  res()
}).then(()=>{
  rooms.forEach((room)=>{
    messagesList.innerHTML += `<div class="messages-item" data-uidroom="${room.roomID}">
    <div class="messages-item__avatar">
        <img src="./assets/img/${room.photoURL}" alt="">
    </div>
    <div class="messages-item__content">
        <p>${room.roomName}</p>
        <div>
            <span>${room.lastMessage} ·  23p</span>
        </div>
    </div>
  </div>`
  })
})
.then(()=>{
  //Add event when click message item
  $$('.messages-item').forEach(msg=>{
    msg.onclick = (e)=>{
      $('.selected').classList.remove('selected')
      const msg_item = e.target.closest('.messages-item')
      msg_item.classList.add('selected')
      loadMessagesHistory(msg_item.dataset.uidroom)
      thisRoom = Object.assign({},getRoomFromID(msg_item.dataset.uidroom))
  }
})
})
.then(()=>{
  $('.messages-item').classList.add('selected')
  loadMessagesHistory(rooms[0].roomID)
})
//Function get user from userID
getUserFromID = (userID) => users.find(m => m.uid == userID)
//Function get room from roomID
getRoomFromID = (roomID) => rooms.find(m => m.roomID == roomID)

//Function set info chat option
setChatOption = (roomOption)=>{
  const profile = `<div class="btn smooth">
  <div class="btn__icon">
      <i class="bi bi-person-circle"></i>
  </div>
  <span>Profile</span>
</div>`
  const isPrivate = roomOption.typeRoom != 'group'
  $('.chat-op .info').innerHTML = `<img src="./assets/img/${roomOption.photoURL}" alt="">
  <p>${roomOption.displayName}</p>
  <span>Active 13m ago</span>`
  if(isPrivate){
    $('.chat-op .function').style.justifyContent = 'center'
  }
  $('.chat-op .function').innerHTML = `
  ${
    isPrivate ? profile : ''
  }
  <div class="btn smooth">
      <div class="btn__icon">
          <i class="bi bi-bell-fill"></i>
      </div>
      <span>Mute</span>
  </div>
  <div class="btn smooth">
      <div class="btn__icon">
          <i class="bi bi-search"></i>
      </div>
      <span>Search</span>
  </div>`
}

//Function load messages history
loadMessagesHistory = (roomID)=>{
    const chatHistory = listMsg.getMessagesRoom(roomID)
    const thisRoom = getRoomFromID(roomID)
    setChatOption({
      photoURL : thisRoom.photoURL,
      displayName : thisRoom.roomName,
      typeRoom : thisRoom.type
    })
    document.documentElement.style.setProperty('--primary-chat--color', thisRoom.theme);
    $('.chatheader-title').innerHTML = `<div class="chatheader-avt">
          <img src="./assets/img/${thisRoom.photoURL}" alt="">
      </div>
      <div class="chatheader-name">
          <span>${thisRoom.roomName}</span><br>
          <span>Active now</span>
      </div>`
    chatBox.innerHTML = ""
    chatHistory.forEach((msg)=>{
      if(msg.senderID != thisUser.uid){
        chatBox.innerHTML += ` <div class="receive">
        <img src="./assets/img/${getUserFromID(msg.senderID).photoURL}" alt="">
        <p>${msg.chatContent}</p>
    </div>`
      }
      else{
        chatBox.innerHTML += `<div class="send">
        <p>${msg.chatContent}</p>
        <div class="blank"></div>
    </div>`
      }
    })
    let lastMsg = chatBox.lastElementChild
    if(lastMsg?.classList.contains('send')){
      let status = lastMsg.querySelector('.blank')
      status.outerHTML = `<i class="bi bi-check-circle-fill"></i>`
    }
    scrollEndChat()
}

//Function change last message in room
changeLastMessage = (roomID,msg) =>{
    rooms.forEach(room=>{
      if(room.roomID == roomID){
        room.lastMessage = msg
      }
    })
    $$('.messages-item').forEach((msg_item)=>{
      if(msg_item.dataset.uidroom == roomID)
        msg_item.querySelector('.messages-item__content span').innerText = msg
    })
}


chatOp.style.display = 'none'

chatOpBtn.addEventListener('click', function() {
  if(screen.availWidth <= 1140){
      return
  }
  if (chatOp.style.display === 'none' && screen.availWidth > 1140) {
    chatOp.style.display = 'block'; 
    content.style.gridTemplateColumns = '50px 400px auto 300px';
  } else {
    chatOp.style.display = 'none';
    content.style.gridTemplateColumns = '50px 400px auto';
  }
});

sendMessage = function(msg){
  if(inputUser.value === ""){
    return
  }
  let message = new Message(inputUser.value,thisRoom.roomID,"9:18",thisUser.uid)
  listMsg.push(message)
  changeLastMessage(thisRoom.roomID,"Bạn : "+message.chatContent + " ·  now")
  bodyChat.innerHTML += `<div class="send">
  <p>${msg}</p>
  <i class="bi bi-check-circle-fill"></i>
</div>`
  $(".text-user").value = ""
  scrollEndChat()
}

scrollEndChat = function(){
  var objDiv = $('.wrapcontent');
  objDiv.scrollTop = objDiv.scrollHeight;
}

//Send messages when click btn Send
btnSend.onclick = ()=>{
  sendMessage($(".text-user").value);
}

// Input text to text box
inputUser.oninput = ()=>{
  $('.chatcontent').scrollDown = $('.chatcontent').scrollHeight
  $('.sendBTN').innerHTML = `<i class="bi bi-emoji-smile-fill smooth"></i>`
  if(inputUser.value == ""){
      $('.sendBTN').innerHTML += `<i class="bi bi-send-fill smooth" style="display : none"></i>`
      $('.sendBTN').innerHTML += `<i class="bi user-icon bi-hand-thumbs-up-fill"></i>`
  }
  else{
      $('.sendBTN').innerHTML += `<i class="bi user-icon bi-hand-thumbs-up-fill" style="display : none"></i>`
      $('.sendBTN').innerHTML += `<i class="bi bi-send-fill smooth"></i>`
  }

}

// Press Enter when focus input text
$(".text-user").addEventListener("keypress", function(event) {
  if (event.keyCode == 13){
    event.preventDefault();
    sendMessage($(".text-user").value);
    $('.sendBTN').innerHTML = `<i class="bi bi-emoji-smile-fill smooth"></i>`
    $('.sendBTN').innerHTML += `<i class="bi user-icon bi-hand-thumbs-up-fill"></i>`
  }
});

//Function when click chat option
funcs = ["customize-chat","medias","privacy"]
funcs.forEach((item)=>{
  $("."+item).onclick = ()=>{
    let text = $("." + item).innerText
    $("."+item).style.userSelect = 'none'
    if($("."+item+"__menu").style.display === 'none'){
      $("."+item+"__menu").style.display = 'block'
      $(`.${item}`).innerHTML = text + ' <i class="bi bi-arrow-down"></i>'
    }
    else{
      $("."+item+"__menu").style.display = 'none'
      $(`.${item}`).innerHTML = text+ ' <i class="bi bi-arrow-right"></i>'
    }
  }
  $("."+item+"__menu").style.display = 'none'
})



//Change when click to other message item
$$('.messages-item').forEach((item)=>{
  item.onclick = ()=>{
    if(!item.classList.contains('selected')){
      $('.messages-item.selected').classList.remove('selected')
      item.classList.add('selected')
    }
  }
})