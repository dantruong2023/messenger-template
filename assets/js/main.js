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