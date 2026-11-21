// Модуль управління станом застосунку (State Manager)
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
    }
};
