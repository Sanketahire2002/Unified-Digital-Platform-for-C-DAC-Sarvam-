using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using Sarvam.Services.ServicesInterfaces;

namespace Sarvam.Services.ServicesImplementations
{
    public class QuestionService : IQuestionService
    {
        private readonly SyllabusDbContext _context;

        public QuestionService(SyllabusDbContext context)
        {
            _context = context;
        }

        public List<Question> GetQuestionsByModule(int moduleId)
        {
            return _context.Questions.Where(q => q.ModuleId == moduleId).ToList();
        }

        public List<Question> GenerateQuiz(int moduleId, int questionCount)
        {
            var questions = _context.Questions
                .Where(q => q.ModuleId == moduleId)
                .OrderBy(q => Guid.NewGuid()) // Shuffle questions
                .Take(questionCount)
                .ToList();
            return questions;
        }

        public Question AddSingleQuestion(Question question)
        {
            _context.Questions.Add(question); // Add to the database
            _context.SaveChanges(); // Commit changes

            return question; // Return the saved question
        }


        // Method to add multiple questions to the database
        public IEnumerable<Question> AddQuestions(List<Question> questions)
        {
            if (questions == null || questions.Count == 0)
            {
                throw new ArgumentException("No questions provided.");
            }

            // Add questions to the DbContext
            _context.Questions.AddRange(questions);
            _context.SaveChanges(); // Save changes to the database

            return questions; // Return the added questions with new IDs
        }


        public QuizResult CheckAnswers(List<AnswerModel> answers)
        {
            int correctAnswers = 0;

            foreach (var answer in answers)
            {
                var question = _context.Questions.FirstOrDefault(q => q.QuestionId == answer.QuestionId);
                if (question != null && question.CorrectAnswer == answer.SelectedAnswer)
                {
                    correctAnswers++;
                }
            }

            var result = new QuizResult
            {
                CorrectAnswers = correctAnswers,
                TotalQuestions = answers.Count,
                TotalMarks = correctAnswers
            };

            return result;
        }


        public void DeleteQuestion(int questionId)
        {
            var question = _context.Questions.FirstOrDefault(q => q.QuestionId == questionId);
            if (question != null)
            {
                _context.Questions.Remove(question);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Question not found.");
            }
        }

        public Question UpdateQuestion(int questionId, Question updatedQuestion)
        {
            var question = _context.Questions.FirstOrDefault(q => q.QuestionId == questionId);
            if (question != null)
            {
                question.QuestionText = updatedQuestion.QuestionText;
                question.Option1 = updatedQuestion.Option1;
                question.Option2 = updatedQuestion.Option2;
                question.Option3 = updatedQuestion.Option3;
                question.Option4 = updatedQuestion.Option4;
                question.CorrectAnswer = updatedQuestion.CorrectAnswer;
                question.ModuleId = updatedQuestion.ModuleId; // Only update the necessary fields

                _context.SaveChanges();
                return question;
            }
            else
            {
                throw new Exception("Question not found.");
            }
        }
    }
}
