const torcidaMessages = document.getElementById("torcida-messages");

function simularTorcida() {
  const mensagens = [
    "💥 VAMOS FURIAAAA!!!",
    "🔥 EU ACREDITO!",
    "💪 É HOJE!",
    "🐾 RUMO AO TOPO!",
    "🎉 É ISSO AÍ! #DaleFURIA",
    "🎯 O BRASIL TÁ COM VOCÊS!",
    "🚀 PRA CIMA DELES!",
    "🧨 NINGUÉM SEGURA A FURIA!",
    "👊 AQUI É RAÇA!",
    "🥁 TAMO JUNTO NO BATIDÃO!",
    "📣 VAI PRA CIMA, PANTERA!",
    "🏆 HOJE É DIA DE VITÓRIA!",
    "💜 TORCENDO ATÉ O FIM!",
    "🔥 FURIA É TRADIÇÃO!",
    "🌪️ O RIVAL VAI SENTIR A PRESSÃO!",
  ];

  let i = 0;
  const intervalo = setInterval(() => {
    if (i >= mensagens.length) {
      clearInterval(intervalo);
      return;
    }

    const msgDiv = document.createElement("div");
    msgDiv.className = "torcida-message";
    msgDiv.innerText = mensagens[i];
    torcidaMessages.appendChild(msgDiv);
    torcidaMessages.scrollTop = torcidaMessages.scrollHeight;

    i++;
  }, 2000); // 2 segundos entre mensagens
}

window.addEventListener("DOMContentLoaded", () => {
  simularTorcida();
});
