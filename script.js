// === 1. БАЗА СЛОВ - ПРОСТО СПИСОК СЛОВ ДЛЯ ЗАПОМИНАНИЯ ===
const words = [
    { english: "apple", russian: "яблоко" },
    { english: "book", russian: "книга" },
    { english: "cat", russian: "кошка" },
    { english: "dog", russian: "собака" },
    { english: "house", russian: "дом" },
    { english: "water", russian: "вода" },
    { english: "sun", russian: "солнце" },
    { english: "tree", russian: "дерево" },
    { english: "car", russian: "машина" },
    { english: "computer", russian: "компьютер" }
];

// === 2. ПЕРЕМЕННЫЕ-СЧЕТЧИКИ - ЗАПОМИНАЮТ ТЕКУЩЕЕ СОСТОЯНИЕ ===
let currentWordIndex = 0;    // Какое слово сейчас показываем (начинаем с первого)
let correctAnswers = 0;      // Сколько слов угадали правильно
let wrongAnswers = 0;        // Сколько слов угадали неправильно

// === 3. ОСНОВНАЯ ФУНКЦИЯ - ЗАПУСКАЕТСЯ ПРИ ОТКРЫТИИ СТРАНИЦЫ ===
function startApp() {
    console.log("Приложение запущено!");

    // Проверяем, находимся ли мы на странице тренажера
    if (!document.getElementById('english-word')) {
        return;
    }

    // Запускаем тренажер
    setupTrainer();
}

// === 4. НАСТРОЙКА ТРЕНАЖЕРА ===
function setupTrainer() {
    // Счетчики слов
    const currentElement = document.getElementById('current');           // Текущее слово (1/10)
    const totalElement = document.getElementById('total');              // Всего слов (1/10)

    // Счетчики правильных/неправильных
    const counterTrueElement = document.getElementById('counter_true');  // Правильные ответы
    const counterFalseElement = document.getElementById('counter_false'); // Неправильные ответы
    const totalTrueElement = document.getElementById('total_true');     // Всего для правильных
    const totalFalseElement = document.getElementById('total_false');   // Всего для неправильных

    // Основные элементы тренажера
    const englishWordElement = document.getElementById('english-word');  // Английское слово
    const inputElement = document.getElementById('translation-input');   // Поле для ввода
    const checkButton = document.getElementById('check-btn');            // Кнопка "Проверить"

    // ПРОВЕРЯЕМ, ЧТО ВСЕ ЭЛЕМЕНТЫ НАЙДЕНЫ
    if (!englishWordElement || !inputElement || !checkButton) {
        console.log("Это не страница тренажера");
        return;
    }

    // НАСТРАИВАЕМ НАЧАЛЬНЫЕ ЗНАЧЕНИЯ
    const totalWords = words.length;  // Сколько всего слов в списке

    // Устанавливаем значения в счетчики
    totalElement.textContent = totalWords;
    totalTrueElement.textContent = totalWords;
    totalFalseElement.textContent = totalWords;
    currentElement.textContent = 1;  // Начинаем с первого слова
    counterTrueElement.textContent = 0;
    counterFalseElement.textContent = 0;

    // Показываем первое английское слово
    englishWordElement.textContent = words[0].english;

    // Ставим курсор в поле для ввода
    inputElement.focus();

    // === 5. ДОБАВЛЯЕМ РЕАКЦИЮ НА КНОПКУ "ПРОВЕРИТЬ" ===
    checkButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы, если она есть

        // Получаем то, что написал пользователь
        const userTranslation = inputElement.value.trim().toLowerCase();

        // Проверяем, что пользователь что-то ввел
        if (!userTranslation) {
            alert("Введите перевод!");
            inputElement.focus();
            return; // ВАЖНО! Останавливаем дальнейшее выполнение
        }

        // Получаем правильный перевод для текущего слова
        const correctTranslation = words[currentWordIndex].russian.toLowerCase();

        // Сравниваем то, что ввел пользователь, с правильным ответом
        if (userTranslation === correctTranslation) {
            // ЕСЛИ ПРАВИЛЬНО
            correctAnswers++;
            counterTrueElement.textContent = correctAnswers;

            currentWordIndex++;

            // Проверяем, остались ли еще слова
            if (currentWordIndex < words.length) {
                currentElement.textContent = currentWordIndex + 1;
                englishWordElement.textContent = words[currentWordIndex].english;
                inputElement.value = '';
                inputElement.focus();
            } else {
                // Слова закончились
                englishWordElement.textContent = "🎉 Поздравляем! Вы все запомнили!";
                inputElement.style.display = 'none';
                checkButton.style.display = 'none';
            }
        } else {
            // ЕСЛИ НЕПРАВИЛЬНО
            wrongAnswers++;
            counterFalseElement.textContent = wrongAnswers;

            alert("❌ Неправильно! Попробуйте еще раз.");
            inputElement.value = '';
            inputElement.focus();
        }
    });

    // === 6. ДОБАВЛЯЕМ РЕАКЦИЮ НА КЛАВИШУ ENTER ===
    inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Чтобы форма не отправлялась
            checkButton.click();    // Имитируем нажатие кнопки
        }
    });
}

// === 7. ЗАПУСКАЕМ ПРИЛОЖЕНИЕ КОГДА СТРАНИЦА ЗАГРУЖЕНА ===
document.addEventListener('DOMContentLoaded', startApp);
