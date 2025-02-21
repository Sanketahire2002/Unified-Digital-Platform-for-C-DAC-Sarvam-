using Microsoft.AspNetCore.Mvc;
using Sarvam.Models;
using Sarvam.Services.ServicesInterfaces;
using System.Collections.Generic;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuizController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        // Get questions for a specific module
        [HttpGet("Module/{moduleId}")]
        public ActionResult<List<Question>> GetQuestionsByModule(int moduleId)
        {
            var questions = _questionService.GetQuestionsByModule(moduleId);
            if (questions == null || questions.Count == 0)
            {
                return NotFound("No questions found for the given module.");
            }
            return Ok(questions);
        }

        // Generate quiz with given moduleId and question count (20 or 40)
        [HttpPost("GenerateQuiz")]
        public ActionResult<List<Question>> GenerateQuiz([FromBody] QuizRequest quizRequest)
        {
            if (quizRequest.QuestionCount != 20 && quizRequest.QuestionCount != 40)
            {
                return BadRequest("Question count must be 20 or 40.");
            }

            var questions = _questionService.GenerateQuiz(quizRequest.ModuleId, quizRequest.QuestionCount);
            return Ok(questions);
        }

        // Submit quiz answers and evaluate score
        [HttpPost("SubmitAnswers")]
        public ActionResult<QuizResult> SubmitAnswers([FromBody] List<AnswerModel> answers)
        {
            if (answers == null || answers.Count == 0)
            {
                return BadRequest("No answers provided.");
            }

            var result = _questionService.CheckAnswers(answers);
            return Ok(result);
        }

        [HttpPost("Question")]
        public ActionResult<Question> AddSingleQuestion([FromBody] Question question)
        {
            if (question == null)
            {
                return BadRequest("Question data is required.");
            }

            // Ensure only ModuleId is used for mapping
            question.MasterModule = null;

            var createdQuestion = _questionService.AddSingleQuestion(question);
            return CreatedAtAction(nameof(GetQuestionsByModule), new { moduleId = question.ModuleId }, createdQuestion);
        }

        [HttpPost("AddQuestion")]
        public ActionResult<IEnumerable<Question>> AddQuestion([FromBody] List<Question> questions)
        {
            if (questions == null || questions.Count == 0)
            {
                return BadRequest("Question data is required.");
            }

            // Ensure that we are not assigning MasterModule directly from the posted data
            foreach (var question in questions)
            {
                question.MasterModule = null; // Nullify the navigation property
            }

            // Add the questions using the service
            var createdQuestions = _questionService.AddQuestions(questions);

            // Assuming you want to return the newly created questions with their IDs
            return CreatedAtAction(nameof(GetQuestionsByModule), new { moduleId = questions[0].ModuleId }, createdQuestions);
        }

        // DELETE api/quiz/DeleteQuestion/{id}
        [HttpDelete("DeleteQuestion/{questionId}")]
        public IActionResult DeleteQuestion(int questionId)
        {
            try
            {
                _questionService.DeleteQuestion(questionId);
                return Ok(new { message = "Question deleted successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // PUT api/quiz/UpdateQuestion/{questionId}
        [HttpPut("UpdateQuestion/{questionId}")]
        public ActionResult<Question> UpdateQuestion(int questionId, [FromBody] Question updatedQuestion)
        {
            if (updatedQuestion == null)
            {
                return BadRequest("Updated question data is required.");
            }

            try
            {
                var updated = _questionService.UpdateQuestion(questionId, updatedQuestion);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

    }

    // Request model for quiz generation
    public class QuizRequest
    {
        public int ModuleId { get; set; }
        public int QuestionCount { get; set; }  // Must be 20 or 40
    }
}
