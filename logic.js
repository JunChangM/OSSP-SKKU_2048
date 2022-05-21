/*login.html*/

const id = document.getElementById('id')
const password = document.getElementById('password')
const login = document.getElementById('login')
let errStack = 0;


login.addEventListener('click', () => {
    lastid = id.value;
    
    const lastpassword = localStorage.getItem(lastid);

    if (id.value == 'user') {
        if (password.value == '0000') {
            alert('테스트용 계정으로 로그인 되었습니다!');
            window.location.replace("index.html");
        }
        else {
            alert('비밀번호를 다시 입력해주세요.');
            errStack ++;
        }
    }
    else if (lastpassword == id.value) {
        alert(`${id.value}님 로그인 되었습니다. 재방문을 환영합니다.`);
        window.location.replace("index.html");

    }
    else {
        alert('없는 계정입니다. 아이디를 새로 생성합니다.');
        textid = id.value; 
        textpw = password.value; 
        localStorage.setItem(textid, textpw);
        window.location.replace("index.html");
    }

    if (errStack >= 5) {
        alert('비밀번호를 5회 이상 틀리셨습니다. 잠시후 시도해주세요.');
    }
})
/*leader board*/

/*game*/
let temp = document.querySelector("#toGame");
temp.addEventListener("click",  () => {
    console.log("Button Clicked");
});





