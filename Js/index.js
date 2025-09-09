const cardsContainer = document.getElementById("cards-container");
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-grid").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-grid").classList.remove("hidden");
  }
};
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
};
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories-container");
  categories.forEach((category) => {
    // console.log(category.id);
    const div = document.createElement("div");
    div.className =
      "categories menu bg-[#f0fdf4] rounded-box w-56 mx-auto lg:mx-0 text-center lg:text-left";

    div.innerHTML = `<a id="${category.id}" class="hover:bg-[#15803d] categories hover:text-white p-2 hover:rounded-sm cursor-pointer"> ${category.category_name} </a>`;
    categoryContainer.appendChild(div);
  });
  loadTreeCards();

  document
    .getElementById("all-items")
    .classList.add("bg-[#15803d]", "text-white", "rounded-sm");
  categoryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      categoryContainer
        .querySelectorAll(".categories a")
        .forEach((category) => {
          category.classList.remove("bg-[#15803d]", "text-white", "rounded-sm");
        });
    }
    if (e.target.localName === "a") {
      if (e.target.id === "all-items") {
        e.target.classList.add("bg-[#15803d]", "text-white", "rounded-sm");
        loadTreeCards();
      } else {
        e.target.classList.add("bg-[#15803d]", "text-white", "rounded-sm");
        //   console.log(e.target.id);
        loadTreeByCategory(e.target.id);
      }
    }
  });
};
const loadTreeCards = () => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      displayTreeCards(data);
    });
};
const displayTreeCards = (treeDetails) => {
  // console.log(treeDetails);

  const cardGrid = document.getElementById("card-grid");
  cardGrid.innerHTML = "";
  treeDetails.plants.forEach((plant) => {
    const div = document.createElement("div");
    div.className = "card bg-base-100 h-[450px] w-70 shadow-sm mx-auto";
    div.innerHTML = `      <figure class="px-2 py-2 lg:px-5 lg:py-5"><img class="rounded-[8px] w-[311px] h-[186px] " src="${plant.image}" alt="" /></figure>
            <div class="card-body px-5 py-5">
              <h2 onclick="loadModal(${plant.id})" class="card title text-[14px] cursor-pointer font-semibold">${plant.name}</h2>
              <p class="text-[12px] lg:h-[78px]">
               ${plant.description}
              </p>
              <div class="flex justify-between items-center">
                <div class="badge bg-[#dcfce7] text-[#15803D] text-xs mt-[20px]">
                  ${plant.category}
                </div>
                <div class="mt-[20px] font-bold"><p>৳${plant.price}</p></div>
              </div>
              <div class="card actions mt-[10px]">
                <button onclick="addToCart(${plant.id})" class="btn btn-primary rounded-3xl bg-[#15803D]">
                  Add To Cart
                </button>
              </div>
            </div>`;
    cardGrid.appendChild(div);
  });
  manageSpinner(false);
};
const loadTreeByCategory = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayTreeCards(data);
    });
};
const loadModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayModal(data.plants);
    });
};
const displayModal = (data) => {
  const modal = document.getElementById("my_modal_5");
  modal.innerHTML = "";
  // console.log(data);
  const div = document.createElement("div");
  div.className = "modal-box";
  div.innerHTML = `<h3 class="text-xl font-bold">${data.name}</h3>
        <div class="w-full h-[250px] mt-[20px]">
          <img
            class="w-full h-full rounded-md"
            src="${data.image}"
            alt=""
          />
        </div>
        <p class="mt-[20px]">
          <span class="font-bold">Category:</span> ${data.category}
        </p>
        <p class="mt-[20px]"><span class="font-bold">Price:</span> ৳${data.price}</p>
        <p class="mt-[20px]">
          <span class="font-bold">Description:</span> ${data.description}
        </p>
        <div class="modal-action mt-[20px]">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-[#15803d] text-white">Close</button>
          </form>
        </div>`;
  modal.appendChild(div);
  modal.showModal();
};

let price = 0;
const cartItems = {}; // track items with quantity

const addToCart = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      alert(`${data.plants.name} Added To Your Cart`);
      const plant = data.plants;
      const cartDetails = document.getElementById("cart-details");
      const cartTreePrice = document.getElementById("cart-tree-price");
      if (cartItems[plant.id]) {
        cartItems[plant.id].quantity++;
        document.getElementById(`cart-qty-${plant.id}`).innerText = `x${
          cartItems[plant.id].quantity
        }`;
        price += plant.price;
      } else {
        cartItems[plant.id] = {
          id: plant.id,
          name: plant.name,
          price: plant.price,
          description: plant.description,
          category: plant.category,
          image: plant.image,
          quantity: 1,
        };
        const div = document.createElement("div");
        div.setAttribute("id", `cart-div-${plant.id}`);
        div.className =
          "mb-[10px] bg-[#f0fdf4] p-4 flex justify-between items-center";
        div.innerHTML = `
          <div>
            <a class="font-bold">${plant.name}</a>
            <p class="text-gray-500">৳${plant.price} <span id="cart-qty-${plant.id}">x1</span></p>
          </div>
          <div class="text-gray-500">
            <a id="delete-button-${plant.id}">
              <i class="fa-solid fa-xmark cursor-pointer"></i>
            </a>
          </div>`;
        cartDetails.appendChild(div);
        document
          .getElementById(`delete-button-${plant.id}`)
          .addEventListener("click", () => {
            alert(`${plant.name} Removed From Your Cart`);
            price -= plant.price * cartItems[plant.id].quantity;
            delete cartItems[plant.id];
            document.getElementById(`cart-div-${plant.id}`).remove();
            cartTreePrice.innerText = `৳${price}`;
          });

        price += plant.price;
      }

      cartTreePrice.innerText = `৳${price}`;
    });
};

loadCategories();