// Terminal build-log typing animation for the hero signature element
const lines = [
  { text: "$ whoami", type: "prompt" },
  { text: "> Esakki Sathish — front-end web developer", type: "plain" },
  { text: "", type: "plain" },
  { text: "$ ls projects/", type: "prompt" },
  { text: "> video-editor-portfolio", type: "plain" },
  { text: "", type: "plain" },
  { text: "$ deploy video-editor-portfolio --prod", type: "prompt" },
  { text: "> Building site...", type: "plain" },
  { text: "> Optimizing assets...", type: "plain" },
  { text: "> Build succeeded ✓", type: "success" },
  { text: "> Open to freelance work", type: "success" }
];

const terminal = document.getElementById("terminalBody");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderStatic() {
  terminal.innerHTML = lines
    .map(l => `<div class="${l.type === "success" ? "line-success" : l.type === "prompt" ? "line-prompt" : ""}">${l.text}</div>`)
    .join("");
}

async function typeLines() {
  if (reduceMotion) {
    renderStatic();
    return;
  }

  for (const line of lines) {
    const div = document.createElement("div");
    if (line.type === "success") div.className = "line-success";
    if (line.type === "prompt") div.className = "line-prompt";
    terminal.appendChild(div);

    for (let i = 0; i < line.text.length; i++) {
      div.textContent += line.text[i];
      await sleep(line.type === "prompt" ? 35 : 18);
    }
    await sleep(150);
  }

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  terminal.appendChild(cursor);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

typeLines();
