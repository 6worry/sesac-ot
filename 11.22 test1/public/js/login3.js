document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    // 사용자의 활동을 감지하여 performUserActivity 호출
    document.addEventListener('click', performUserActivity);
    // 또는 다른 이벤트에 따라 호출할 수 있음
    // document.addEventListener('mousemove', performUserActivity);
    // document.addEventListener('keydown', performUserActivity);
});

function login() {
    const userid = document.getElementById('userid').value;
    const userpw = document.getElementById('userpw').value;

    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: Json.stringify({ userid, userpw })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'login success') {
            checkLoginStatus();
        } else {
            alert('login fail')
        }
    })
    .catch (error => {
        console.log('로그인 실패', error)
        alert('로그인 fail')
    })
}

function login2() {
    const userid = document.getElementById('userid').value;
    const userpw = document.getElementById('userpw').value;

    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: json.stringify({ userid, userpw })
    })
    .then (response => {
        if (response.status === 200) {
            return response.json();
        } else{
            throw new Error('로그인 실패')
        }
    })
    .then(data => {
        console.log(data.message)
        checkLoginStatus();
    })
    .catch (error => {
        console.log('로그인 실패', error)
        alert('로그인 fail')
    })
}

function logout() {
    fetch('/logout')
        .then(response => response.json())
        .then(data => {
            alert(data.message)
            showLoginForm();
    })
}

function checkLoginStatus() {
    fetch ('/check-login') // 백엔드 구현, 사용자 세션이 있으면 userid 반납
        .then(response => response.json())
        .then(data => {
        if (data.userid) {
        showProfile(data.userid)
        } else {
        // showLoginForm();
        console.log('로그인한 사용자 없음')
        }
    })
    .catch (error => {
        console.error('로그인 오류', error)
        showLoginForm();
    })
}

function performUserActivity() {
    // 사용자의 활동이 있을 때마다 서버에 요청을 보냄
    fetch('/user-activity')
        .then(response => response.json())
        .then(data => {
            // 서버에서 세션을 갱신한 경우에는 특별한 처리를 할 수 있음
            console.log('User activity performed:', data.message);
        })
        .catch(error => {
            console.error('User activity error:', error);
        });
}

function showProfile(userid) {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('useridSpan').innerText = userid;
}

function showLoginForm() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
}