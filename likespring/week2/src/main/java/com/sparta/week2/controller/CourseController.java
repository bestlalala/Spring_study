package com.sparta.week2.controller;

import com.sparta.week2.domain.Course;
import com.sparta.week2.domain.CourseRepository;
import com.sparta.week2.models.CourseRequestDto;
import com.sparta.week2.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CourseController {

    private final CourseRepository courseRepository;
    private final CourseService courseService;

    @GetMapping("/api/courses")
    public List<Course> getCourse() {
        return courseRepository.findAll();
    }

    @PostMapping("/api/courses")
    public Course createCourse(@RequestBody CourseRequestDto requestDto) {
        // requestDto는 생성 요청을 의미한다.
        Course course = new Course(requestDto);

        //JPA를 이용하여 DB에 저장하고, 그 결과를 반환한다.
        return courseRepository.save(course);
    }

}
