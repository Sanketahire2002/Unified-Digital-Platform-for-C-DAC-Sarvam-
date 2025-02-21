using Microsoft.AspNetCore.Mvc;
using Sarvam.Models;
using Sarvam.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizManagementController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizManagementController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllQuizzes()
        {
            try
            {
                var quizzes = await _quizService.GetAllQuizzesAsync();
                return Ok(quizzes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/quiz/results
        [HttpGet("results")]
        public async Task<ActionResult<List<QuizResults>>> GetAllQuizResults()
        {
            var results = await _quizService.GetAllQuizResultsAsync();
            if (results == null || results.Count == 0)
            {
                return NotFound("No quiz results found.");
            }
            return Ok(results);
        }

        [HttpGet("get-quiz/{quizId}")]
        public async Task<IActionResult> GetQuizById(int quizId)
        {
            try
            {
                var quiz = await _quizService.GetQuizByIdAsync(quizId);
                return quiz != null ? Ok(quiz) : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("get-quiz-by-title/{quizTitle}")]
        public async Task<IActionResult> GetQuizByTitle(string quizTitle)
        {
            try
            {
                var quiz = await _quizService.GetQuizByTitleAsync(quizTitle);
                return quiz != null ? Ok(quiz) : NotFound($"Quiz with title '{quizTitle}' not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPost("add-quiz")]
        public async Task<IActionResult> AddQuiz([FromBody] QuizDetails quizDetails)
        {
            if (quizDetails == null)
                return BadRequest("Quiz details are required.");

            try
            {
                await _quizService.AddQuizAsync(quizDetails);
                return CreatedAtAction(nameof(GetQuizById), new { quizId = quizDetails.QuizId }, quizDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("update-quiz/{quizId}")]
        public async Task<IActionResult> UpdateQuiz(int quizId, [FromBody] QuizDetails quizDetails)
        {
            if (quizDetails == null)
                return BadRequest("Invalid quiz details.");

            try
            {
                var existingQuiz = await _quizService.GetQuizByIdAsync(quizId);
                if (existingQuiz == null)
                    return NotFound();

                // Manually set the QuizId from the URL to avoid mismatches
                quizDetails.QuizId = quizId;

                await _quizService.UpdateQuizAsync(quizDetails);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("delete-quiz/{quizId}")]
        public async Task<IActionResult> DeleteQuiz(int quizId)
        {
            try
            {
                var quiz = await _quizService.GetQuizByIdAsync(quizId);
                if (quiz == null)
                    return NotFound();

                await _quizService.DeleteQuizAsync(quizId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("add-result")]
        public async Task<IActionResult> AddResult([FromBody] QuizResults quizResults)
        {
            if (quizResults == null)
                return BadRequest("Quiz results are required.");

            try
            {
                await _quizService.AddResultAsync(quizResults);
                return Ok(quizResults);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("get-results-by-quiz/{quizId}")]
        public async Task<IActionResult> GetResultsByQuizId(int quizId)
        {
            try
            {
                var results = await _quizService.GetResultsByQuizIdAsync(quizId);
                return results != null && results.Count > 0 ? Ok(results) : NotFound("No results found for this quiz.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("get-results-by-prn/{prn}")]
        public async Task<IActionResult> GetResultsByPRN(long prn)
        {
            try
            {
                var results = await _quizService.GetResultsByPRNAsync(prn);
                return results != null && results.Count > 0 ? Ok(results) : NotFound("No results found for this student.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("update-result/{resultId}")]
        public async Task<IActionResult> UpdateResult(int resultId, [FromBody] QuizResults quizResults)
        {
            if (quizResults == null || resultId != quizResults.ResultId)
                return BadRequest("Invalid result details.");

            try
            {
                var existingResult = await _quizService.GetResultByIdAsync(resultId);
                if (existingResult == null)
                    return NotFound();

                quizResults.CreatedAt = existingResult.CreatedAt; // Preserve original CreatedAt timestamp
                quizResults.UpdatedAt = DateTime.UtcNow; // Update timestamp

                await _quizService.UpdateResultAsync(quizResults);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("delete-result/{resultId}")]
        public async Task<IActionResult> DeleteResult(int resultId)
        {
            try
            {
                var result = await _quizService.GetResultByIdAsync(resultId);
                if (result == null)
                    return NotFound();

                await _quizService.DeleteResultAsync(resultId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
