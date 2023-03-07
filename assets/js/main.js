const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const content = $('#content');
const chatOp = $('.chat-op');
const chat = $('.chat');
const chatOpBtn = $('#chat-op-btn');
const bodyChat = $('.chatcontent')
const btnSend = $('.bi.bi-send-fill')
const inputUser = $('.text-user')

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
  bodyChat.innerHTML += `<div class="send">
  <p>${msg}</p>
  <i class="bi bi-check-circle-fill"></i>
</div>`
  $(".text-user").value = ""
}

//Send messages when click btn Send
btnSend.onclick = ()=>{
  sendMessage($(".text-user").value);
}

// Input text to text box
//<i class="bi bi-emoji-smile-fill smooth"></i>
//<i class="bi bi-send-fill smooth"></i>
//<i class="bi user-icon bi-hand-thumbs-up-fill"></i>
inputUser.oninput = ()=>{
  console.log("Change")
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

//Function when click 
funcs = ["customize-chat","medias","privacy"]
funcs.forEach((item)=>{
  $("."+item).onclick = ()=>{
    let text = $("." + item).innerText
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