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
    localStorage.setItem("email",email)
    localStorage.setItem("username",username)
}
idButton.addEventListener("click", function (evt) {
    usernamePrompt();
});
$(function() {
    $('#btn-news').on('click', function() {
      $.ajax({
        url: 'https://newsapi.org/v2/everything?q=aseguradoras+seguros+vida+salud&apiKey=04b7ce92e5c54eff9414146de8453fdf',
        method: 'GET',
        success: function(response) {
          var articles = response.articles;
          var $list = $('#news-list');
          $list.empty();
          articles.forEach(function(article) {
            var $li = $('<li>');
            var $title = $('<h4>').text(article.title);
            var $description = $('<p>').text(article.description);
            var $link = $('<a>').attr('href', article.url).text('Leer más');
            $li.append($title, $description, $link);
            $list.append($li);
          });
          $('#modal-news').modal('show');
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  });
  