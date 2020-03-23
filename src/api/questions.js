import listMockData from './mocks/questions.list.json'

export const listQuestions = () => {
    // Mock real request (with timeout)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(listMockData);
        }, 1000)
    });
};