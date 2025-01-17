$(function () {
  searchByName("");
  hideLoading();
});

function openNav() {
  $("nav").animate({ left: "0" }, 1000);
  $(".nav-toggle").removeClass("fa-align-justify");
  $(".nav-toggle").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".nav-menu li")
      .eq(i)
      .animate({ top: 0 }, (5 + i) * 100);
  }
}

function closeNav() {
  $("nav").animate({ left: "-250px" }, 1000);
  $(".nav-toggle").removeClass("fa-x");
  $(".nav-toggle").addClass("fa-align-justify");

  $(".nav-menu li").animate({ top: 210 }, 500);
}

$(".nav-toggle").on("click", function () {
  if ($("nav").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

let navLinks = $(".nav-menu li");

navLinks.eq(0).on("click", function () {
  displaySearchInputs();
  closeNav();
});

navLinks.eq(1).on("click", function () {
  $(".search-container").html("");

  displayLoading(300);
  getCategories();
  closeNav();
});

navLinks.eq(2).on("click", function () {
  $(".search-container").html("");

  displayLoading(300);
  getArea();
  closeNav();
});

navLinks.eq(3).on("click", function () {
  $(".search-container").html("");

  displayLoading(300);
  getIngredients();
  closeNav();
});

navLinks.eq(4).on("click", function () {
  $(".search-container").html("");

  displayContactForm();
  closeNav();
});

$(document).on("input", "#searchByName", function (e) {
  displayLoading(300);
  searchByName(e.target.value);
});

$(document).on("input", "#searchByFLetter", function (e) {
  if ($("#searchByFLetter").val() != "") {
    displayLoading(300);
    searchByFLetter(e.target.value);
  }
});

function displayMeals(meals) {
  let mealsContent = "";
  for (const meal of meals) {
    mealsContent += `
            <div class="col-md-3">
                <div class="item position-relative overflow-hidden rounded-2" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="" class="w-100">
                <div class="layer d-flex align-items-center p-2 text-black">
                    <h3>${meal.strMeal}</h3>
                </div>
                </div>
            </div>`;
  }

  $("#meals").html(mealsContent);
}

function displayMealDetails(meal) {
  $(".search-container").html("");

  let ingContent = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      ingContent += `<li class="alert alert-info p-1 m-2">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  let tagContent = ``;
  if (meal[0].strTags !== null) {
    let tagsArr = meal[0].strTags.split(",");
    for (const tag of tagsArr) {
      tagContent += `<li class="alert alert-danger p-1 m-2">${tag}</li>`;
    }
  }

  let mealDetails = `
        <div class="col-md-4">
            <img src="${meal[0].strMealThumb}" alt="" class="w-100 rounded-3">
            <h2>${meal[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal[0].strInstructions}</p>
            <h3><span class="fw-bolder">Area:</span> ${meal[0].strArea}</h3>
            <h3><span class="fw-bolder">Category:</span> ${meal[0].strCategory}</h3>
            <h3>Recipes:</h3>
            <ul class="list-unstyled d-flex flex-wrap">
                ${ingContent}
            </ul>
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex flex-wrap">
                ${tagContent}
            </ul>
            <a href="${meal[0].strSource}" target="_blank" class="btn btn-success">Source</a>
            <a href="${meal[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
        </div>
    `;

  $("#meals").html(mealDetails);
}

function displaySearchInputs() {
  let searchContent = `
        <div class="row py-4 gy-2">
          <div class="col-md-6">
            <input type="text"  id="searchByName" class="form-control bg-transparent text-white" placeholder="Search By Name">
          </div>
          <div class="col-md-6">
            <input type="text" maxlength="1" id="searchByFLetter" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
          </div>
        </div>
    `;

  $(".search-container").html(searchContent);
  $("#meals").html("");
}

function displayCategories(categories) {
  let categoriesContent = "";
  for (const category of categories) {
    categoriesContent += `
        <div class="col-md-3">
          <div class="item category position-relative overflow-hidden rounded-2" data-name="${
            category.strCategory
          }">
            <img src="${category.strCategoryThumb}" alt="${
      category.strCategory
    }" class="w-100">
            <div class="layer p-2 text-black text-center">
              <h3>${category.strCategory}</h3>
              <p>${category.strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}...</p>
            </div>
          </div>
        </div>`;
  }

  $("#meals").html(categoriesContent);
}

function displayAreas(areas) {
  let areasContent = "";
  for (const area of areas) {
    areasContent += `
        <div class="col-md-3">
          <div class="item area text-center" data-area="${area.strArea}">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${area.strArea}</h3>
          </div>
        </div>`;
  }

  $("#meals").html(areasContent);
}

function displayIngredients(ingreds) {
  let ingredContent = "";
  for (const ingred of ingreds) {
    ingredContent += `
          <div class="col-md-3">
            <div class="item ingredient text-center" data-ingred="${
              ingred.strIngredient
            }">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${ingred.strIngredient}</h3>
              <p>${ingred.strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
          </div>`;
  }

  $("#meals").html(ingredContent);
}

function displayContactForm() {
  let ContactContent = `
          <div class="contact-form min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
              <div class="row g-4">
                <div class="col-md-6">
                  <input type="text" placeholder="Enter your Full Name" class="form-control" id="userName">
                  <div class="alert alert-danger mt-2 d-none">Special Characters and Numbers not Allowed</div>
                </div>
                <div class="col-md-6">
                  <input type="email" placeholder="Enter Your Email Address" class="form-control" id="userEmail">
                  <div class="alert alert-danger mt-2 d-none">Email not valid *Example@yyy.zzz</div>
                </div>
                <div class="col-md-6">
                  <input type="tel" placeholder="Enter valid Phone Number
                " class="form-control" id="userPhone">
                  <div class="alert alert-danger mt-2 d-none">Enter Valid Phone Number</div>
                </div>
                <div class="col-md-6">
                  <input type="number" placeholder="Enter your Age" class="form-control" id="userAge">
                  <div class="alert alert-danger mt-2 d-none">Enter Valid Age</div>
                </div>
                <div class="col-md-6">
                  <input type="password" placeholder="Enter your password" class="form-control" id="userPass1">
                  <div class="alert alert-danger mt-2 d-none">Enter Valid Password *Minimum Eight Characters, at Least One Letter and One Number*</div>
                </div>
                <div class="col-md-6">
                  <input type="password" placeholder="Re-Enter Your Password" class="form-control" id="userPass2">
                  <div class="alert alert-danger mt-2 d-none">Passwords don't Match</div>
                </div>
              </div>
              <button id="submitBtn" class="btn btn-outline-danger mt-3" disabled>Submit</button>
              </div>
          </div>
      `;

  $("#meals").html(ContactContent);
}

function getMeal() {
  $(".item").on("click", function () {
    closeNav();
    displayLoading(300);
    searchMealById(this.dataset.id);
  });
}

async function searchByName(mealName) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    let data = await response.json();
    hideLoading(400, false);
    hideLoading(400);
    displayMeals(data.meals);
    getMeal();
  } catch (err) {
    console.log(err);
  }
}

async function searchByFLetter(fLetter) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${fLetter}`
    );
    let data = await response.json();
    hideLoading(400);
    displayMeals(data.meals);
    getMeal();
  } catch (err) {
    console.log(err);
  }
}

