document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('form');
    const username = document.getElementById('username');

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
        //POST 요청을 하여 이름응ㄹ JSON 형식으로 BODY에 담음
        try{

            const response = await fetch('/user', {
                method: 'POST',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify({name})

            })

            if(response.ok){
                alert('등록 성공')
            } else{
                const errorMessage = await response.text();
                alert(`등록 실패: ${errorMessage}`)
            }
        } catch(err){
            console.error('오류 발생!:', err)
            alert('오류!')
        }

    })
})