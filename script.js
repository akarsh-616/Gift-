const pages = [
  {
    emoji: "🧸💗",
    script: "Hey you...",
    title: "I have a few things to ask my favourite bestie.",
    message: "Be honest, okay? No escaping halfway. 👀",
    buttons: [
      ["Haan, poochho 💗", "next"],
      ["I'm ready 😌", "next"]
    ]
  },
  {
    emoji: "🤝✨",
    script: "Pehla sawaal...",
    title: "Best friends ke saath ek problem hoti hai...",
    message: "Har chhoti-badi baat automatically share karne ka mann karta hai. Tumhare saath bhi aisa hai?",
    buttons: [
      ["Obviously 😂", "next"],
      ["Maybe... 👀", "next"]
    ]
  },
  {
    emoji: "💬🫶",
    script: "Sach-sach...",
    title: "Kabhi mera message dekh ke bina reason ke smile aayi hai?",
    message: "No pressure. Main bas research kar raha hoon. 😌",
    buttons: [
      ["Haan... thodi si 🙈", "next"],
      ["Bilkul nahi 😇", "next"]
    ]
  },
  {
    emoji: "👀💗",
    script: "Interesting...",
    title: "Agar hum poora din saath ho, toh sabse pehle kya karogi?",
    message: "Bestie plans only... unless the universe has other plans. 👀",
    buttons: [
      ["Bas tumhare saath rehna 🫶", "next"],
      ["Kuch special plan hai 😏", "next"]
    ]
  },
  {
    emoji: "😂❤️",
    script: "Important question...",
    title: "Best friend ka matlab sirf best friend hota hai?",
    message: "Ya kabhi-kabhi koi insaan thoda zyada special bhi ho sakta hai?",
    buttons: [
      ["Bestie is bestie 💗", "next"],
      ["Depends... 👀", "next"]
    ]
  },
  {
    emoji: "🌙💭",
    script: "Ek aur...",
    title: "Agar koi tumhari silly baatein sunta rahe, support kare, aur tumhari smile ko favourite bana le...",
    message: "Toh usse kya kehna chahiye?",
    buttons: [
      ["Good best friend 🥹", "next"],
      ["Favourite person? ❤️", "next"]
    ]
  },
  {
    emoji: "🫣💞",
    script: "No pressure...",
    title: "Kabhi laga ki humari friendship mein kuch alag sa hai?",
    message: "Woh comfortable bhi hai, cute bhi... aur thoda sa confusing bhi. 😂",
    buttons: [
      ["Maybe... ❤️", "next"],
      ["Tum overthink karte ho 😭", "next"]
    ]
  },
  {
    emoji: "🧡🧸",
    script: "Honestly...",
    title: "Perfect hone se zyada genuine efforts matter karte hain, right?",
    message: "Because best friendships are built on the little things.",
    buttons: [
      ["Always ❤️", "next"],
      ["Depends... 👀", "next"]
    ]
  },
  {
    emoji: "💌✨",
    script: "Last question...",
    title: "Agar tumhe choose karna ho...",
    message: "Ek aisa person jo tumhara best friend bhi ho, tumhari safe place bhi... aur shayad thoda sa more-than-bestie bhi. What would you call them?",
    buttons: [
      ["My favourite person ❤️", "next"],
      ["My best friend 🧸", "next"]
    ]
  }
];

let current = 0;

const pageEl = document.getElementById("page");
const progressEl = document.getElementById("progress");
const heartsEl = document.getElementById("ambientHearts");

function renderProgress(){
  progressEl.innerHTML = "";
  pages.forEach((_, i) => {
    const dot = document.createElement("span");
    if(i === current) dot.classList.add("active");
    progressEl.appendChild(dot);
  });
}

function renderPage(){
  renderProgress();

  const p = pages[current];
  pageEl.innerHTML = `
    <div>
      <div class="emoji">${p.emoji}</div>
      <div class="script">${p.script}</div>
      <h1>${p.title}</h1>
      <p class="message">${p.message}</p>

      <div class="buttons">
        ${p.buttons.map((b, i) =>
          `<button class="btn ${i ? "secondary" : ""}" onclick="handleChoice('${b[1]}', ${i})">${b[0]}</button>`
        ).join("")}
      </div>

      <div class="choice-result" id="choiceResult"></div>
    </div>
  `;

  pageEl.classList.remove("page");
  void pageEl.offsetWidth;
  pageEl.classList.add("page");
}

function handleChoice(action, index){
  const result = document.getElementById("choiceResult");

  const messages = [
    "Bas... isi answer ka wait tha. 🥹❤️",
    "Hmm... noted. Very interesting. 👀",
    "Accha? Challenge accepted. 😌",
    "Theek hai... main is answer ko yaad rakhunga. 🫶"
  ];

  result.textContent = messages[(current + index) % messages.length];

  setTimeout(() => {
    if(action === "next"){
      if(current < pages.length - 1){
        current++;
        renderPage();
      }else{
        showFinal();
      }
    }
  }, 650);
}

function showFinal(){
  current = pages.length;
  progressEl.innerHTML = "";
  for(let i=0;i<pages.length;i++){
    const dot = document.createElement("span");
    if(i === pages.length - 1) dot.classList.add("active");
    progressEl.appendChild(dot);
  }

  pageEl.innerHTML = `
    <div>
      <div class="emoji">🌷❤️</div>
      <div class="script">For you</div>
      <h2>Thank you for being my bestie.</h2>

      <p class="message">
        No matter what the story is called,
        I hope we keep choosing each other —
        as best friends, favourite people,
        and maybe... whatever this little thing is. 👀💗
      </p>

      <div class="final-image-wrap">
        <img src="assets/last-image.jpg" alt="A special memory">
      </div>

      <p class="subtle">
        Now go smile... I know you are. 😌💗
      </p>

      <div class="final-actions">
        <button class="btn small" onclick="restart()">Start again 🔄</button>
      </div>
    </div>
  `;

  pageEl.classList.remove("page");
  void pageEl.offsetWidth;
  pageEl.classList.add("page");
  burstHearts();
}

function restart(){
  current = 0;
  renderPage();
  burstHearts();
}

function burstHearts(){
  const symbols = ["❤️","💗","💕","🫶","✨","🌸"];
  for(let i=0;i<12;i++){
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      heart.style.left = Math.random()*100 + "vw";
      heart.style.fontSize = (16 + Math.random()*22) + "px";
      heart.style.animationDuration = (4 + Math.random()*4) + "s";
      heartsEl.appendChild(heart);
      setTimeout(() => heart.remove(), 8500);
    }, i*90);
  }
}

setInterval(() => {
  const symbols = ["💗","💕","🌸","❤️"];
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = symbols[Math.floor(Math.random()*symbols.length)];
  heart.style.left = Math.random()*100 + "vw";
  heart.style.fontSize = (14 + Math.random()*14) + "px";
  heart.style.animationDuration = (7 + Math.random()*4) + "s";
  heartsEl.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}, 1200);

renderPage();
