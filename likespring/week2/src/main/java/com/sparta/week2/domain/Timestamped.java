package com.sparta.week2.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass // 상속했을 때, 컬럼으로 인식하게 한다.
@EntityListeners(AuditingEntityListener.class)
public class Timestamped {

    @CreatedDate // 생성일자임을 나타낸다.
    private LocalDateTime createdAt;

    @LastModifiedDate // 마지막 수정일자임을 나타낸다.
    private LocalDateTime modifiedAt;
}

