const primaryColor = '--primary-chat--color'

const app = {
  currentRoom : null,
  currentIcon : 'bi-hand-thumbs-up-fill',
  //Map event when click button function
  mapEvent : function(selector,callback){
      $(selector).onclick = callback
  },

  //Set :root DOM attribute
  setRootAttribute : function(attr, value){
    document.documentElement.style.setProperty(attr, value);
  },
  loadThemes : function(){
    $('.contentForm__content').innerHTML = ''
    themes.forEach((theme)=>{
      $('.contentForm__content').innerHTML += `
        <div class="item theme" data-color="${theme}" style="--color : ${theme}"></div>`
    })
  },

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
      $('.sendBTN').innerHTML = 
      `<i class="bi bi-emoji-smile-fill smooth"></i>
      <i class="bi bi-send-fill smooth"></i>
      <i class="bi user-icon ${self.currentIcon}"></i>`
      
      if(inputUser.value == ""){
        $('.sendBTN > .bi-send-fill').style.display = 'none'
        $('.sendBTN > .user-icon').style.display = 'inline-block'
      }
      else{
        $('.sendBTN > .bi-send-fill').style.display = 'inline-block'
        $('.sendBTN > .user-icon').style.display = 'none'
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
    
    hideForm = ()=>{
        $('.save.smooth').disabled = true
        $('#modalForm').style.display = 'none'
        this.setRootAttribute(primaryColor,this.currentRoom.theme)
    }

    showForm = ()=>{
        $('.save.smooth').disabled = true
        $('#modalForm').style.display = 'flex'
    }

    //Hide modalForm
    $('#modalForm').onclick = ()=>{
      hideForm()
    }

    //Click on .contentForm
    $('.contentForm').onclick = (e)=>{
      e.stopPropagation();
    }
    $('.contentForm__footer .cancel').onclick = ()=>{
        hideForm()
    }
    $('.contentForm__header i.bi-x').onclick = hideForm

    //Click on item
    $$('.contentForm__content .item').forEach((item)=>{
      item.onclick = ()=>{
        if($('.item.active') != undefined){
          $('.item.active').classList.remove('active')
        }
        item.classList.add('active')
        this.setRootAttribute(primaryColor,item.dataset.color)
        $('button.save.smooth').disabled = false
      }
    })
    
    //Click customize theme
    $('.customize-chat.theme').onclick = ()=>{
      showForm()
      $('.save.smooth').outerHTML = '<button class="save smooth" disabled>Save</button>'
      $('.save.smooth').classList.add('theme')
      self.mapEvent('.save.smooth.theme',()=>{
        self.updateTheme($('.theme.active').dataset.color)
        hideForm()
      })
    }
  },
  //Function get user from userID
  getUserFromID : function(userID)  { 
    return users.find(m => m.uid == userID)
  },
  
  //Function get room from roomID
  getRoomFromID : function(roomID)  {
    return rooms.find(m => m.roomID == roomID)
  },

  //Update new theme to room
  updateTheme : function(theme){
    let room = this.getRoomFromID(this.currentRoom.roomID)
    room.setTheme(theme)
    this.currentRoom = Object.assign({},room)
  },

  //Function set info chat option
  setChatOption : function(roomOption){
    const profile = `<div class="btn smooth profile">
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
    this.currentRoom = Object.assign({},thisRoom)

    //Event send icon
    this.mapEvent('.bi.user-icon',()=>{
      console.log("send icon")
      this.sendMessage(`<i class="bi user-icon ${this.currentIcon}" style="font-size:36px;"></i>`,false)
    })

    //Set info chat option
    this.setChatOption({
      photoURL : thisRoom.photoURL,
      displayName : thisRoom.roomName,
      typeRoom : thisRoom.type
    })
    if(thisRoom.type != 'group'){
      this.mapEvent('.btn.smooth.profile',()=>{
        window.open(this.getUserFromID(thisRoom.members).linkProfile,'_blank')
      })
    }
    let lastSenderID = ''
    this.setRootAttribute(primaryColor,thisRoom.theme)
    $('.chatheader-title').innerHTML = `<div class="chatheader-avt">
          <img src="./assets/img/${thisRoom.photoURL}" alt="">
          </div>
          <div class="chatheader-name">
          <span>${thisRoom.roomName}</span><br>
          <span>Active now</span>
          </div>`
      chatBox.innerHTML = ""
      chatHistory.forEach((msg)=>{
        // Message from other user
        if(msg.senderID != thisUser.uid){
          chatBox.innerHTML += ` 
          ${thisRoom.type == 'group' && msg.senderID != lastSenderID ? '<div class="notify name"><span>'+this.getUserFromID(msg.senderID).displayName.split(" ")[this.getUserFromID(msg.senderID).displayName.split(" ").length - 1]+'</span></div>' : ''}
          <div class="receive">
            <img src="./assets/img/${this.getUserFromID(msg.senderID).photoURL}" alt="">
            <p>${msg.chatContent}</p>
          </div>`
        }
        else{
                // Message from this user
                chatBox.innerHTML += `<div class="send">
                <p>${msg.chatContent}</p>
          <div class="blank"></div>
          </div>`
        }
        lastSenderID = msg.senderID
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
  sendMessage : function(msg,notIcon = true){
    if(notIcon && inputUser.value === ""){
      return
    }
    let message = new Message(inputUser.value,thisRoom.roomID,"9:18",thisUser.uid)
    listMsg.push(message)
    this.changeLastMessage(thisRoom.roomID,"Bạn : "+message.chatContent + " ·  now")
    if(notIcon){
      bodyChat.innerHTML += `<div class="send">
        <p>${msg}</p>
        <i class="bi bi-check-circle-fill"></i>
        </div>`
      $(".text-user").value = ""
    }
    else{
      bodyChat.innerHTML += `<div class="send">
        ${msg}
        <i class="bi bi-check-circle-fill"></i>
        </div>`
    }
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
    this.loadThemes()
    this.handlerEvent()
    this.loadMessageList()
  }
}

app.run()