const container = document.querySelector(".products-container");

function renderProduct(doc) {
  //Creating elements
  let product = document.createElement("div");
  let img = document.createElement("img");
  let prodText = document.createElement("div");
  let name = document.createElement("h2");
  let nav = document.createElement("div");
  let secImg1 = document.createElement("img");
  let secImg2 = document.createElement("img");
  let secImg3 = document.createElement("img");
  let ul = document.createElement("ul");
  let li1 = document.createElement("li");
  let li2 = document.createElement("li");
  let li3 = document.createElement("li");
  let li4 = document.createElement("li");
  let li5 = document.createElement("li");
  let p = document.createElement("p");
  let price = document.createElement("span");
  let small = document.createElement("small");
  let code = document.createElement("span");

  //Adding properties
  product.classList.add("product");
  img.setAttribute("id", "image-container");
  prodText.classList.add("product_text");
  nav.classList.add("nav");
  secImg1.setAttribute("id", "image-option");
  secImg2.setAttribute("id", "image-option");
  secImg3.setAttribute("id", "image-option");
  if (doc.data().prox) {
    product.classList.add("soon");
  }

  //Setting the data form Firestore
  product.setAttribute("data-id", doc.data().tipo);
  img.setAttribute("alt", doc.data().tipo);
  img.setAttribute("src", doc.data().image1);
  name.textContent = doc.data().nombre;
  secImg1.setAttribute("src", doc.data().image1);
  secImg2.setAttribute("src", doc.data().image2);
  secImg3.setAttribute("src", doc.data().image3);
  secImg1.setAttribute("alt", doc.data().tipo);
  secImg2.setAttribute("alt", doc.data().tipo);
  secImg3.setAttribute("alt", doc.data().tipo);
  li1.textContent = doc.data().char1;
  li2.textContent = doc.data().char2;
  li3.textContent = doc.data().char3;
  li4.textContent = doc.data().char4;
  li5.textContent = doc.data().char5;
  p.textContent = "Precio: ";
  price.textContent = doc.data().precio;
  small.textContent = "Codigo: ";
  code.textContent = doc.data().codigo;

  //Appenging in correct place
  nav.appendChild(secImg1);
  nav.appendChild(secImg2);
  nav.appendChild(secImg3);
  if (doc.data().char1) {
    ul.appendChild(li1);
  }
  if (doc.data().char2) {
    ul.appendChild(li2);
  }
  if (doc.data().char3) {
    ul.appendChild(li3);
  }
  if (doc.data().char4) {
    ul.appendChild(li4);
  }
  if (doc.data().char5) {
    ul.appendChild(li5);
  }
  p.appendChild(price);
  small.appendChild(code);
  prodText.appendChild(name);
  prodText.appendChild(nav);
  prodText.appendChild(ul);
  prodText.appendChild(p);
  prodText.appendChild(small);
  product.appendChild(img);
  product.appendChild(prodText);
  container.appendChild(product);

  const buttons = document.querySelector(".buttons").children;
  const products = document.querySelector(".products-container").children;
  // const container = document.getElementById("image-container");
  const imgOpt = document.querySelectorAll("#image-option");

  //For the products filtering
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
      }

      this.classList.add("active");

      const target = this.getAttribute("data-target");

      for (let k = 0; k < products.length; k++) {
        products[k].style.opacity = "0.5";
        products[k].style.transform = "scale(0.4)";

        if (products[k].getAttribute("data-id") === target) {
          products[k].style.opacity = "1";
          products[k].style.transform = "scale(1.1)";
        }

        if (target === "all") {
          products[k].style.opacity = "1";
          products[k].style.transform = "scale(1)";
        }
      }
    });
  }

  //For the images inside the popup
  imgOpt.forEach((each) => {
    each.addEventListener("click", () => {
      let bigImg = each.parentNode.parentNode.parentNode.children[0];
      bigImg.src = each.src;
    });
  });
}

db.collection("productos")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderProduct(doc);
    });
  });
