function login() {
    const userid = document.getElementById('userid').value;
    const userpw = document.getElementById('userpw').value;

    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: json.stringify({ userid, userpw })
    })
    // .then(response => response.json())
    .then (response => {
        if (response.status === 200) {
            return response.json();
        } else{
            throw new Error('로그인 실패')
        }
    })
    .then(data => {
        alert(data.message)
        // if (data.message === 'login success') {
        //     alert('로그인 성공')
        // } else {
        //     alert('로그인 실패')
        // }
        checkLoginStatus();
    })
    .catch (error => {
        console.log('로그인 실패', err)
        alert('로그인 fail')
    })
}

function logout() {
    fetch('/logout')
        .then(response => response.json())
        .then(data => {
            alert(data.message)
    })
}

function checkLoginStatus() {
    fetch ('/check-login') // 백엔드 구현, 사용자 세션이 있으면 userid 반납
    .then(response => response.json())
    .then(data => {
    if (data.userid) {
        showProfile(data.userid)
    } else {
        showProfile();
        console.log('로그인한 사용자 없음')
    }
})
.catch (error => {
    console.error('로그인 오류', error)
    showLoginForm()
})
}