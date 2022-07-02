package com.sparta.week2;

import com.sparta.week2.domain.Course;
import com.sparta.week2.domain.CourseRepository;
import com.sparta.week2.service.CourseService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.List;

@EnableJpaAuditing
@SpringBootApplication
public class Week2Application {

    public static void main(String[] args) {
        SpringApplication.run(Week2Application.class, args);
    }

    @Bean
    public CommandLineRunner demo(CourseRepository courseRepository, CourseService courseService) {
        return (args) -> {
            // 데이터 저장
            Course course1 = new Course("프론트엔드의 꽃, 리액트", "이연수");
            courseRepository.save(course1);

            // 데이터 모두 조회
            System.out.println("데이터 인쇄");
            List<Course> courseList = courseRepository.findAll();
            for (int i = 0; i < courseList.size(); i++) {
                Course c = courseList.get(i);
                System.out.println(c.getId());
                System.out.println(c.getTitle());
                System.out.println(c.getTutor());
            }

            // 데이터 하나 조회하기
            Course course = courseRepository.findById(1L).orElseThrow(
                    () -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
            );

            Course new_course = new Course("웹개발의 봄, Spring", "이연수");
            courseService.update(1L, new_course);
            courseList = courseRepository.findAll();
            for (int i = 0; i < courseList.size(); i++) {
                Course c = courseList.get(i);
                System.out.println(c.getId());
                System.out.println(c.getTitle());
                System.out.println(c.getTutor());
            }
            // delete
            courseRepository.deleteAll();
        };
    }
}
