document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('form');
    const userid = document.getElementById('userid');
    const userpw = document.getElementById('userpw');

    await updateTable(); // 페이지 최초 로딩시 백엔드에 사용자 데이터 요청

    form.addEventListener('submit', async (ev) => { // submit 버튼 눌렀을때 수행 가능

        // 폼에 원래 있던 본연의 기능인 다른페이지로 요청하는 것을 못하게 함.
        ev.preventDefault();
        //
        const id = userid.value;
        const pw = userpw.value;
        
        if (!id) {
            alert('이름을 입력해라.');
            return;
        } else if (!pw) {
            alert('번호를 입력해라.');
            return;
        };

        //fetch = 내가 원하는 API 정보를 불러와줌
        //POST 요청을 하여 이름을 JSON 형식으로 BODY에 담음, JSON 형식 = {} 필수!
        try{
            const response = await fetch('/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, pw})
            });
            console.log(JSON.stringify({id, pw}))
            if (response.ok) {
                alert('등록 성공');
                await updateTable(); // 등록 성공시 화면 컴포넌트 추가
            } else {
                const errorMessage = await response.text();
                alert(`등록 실패: ${errorMessage}`);
            };
        } catch(err) {
            console.error('오류 발생!:', err);
            alert('오류!');
        };
    });
});

function displayUsers(users) {
    //users에는 json 포맷의 사용자 데이터를 전부 갖고 있음
    const form = document.getElementById('form');

    form.innerHTML = ''; // 테이블 데이터 초기화

        for (const key in users) {
            const row = document.createElement('form');

            row.innerHTML = `<strong>Welcome, ${key}</strong>
                            <button>Logout</button>`;
            form.appendChild(row);
        };
    };

async function updateTable() {
    //갱신을 위한 최신 정보를 가져옴
    await fetch('/login')
        .then(response => response.json())
        .then(users => displayUsers(users))
        .catch(error => console.error('사용자 로그인정보 불러오기 실패', error));
};
