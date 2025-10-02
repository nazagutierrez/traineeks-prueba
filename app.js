const foodStore = []
let currentTab = 0

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
  }
}

function addFood(food) {
  createFood = {
    ...createFood,
    ...food
  }
}

function addToFoodStore(foodToCreate) {
  foodStore.push(foodToCreate)
}

function nextTab() {
  currentTab++
}

function prevTab() {
  if (currentTab === 0) return
  currentTab--
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

  $("#next-tab-btn").on("click", function () {
    nextTab()
  })

  $("#prev-tab-btn").on("click", function () {
    prevTab()
  })
});
