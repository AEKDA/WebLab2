// canvas working
const points = [];
const canvas = document.getElementById("canvas");
let canvasStyle = getComputedStyle(canvas);
canvas.width = parseInt(canvasStyle.width);
canvas.height = parseInt(canvasStyle.height);

const ctx = canvas.getContext("2d");

function drawFigure(x, y, canvasWidth, canvasHeight) {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	const axisLength = canvasWidth / 1.5; // Длина каждой оси

	// Рисование осей X и Y
	ctx.beginPath();
	ctx.moveTo(x, 0);
	ctx.lineTo(x, canvas.height);
	ctx.moveTo(0, y);
	ctx.lineTo(canvas.width, y);
	ctx.strokeStyle = "black";
	ctx.stroke();

	// Рисование ">"
	const arrowSize = 8;

	// Стрелка по оси X
	ctx.beginPath();
	ctx.moveTo(canvas.width, y);
	ctx.lineTo(canvas.width - arrowSize, y - arrowSize);
	ctx.lineTo(canvas.width - arrowSize, y + arrowSize);
	ctx.lineTo(canvas.width, y);

	// Стрелка по оси Y
	ctx.moveTo(x, 0);
	ctx.lineTo(x - arrowSize, arrowSize);
	ctx.lineTo(x + arrowSize, arrowSize);
	ctx.lineTo(x, 0);

	ctx.fillStyle = "black";
	ctx.fill();

	// Нарисовать "x" и "y" на осях
	ctx.font = "14px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("X", canvas.width - 15, y - 10);
	ctx.fillText("Y", x + 10, 15);

	// Нарисовать метки на осях
	ctx.font = "12px Arial";
	ctx.fillStyle = "black";

	const labels = ["-R", "-R/2", "R/2", "R"];
	const labelPositions = [
		-axisLength / 2,
		-axisLength / 4,
		axisLength / 4,
		axisLength / 2,
	];

	labels.forEach((label, index) => {
		const labelX = x + labelPositions[index];
		const labelY = y - labelPositions[index];

		ctx.fillText(label, labelX - 10, y + 20);
		ctx.fillText(label, x + 10, labelY + 3);

		// Рисование вертикальной линии (|)
		ctx.beginPath();
		ctx.moveTo(labelX, y - 5);
		ctx.lineTo(labelX, y + 5);
		ctx.strokeStyle = "black";
		ctx.stroke();

		// Рисование горизонтальной линии (-)
		ctx.beginPath();
		ctx.moveTo(x - 5, labelY);
		ctx.lineTo(x + 5, labelY);
		ctx.strokeStyle = "black";
		ctx.stroke();
	});

	// Рисование четверти круга
	ctx.globalCompositeOperation = "destination-over";
	ctx.beginPath();
	ctx.arc(x, y, axisLength / 4, -Math.PI / 2, 0);
	ctx.lineTo(x, y);
	ctx.fillStyle = "lightblue";
	ctx.fill();
	ctx.globalCompositeOperation = "source-over";

	// Рисование квадрата
	ctx.globalCompositeOperation = "destination-over";
	const squareSize = axisLength / 2;
	ctx.fillStyle = "lightgreen";
	ctx.fillRect(x, y + axisLength / 2, squareSize, -squareSize);
	ctx.globalCompositeOperation = "source-over"; // Восстановить режим наложения

	// Рисование прямоугольного треугольника
	ctx.globalCompositeOperation = "destination-over";
	ctx.beginPath();
	ctx.moveTo(x, y); // Вершина (0,0)
	ctx.lineTo(x, y + axisLength / 4); // Вершина (0, -R/2)
	ctx.lineTo(x - axisLength / 4, y); // Вершина (-R/2, 0)
	ctx.lineTo(x, y); // Вершина (0,0)
	ctx.fillStyle = "orange"; // Цвет треугольника
	ctx.fill();
	ctx.globalCompositeOperation = "source-over";

	points.forEach((point) => {
		ctx.beginPath();
		ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
		ctx.fillStyle = point.status === "Подтверждено" ? "green" : "red";
		ctx.fill();
	});
}

// Пример вызова функции с указанием ширины и высоты графика
drawFigure(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);

