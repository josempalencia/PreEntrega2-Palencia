const idButton = document.getElementById("identify");
const welcomeText = document.getElementById("welcome");

function usernamePrompt() {
    // pedimos al usuario su nombre
    let username = prompt("Ingrese su nombre");
    if (!username) return;
    // verificamos que es un nombre valido (eg. no tiene simbolos)
    for (const letter of username) {
        if (["@", "$", "!", "-"].includes(letter)) {
            alert("Nombre contiene simbolos invalidos. Ingrese otro por favor.");
            return;
        }
    }

    let email = prompt("Ingrese su correo");

    // escondemos el boton
    idButton.style = "display: none;";
    // mostramos nombre en la pagina
    welcomeText.innerHTML = "Bienvenido " + username;
    if (email) welcomeText.innerHTML += " (" + email + ")"
}
idButton.addEventListener("click", function (evt) {
    usernamePrompt();
});