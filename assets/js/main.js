const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const content = $('#content');
const chatOp = $('.chat-op');
const chat = $('.chat');
const chatOpBtn = $('#chat-op-btn');
const bodyChat = $('.chatcontent')

chatOpBtn.addEventListener('click', function() {
  if (chatOp.style.display === 'none' && screen.availWidth > 1140) {
    chatOp.style.display = 'block'; 
    content.style.gridTemplateColumns = '50px 400px auto 300px';
  } else {
    chatOp.style.display = 'none';
    content.style.gridTemplateColumns = '50px 400px auto';
  }
});

sendMessage = function(msg){
  if($(".text-user").value === ""){
    return
  }
  bodyChat.innerHTML += `<div class="send">
  <p>${msg}</p>
  <i class="bi bi-check-circle-fill"></i>
</div>`
  $(".text-user").value = ""
}

//Send messages when click btn Send
$(".bi.bi-send-fill").onclick = ()=>{
  sendMessage($(".text-user").value);
}

// Press Enter when focus input text
$(".text-user").addEventListener("keypress", function(event) {
  if (event.keyCode == 13){
    event.preventDefault();
    sendMessage($(".text-user").value);
  }
});