// canvas click

function handleCanvasClick(event) {

	if (!ifRSetCorrect()) {
		showCustomAlert(
			"Невозможно определить координаты точки. Введите R"
		);
		return;
	}

	const rect = canvas.getBoundingClientRect(); // Получить координаты холста
	const mouseX = event.clientX - rect.left; // Координаты мыши X
	const mouseY = event.clientY - rect.top; // Координаты мыши Y

	// Проверка, чтобы точка была внутри графика
	if (
		mouseX >= 0 &&
		mouseX <= canvas.width &&
		mouseY >= 0 &&
		mouseY <= canvas.height
	) {
		// Проверка, попала ли точка в четверть круга
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const axisLength = canvas.width / 1.5;
		const radius = axisLength / 4;

		const distanceToCenter = Math.sqrt(
			(mouseX - centerX) ** 2 + (mouseY - centerY) ** 2
		);

		// Проверка, попала ли точка в квадрат
		const squareX = centerX;
		const squareY = centerY;
		const squareSize = axisLength / 2;

		if (
			(distanceToCenter <= radius && mouseX >= 200 && mouseY <= 200) ||
			(mouseX >= squareX &&
				mouseX <= squareX + squareSize &&
				mouseY >= squareY &&
				mouseY <= squareY + squareSize) ||
			(-133.33 / 2 - (mouseX - 200) - -(mouseY - 200) <= 0 && mouseX <= 200 && mouseY >= 200)
		) {
			// Точка попала в график
			ctx.beginPath();
			ctx.arc(mouseX, mouseY, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "green"; // Зеленый цвет, так как попала
		} else {
			// Точка не попала в график
			ctx.beginPath();
			ctx.arc(mouseX, mouseY, 3, 0, 2 * Math.PI);
			ctx.fillStyle = "red"; // Красный цвет, так как не попала
		}

		let rInput = document.getElementById("r-input");
		let rValue = rInput.value.replace(",", ".");
		let point = {
			x: (mouseX - 200) / 133.33 * rValue,
			y: -(mouseY - 200) / 133.33 * rValue,
			r: rValue,
			status: "Не подтверждено"
		};
		points.push(point);
		ctx.fill();
		// drawFigure(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
		sendDataToServer(point);
	}
}

canvas.addEventListener("click", handleCanvasClick);

function ifRSetCorrect() {
	let rInput = document.getElementById("r-input");
	let rValue = rInput.value.replace(",", ".");
	if (!nonCorrectDec(rValue, "r") && checkBased(rValue, 2, 5, "r")) {
		return true;
	}
	return false;
}

function sendDataToServer(point) {
	const resultTable = document.querySelector(".result-table");
	fetch("/lab2/control", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(point),
	})
		.then((response) => {
			if (response.ok) {
				return response.json(); // Парсим JSON из ответа
			} else {
				showCustomAlert("Ошибка при отправке точки на сервер");
				return null;
			}
		}).then((response) => {
			const newRow = createResultRow(response);
			const firstDataRow = resultTable.querySelector(".row:not(.head)");
			resultTable.insertBefore(newRow, firstDataRow);
			if (response) {
				showCustomAlert("Точка успешно отправлена на сервер");

				const updatedPoint = points.find(
					(p) => p.x === point.x && p.y === point.y
				);
				if (updatedPoint) {
					updatedPoint.status = "Подтверждено";
				}
			}
		})
		.catch((error) => {
			console.error("Ошибка при выполнении запроса:", error);
			showCustomAlert("Ошибка при отправке точки на сервер");
		});
}

