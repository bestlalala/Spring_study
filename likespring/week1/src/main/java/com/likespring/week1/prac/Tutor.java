package com.likespring.week1.prac;

public class Tutor {
    private String name;
    private String bio;

    public Tutor() {}

    public Tutor(String name, String bio) {
        this.name = name;
        this.bio = bio;
    }

    // Getter
    public String getName() {
        return this.name;
    }

    public String getBio() {
        return this.bio;
    }
}
