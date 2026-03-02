const resultDiv = document.getElementById("result");


async function getAllPosts() {
    // покзываем индикатор загрузки с анимацией 
    resultDiv.innerHTML =
        '<p class="text-center text-gray-500 animate-pulse">Загрузка постов...</p>';

    try {
        // отправляем GET-запрос к API для получения всех постов
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        
       
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // парсим JSON-ответ в массив объектов постов
        const posts = await res.json();

        // формируем заголовок с количеством полученных постов
        let html = `<h3 class="text-xl font-bold mb-4">
            Получено ${posts.length} постов (показываем первые 10)
        </h3>`;

        //  формируем HTML для первых 10 постов
        posts.slice(0, 10).forEach((post) => {
            html += `
                <div class="mb-6 p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                    <h4 class="text-lg font-semibold mb-2">${post.title}</h4>
                    <p class="text-gray-700 dark:text-gray-300">${post.body}</p>

                    <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        userId: ${post.userId} • postId: ${post.id}
                    </div>
                </div>
            `;
        });

        // вставляем HTML в блок результатов
        resultDiv.innerHTML = html;

    } catch (err) {
        // в случае ошибки показываем сообщение
        resultDiv.innerHTML = `
            <p class="text-red-600 font-medium">Ошибка: ${err.message}</p>
            <p class="text-sm text-gray-500 mt-2">
                Проверьте консоль (F12) для деталей
            </p>
        `;

        // выводим ошибку в консоль для отладки
        console.error(err);
    }
}


async function getPost5() {
    // показываем индикатор загрузки
    resultDiv.innerHTML =
        '<p class="text-center text-gray-500 animate-pulse">Загрузка поста №5...</p>';

    try {
        // отправляем GET-запрос для получения поста с id=5
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/5");
        
        // проверяем успешность запроса
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // парсим JSON-ответ в объект поста
        const post = await res.json();

        // формируем и отображаем HTML с данными полученного поста
        resultDiv.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Пост №5</h3>

            <div class="p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                <h4 class="text-lg font-semibold mb-2">${post.title}</h4>
                <p class="text-gray-700 dark:text-gray-300">${post.body}</p>

                <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    userId: ${post.userId} • postId: ${post.id}
                </div>
            </div>
        `;

    } catch (err) {
        // обработка ошибок - показываем сообщение пользователю
        resultDiv.innerHTML =
            `<p class="text-red-600 font-medium">Ошибка: ${err.message}</p>`;
        // логируем ошибку в консоль для разработчика
        console.error(err);
    }
}

async function createPost() {
    // получаем ссылки на поля ввода по их ID
    const titleEl = document.getElementById("title");
    const bodyEl = document.getElementById("body");

    // получаем значения из полей ввода, обрезаем пробелы
    // если поле пустое - используем значения по умолчанию
    const title = titleEl.value.trim() || "Тестовый заголовок";
    const body = bodyEl.value.trim() || "Тестовый текст поста";

    // показываем индикатор отправки запроса
    resultDiv.innerHTML =
        '<p class="text-center text-gray-500 animate-pulse">Отправка POST-запроса...</p>';

    try {
        // отправляем POST-запрос с данными нового поста
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST", // указываем метод HTTP
            headers: { "Content-Type": "application/json" }, // Указываем тип отправляемых данных
            body: JSON.stringify({ 
                title,      // заголовок из формы или значение по умолчанию
                body,       // текст поста из формы или значение по умолчанию
                userId: 777 // произвольный ID пользователя (для демонстрации)
            }), // преобразуем объект в JSON-строку
        });

        // парсим JSON-ответ от сервера
        const data = await res.json();

        // формируем и отображаем результат успешного POST-запроса
        resultDiv.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-green-600"> POST-запрос успешен!</h3>
            <div class="p-5 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p><strong>Статус:</strong> ${res.status} ${res.ok ? "(OK)" : ""}</p>
                <p><strong>Новый id (симуляция):</strong> ${data.id}</p>
                <p><strong>Заголовок:</strong> ${data.title}</p>
                <p class="mt-3 text-sm text-gray-500"> Тело: ${data.body.substring(0, 120)} ${data.body.length > 120 ? "..." : ""}</p>
            </div>
        `;

    } catch (err) {
        // обработка ошибок при создании поста
        resultDiv.innerHTML = `<p class="text-red-600 font-medium">Ошибка при создании поста: ${err.message}</p>`;
        // логируем ошибку в консоль
        console.error(err);
    }
}