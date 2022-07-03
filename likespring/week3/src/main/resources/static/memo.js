$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행한다.
    getMessages();
})

function getMessages() {
    // 1. 기존 메모 내용을 지운다.
    // 2. 메모 목록을 불러와서 HTML로 붙인다.
    $('#cards-box').empty();
    $.ajax({
        type: "GET",
        url: "/api/memos",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let id = message['id'];
                let username = message['username'];
                let contents = message['contents'];
                let modifiedAt = message['modifiedAt'];
                addHTML(id, username, contents, modifiedAt);
            }
        }
});
}

function addHTML(id, username, contents, modifiedAt) {
    // 1. HTML 태그를 만든다.
    let tempHtml = makeMessage(id, username,contents, modifiedAt);
    // 2. #cards-box에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

function makeMessage(id, username, contents, modifiedAt, i) {
    return `<div class="card">
                <!-- date/username 영역 -->
                <div class="metadata">
                    <div class="date">
                        ${modifiedAt}
                    </div>
                    <div id="${id}-username" class="username">
                        ${username}
                    </div>
                </div>
                <!-- contents 조회/수정 영역/ -->
                <div class="contents">
                    <div id="${id}-contents" class="text">
                        ${contents}
                    </div>
                    <div id="${id}-editarea" class="edit">
                        <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                    </div>
                </div>

                <!-- 버튼 영역 -->
                <div class="footer">
                    <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')"/>
                    <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')"/>
                    <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')"/>
                </div>
           </div>`;
}

function isValidContents(contents) {
    if (contents == '') {
        alert("내용을 입력해주세요");
        return false;
    }
    if (contents.trim().length > 140) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function getRandomName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        let number = Math.random() * charactersLength; let index = Math.floor(number);
        result += characters.charAt(index);
    }
    return result;
}

function  writePost() {
    // 1. 작성한 메모를 불러온다.
    let contents = $('#contents').val();

    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인한다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. getRandomName 함수를 통해 익명의 username을 만든다.
    let username = getRandomName(10);

    // 4. 전달할 data JSON으로 만든다.
    let data = {'username' : username, 'contents': contents};

    // 5. POST /api/memos 에 data를 전달한다.
    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data), // JSON을 문자열로 만들어주는 것!
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}

function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

// 메모를 수정한다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인한다.
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인한다.
    // 3. 전달할 data를 JSON으로 만든다.
    // 4. PUT /api/memos/{id} 에 data를 전달한다.
    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    if (isValidContents(contents) == false) {
        return;
    }
    let data = {'username': username, 'contents': contents};

    $.ajax({
        type: "PUT",
        url: `/api/memos/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/memos/${id}`,
        success: function (response) {
            alert('메시지 삭제에 성공하였씁니다.');
            window.location.reload();
        }
    })
}
