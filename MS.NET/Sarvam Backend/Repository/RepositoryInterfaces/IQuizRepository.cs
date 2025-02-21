using Sarvam.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Repository.RepositoryInterfaces
{
    public interface IQuizRepository
    {
        Task<List<QuizDetails>> GetAllQuizzesAsync();
        Task<QuizDetails> GetQuizByIdAsync(int quizId);
        Task<List<QuizResults>> GetAllQuizResultsAsync();

        Task<QuizDetails> GetQuizByTitleAsync(string quizTitle); // New method
        Task<List<QuizResults>> GetResultsByQuizIdAsync(int quizId);
        Task<List<QuizResults>> GetResultsByPRNAsync(long prn);
        Task<QuizResults> GetResultByIdAsync(int resultId);
        Task AddQuizAsync(QuizDetails quizDetails);
        Task AddResultAsync(QuizResults quizResults);
        Task UpdateQuizAsync(QuizDetails quizDetails);
        Task UpdateResultAsync(QuizResults quizResults);
        Task DeleteQuizAsync(int quizId);
        Task DeleteResultAsync(int resultId);
    }
}