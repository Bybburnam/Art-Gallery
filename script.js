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
            console.log(data);
            if (
              data.primaryImageSmall != "" &&
              data.artistDisplayName != "" &&
              data.title != ""
            ) {
              let img = document.createElement("img");
              let body = document.querySelector("body");
              img.src = data.primaryImageSmall;
              body.appendChild(img);
            }
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
