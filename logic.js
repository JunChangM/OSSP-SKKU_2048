/*login.html*/
const id = document.getElementById('id')
const password = document.getElementById('password')
const login = document.getElementById('login')
let errStack = 0;

login.addEventListener('click', () => {
    if (id.value == 'user') {
        if (password.value == '0000') {
            alert('로그인 되었습니다!')
        }
        else {
            alert('비밀번호를 다시 입력해주세요.')
            errStack ++;
        }
    }
    else {
        alert('없는 계정입니다.')
    }

    if (errStack >= 5) {
        alert('비밀번호를 5회 이상 틀리셨습니다. 잠시후 시도해주세요.')
    }
})


/*game*/
let temp = document.querySelector("#toGame");
temp.addEventListener("click",  () => {
    console.log("Button Clicked");
});





