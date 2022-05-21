package com.likespring.week1.controller;

import com.likespring.week1.Course;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {

    @GetMapping("/courses")
    public Course getCourse() {
        Course course = new Course();
        course.setTitle("웹 개발의 봄 스프링");
        course.setDays(90);
        course.setTutor("누구게");
        return course;
    }
}
