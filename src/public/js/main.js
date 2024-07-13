const socket = io();

let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "Identifiquese",
    input: "text",
    text: "Ingrese su nombre para identificarse",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit("message", {user: user, message: "Bienvenido"})
});

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
});

socket.on("messagesLogs", (data) => {
    let log = document.getElementById("messagesLogs");
    let mensajes = "";

    data.forEach(item => {
        mensajes = mensajes + `${item.user} dice: ${item.message} <br>`;
    });

    log.innerHTML = mensajes;
});