// Получение значений элементов
function fetchData() {
  const entity = document.getElementById("entity").value;
  const entityId = document.getElementById("entityId").value;
  const loadingDiv = document.getElementById("loading");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  // Сброс результатов и ошибок
  resultDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  // Проверка выбранной сущности
  if (!entity) {
    errorDiv.innerHTML = "Ошибка: Сущность не выбрана";
    return;
  }

  // Проверка введенного идентификатора
  if (!entityId || entityId < 1 || entityId > 10) {
    errorDiv.innerHTML =
      "Ошибка: Недопустимое значение (выберите число от 1 до 10)";
    return;
  }

  // Показывать сообщение о загрузке
  loadingDiv.style.display = "block";

  // Определение соответствия сущностей и отображаемых свойств
  const entityProperties = {
    films: ["title", "director", "release_date"],
    people: ["name", "height", "mass", "hair_color", "skin_color"],
    planets: ["name", "population", "terrain", "climate"],
    species: ["name", "classification", "language"],
    starships: ["name", "model", "manufacturer", "crew"],
    vehicles: ["name", "model", "manufacturer", "passengers"],
  };

  // Получение свойств для отображения в зависимости от выбранной сущности
  const propertiesToShow = entityProperties[entity];

  // Запрос к API
  // Запрос к API
  fetch(`https://swapi.dev/api/${entity}/${entityId}`)
    .then((response) => {
      // Скрыть сообщение о загрузке
      loadingDiv.style.display = "none";

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      // Обработка результатов
      if (Array.isArray(data)) {
        resultDiv.innerHTML = "Результаты: <ul>";
        data.forEach((item) => {
          resultDiv.innerHTML += "<li>";
          propertiesToShow.forEach((property) => {
            resultDiv.innerHTML += `${property}: ${item[property]} <br>`;
          });
          resultDiv.innerHTML += "</li>";
        });
        resultDiv.innerHTML += "</ul>";
      } else {
        resultDiv.innerHTML = "<br>";
        propertiesToShow.forEach((property) => {
          resultDiv.innerHTML += `${property}: ${data[property]} <br>`;
        });
      }
    })
    .catch((error) => {
      // Скрыть сообщение о загрузке
      loadingDiv.style.display = "none";

      // Отобразить ошибку
      if (error.message === "Failed to fetch") {
        errorDiv.innerHTML = "Ошибка: Сервер недоступен";
      } else {
        errorDiv.innerHTML = "Ошибка: 404  Not Found" + error.message;
      }
    })
    .finally(() => {
      // Сбросить сообщение о загрузке
      loadingDiv.style.display = "none";
    });
}
