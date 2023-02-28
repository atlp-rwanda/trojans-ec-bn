/* eslint-disable */
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
const token = prompt("Enter your Token");
let username;
const socket = io("http://localhost:3000", {
  extraHeaders: {
    token,
  },
});
socket.on("connect_error", (err) => {
  appendMessage(err, "");
  messageForm.style.display = "none";
});
socket.on("user-name", (name) => {
  username = name;
});
socket.emit("new-user", username);
socket.on("all-messages", (messages) => {
  console.log(messages);
  appendMessage("You joined", "");
  messages.forEach((message) => {
    const date = formatISODate(message.createdAt);
    appendMessage(`${message.name}: ${message.message}`, date);
  });
});
socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`, data.date);
});
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`, "");
});
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`, "");
});
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const date = formatISODate(new Date());
  appendMessage(`You: ${message}`, date);
  socket.emit("send-chat-message", { username, message, date });
  messageInput.value = "";
});
function appendMessage(message, date) {
  const messageElement = document.createElement("div");
  const dateElement = document.createElement("small");
  dateElement.className = "smallSpace";
  dateElement.innerText = date;
  messageElement.innerText = message;
  messageElement.append(dateElement);
  messageContainer.append(messageElement);
}
function formatISODate(isoDate) {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return date.toLocaleDateString(undefined, options);
}
