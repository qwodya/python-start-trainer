// Модуль інтеграції зовнішніх відкритих REST API (Lab 9)
const API_URL = "https://official-joke-api.appspot.com/jokes/programming/random";

const FALLBACK_QUOTE = {
    setup: "Чому програмісти на Python люблять чистий код?",
    punchline: "Бо відступи в Python мають значення для всієї команди!"
};

export async function fetchDailyTip() {
    try {
        const response = await fetch(API_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP помилка зі статусом: ${response.status}`);
        }
        const data = await response.json();
        const joke = Array.isArray(data) ? data[0] : data;
        return {
            setup: joke.setup || "Цікавий факт про Python",
            punchline: joke.punchline || "Мова названа на честь шоу Монті Пайтон!",
            isFallback: false
        };
    } catch (error) {
        console.warn("Мережевий запит до REST API не вдався. Використовуємо резервний кеш:", error.message);
        return {
            ...FALLBACK_QUOTE,
            isFallback: true,
            errorNote: error.message
        };
    }
}
