package com.likespring.week3.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemoRequestDto {
    private String username;
    private String contents;
}
