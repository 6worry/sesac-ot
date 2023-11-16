document.addEventListener('DOMContentLoaded', async ()=>{
    const form = document.getElementById('form');
    const username = document.getElementById('username');

    await updateTable(); // 페이지 최초 로딩시 백엔드에 사용자 데이터 요청

    form.addEventListener('submit', async (ev) => {// submit 버튼 눌렀을때 수행 가능

        // 폼에 원래 있던 본연의 기능인 다른페이지로 요청하는 것을 못하게 함.
        ev.preventDefault();
        //
        const name = username.value;
        
        if (!name) {
            alert('이름을 입력해라.')
            return
        }

        //fetch = 내가 원하는 API 정보를 불러와줌
        //POST 요청을 하여 이름을 JSON 형식으로 BODY에 담음, JSON 형식 = {} 필수!
        try{

            const response = await fetch('/user', {
                method: 'POST',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify({name})

            })

            if(response.ok){
                alert('등록 성공')
                await updateTable() // 등록 성공시 화면 컴포넌트 추가
            } else{
                const errorMessage = await response.text();
                alert(`등록 실패: ${errorMessage}`)
            }
        } catch(err){
            console.error('오류 발생!:', err)
            alert('오류!')
        }

    })

    // userTable.addEventListener('수정', async(ev) => {
    //     ev.preventDefault();
    //     try{
    //         const response = await fetch('/user'{
    //             method: 'PUT',
    //             header: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({name})
    //         })
    //         if(response.ok){
    //             alert('수정할 이름은?')
                
    //         }

    //     } catch (err) {
    //         alert ('수정 오류')
    //     }
    // })

})

async function updateTable(){
    //갱신을 위한 최신 정보를 가져옴
    await fetch('/user')
        .then(response => response.json())
        .then(users => displayUsers(users))
        .catch(error => console.error('사용자 정보 불러오기 실패', error))
}

function displayUsers(users){
    //users에는 json 포맷의 사용자 데이터를 전부 갖고 있음
    const userTable = document.getElementById('userTable');

    userTable.innerHTML = ''; // 테이블 데이터 초기화

    if(Object.keys(users).length === 0){
        const messageRow = document.createElement('div')
        messageRow.textContent = '등록된 사용자 X'
        userTable.appendChild(messageRow);
    } else{
        for (const key in users){
            const row = document.createElement('div')

            row.innerHTML = `<strong>ID:</strong> ${key}, <strong>Name:</strong> ${users[key]}
                            <button onclick="modifyUser('${key}')">수정</button>
                            <button onclick="deleteUser('${key}')">삭제</button>`;

            userTable.appendChild(row);
        }
    }
}

async function deleteUser(userID) {

    // 사용자에게 삭제 유무 확인
    const confirmDelete = confirm(`${userID}를 삭제할건가?`)
    
    if(confirmDelete){
        const response = await fetch(`/user/${userID}`, {
            method: 'DELETE'
        })
        
        if(response.ok){
            alert ('삭제 성공')
            await updateTable(); // 화면 갱신
        } else {
            const errorMessage = await response.text();
            throw new Error(`삭제 실패: ${errorMessage}`)
        }    
    }
}

async function modifyUser(userID) {

    // 사용자에게 삭제 유무 확인
    const confirmModify = confirm('수정할 이름을 입력해라')
    
    if(confirmModify){
        const response = await fetch(`/user/${userID}`, {
            method: 'PUT'
        })
        
        if(response.ok){
            alert ('수정 성공')
            await updateTable(); // 화면 갱신
        } else {
            const errorMessage = await response.text();
            throw new Error(`수정 실패: ${errorMessage}`)
        }    
    }
}