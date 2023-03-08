

const app = {
  //Handler event
  handlerEvent : function(){
    let self = this
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

    //Scroll to end chat
    scrollEndChat = function(){
        var objDiv = $('.wrapcontent');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    //Update status of btnSend
    updateStatusBtnSend = ()=>{
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

    //Send messages when click btn Send
    btnSend.onclick = (e)=>{
        if(e.target.closest('.bi.bi-send-fill')){
          self.sendMessage($(".text-user").value);
        }
        updateStatusBtnSend()
    }

    // Input text to text box
    inputUser.oninput = ()=>{
        updateStatusBtnSend()
    }

    // Press Enter when focus input text
    $(".text-user").addEventListener("keypress", function(event) {
        if (event.keyCode == 13){
          event.preventDefault();
          self.sendMessage($(".text-user").value);
          updateStatusBtnSend()
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
  },
  //Function get user from userID
  getUserFromID : function(userID)  { 
    return users.find(m => m.uid == userID)
  },
  
  //Function get room from roomID
  getRoomFromID : function(roomID)  {
    return rooms.find(m => m.roomID == roomID)
  },

  //Function set info chat option
  setChatOption : function(roomOption){
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
  },
  //Function load messages history
  loadMessagesHistory : function(roomID){
    const chatHistory = listMsg.getMessagesRoom(roomID)
    const thisRoom = this.getRoomFromID(roomID)
    this.setChatOption({
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
              <img src="./assets/img/${this.getUserFromID(msg.senderID).photoURL}" alt="">
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
  },
  //Function change last message in room
  changeLastMessage : function(roomID,msg){
    rooms.forEach(room=>{
      if(room.roomID == roomID){
        room.lastMessage = msg
      }
    })
    $$('.messages-item').forEach((msg_item)=>{
      if(msg_item.dataset.uidroom == roomID)
      msg_item.querySelector('.messages-item__content span').innerText = msg
    })
  },
  //Function send message
  sendMessage : function(msg){
    if(inputUser.value === ""){
      return
    }
    let message = new Message(inputUser.value,thisRoom.roomID,"9:18",thisUser.uid)
    listMsg.push(message)
    this.changeLastMessage(thisRoom.roomID,"Bạn : "+message.chatContent + " ·  now")
    bodyChat.innerHTML += `<div class="send">
    <p>${msg}</p>
    <i class="bi bi-check-circle-fill"></i>
    </div>`
    $(".text-user").value = ""
    scrollEndChat()
  },
  //Function load Message List
  loadMessageList : function(){
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
          this.loadMessagesHistory(msg_item.dataset.uidroom)
          thisRoom = Object.assign({},this.getRoomFromID(msg_item.dataset.uidroom))
      }
    })
    })
    .then(()=>{
      $('.messages-item').classList.add('selected')
      this.loadMessagesHistory(rooms[0].roomID)
    })
  },
  //Main
  run : function(){
    this.handlerEvent()
    this.loadMessageList()
  }
}

app.run()