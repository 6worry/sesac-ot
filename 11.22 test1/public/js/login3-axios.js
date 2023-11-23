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

    axios.post('/login', { userid, userpw})
        .then(response => {
            const data = response.data

            if (data.message === 'login success') {
                checkLoginStatus();
            } else {
               alert('login fail')
            }
        })
}

function logout() {
    axios.get('/logout')
        .then(response => {
            const data = response.data
            
            if (data.message === 'logout success') {
                showLoginForm();
            } else {
                alert('로그아웃 fail')
            }
    })
}

function checkLoginStatus() {
    axios.get('/check-login')
        .then(response => {
            const data = response.data;

            if (data.userid) {
            showProfile(data.userid)
            } else {
            showLoginForm();
            }
        })
        .catch (error => {
                console.error('로그인 오류', error)
            showLoginForm();
        })
}

function performUserActivity() {
    // 사용자의 활동이 있을 때마다 서버에 요청을 보냄
    axios.get('/user-activity')
        .then(response => {
            const data = response.data;
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