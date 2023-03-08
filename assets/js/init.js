const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const content = $('#content');
const chatOp = $('.chat-op');
const chat = $('.chat');
const chatOpBtn = $('#chat-op-btn');
const bodyChat = $('.chatcontent')
const btnSend = $('.sendBTN')
const inputUser = $('.text-user')
const messagesList = $('.messages-list')
const chatBox = $('.chatcontent')

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


