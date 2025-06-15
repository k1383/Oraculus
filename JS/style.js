// Variables globales
let horoscope;
let index = 0;

// Fonction init qui a pour but de lancer les autres fonctions
async function init() {
  // Je récupère la totalité des données de l'horoscope
  horoscope = await getDatas();

  // Récupérer les données du capricorne et les afficher sur le DOM (index 2)
  displayHoroscope(horoscope[index]);

  // Afficher les données de l'horoscope dans left-horoscope et right-horoscope > entête de la section
  // données complètes, index en cours
  displaySectionHoroscope(horoscope, index);
}
// On n'oublie pas de lancer notre fonction init, sinon rien ne fonctionne
init();

// Faire un fetch sur notre mock de données
async function getDatas() {
  // Faire appel à mon mock de données
  const req = await fetch("../json/horoscope.json");
  return await req.json();
  // console.log(data[2]);
}

// Fonction qui permet de modifier le DOM pour afficher l'horoscope du signe qu'on lui envoi
/**
 * @param {Object} horoscope
 * return {void}
 */
function displayHoroscope(horoscope) {
  // signe.signe
  // signe.date
  // Destructuration de données
  const {
    signe,
    date,
    amour,
    travail,
    argent,
    sante,
    famille,
    conseil,
    image,
  } = horoscope;
  document.querySelector("article > h1").textContent = signe;
  document.querySelector("#date").textContent = date;

  document.querySelector("#amour").innerHTML = `<span>Amour : </span> ${amour}`;
  document.querySelector(
    "#travail"
  ).innerHTML = `<span>Travail : </span> ${travail}`;
  document.querySelector(
    "#argent"
  ).innerHTML = `<span>Argent : </span> ${argent}`;
  document.querySelector("#sante").innerHTML = `<span>Sante : </span> ${sante}`;
  document.querySelector(
    "#famille"
  ).innerHTML = `<span>Famille et amis : </span> ${famille}`;
  document.querySelector(
    "#conseil"
  ).innerHTML = `<span>Conseil : </span> ${conseil}`;

  const aside = document.querySelector("aside > img");
  aside.src = image;
  aside.alt = signe;
}

/**
 *
 * @param {Array<Object>} horoscopes
 * @param {Number} index
 */
function displaySectionHoroscope(horoscopes, index) {
  // Ternaires :
  // variable = condition ? valeur si vrai : valeur si faux
  indexPrev = index === 0 ? horoscopes.length - 1 : index - 1;
  indexNext = index + 1 > horoscopes.length - 1 ? 0 : index + 1;

  // Afficher dans l'entête de la section les données de l'horoscope -1 pour la gauche et +1 pour la droite
  document.querySelector(
    ".left-horoscope"
  ).innerHTML = `${horoscopes[indexPrev].signe} <span>${horoscopes[indexPrev].date}</span>`;
  document.querySelector(
    ".right-horoscope"
  ).innerHTML = `${horoscopes[indexNext].signe} <span>${horoscopes[indexNext].date}</span>`;
}

// // Sélectionner la flèche droite
// const arrowRight = document.querySelector(".arrow-right");
// arrowRight.addEventListener("click", () => {
//   index = index >= horoscope.length - 1 ? 0 : index + 1;
//   populateDatas();
// });

// // Sélectionner la flèche gauche
// const arrowLeft = document.querySelector(".arrow-left");
// arrowLeft.addEventListener("click", () => {
//   index = index === 0 ? horoscope.length - 1 : index - 1;
//   populateDatas();
// });

// // Sélectionner le signe de droite dans la section du haut et ajouter un eventlistener
// const rightHoroscope = document.querySelector(".right-horoscope");
// rightHoroscope.addEventListener("click", () => {
//   index = index + 1 > horoscope.length - 1 ? 0 : index + 1;
//   populateDatas();
// });

// // Sélectionner le signe de gauche dans la section du haut et ajouter un eventlistener
// const leftHoroscope = document.querySelector(".left-horoscope");
// leftHoroscope.addEventListener("click", () => {
//   index = index === 0 ? horoscope.length - 1 : index - 1;
//   populateDatas();
// });

const change = document.querySelectorAll(".change");
// Avec mon selectAll, si je veux manipuler les données, je dois parcourir chacun des éléments
change.forEach((el) => {
  // A chaque élément je vais pouvoir lui dire quoi faire
  // En gros, je vais pouvoir manipuler comme si j'avais juste UN SEUL élément
  el.addEventListener("click", () => {
    // J'ai besoin de savoir si j'ai cliqué sur :
    // - la flèche de droite/le signe de droite
    // - la flèche de gauche/le signe de gauche
    // Comment savoir si j'ai cliqué sur la flèche de gauche, de droite, le signe de gauche ou de droite ?
    // Je vais regarder la classe de l'élément sur lequel j'ai cliqué
    // Si la classe c'est "arrow-right" ou "right-horoscope"
    // Alors on lance ce qu'il faut pour passer à l'élément suivant
    if (
      el.classList.contains("arrow-right") ||
      el.classList.contains("right-horoscope")
    ) {
      index = index + 1 > horoscope.length - 1 ? 0 : index + 1;
    } else {
      index = index === 0 ? horoscope.length - 1 : index - 1;
    }
    populateDatas();

    // Si la classe c'est "arrow-left" ou "left-horoscope"
    // Alors on lance ce qu'il faut pour passer à l'élément précédent
  });
});

function populateDatas() {
  const horoscopeActuel = horoscope[index];
  displayHoroscope(horoscopeActuel); // ce qu'on envoi

  displaySectionHoroscope(horoscope, index);
}

//*