canvas.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
	const rect = canvas.getBoundingClientRect();
	const mouseX = event.clientX - rect.left;
	const mouseY = event.clientY - rect.top;

	let rInput = document.getElementById("r-input");
	let rValue = rInput.value.replace(",", ".");

	let mousePoint = {
		x: (mouseX - 200) / 133.33 * rValue,
		y: -(mouseY - 200) / 133.33 * rValue,
	};
	const pointUnderCursor = points.find((point) => {

		const distance = Math.sqrt(
			(mousePoint.x - point.x) ** 2 + (mousePoint.y - point.y) ** 2
		);
		return distance <= 0.08 // Проверяем, находится ли курсор над точкой
	});


	const statusContainer = document.getElementById("status-container");
	const statusText = document.getElementById("status-text");

	if (pointUnderCursor) {
		// Позиционируем контейнер статуса над точкой
		// statusContainer.style.left = `${event.clientX}px`;
		// statusContainer.style.top = `${event.clientY + 80}px`;
		statusContainer.style.left = `${mouseX}px`;
		statusContainer.style.top = `${mouseY + 120}px`;

		// Отображаем статус точки
		statusText.textContent = `Статус: ${pointUnderCursor.status}`;
		statusContainer.style.display = "block";
	} else {
		// Если курсор не на точке, скрываем контейнер
		statusContainer.style.display = "none";
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	points.length = 0;
	drawFigure(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
}

// update data

document.addEventListener("DOMContentLoaded", updateData);

function updateData() {
	fetch("/lab2/control", {
		method: "GET"
	})
		.then(handleDataResponse)
		.catch((error) => console.warn("Ошибка при выполнении запроса:", error));
}

function handleDataResponse(response) {
	if (!response.ok) {
		console.warn("Ошибка при выполнении запроса. Статус:", response.status);
		return;
	}

	response
		.json()
		.then((data) => {
			if (data) {
				const resultTable = document.querySelector(".result-table");
				appendDataToTable(resultTable, data);
			}
		})
		.catch((error) => console.warn("Ошибка при парсинге JSON:", error));
}

function appendDataToTable(table, data) {
	for (const item of data) {
		const newRow = createDataRow(item);
		const firstDataRow = table.querySelector(".row:not(.head)");
		if (firstDataRow) {
			table.insertBefore(newRow, firstDataRow);
		} else {
			table.appendChild(newRow);
		}
	}
}

function createDataRow(dataItem) {
	const newRow = document.createElement("div");
	newRow.classList.add("row");

	const myTime = new Date(dataItem.date * 1000).toLocaleTimeString();
	newRow.innerHTML = `
    <div class="x">${dataItem.x}</div>
    <div class="y">${dataItem.y}</div>
    <div class="r">${dataItem.r}</div>
    <div class="ct">${myTime}</div>
    <div class="et">${dataItem.executionTime} ns</div>
    <div class="result">${dataItem.hit}</div>
  `;

	return newRow;
}

// input listeners

function setInputListeners() {
	let xInput = document.getElementById("x-input");
	let yInput = document.getElementById("y-input");
	let rInput = document.getElementById("r-input");

	let xValue = xInput.value.replace(",", ".");
	let yValue = yInput.value.replace(",", ".");
	let rValue = rInput.value.replace(",", ".");

	if (
		nonCorrectDec(xValue, "x") ||
		nonCorrectDec(yValue, "y") ||
		nonCorrectDec(rValue, "r")
	) {
		return;
	}
}
document.addEventListener("input", setInputListeners);

// is correct dec
function nonCorrectDec(value, what) {
	const regex = /^-?\d*\.?\d+$/; // check dec
	if (!regex.test(value)) {
		showCustomAlert(`Введенное значение ${what} не является десятичным числом`);
		updateSubmitButton();
		return true;
	}
	return false;
}

function createResultRow(response) {
	const newRow = document.createElement("div");
	newRow.classList.add("row");

	const date = new Date(response.date * 1000).toLocaleTimeString();

	newRow.innerHTML = `
    <div class="x">${response.x}</div>
    <div class="y">${response.y}</div>
    <div class="r">${response.r}</div>
    <div class="ct">${date}</div>
    <div class="et">${response.executionTime} ns</div>
    <div class="result">${response.hit}</div>
  `;

	return newRow;
}

// presend check-in

function submitDataValidationFetch() {
	const submitButton = document.getElementById("submit-button");
	const resultTable = document.querySelector(".result-table");

	submitButton.addEventListener("click", function () {
		const xInput = parseFloat(
			document.getElementById("x-input").value.replace(",", ".")
		);
		const yInput = parseFloat(
			document.getElementById("y-input").value.replace(",", ".")
		);
		const rInput = parseFloat(
			document.getElementById("r-input").value.replace(",", ".")
		);

		if (isFormValid()) {
			const data = {
				x: xInput,
				y: yInput,
				r: rInput,
			};

			fetch("/lab2/control", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Ошибка при отправке данных на сервер.");
					}
				})
				.then((response) => {
					const newRow = createResultRow(response);
					const firstDataRow = resultTable.querySelector(".row:not(.head)");
					resultTable.insertBefore(newRow, firstDataRow);
				})
				.catch((error) => showCustomAlert(error.message));
		}
		updateSubmitButton();
	});
}

