    function addnumber (value) {
        document.getElementById('결과값').innerText += value;
        console.log(value);
    }
    
    function number_inc() {
        let currentResult = document.getElementById('결과값').innerText;
        console.log("+");
        if (currentResult.length === 0 || (currentResult.charAt(currentResult.length - 1) !== '+' && currentResult.charAt(currentResult.length - 1) !== '*' && currentResult.charAt(currentResult.length - 1) !== '/')) {
            document.getElementById('결과값').innerText += '+';
        }
    }
    
    function number_dec() {
        let currentResult = document.getElementById('결과값').innerText;
        console.log("-");
        if (currentResult.length === 0 || (currentResult.charAt(currentResult.length - 1) !== '+' && currentResult.charAt(currentResult.length - 1) !== '*' && currentResult.charAt(currentResult.length - 1) !== '/')) {
            document.getElementById('결과값').innerText += '-';
        }
    }
    
    function number_mul() {
        let currentResult = document.getElementById('결과값').innerText;
        console.log("*");
        if (currentResult.length === 0 || (currentResult.charAt(currentResult.length - 1) !== '+' && currentResult.charAt(currentResult.length - 1) !== '*' && currentResult.charAt(currentResult.length - 1) !== '/')) {
            document.getElementById('결과값').innerText += '*';
        }
    }
    
    function number_div() {
        let currentResult = document.getElementById('결과값').innerText;
        console.log("/");

        if (document.getElementById('결과값').innerText ===0) {
            console.log('0은 못나눠.')
            
        }

        else if (currentResult.length === 0 || (currentResult.charAt(currentResult.length - 1) !== '+' && currentResult.charAt(currentResult.length - 1) !== '*' && currentResult.charAt(currentResult.length - 1) !== '/')) {
            document.getElementById('결과값').innerText += '/';
        }
    }
    
    function equlelement() {
        let result = document.getElementById('결과값').innerText;
        let calculatedResult = eval(result);
        console.log("=");
        if (calculatedResult === undefined) {
                document.getElementById('결과값').innerText = "";
        } else if (calculatedResult === calculatedResult) {
                document.getElementById('결과값').innerText = calculatedResult;
                console.log(calculatedResult);
        } else {
                document.getElementById('결과값').innerText = calculatedResult;
                console.log(result + '=' + calculatedResult);
        }
    }

    function removeelement(){
        document.getElementById('결과값').innerText = "";
        console.log("C");
    }