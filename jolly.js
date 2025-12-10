/*
  Fixed version:
  - Use arrays of acceptable answers for each question
  - Normalize input (lowercase, remove punctuation, trim, remove leading articles)
  - Enter key support, better scrolling
*/

const quiz = [
  { question: "What has a face and two hands but no arms or legs?", answer: ["clock", "a clock"] },
  { question: "What has to be broken before you can use it?", answer: ["egg", "an egg", "anegg"] },
  { question: "What moves around the world but stays in the same corner?", answer: ["stamp", "a stamp"] },
  { question: "What room has no doors and no windows?", answer: ["mushroom", "a mushroom"] },
  { question: "What has a head and a tail but no body?", answer: ["coin", "a coin"] }
];

let index = 0;
const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');

function botMessage(msg){
  const d = document.createElement('div');
  d.className = 'bot';
  d.textContent = '🤖 ' + msg;
  messagesEl.appendChild(d);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function userMessage(msg){
  const d = document.createElement('div');
  d.className = 'user';
  d.textContent = '🟢 ' + msg;
  messagesEl.appendChild(d);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Normalize: lowercase, remove punctuation, remove common articles (a, an, the), collapse spaces
function normalizeText(s){
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')         // remove punctuation
    .replace(/\b(a|an|the)\b/g, '')      // remove articles
    .replace(/\s+/g, ' ')                // collapse spaces
    .trim();
}

function isCorrect(input, acceptableArray){
  const n = normalizeText(input);
  return acceptableArray.some(ans => normalizeText(ans) === n);
}

function sendMessage(){
  const raw = inputEl.value.trim();
  if(!raw) return;
  userMessage(raw);

  const correctAnswers = quiz[index].answer;
  if(isCorrect(raw, correctAnswers)){
    index++;
    if(index < quiz.length){
      botMessage('✅ Correct! Next question:');
      setTimeout(() => botMessage(quiz[index].question), 250);
    } else {
      botMessage('🎉 You completed the Treasure Hunt! Excellent work.');
    }
  } else {
    botMessage('❌ Incorrect. Try again.');
  }

  inputEl.value = '';
  inputEl.focus();
}

// handle Enter key
inputEl.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});
sendBtn.addEventListener('click', sendMessage);

window.addEventListener('load', () => {
  botMessage('Welcome to the Treasure Hunt! Answer riddles to move forward.');
  botMessage(quiz[index].question);
  inputEl.focus();
});