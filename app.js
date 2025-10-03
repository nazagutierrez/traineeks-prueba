const foodStore = [];
let currentTab = 1;

let createFood = {
  name: "",
  calories: 0,
  type: "",
  allergens: "",
  portion: "",
  photo: "",
  macros: {
    iron: 0,
    vitaminC: 0,
    vitaminD: 0,
  },
};

function addFood(food) {
  createFood = {
    ...createFood,
    ...food,
  };
}

function addToFoodStore(foodToCreate) {
  foodStore.push(foodToCreate);
}

function nextTab() {
  currentTab++;
}

function prevTab() {
  if (currentTab === 0) return;
  currentTab--;
}

function renderFoodStore() {
  $("#foodList").empty(); 
  $.each(foodStore, function (index, food) {
    if (food.photo === "") {
      food.photo = "./image-placeholder.png";
    }
    $("#foodList").append(`
      <li class="food-card">
        <img class="food-img" src="${food.photo}" alt="${food.name}" />
        <div class="food-info">
          <span class="food-name">${food.name}</span>
          <span class="food-calories">${food.calories} kcal</span>
          <span class="food-type">${food.type}</span>
        </div>
        <div>
          <span>Hierro: ${food.macros.iron}</span> -
          <span>Vit. C: ${food.macros.vitaminC}</span> -
          <span>Vit. D: ${food.macros.vitaminD}</span>
        </div>
      </li>
    `);
  });
}



$(function () {
  const $dialog = $("#favDialog");

  $("#newFood").on("click", function () {
    // @ts-ignore
    $dialog[0].showModal();
  });

  $("#cancel").on("click", function () {
    // @ts-ignore
    $dialog[0].close();
  });

  if (foodStore.length === 0) {
    $("#foodList").text("No hay comida almacenada").css("color", "grey");
  }

  $(".check-btn").on("click", function () {
    $(`.check-btn`).toggleClass("check-btn-border");
  });

  $(".next-tab-btn").on("click", function () {
    $(".next-tab-btn").text("SIGUIENTE"); // cambia el texto
    if (currentTab === 4) {
      $(".next-tab-btn").text("TERMINAR"); // cambia el texto
    }
    if (currentTab === 5) {
      addToFoodStore(createFood);
      currentTab = 1;
      $(`.form-5`).addClass("form-hidden");
      $(`.form-1`).removeClass("form-hidden");
      console.log("FOOD STORE:", foodStore);
      renderFoodStore();
      $dialog[0].close();
      return;
    }
    nextTab();
    console.log(currentTab);
    $(`.form-${currentTab - 1}`).addClass("form-hidden");
    $(`.form-${currentTab}`).removeClass("form-hidden");

    const name = $("#name").val();
    const calories = $("#calories").val();
    const type = $("#type").val();
    const allergens = $("#allergens").val();
    const portion = $("#portion").val();
    const photo = $("#photo").val();
    const iron = $("#iron").val();
    const vitaminC = $("#vitaminC").val();
    const vitaminD = $("#vitaminD").val();

    addFood({
      name,
      calories,
      type,
      allergens,
      portion,
      photo,
      macros: {
        iron,
        vitaminC,
        vitaminD,
      },
    });

    console.log(createFood);
  });

  $(".prev-tab-btn").on("click", function () {
    if (currentTab === 1) return;
    prevTab();
    $(`.form-${currentTab + 1}`).addClass("form-hidden");
    $(`.form-${currentTab}`).removeClass("form-hidden");
    console.log(currentTab);
  });

  $("#photo").on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const base64Image = e.target.result;
        $("#preview").attr("src", base64Image).show();

        // 👉 acá guardamos la imagen en createFood
        createFood = {
          ...createFood,
          photo: base64Image,
        };
      };

      reader.readAsDataURL(file);
    }
  });
});
