const fil = "actors.json";
const container = document.querySelector(".container");
const temp = document.querySelector("template");

async function hentdata(fil) {
  const resultat = await fetch(fil);
  const json = await resultat.json();
  vis(json);
}

function vis(actors) {
  actors.forEach((actor) => {
    let klon = temp.cloneNode(true).content;
    klon.querySelector("h3").textContent = actor.fullname;
    klon.querySelector("p").textContent = actor.movie;
    klon
      .querySelector("button")
      .addEventListener("click", () => visDetaljer(actor));
    container.appendChild(klon);
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