// clear

let clearButton = document.getElementById("clearButton");
function clearRequest() {
	fetch("/lab2/control", {
		method: "DELETE",
	})
		.then((response) => {
			if (response.ok) {
				return response.text();
			} else {
				throw new Error("Ошибка при очистке данных на сервере.");
			}
		})
		.then(() => {
			let resultTable = document.querySelector(".result-table");
			while (resultTable.children.length > 1) {
				resultTable.removeChild(resultTable.children[1]);
			}
			clearSelectedButtons();
			clearLocalStorage();
			updateSubmitButton();
		})
		.catch((error) => console.error(error));

	clearSelectedButtons();
	clearLocalStorage();
	updateSubmitButton();
	clearCanvas();
}
clearButton.addEventListener("click", clearRequest);

// alert
function showCustomAlert(message) {
	const customAlert = document.querySelector(".custom-alert");
	customAlert.textContent = message;
	customAlert.style.opacity = "1";

	setTimeout(() => {
		customAlert.style.opacity = "0";
	}, 5000);
}

function hideCustomAlert() {
	const customAlert = document.querySelector(".custom-alert");
	customAlert.style.opacity = "0";
}

// validation
function isFormValid() {
	const xInput = document.getElementById("x-input");
	const yInput = document.getElementById("y-input");
	const rInput = document.getElementById("r-input");

	let xValue = xInput.value.replace(",", ".");
	let yValue = yInput.value.replace(",", ".");
	let rValue = rInput.value.replace(",", ".");

	if (
		!checkBased(xValue, -3, 3, "x") ||
		!checkBased(yValue, -5, 5, "y") ||
		!checkBased(rValue, 2, 5, "r")
	) {
		return false;
	}

	return true;
}

function checkBased(value, left, right, name) {
	if (isNaN(value) || value <= left || value >= right) {
		showCustomAlert(
			`Введите корректное значение ${name} в диапазоне от ${left} до ${right} (не включительно).`
		);
		return false;
	}
	return true;
}

// submit button opacity
function updateSubmitButton() {
	const submitButton = document.getElementById("submit-button");
	const isFormValidFlag = isFormValid();
	submitButton.disabled = !isFormValidFlag;

	if (isFormValidFlag) {
		submitButton.style.opacity = 1;
	} else {
		submitButton.style.opacity = 0.5;
	}
}

// init state
document.addEventListener("DOMContentLoaded", function () {
	loadStateFromLocalStorage();
	setInputListeners();
	submitDataValidationFetch();
});

// load from localstorage
function loadStateFromLocalStorage() {
	const xInput = document.getElementById("x-input");
	const yInput = document.getElementById("y-input");
	const rInput = document.getElementById("r-input");

	const savedX = localStorage.getItem("selectedX");
	const savedY = localStorage.getItem("selectedY");
	const savedR = localStorage.getItem("selectedR");

	if (savedX) {
		xInput.value = savedX;
	}
	if (savedY) {
		yInput.value = savedY;
	}
	if (savedR) {
		rInput.value = savedR;
	}

	xInput.addEventListener("input", updateSubmitButton);
	yInput.addEventListener("input", updateSubmitButton);
	rInput.addEventListener("input", updateSubmitButton);
}

// clear local storage
function clearLocalStorage() {
	localStorage.removeItem("selectedX");
	localStorage.removeItem("selectedY");
	localStorage.removeItem("selectedR");
}

// clear inputs
function clearSelectedButtons() {
	let xInput = document.getElementById("x-input");
	let yInput = document.getElementById("y-input");
	let rInput = document.getElementById("r-input");

	xInput.value = "";
	yInput.value = "";
	rInput.value = "";

	updateSubmitButton();
}
