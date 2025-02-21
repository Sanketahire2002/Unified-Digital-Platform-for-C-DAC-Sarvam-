using Sarvam.Models;

namespace Sarvam.Services.ServicesInterfaces
{
    public interface IQuestionService
    {
        List<Question> GetQuestionsByModule(int moduleId);
        List<Question> GenerateQuiz(int moduleId, int questionCount);
        Question AddSingleQuestion(Question question);
        IEnumerable<Question> AddQuestions(List<Question> questions);
        QuizResult CheckAnswers(List<AnswerModel> answers);

        // New methods for delete and update
        void DeleteQuestion(int questionId);
        Question UpdateQuestion(int questionId, Question updatedQuestion);
    }
}
