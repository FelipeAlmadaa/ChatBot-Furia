const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

let userName = "";
let waitingForConfirmation = false;

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

window.onload = () => {
  setTimeout(() => {
    if (!userName) {
      appendMessage("Pantera Bot 🐾", "🔥 Olá, fã da FURIA! Qual o seu nome?");
    } else {
      appendMessage("Pantera Bot 🐾", `🔥 Bem-vindo de volta, ${userName}!`);
      showMenu();
    }
  }, 500);
};

function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  appendMessage("Você", userMessage);
  chatInput.value = "";

  const typingMsg = document.createElement("div");
  typingMsg.id = "typing";
  typingMsg.innerHTML = `<em>Pantera Bot 🐾 está digitando...</em>`;
  chatMessages.appendChild(typingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    typingMsg.remove();
    respondBot(userMessage);
  }, 1000);
}

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "Você" ? "user-message" : "bot-message";
  msgDiv.innerText = message;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function respondBot(userMessage) {
  userMessage = userMessage.toLowerCase();
  let response = "";

  if (waitingForConfirmation) {
    handleNameConfirmation(userMessage);
    return;
  }

  if (!userName) {
    userName = userMessage;
    showConfirmationButtons();
    waitingForConfirmation = true;
    return;
  }

  if (
    userMessage === "1" ||
    userMessage.includes("jogo") ||
    userMessage.includes("próximo")
  ) {
    response =
      "🎮 Próximo jogo: FURIA vs NAVI — 28/04/2025 às 20h!\n📍 Local: Jeunesse Arena, Rio de Janeiro";
  } else if (
    userMessage === "2" ||
    userMessage.includes("rank") ||
    userMessage.includes("posição")
  ) {
    response =
      "🏆 FURIA está no Top 5 Mundial no ranking da HLTV!\n📈 Pontuação: 875 pontos\n#DaleFURIA";
  } else if (
    userMessage === "3" ||
    userMessage.includes("time") ||
    userMessage.includes("jogador")
  ) {
    response =
      "👥 Line-up atual da FURIA:\n\n• arT (IGL/AWPer)\n• KSCERATO (Entry Fragger)\n• yuurih (Lurker)\n• chelo (Support)\n• saffee (AWPer)\n\n💡 Curiosidade: arT é conhecido por seus pushes agressivos!";
  } else if (userMessage === "4" || userMessage.includes("quiz")) {
    response =
      "🎯 Quiz da FURIA:\n\nPergunta: Qual jogador da FURIA é conhecido como 'O Professor'?\n\nDigite sua resposta!";
    waitingForQuizAnswer = true;
  } else if (waitingForQuizAnswer) {
    if (userMessage.includes("fallen") || userMessage.includes("gabriel")) {
      response =
        "🎉 Parabéns! Você acertou! Fallen é conhecido como 'O Professor' por seu conhecimento tático!";
    } else {
      response =
        "😕 Que pena, você errou! O jogador correto é Fallen, conhecido como 'O Professor' por seu conhecimento tático do jogo.";
    }
    waitingForQuizAnswer = false;
  } else if (
    userMessage.includes("menu") ||
    userMessage.includes("opção") ||
    userMessage.includes("ajuda")
  ) {
    showMenu();
    return;
  } else {
    response = `🤔 Não entendi, ${userName}. Digite um número (1-4) ou use palavras-chave como "jogo", "ranking", "time" ou "quiz".\n\nOu digite "menu" para ver as opções novamente.`;
  }

  appendMessage("Pantera Bot 🐾", response);
}

function showMenu() {
  const menu = `📋 MENU PRINCIPAL - Escolha por número ou palavra-chave:

1️⃣ [1] Próximo jogo - Informações sobre o próximo jogo da FURIA
2️⃣ [2] Ranking - Posição da FURIA no cenário competitivo
3️⃣ [3] Time - Conheça os jogadores do time
4️⃣ [4] Quiz - Teste seu conhecimento sobre a FURIA

📌 Use "menu" para abrir o menu novamente
📌 Exemplos: Digite "2" ou "ranking" para saber nossa posição no cenário mundial`;

  appendMessage("Pantera Bot 🐾", menu);
}

function showConfirmationButtons() {
  const typingMsg = document.getElementById("typing");
  if (typingMsg) typingMsg.remove();

  const confirmationMessage = document.createElement("div");
  confirmationMessage.classList.add("bot-message");
  confirmationMessage.innerText = `Deseja ser chamado de ${userName}?`;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("flex", "space-x-4", "mt-4");

  const yesButton = document.createElement("button");
  yesButton.innerText = "✅ Sim";
  yesButton.classList.add(
    "bg-green-600",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-green-700"
  );
  yesButton.onclick = () => {
    appendMessage("Você", "Sim");
    respondBot("sim");
  };

  const noButton = document.createElement("button");
  noButton.innerText = "❌ Não";
  noButton.classList.add(
    "bg-red-600",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-red-700"
  );
  noButton.onclick = () => {
    appendMessage("Você", "Não");
    respondBot("não");
  };

  btnContainer.appendChild(yesButton);
  btnContainer.appendChild(noButton);

  chatMessages.appendChild(confirmationMessage);
  chatMessages.appendChild(btnContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleNameConfirmation(userMessage) {
  let response = "";

  if (userMessage === "sim" || userMessage === "s" || userMessage === "✅") {
    response = `🎉 Perfeito, ${userName}! Agora você pode acessar o menu principal.`;
    setTimeout(showMenu, 1000);
    waitingForConfirmation = false;
  } else if (
    userMessage === "não" ||
    userMessage === "nao" ||
    userMessage === "n" ||
    userMessage === "❌"
  ) {
    response = "Sem problemas! Por favor, digite seu nome novamente.";
    userName = "";
    waitingForConfirmation = false;
  } else {
    response = "Por favor, confirme com 'Sim' ou 'Não'.";
  }

  appendMessage("Pantera Bot 🐾", response);
}
