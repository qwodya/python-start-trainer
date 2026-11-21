// Модуль динамічного рендерингу інтерфейсу тренажера «PythonStart»
import { topics } from "./topics.js";
import { theoryData } from "./theory.js";
import { quizQuestions, calculateScorePercentage, validateAnswer } from "./quiz.js";
import { appState } from "./state.js";

export function renderTopicsCatalog(container, onSelectTopic) {
    container.innerHTML = "";
    const allProgress = appState.loadAllProgress();

    topics.forEach(t => {
        const card = document.createElement("div");
        card.className = "topic-card";

        const prog = allProgress[t.id];
        let badgeHtml = "";
        let btnText = "Вивчати тему";

        if (prog) {
            badgeHtml = `<div class="topic-badge badge-done">✓ Пройдено: ${prog.score}/${prog.total} (${prog.percentage}%)</div>`;
            btnText = "Пройти знову ↺";
        } else {
            badgeHtml = `<div class="topic-badge">${t.badge}</div>`;
        }

        card.innerHTML = `
            <div class="topic-icon">${t.icon}</div>
            ${badgeHtml}
            <h3 class="topic-title">${t.title}</h3>
            <p class="topic-desc">${t.desc}</p>
            <button class="btn btn-primary" data-topic-id="${t.id}">${btnText}</button>
        `;

        card.querySelector("button").addEventListener("click", () => onSelectTopic(t.id));
        container.appendChild(card);
    });
}

export function renderTheoryScreen(topicId, container, onStartQuiz, onBackToCatalog) {
    const data = theoryData[topicId] || theoryData.operators;
    container.innerHTML = `
        <div class="theory-box">
            <div class="theory-nav">
                <span class="theory-tag">Теоретичний конспект</span>
                <button id="btn-back-catalog-top" class="btn btn-secondary btn-sm">← До каталогу</button>
            </div>
            <h2>${data.title}</h2>
            <p class="theory-text">${data.text}</p>
            <pre class="code-block"><code>${data.code}</code></pre>
            <div class="notice-box">
                <strong>⚠️ Зверніть увагу:</strong> ${data.warning}
            </div>
            <div class="actions">
                <button id="btn-back-catalog" class="btn btn-secondary">До каталогу</button>
                <button id="btn-start-quiz" class="btn btn-primary">Почати тренування →</button>
            </div>
        </div>
    `;

    document.getElementById("btn-start-quiz").addEventListener("click", onStartQuiz);
    document.getElementById("btn-back-catalog").addEventListener("click", onBackToCatalog);
    const topBack = document.getElementById("btn-back-catalog-top");
    if (topBack) topBack.addEventListener("click", onBackToCatalog);
}

export function renderQuizQuestion(topicId, container, onQuestionFinished, onBackToCatalog) {
    const questions = quizQuestions[topicId] || quizQuestions.operators;
    const total = questions.length;
    const qIndex = appState.currentQuestionIndex;
    const q = questions[qIndex];
    const isLast = qIndex + 1 === total;
    const progressPercent = Math.round(((qIndex + 1) / total) * 100);

    container.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-header">
                <div class="quiz-meta">
                    <span class="quiz-counter">Питання ${qIndex + 1} з ${total}</span>
                    <button id="btn-quiz-exit" class="btn-link">← Вийти в каталог</button>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            <h3 class="quiz-title">${q.question}</h3>
            ${q.code ? `<pre class="code-block"><code>${q.code}</code></pre>` : ""}
            <div class="options-grid" id="options-grid"></div>
            <div id="feedback-box" class="feedback-box hidden"></div>
            <div class="actions">
                <button id="btn-submit-answer" class="btn btn-primary" disabled>Перевірити відповідь</button>
            </div>
        </div>
    `;

    const exitBtn = container.querySelector("#btn-quiz-exit");
    if (exitBtn) exitBtn.addEventListener("click", onBackToCatalog);

    let selectedOption = null;
    const optionsGrid = container.querySelector("#options-grid");
    const submitBtn = container.querySelector("#btn-submit-answer");
    const feedbackBox = container.querySelector("#feedback-box");

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
            optionsGrid.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOption = opt;
            submitBtn.disabled = false;
        });
        optionsGrid.appendChild(btn);
    });

    submitBtn.addEventListener("click", () => {
        // Якщо кнопку вже переключено на наступне питання
        if (submitBtn.dataset.state === "next") {
            onQuestionFinished();
            return;
        }

        // Перевіряємо відповідь
        const isCorrect = validateAnswer(selectedOption, q.correct);
        appState.recordAnswer(isCorrect, selectedOption);

        // Блокуємо варіанти
        optionsGrid.querySelectorAll(".option-btn").forEach(btn => {
            btn.disabled = true;
            if (validateAnswer(btn.textContent, q.correct)) {
                btn.classList.add("correct");
            } else if (btn.classList.contains("selected") && !isCorrect) {
                btn.classList.add("wrong");
            }
        });

        // Виводимо зворотний зв'язок
        feedbackBox.classList.remove("hidden", "correct", "wrong");
        feedbackBox.classList.add(isCorrect ? "correct" : "wrong");
        feedbackBox.innerHTML = isCorrect 
            ? "<strong>✅ Чудово!</strong> Правильна відповідь." 
            : `<strong>❌ Помилка!</strong> ${q.explanation}`;

        // Переключаємо кнопку на перехід далі
        submitBtn.dataset.state = "next";
        submitBtn.textContent = isLast ? "Подивитися результат 🎉" : "Наступне завдання →";
    });
}

export function renderSummaryScreen(container, topicId, onRetry, onHome) {
    const questions = quizQuestions[topicId] || quizQuestions.operators;
    const total = questions.length;
    const percent = calculateScorePercentage(appState.score, total);

    // Зберігаємо прогрес у localStorage
    appState.saveProgress(total);

    container.innerHTML = `
        <div class="summary-card">
            <h2>Вітаємо! Тему завершено 🎉</h2>
            <div class="score-circle">
                <span class="score-number">${appState.score}/${total}</span>
                <span class="score-label">${percent}% успішності</span>
            </div>
            <p class="summary-note">
                ${percent >= 80 
                    ? "Відмінний рівень знань! Ви чудово опанували цей навчальний модуль." 
                    : "Гарна спроба! Рекомендуємо повторити теоретичний конспект та спробувати ще раз."}
            </p>
            <div class="actions center-actions">
                <button id="btn-retry" class="btn btn-secondary">Пройти знову ↺</button>
                <button id="btn-home" class="btn btn-primary">До каталогу тем</button>
            </div>
        </div>
    `;

    document.getElementById("btn-retry").addEventListener("click", onRetry);
    document.getElementById("btn-home").addEventListener("click", onHome);
}
