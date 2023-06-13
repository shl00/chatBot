import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');


let pCount = 0;
let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (
    `
      <div class ="wrapper ${isAi && 'ai'}">
        <div class = "chat">
          <div class = "profile">
            <img 
              src ="${isAi ? bot : user}"
              alt="${isAi ? 'bot' : 'user'}"
            />
          </div>
          <div class = "message" id = ${uniqueId}>${value}</div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async(e) =>{
  e.preventDefault();

  const data = new FormData(form);

  chatContainer.innerHTML += chatStripe(false,data.get('promt'));
  pCount++;
  form.reset();

  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true," ",uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  const response = await fetch('https://chatbot-pbxf.onrender.com/',{
    method: 'POST',
    headers :{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('promt')
    })
  })
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';
  if(response.ok){
    const data = await response.json();
    const parsedData = data.bot.trim();
    dcount.innerHTML = " " + ++dcount;
    typeText(messageDiv,parsedData);
  }else{
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";

    alert(err);
  }
}
function abcdjb(){
  const date = new Date();
  return  " " + date.getHours() + date.getFullYear() + date.getMonth() + date.getDay();

}
form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    handleSubmit(e);
  }
});
const click = function(){
  if(pCount>= 6){
    alert(abcdjb());
  }
  else{
    alert("Mindestens 6 prompts!");
  }
}
document.getElementById("code").addEventListener('click',click);