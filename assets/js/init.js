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

//Function load Messages list
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