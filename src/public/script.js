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
  // console.log(messages);
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
socket.on("productDelayedInCart", (data) => {
  const notDiv = document.createElement("div");
  notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
  document.getElementById("notifications-container").append(notDiv);
});
socket.on("orders", (dataT) => {
  dataT.forEach( (data) =>{
  const ordTr = document.createElement("tr");
  ordTr.innerHTML = `
  <td class='b${data.id}'>${data.id}</td>

  <td class='d${data.id}'>${data.status}</td>
  <td class='c${data.id}'>${data.deliveredDate}</td>
  `
  document.getElementById("tableBody").append(ordTr)});
});
socket.on("orderstatus", (dataT) => {
  
  const v =document.querySelector(`.d${dataT.id}`);
  const t = document.querySelector(`.c${dataT.id}`)
  const b = document.createElement('td')
  const y = document.createElement('td')
  b.innerHTML = dataT.status
  y.innerHTML = dataT.deliveredDate
  v.parentNode[0].replaceChild(b,v);
  v.parentNode[1].replaceChild(t,y);
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

socket.on("notifications", (data) => {
  data.forEach(notification => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${notification.type}</h4><span >${notification.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
  })
});

socket.on("productMadeAvailable", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("productMadeUnAvailable", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("productExpired", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("productAdded", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("productRemoved", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("addedToWishList", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("removedFromWishList", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("productBought", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

socket.on("orderStatusNotif", (data) => {
    const notDiv = document.createElement("div");
    notDiv.innerHTML = `<h4>${data.type}</h4><span >${data.message}</span>`
    document.getElementById("notifications-container").append(notDiv);
});

