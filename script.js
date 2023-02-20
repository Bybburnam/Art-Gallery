let artArray = [];
let body = document.querySelector("body");

function getFetch() {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      for (let i = 10000; i < 10070; i++) {
        let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`;
        let obj = fetch(url);
        obj = obj.then((res) => res.json());
        obj = obj
          .then((data) => {
            if (
              data.title &&
              data.artistDisplayName &&
              data.primaryImageSmall
            ) {
              console.log(data);
              artArray.push(
                new ArtPiece(
                  data.title,
                  data.artistDisplayName,
                  data.primaryImageSmall
                )
              );
            }
            displayArt(artArray);
          })
          .catch((err) => {
            console.log(`error ${err}`);
          });
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

getFetch();

class ArtPiece {
  #title;
  #artist;
  #art;
  constructor(title, artist, art) {
    this.#title = title;
    this.#artist = artist;
    this.#art = art;
  }

  getTitle() {
    return this.#title;
  }

  getArtist() {
    return this.#artist;
  }

  getArt() {
    return this.#art;
  }
}

function displayArt(arr) {
  arr.forEach((artPiece) => {
    let pieceCard = createCard(artPiece);
    body.appendChild(pieceCard);
  });
}

function createCard(artPiece) {
  let span = document.createElement("section");
  let img = document.createElement("img");
  img.src = artPiece.getArt();
  img.classList.add("artPiece");
  let pieceTitle = document.createElement("h3");
  pieceTitle.textContent = artPiece.getTitle();
  let artistName = document.createElement("p");
  artistName.textContent = artPiece.getArtist();
  span.appendChild(img);
  span.appendChild(pieceTitle);
  span.appendChild(artistName);
  span.classList.add("card");
  return span;
}
