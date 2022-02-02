document.addEventListener("DOMContentLoaded", start);
let temp;
let container;
let actors;
let filter = "alle";
const fil = "actors.json";

function start() {
  container = document.querySelector(".container");
  temp = document.querySelector("template");

  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerActors)
  );
  hentdata(fil);
}

function filtrerActors() {
  filter = this.dataset.movie;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visActors();
}

async function hentdata(fil) {
  const resultat = await fetch(fil);
  actors = await resultat.json();
  visActors();
}

function visActors() {
  container.textContent = "";

  actors.forEach((actor) => {
    if (filter == actor.movie || filter == "alle") {
      const klon = temp.cloneNode(true).content;
      klon.querySelector("h3").textContent = actor.fullname;
      klon.querySelector("p").textContent = actor.movie;
      klon
        .querySelector("button")
        .addEventListener("click", () => visDetaljer(actor));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(actorData) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector("h3").textContent = actorData.fullname;
  popup.querySelector("p").textContent = actorData.movie;
  console.log(actorData);
}

document.querySelector("#tilbage").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

hentdata(fil);
