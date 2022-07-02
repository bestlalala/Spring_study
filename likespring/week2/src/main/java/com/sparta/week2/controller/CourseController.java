package com.sparta.week2.controller;

import com.sparta.week2.domain.Course;
import com.sparta.week2.domain.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping("/api/courses")
    public List<Course> getCourse() {
        return courseRepository.findAll();
    }
}
