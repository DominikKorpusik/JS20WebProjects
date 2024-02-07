const button = document.getElementById("btn");
const audioElement = document.getElementById("audio");
const jokeText = document.getElementById("joke-text");


function toggleBtn() {
  button.disabled = !button.disabled;
}

function tellMeAJoke(joke) {
  VoiceRSS.speech({
    key: "ab2a096a873443ceaba38facda790872",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

function displayJoke(joke) {
  setTimeout(() => {
    jokeText.innerText = joke;
  }, 1000);
}

function formAJoke(data) {
  let joke = "";
  if (data.setup && data.delivery) {
    joke = `${data.setup} . . . ${data.delivery}`;
  } else if (data.joke) {
    joke = data.joke;
  }
  return joke;
}

async function getJokesFromAPI() {
  const apiUrl = `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const joke = formAJoke(data);

    tellMeAJoke(joke);
    displayJoke(joke);
    toggleBtn();
  } catch (error) {
    console.log("Whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokesFromAPI);
audioElement.addEventListener("ended", toggleBtn);
