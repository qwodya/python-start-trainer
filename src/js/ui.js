// Модуль динамічного рендерингу інтерфейсу
import { topics } from "./topics.js";
import { theoryData } from "./theory.js";
import { quizQuestions, calculateScorePercentage } from "./quiz.js";
import { appState } from "./state.js";

export function renderTopicsCatalog(container, onSelectTopic) {
    container.innerHTML = "";
    topics.forEach(t => {
        const card = document.createElement("div");
        card.className = "topic-card";
        card.innerHTML = `
            <div class="topic-icon">${t.icon}</div>
            <div class="topic-badge">${t.badge}</div>
            <h3 class="topic-title">${t.title}</h3>
            <p class="topic-desc">${t.desc}</p>
            <button class="btn btn-primary" data-topic-id="${t.id}">Вивчати тему</button>
        `;
        card.querySelector("button").addEventListener("click", () => onSelectTopic(t.id));
        container.appendChild(card);
    });
}

export function renderTheoryScreen(topicId, container, onStartQuiz) {
    const data = theoryData[topicId] || theoryData.operators;
    container.innerHTML = `
        <div class="theory-box">
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
}

export function renderQuizQuestion(topicId, container, onAnswerSubmitted) {
    const questions = quizQuestions[topicId] || quizQuestions.operators;
    const q = questions[appState.currentQuestionIndex];
    
    container.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-header">
                <span>Питання ${appState.currentQuestionIndex + 1} з ${questions.length}</span>
                <span class="quiz-progress">${calculateScorePercentage(appState.currentQuestionIndex, questions.length)}% пройдено</span>
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
    
    let selectedOption = null;
    const optionsGrid = container.querySelector("#options-grid");
    const submitBtn = container.querySelector("#btn-submit-answer");
    
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
        onAnswerSubmitted(selectedOption, q);
    });
}
