// Модуль управління станом застосунку з підтримкою localStorage (Lab 8)
const STORAGE_KEY = "pythonstart_progress";

export const appState = {
    currentTopicId: null,
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [],
    
    resetTopic(topicId) {
        this.currentTopicId = topicId;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
    },
    
    recordAnswer(isCorrect, answer) {
        if (isCorrect) this.score++;
        this.userAnswers.push({ answer, isCorrect });
    },
    
    saveProgress(total) {
        try {
            const data = this.loadAllProgress();
            const safeTotal = total || 4;
            data[this.currentTopicId] = {
                score: this.score,
                total: safeTotal,
                percentage: Math.round((this.score / safeTotal) * 100),
                completedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn("Помилка збереження у localStorage:", e);
        }
    },
    
    loadAllProgress() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }
};
