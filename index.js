// Исходный список грузов
const cargoList = [
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24",
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26",
    },
  ];
  
  // Цвета для статусов
  const statusColors = {
    "Ожидает отправки": "bg-warning",
    "В пути": "bg-primary",
    Доставлен: "bg-success",
  };
  
  // Селекторы элементов
  const cargoTableBody = document.getElementById("cargoTableBody");
  const filterStatus = document.getElementById("filterStatus");
  const addCargoForm = document.getElementById("addCargoForm");
  
  // Функция рендеринга таблицы
  function renderTable(filter = "all") {
    cargoTableBody.innerHTML = ""; // Очистить таблицу
  
    const filteredList =
      filter === "all" ? cargoList : cargoList.filter((cargo) => cargo.status === filter);
  
    filteredList.forEach((cargo) => {
      const row = document.createElement("tr");
  
      // Установка цвета строки в зависимости от статуса
      row.classList.add(statusColors[cargo.status]);
  
      row.innerHTML = `
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td>
          <select class="form-select form-select-sm status-selector">
            <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
            <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
            <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
          </select>
        </td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-btn">Удалить</button>
        </td>
      `;
  
      // Добавляем слушатель на изменение статуса
      row.querySelector(".status-selector").addEventListener("change", (event) => {
        const newStatus = event.target.value;
  
        // Проверка условия для статуса "Доставлен"
        if (
          newStatus === "Доставлен" &&
          new Date(cargo.departureDate) > new Date()
        ) {
          alert("Невозможно установить статус 'Доставлен' до отправки груза!");
          event.target.value = cargo.status; // Оставить старый статус
          return;
        }
  
        cargo.status = newStatus; // Обновить статус
        renderTable(filterStatus.value); // Перерендерить таблицу
      });
  
      // Слушатель для удаления груза
      row.querySelector(".delete-btn").addEventListener("click", () => {
        const index = cargoList.indexOf(cargo);
        if (index > -1) cargoList.splice(index, 1); // Удалить груз из массива
        renderTable(filterStatus.value); // Перерендерить таблицу
      });
  
      cargoTableBody.appendChild(row);
    });
  }
  
  // Обработчик для фильтрации
  filterStatus.addEventListener("change", () => {
    renderTable(filterStatus.value);
  });
  
  // Обработчик для формы добавления груза
  addCargoForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Предотвратить перезагрузку страницы
  
    const name = document.getElementById("cargoName").value.trim();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departureDate").value;
  
    // Проверка заполнения всех полей
    if (!name || !origin || !destination || !departureDate) {
      alert("Пожалуйста, заполните все поля формы!");
      return;
    }
  
    // Генерация ID и добавление нового груза
    const newCargo = {
      id: `CARGO${(cargoList.length + 1).toString().padStart(3, "0")}`,
      name,
      status: "Ожидает отправки",
      origin,
      destination,
      departureDate,
    };
  
    cargoList.push(newCargo); // Добавить груз в массив
    addCargoForm.reset(); // Сброс формы
    renderTable(filterStatus.value); // Перерендерить таблицу
  });
  
  // Начальный рендер таблицы
  renderTable();
  