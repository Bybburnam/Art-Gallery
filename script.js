let artArray = [];
let body = document.querySelector("body");

async function getArtPiece(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

async function getArtGallery() {
  for (let i = 10000; i < 10700; i += 10) {
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`;
    const data = await getArtPiece(url);
    console.log(data);
    if (data.title && data.artistDisplayName && data.primaryImageSmall) {
      artArray.push(
        new ArtPiece(data.title, data.artistDisplayName, data.primaryImageSmall)
      );
    }
  }
  displayArt(artArray);
}

getArtGallery();

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
