const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const msginp = document.getElementById('msgInp');
const msgcontainer = document.querySelector(".container");
var audio=new Audio('ring.wav');
// console.log("client");

const makebold = (text, message) => {
    const sp=document.createElement('span');
    // sp.classList.add('message');
    // sp.classList.add(gdposition);
    sp.classList.add('bol');
    var boldText = document.createElement("span");
    boldText.textContent = text;
    boldText.classList.add('bol');
  
    var container = document.createElement("div");
    container.appendChild(boldText);
    container.innerHTML += ": " + message;
  
    

  return container.innerHTML; // Return the inner HTML of the container
  };
  
  

const append=(a,message, position)=>{
    const messageElement=document.createElement('div');
    const sp=document.createElement('span');
    sp.innerText=a;
    // sp.classList.add('message');
    // sp.classList.add(gdposition);
    sp.classList.add('bol');
    
    
   
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    
    messageElement.appendChild(sp);
    messageElement.innerHTML+=message;
    msgcontainer.appendChild(messageElement);
    if(position=='left'){
        audio.play();
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=msginp.value;
    // const cont = makebold("You", message);
  
    append("You: " , message, 'right');
    socket.emit('send',message);
    msginp.value='';
})

const nam = prompt("Enter your name");
// console.log("client");
socket.emit('new-user-joined', nam);

socket.on('user-joined',n=>{
    append(n,` joined the chat`,'center')
})

socket.on('receive',data =>{
    append(`${data.name}: `,data.message,'left')
})
socket.on('left',data =>{
    append(data, " left the chat",'center')
})