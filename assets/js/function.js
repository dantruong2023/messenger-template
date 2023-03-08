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
      $('.chat-members.smooth').style.display = 'none'
    }
    if(!isPrivate){
      $('.chat-members.smooth').style.display = 'flex'
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
  
scrollEndChat = function(){
    var objDiv = $('.wrapcontent');
    objDiv.scrollTop = objDiv.scrollHeight;
    }  