const body = document.querySelector("body");
const productsWrapper = document.querySelector(".products-wrapper");
const productsTitle = document.querySelector(".products-title");
const productsFrom = document.querySelector(".products-from");
const inputForTitle = document.querySelector(".products-from .input-for-title");
const searchButton = document.querySelector(".button");
const modal = document.querySelector(".modal");

async function getProducts(keyword = "") {
  const loading = document.querySelector(".loading");
  loading.style.display = "flex";
  loading.style.justifyContent = "center";
  try {
    const resp = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}`
    );
    const data = await resp.json();
    renderProducts(data.products);
    console.log(data.products);
  } catch (error) {
    console.log("Error");
  } finally {
    loading.style.display = "none";
  }
}

getProducts(inputForTitle.value);

function renderProducts(products) {
  products.forEach((element) => {
    const productElement = createProduct(element);
    productsWrapper.append(productElement);
  });
}

function createProduct(InputProducts) {
  const products = document.createElement("div");
  products.classList.add("products");
  productsWrapper.append(products);

  const product = document.createElement("div");
  product.classList.add("product");
  products.append(product);

  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("image-wrapper");
  product.append(imageWrapper);

  const image = document.createElement("img");
  image.src = InputProducts.images[0];
  imageWrapper.append(image);

  const content = document.createElement("div");
  content.classList.add("content");
  product.append(content);

  const contentH1 = document.createElement("h1");
  contentH1.textContent = InputProducts.title;
  content.append(contentH1);

  const contentButton = document.createElement("button");
  contentButton.textContent = "Details";
  content.append(contentButton);

  contentButton.addEventListener("click", function () {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";

    const modalContent = document.querySelector(".modal-content");
    modal.append(modalContent);

    const modalH1 = document.querySelector(".modal-h1");
    modalH1.textContent = InputProducts.description;

    const modalButton = document.querySelector(".modal-button");
    modalContent.prepend(modalButton);

    modalButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });

  return products;
}

searchButton.addEventListener("click", function () {
  const keyword = inputForTitle.value.toLowerCase();
  inputForTitle.value = "";

  const notFound = document.querySelector(".not-found");
  const productElements = document.querySelectorAll(".products");
  let found = false;

  productElements.forEach((productElement) => {
    const title = productElement.querySelector("h1").textContent.toLowerCase();

    if (title.includes(keyword.toLowerCase())) {
      productElement.style.display = "block";
      found = true;
    } else {
      productElement.style.display = "none";
    }
  });
  if (found === true) {
    notFound.style.display = "none";
  } else {
    notFound.style.display = "flex";
    notFound.style.justifyContent = "center";
  }
});
