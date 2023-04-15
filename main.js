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

// const newsButton = document.getElementById("btn-news");
// const newsModal = document.getElementById("modal-news");

// async function fetchNews() {
//   const req = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=20");
//   if (req) {
//     const articles = await req.json();
//     const list = document.getElementById("news-list");
//     articles.forEach((article) => {
//       const container = document.createElement("li");
      
//       const title = document.createElement("h4");
//       title.innerText = article.title;
//       container.appendChild(title);
      
//       const content = document.createElement("p");
//       content.innerText = article.summary;
//       container.appendChild(content);
      
//       const link = document.createElement("a");
//       link.href = article.url;
//       link.innerHTML = "Leer más"
//       container.appendChild(link);
  
//       list.appendChild(container);
//     });

//     $('#modal-news').modal('show');
//   } else {
//     alert("Ha habido un error en cargar las noticias. Intente de nuevo mas tarde.");
//   }
// }

// newsButton.addEventListener("click", () => fetchNews());

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
// URL de la API de OpenAI
const apiUrl = 'https://api.openai.com/v1/completions';

// Parámetros de la petición
const data = {
  'prompt': '',
  'max_tokens': 100,
  'temperature': 0.5,
  'model': 'curie'
};

// Encabezados de la petición
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${'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'}`
};

// Obtener los elementos del DOM
const openChatButton = document.getElementById('open-chat');
const chatModal = document.getElementById('chat-modal');
const closeChatButton = document.getElementsByClassName('close')[0];
const questionForm = document.getElementById('question-form');
const questionInput = document.getElementById('question-input');
const answerDiv = document.getElementById('answer');

// Función para mostrar el modal de chat
function openChatModal() {
  chatModal.style.display = 'block';
}

// Función para ocultar el modal de chat
function closeChatModal() {
  chatModal.style.display = 'none';
}

async function askQuestion(question) {
	// Actualizar la pregunta en los datos de la petición
	data.prompt = `Pregunta sobre seguros: ${question}`;

	try {
		// Realizar la petición a la API
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		});

		// Obtener la respuesta como JSON
		const answer = await response.json();

		// Limpiar respuesta anterior
		answerDiv.innerHTML = "";

		// Mostrar la respuesta en la página
		answerDiv.innerHTML = answer.choices[0].text;
	} catch (error) {
		console.error(error);
		answerDiv.innerHTML = 'Error al obtener la respuesta.';
	}
}


// Manejador de eventos para mostrar el modal de chat
openChatButton.addEventListener('click', openChatModal);

// Manejador de eventos para ocultar el modal de chat
closeChatButton.addEventListener('click', closeChatModal);

// Manejador de eventos para enviar una pregunta
questionForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (question !== '') {
    askQuestion(question);
  }
});