async function searchMealById(mealId) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let data = await response.json();
    hideLoading(400);
    displayMealDetails(data.meals);
  } catch (err) {
    console.log(err);
  }
}

async function getCategories() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let data = await response.json();
    hideLoading(400);
    displayCategories(data.categories);
  } catch (err) {
    console.log(err);
  }
}

$("#meals").on("click", ".category", function () {
  displayLoading(400);
  getMealByCat(this.dataset.name);
});

async function getMealByCat(cat) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    let data = await response.json();
    hideLoading(400);
    displayMeals(data.meals);
    getMeal();
  } catch (err) {
    console.log(err);
  }
}

async function getArea() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let data = await response.json();
    hideLoading(400);
    displayAreas(data.meals);
  } catch (err) {
    console.log(err);
  }
}

$("#meals").on("click", ".area", function () {
  displayLoading(400);
  getMealByArea(this.dataset.area);
});

async function getMealByArea(area) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let data = await response.json();
    hideLoading(400);
    displayMeals(data.meals);
    getMeal();
  } catch (err) {
    console.log(err);
  }
}

async function getIngredients() {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    let data = await response.json();
    hideLoading(400);
    displayIngredients(data.meals.slice(0, 20));
  } catch (err) {
    console.log(err);
  }
}

$("#meals").on("click", ".ingredient", function () {
  displayLoading(400);
  getMealByIngred(this.dataset.ingred);
});

async function getMealByIngred(ingred) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
    );
    let data = await response.json();
    hideLoading(400);
    displayMeals(data.meals);
    getMeal();
    console.log(data.meals);
  } catch (err) {
    console.log(err);
  }
}

function validateInputs(element) {
  let regex = {
    userName: /^[a-zA-Z\s]{1,20}$/,
    userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    userPhone: /^(2|\+2){0,1}01[0125][0-9]{8}$/,
    userAge: /^(1[2-9]|[2-9][0-9]|100)$/,
    userPass1: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  if (element.id == "userPass1") {
    if (regex[element.id].test(element.value)) {
      element.nextElementSibling.classList.replace("d-block", "d-none");
      element.classList.add("valid");
    } else {
      element.nextElementSibling.classList.replace("d-none", "d-block");
      element.classList.remove("valid");
    }

    checkMatchPass();
  } else if (element.id == "userPass2") {
    checkMatchPass();
  } else {
    if (regex[element.id].test(element.value)) {
      element.nextElementSibling.classList.replace("d-block", "d-none");
      element.classList.add("valid");
    } else {
      element.nextElementSibling.classList.replace("d-none", "d-block");
      element.classList.remove("valid");
    }
  }
}

function checkMatchPass() {
  let userPassInput1 = document.querySelector("#userPass1");
  let userPassInput2 = document.querySelector("#userPass2");

  if (userPassInput2.value == userPassInput1.value) {
    userPassInput2.nextElementSibling.classList.replace("d-block", "d-none");
    userPassInput2.classList.add("valid");
  } else {
    userPassInput2.nextElementSibling.classList.replace("d-none", "d-block");
    userPassInput2.classList.remove("valid");
  }
}

function activateButton() {
  if (
    $("#userName").hasClass("valid") &&
    $("#userEmail").hasClass("valid") &&
    $("#userPhone").hasClass("valid") &&
    $("#userAge").hasClass("valid") &&
    $("#userPass1").hasClass("valid") &&
    $("#userPass2").hasClass("valid")
  ) {
    $("#submitBtn").attr("disabled", false);
  } else {
    $("#submitBtn").attr("disabled", true);
  }
}

$("#meals").on("input", "input", function () {
  validateInputs(this);
  activateButton();
});

function displayLoading(time, inner = true) {
  if (inner) {
    $(".inner-loading").fadeIn(time);
    $("body").addClass("overflow-hidden");
  } else {
    $(".loading").fadeIn(time);
    $("body").addClass("overflow-hidden");
  }
}

function hideLoading(time, inner = true) {
  if (inner) {
    $(".inner-loading").fadeOut(time);
    $("body").removeClass("overflow-hidden");
  } else {
    $(".loading").fadeOut(time);
    $("body").removeClass("overflow-hidden");
  }
}
