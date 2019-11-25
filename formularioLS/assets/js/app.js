//Variables

//DEFINE DONDE SE VAN A INSERTAR LOS TWEETS
const listaTweets = document.getElementById('lista-tweets');


//Event Listeners

eventListeners();

function eventListeners() {
    //CUANDO SE ENVIA EL FORMULARIO
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //BORRAR TWEET
    listaTweets.addEventListener('click', borrarTweet);

    // CONTENIDO CARGADO
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Funciones
function agregarTweet(e) {
    e.preventDefault(); //DETENER ACCIÓN DEL SUBMIT

    //LEE EL VALOR DEL TEXTAREA
    const tweet = document.getElementById('tweet').value;

    //CREAR BOTON DE ELIMINAR QUE YA TIENE CLASES PRE-CARGADAS
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //CREAR ELEMENTO Y AÑADIRLE EL CONTENIDO A LA LISTA
    const li = document.createElement('li');
    li.innerText = tweet;

    //CREACION DE NODO "BOTON BORRAR" COMO HIJO DEL "li"
    li.appendChild(botonBorrar);

    //AÑADE COMO NODO EL CONTENIDO DEL TEXT AREA A "li"
    listaTweets.appendChild(li);

    //AÑADE CONTENIDO DEL "li" AL LOCALSTORAGE
    agregarTweetLocalStorage(tweet);

}

//ELIMINA EL TWEET DEL DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//TRAE DE VUELTA LA INFORMACION ALMACENADA EN LOCALSTORAGE
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //HACE UN LLAMADO A UNA FUNCION CREADA ANTERIORMENTE
    tweets.forEach(function(tweet) {
        //CREAR BOTON DE ELIMINAR QUE YA TIENE CLASES PRE-CARGADAS
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //CREAR ELEMENTO Y AÑADIRLE EL CONTENIDO A LA LISTA
        const li = document.createElement('li');
        li.innerText = tweet;

        //CREACION DE NODO "BOTON BORRAR" COMO HIJO DEL "li"
        li.appendChild(botonBorrar);

        //AÑADE COMO NODO EL CONTENIDO DEL TEXT AREA A "li"
        listaTweets.appendChild(li);

    });
}

//AGREGA TWEET A LOCALSTORAGE Y ORGANIZAR DENTRO
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //AÑADIR TWEETS
    tweets.push(tweet);

    //CONVERSION DE TWEETS A ARRAYS CON JSON
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//COMPROBAR QUE HAYA ELEMENTOS EN LOCALSTORAGE
function obtenerTweetsLocalStorage() {
    let tweets;
    //REVISION Y CONDICION DE ELEMENTOS EN LOCALSTORAGE
    if (localStorage.getItem('tweets') === null) {
        tweets = []; //SI NO HAY NO RETORNES NADA
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    } //SI HAY UN ARREGLO JSON 
    return tweets; //RETORNAME LOS TWEETS
}

//ELIMINAR EL TWEET DEL LOCALSTORAGE

function borrarTweetLocalStorage(tweet) {
    let tweets,
        tweetBorrar;
    //ELIMINAR EL ELEMENTO HIJO "X" DEL TWEET RECORRIENDO LA LONGITUD DEL ARREGLO Y RESTANDOLE 1 AL FINAL
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    //SE OBTIENEN DE NUEVO LOS TWEETS ALMACENADOS
    tweets = obtenerTweetsLocalStorage();

    //SI EL TWEET GUARDADO ES IGUAL AL TWEET ALMACENADO EL FOREACH VA A BORRAR EL PRIMERO EN CONSECUENCIA DEJANDO SOLO 1
    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    //CONVIERTE A STRINGS LOS VALORES ALMACENADOS EN LOCALSTORAGE
    localStorage.setItem('tweets', JSON.stringify(tweets));

}