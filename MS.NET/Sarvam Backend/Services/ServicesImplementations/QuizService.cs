using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Services
{
    public class QuizService : IQuizService
    {
        private readonly IQuizRepository _quizRepository;

        public QuizService(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }

        public async Task<List<QuizDetails>> GetAllQuizzesAsync()
        {
            return await _quizRepository.GetAllQuizzesAsync();
        }

        public async Task<List<QuizResults>> GetAllQuizResultsAsync()
        {
            return await _quizRepository.GetAllQuizResultsAsync();
        }

        public async Task<QuizDetails> GetQuizByIdAsync(int quizId)
        {
            return await _quizRepository.GetQuizByIdAsync(quizId);
        }

        public async Task<QuizDetails> GetQuizByTitleAsync(string quizTitle) // New method
        {
            return await _quizRepository.GetQuizByTitleAsync(quizTitle);
        }

        public async Task<List<QuizResults>> GetResultsByQuizIdAsync(int quizId)
        {
            return await _quizRepository.GetResultsByQuizIdAsync(quizId);
        }

        public async Task<List<QuizResults>> GetResultsByPRNAsync(long prn)
        {
            return await _quizRepository.GetResultsByPRNAsync(prn);
        }

        public async Task<QuizResults> GetResultByIdAsync(int resultId)
        {
            return await _quizRepository.GetResultByIdAsync(resultId);
        }

        public async Task AddQuizAsync(QuizDetails quizDetails)
        {
            await _quizRepository.AddQuizAsync(quizDetails);
        }

        public async Task AddResultAsync(QuizResults quizResults)
        {
            await _quizRepository.AddResultAsync(quizResults);
        }

        public async Task UpdateQuizAsync(QuizDetails quizDetails)
        {
            await _quizRepository.UpdateQuizAsync(quizDetails);
        }

        public async Task UpdateResultAsync(QuizResults quizResults)
        {
            await _quizRepository.UpdateResultAsync(quizResults);
        }

        public async Task DeleteQuizAsync(int quizId)
        {
            await _quizRepository.DeleteQuizAsync(quizId);
        }

        public async Task DeleteResultAsync(int resultId)
        {
            await _quizRepository.DeleteResultAsync(resultId);
        }
    }
}