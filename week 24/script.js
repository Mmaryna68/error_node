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

  // Проверка введенного идентификатора
  if (entityId < 1 || entityId > 10) {
    errorDiv.innerHTML =
      "Ошибка: Недопустимое значение (выберите число от 1 до 10)";
    return;
  }

  // Показывать сообщение о загрузке
  loadingDiv.style.display = "block";

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
          if (item.title) {
            resultDiv.innerHTML += "<li>" + item.title + "</li>";
          }
        });
        resultDiv.innerHTML += "</ul>";
      } else {
        if (entity === "films") {
          resultDiv.innerHTML = "Название: " + data.title;
        } else {
          resultDiv.innerHTML = "Имя: " + data.name;
        }
      }
    })
    .catch((error) => {
      // Скрыть сообщение о загрузке
      loadingDiv.style.display = "none";

      // Отобразить ошибку
      if (error.message === "Failed to fetch") {
        errorDiv.innerHTML = "Ошибка: Сервер не доступен";
      } else {
        errorDiv.innerHTML = "Ошибка: 404  Not Found" + error.message;
      }
    })
    .finally(() => {
      // Сбросить сообщение о загрузке
      loadingDiv.style.display = "none";
    });
}
