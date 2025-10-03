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
  foodStore.push({ ...foodToCreate });
}

function nextTab() {
  currentTab++;
}

function prevTab() {
  if (currentTab === 0) return;
  currentTab--;
}

function showTab(addN, removeN) {
  $(`.form-${addN}`).addClass("form-hidden");
  $(`.form-${removeN}`).removeClass("form-hidden");
}

function resetFoodData() {
  createFood = {
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
}

function resetForms() {
  $(".dialog-form").each(function () {
    this.reset();
  });
  $("#preview").hide().attr("src", "");
}

// Función para renderizar el store de alimentos
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
        </div>
        <div class="card-macros">
          <div class="type-allergens">
            <span><h4>Tipo: </h4> ${food.type}</span>
            <span><h4>Alérgenos: </h4> ${food.allergens}</span>
            <span><h4>Porción: </h4> ${food.portion}</span>
          </div>
          <div class="micronutrients">
            <span><h4>Hierro: </h4> ${food.macros.iron}</span>
            <span><h4>Vit. C: </h4> ${food.macros.vitaminC}</span>
            <span><h4>Vit. D: </h4> ${food.macros.vitaminD}</span>
          </div>
        </div>
      </li>
    `);
  });
}

$(function () {
  const $dialog = $("#favDialog");

  // Abrir modal
  $("#newFood").on("click", function () {
    $dialog[0].showModal();
  });

  // Cerrar modal
  $("#cancel").on("click", function () {
    $dialog[0].close();
    resetForms();
    resetFoodData();
  });

  if (foodStore.length === 0) {
    $("#foodList").text("No hay comida almacenada").css("color", "grey");
  }

  $(".check-btn").on("click", function () {
    $(`.check-btn`).toggleClass("check-btn-border");
  });

  $(".next-tab-btn").on("click", function () {
    const $currentForm = $(`.form-${currentTab}`);

    const inputs = $currentForm.find("input, select, textarea");
    let isValid = true;

    // Validamos campos
    inputs.each(function () {
      if (!this.checkValidity()) {
        this.reportValidity();
        isValid = false;
        return false;
      }
    });

    if (!isValid) return;

    $(".next-tab-btn").text("SIGUIENTE");

    if (currentTab === 4) {
      $(".next-tab-btn").text("TERMINAR");
    }

    // Si es el último tab, guardamos en el store,
    // reseteamos el form, renderizamos y cerramos el modal
    if (currentTab === 5) {
      addToFoodStore(createFood);
      currentTab = 1;
      showTab(5, 1);
      renderFoodStore();
      resetForms();
      resetFoodData();
      $dialog[0].close();
      return;
    }

    nextTab();
    showTab(currentTab - 1, currentTab);

    const name = $("#name").val();
    const calories = $("#calories").val();
    const type = $("#type").val();
    const allergens = $("#allergens").val();
    const portion = $("#portion").val();
    const photo = $("#photo").val();
    const iron = $("#iron").val();
    const vitaminC = $("#vitaminC").val();
    const vitaminD = $("#vitaminD").val();

    // Agregamos el nuevo alimento al store
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
  });

  $(".prev-tab-btn").on("click", function () {
    if (currentTab === 1) return;
    prevTab();
    showTab(currentTab + 1, currentTab);
  });

  // Intercepta el archivo y lo convertimos a base64 para mostrarlo
  $("#photo").on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const base64Image = e.target.result;
        $("#preview").attr("src", base64Image).show();

        createFood = {
          ...createFood,
          photo: base64Image,
        };
      };

      reader.readAsDataURL(file);
    }
  });
});
