using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Grade;
using api.Dtos.Student;
using api.Interfaces;
using api.Interfaces.Repository;
using api.Interfaces.Services;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [Route("api/students")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateStudentDto studentDto)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var results = await _studentService.CreateAsync(studentDto);
            if (results.Data == null) return StatusCode(results.StatusCode, results.Message);

            return StatusCode(results.StatusCode, results.Data);


        }
        [HttpPost("create-csv")]
        public async Task<IActionResult> CreateMultiple([FromBody] CreateStudentDto[] studentDtos)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var results = await _studentService.CreateMultipleAsync(studentDtos);
            if (results.Data == null) return StatusCode(results.StatusCode, results.Message);

            return StatusCode(results.StatusCode, results.Data);


        }
        [HttpPost("{studentId:int}/grades")]
        public async Task<IActionResult> CreateGrade([FromRoute] string studentId, [FromBody] CreateGradeDto gradeDto)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);


            var results = await _studentService.CreateGradeAsync(gradeDto, studentId);

            return StatusCode(results.StatusCode, results.Message);


        }
        [HttpPost("grades")]
        public async Task<IActionResult> CreateGrades([FromBody] CreateGradesReportDto gradesDto)
        {


            if (!ModelState.IsValid) return BadRequest(ModelState);


            var results = await _studentService.CreateGradesAsync(gradesDto);

            return StatusCode(results.StatusCode, results.Message);


        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await _studentService.GetAllAsync();
            if (results.Data == null) return NotFound(results.Message);

            return StatusCode(results.StatusCode, results.Data);
        }

        [HttpDelete("{studentId:int}")]
        public async Task<IActionResult> Delete([FromRoute] string studentId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var results = await _studentService.DeleteAsync(studentId);

            return StatusCode(results.StatusCode, results.Message);

        }

    }
}