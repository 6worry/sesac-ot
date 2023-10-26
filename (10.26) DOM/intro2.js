
function number_inc() {console.log("버튼 클릭"); result = document.getElementById('result').innerHTML; console.log("result=", result); new_result = parseInt(result) +1; console.log("inc_result=", new_result); document.getElementById('result').innerHTML = new_result;}
            {/* // document.getElementById('result').innerHTML = "1" */}
            {/* // resuit 라는 id의 text 영역의 글자를 읽어온다.
            
            // 글자를 읽어왔으나 숫자로 변환한다. 그리고 1을 뺀다.
            
        // 결과값을 내가 원하는 곳 (result 라는 id 영역)에 출력한다. */}
        
        function number_dec() 
            {console.log("버튼 클릭"); result = document.getElementById('result').innerHTML; console.log("result=", result); new_result = parseInt(result) -1; console.log("dec_result=", new_result); document.getElementById('result').innerHTML = new_result;}
