// === 1. БАЗА СЛОВ ===
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

// === 2. ПЕРЕМЕННЫЕ ===
let currentWordIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

// === 3. ЗАПУСК ===
function startApp() {
    console.log("Приложение запущено!");

    const englishWordElement = document.getElementById('english-word');
    if (!englishWordElement) {
        console.error("Не найден элемент #english-word. Проверь структуру HTML!");
        return;
    }

    setupTrainer();
}

// === 4. НАСТРОЙКА ТРЕНАЖЕРА ===
function setupTrainer() {
    const currentElement = document.getElementById('current');
    const totalElement = document.getElementById('total');

    const counterTrueElement = document.getElementById('counter_true');
    const counterFalseElement = document.getElementById('counter_false');
    const totalTrueElement = document.getElementById('total_true');
    const totalFalseElement = document.getElementById('total_false');

    const englishWordElement = document.getElementById('english-word');
    const inputElement = document.getElementById('translation-input');
    const checkButton = document.getElementById('check-btn');

    if (!englishWordElement || !inputElement || !checkButton) {
        console.error("Элементы интерфейса не найдены!");
        return;
    }

    const totalWords = words.length;

    totalElement.textContent = totalWords;
    totalTrueElement.textContent = totalWords;
    totalFalseElement.textContent = totalWords;
    currentElement.textContent = 1;
    counterTrueElement.textContent = 0;
    counterFalseElement.textContent = 0;

    englishWordElement.textContent = words[0].english;
    inputElement.focus();

    checkButton.addEventListener('click', function(event) {
        event.preventDefault();

        const userTranslation = inputElement.value.trim().toLowerCase();

        if (!userTranslation) {
            alert("Введите перевод!");
            inputElement.focus();
            return;
        }

        const correctTranslation = words[currentWordIndex].russian.toLowerCase();

        if (userTranslation === correctTranslation) {
            correctAnswers++;
            counterTrueElement.textContent = correctAnswers;
            currentWordIndex++;

            if (currentWordIndex < words.length) {
                currentElement.textContent = currentWordIndex + 1;
                englishWordElement.textContent = words[currentWordIndex].english;
                inputElement.value = '';
                inputElement.focus();
            } else {
                englishWordElement.textContent = "🎉 Поздравляем! Вы все запомнили!";
                inputElement.style.display = 'none';
                checkButton.style.display = 'none';
            }
        } else {
            wrongAnswers++;
            counterFalseElement.textContent = wrongAnswers;

            alert("❌ Неправильно! Попробуйте еще раз.");
            inputElement.value = '';
            inputElement.focus();
        }
    });

    inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkButton.click();
        }
    });
}

document.addEventListener('DOMContentLoaded', startApp);
