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
  localStorage.setItem("email", email)
  localStorage.setItem("username", username)
}
idButton.addEventListener("click", function (evt) {
  usernamePrompt();
});

const newsButton = document.getElementById("btn-news");
const newsModal = document.getElementById("modal-news");

async function fetchNews() {
  const req = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=20");
  if (req) {
    const articles = await req.json();
    const list = document.getElementById("news-list");
    articles.forEach((article) => {
      const container = document.createElement("li");
      
      const title = document.createElement("h4");
      title.innerText = article.title;
      container.appendChild(title);
      
      const content = document.createElement("p");
      content.innerText = article.summary;
      container.appendChild(content);
      
      const link = document.createElement("a");
      link.href = article.url;
      link.innerHTML = "Leer más"
      container.appendChild(link);
  
      list.appendChild(container);
    });

    $('#modal-news').modal('show');
  } else {
    alert("Ha habido un error en cargar las noticias. Intente de nuevo mas tarde.");
  }
}

newsButton.addEventListener("click", () => fetchNews());

// $('#btn-news').on('click', function () {
//   // $.ajax({
//   //   url: 'https://newsapi.org/v2/everything?q=seguros+vida+salud&apiKey=04b7ce92e5c54eff9414146de8453fdf',
//   //   method: 'GET',
//   //   success: function(response) {
//   //     let articles = response.articles;
//   //     let $list = $('#news-list');
//   //     $list.empty();
//   //     articles.forEach(function(article) {
//   //       let $li = $('<li>');
//   //       let $title = $('<h4>').text(article.title);
//   //       let $description = $('<p>').text(article.description);
//   //       let $link = $('<a>').attr('href', article.url).text('Leer más');
//   //       $li.append($title, $description, $link);
//   //       $list.append($li);
//   //     });
//   //     $('#modal-news').modal('show');
//   //   },
//   //   error: function(error) {
//   //     console.log(error);
//   //   }
//   // });
// });
