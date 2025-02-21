using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sarvam.Data;

namespace Sarvam.Repository
{
    public class QuizRepository : IQuizRepository
    {
        private readonly SyllabusDbContext _context;

        public QuizRepository(SyllabusDbContext context)
        {
            _context = context;
        }

        public async Task<List<QuizDetails>> GetAllQuizzesAsync()
        {
            return await _context.QuizDetails.ToListAsync();
        }

        public async Task<List<QuizResults>> GetAllQuizResultsAsync()
        {
            return await _context.QuizResults.ToListAsync();
        }

        public async Task<QuizDetails> GetQuizByTitleAsync(string quizTitle) // New method
        {
            return await _context.QuizDetails
                .FirstOrDefaultAsync(q => q.QuizTitle == quizTitle);
        }

        public async Task<QuizDetails> GetQuizByIdAsync(int quizId)
        {
            return await _context.QuizDetails.Include(q => q.QuizResults).FirstOrDefaultAsync(q => q.QuizId == quizId);
        }

        public async Task<List<QuizResults>> GetResultsByQuizIdAsync(int quizId)
        {
            return await _context.QuizResults.Where(r => r.QuizId == quizId).ToListAsync();
        }

        public async Task<List<QuizResults>> GetResultsByPRNAsync(long prn)
        {
            return await _context.QuizResults.Where(r => r.PRN == prn).ToListAsync();
        }

        public async Task<QuizResults> GetResultByIdAsync(int resultId)
        {
            return await _context.QuizResults.Include(r => r.QuizDetails).FirstOrDefaultAsync(r => r.ResultId == resultId);
        }

        public async Task AddQuizAsync(QuizDetails quizDetails)
        {
            await _context.QuizDetails.AddAsync(quizDetails);
            await _context.SaveChangesAsync();
        }

        public async Task AddResultAsync(QuizResults quizResults)
        {
            await _context.QuizResults.AddAsync(quizResults);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuizAsync(QuizDetails quizDetails)
        {
            var existingQuiz = await _context.QuizDetails.FindAsync(quizDetails.QuizId);
            if (existingQuiz == null)
                throw new Exception("Quiz not found");

            // Update only the fields that are needed
            existingQuiz.Date = quizDetails.Date;
            existingQuiz.QuizTitle = quizDetails.QuizTitle;
            existingQuiz.StartTime = quizDetails.StartTime;
            existingQuiz.EndTime = quizDetails.EndTime;
            existingQuiz.Marks = quizDetails.Marks;
            existingQuiz.Link = quizDetails.Link;
            existingQuiz.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateResultAsync(QuizResults quizResults)
        {
            _context.ChangeTracker.Clear(); // Reset tracking to avoid conflicts

            _context.QuizResults.Update(quizResults);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteQuizAsync(int quizId)
        {
            var quiz = await _context.QuizDetails.FindAsync(quizId);
            if (quiz != null)
            {
                _context.QuizDetails.Remove(quiz);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteResultAsync(int resultId)
        {
            var result = await _context.QuizResults.FindAsync(resultId);
            if (result != null)
            {
                _context.QuizResults.Remove(result);
                await _context.SaveChangesAsync();
            }
        }
    }
}