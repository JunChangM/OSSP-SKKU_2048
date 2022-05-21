/*index.html*/

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

/*main.html*/

let temp = document.querySelector("#toGame");
temp.addEventListener("click",  () => {
    console.log("Button Clicked");
});

// game.html
// game.html
// game.html

// image priority
let imgPriorityArray = ["coin_100", "coin_500", "bill_1000", "bill_5000", "bill_10000", "bill_50000"];

let boardArray = [ [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1] ];

// Keyboard Input Handle
document.addEventListener('keydown', (ev) => {
    switch(ev.keyCode)
    {
        case 37: // left
            moveCell(-1, 0, 1);
            break;
        case 39: // right
            moveCell(1, 0, 1);
            break;
        case 38: // up
            moveCell(0, -1, 0);
            break;
        case 40: // down
            moveCell(0, 1, 0);
            break;
    }
    updateChange();
});

// Initialization
function init() {
    createImg();
    createImg();
}

let isClear = false;
let isGameOver = false;
// 변화 업데이트 (move에만 관련...이었던)
function updateChange() {

    if (isClear === true) return; // 깼으면 업뎃 안함
    else if (isGameOver === true) return; // gameover => 업뎃 안함
    // delete
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            let tempStr = "";
            let cellObject = document.getElementById(tempStr.concat(i.toString(), j.toString()));
            let imgChild = cellObject.firstElementChild;
            if (imgChild !== null)
                cellObject.removeChild(imgChild);
        }
    }
    // add
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (boardArray[i][j] === -1) continue;
            let imgClass = imgPriorityArray[boardArray[i][j]];
            let tempStr = "";
            let cellObject = document.getElementById(tempStr.concat(i.toString(), j.toString()));
            
            let img = document.createElement("img");
            img.classList.add(imgClass, "items");
            switch (imgClass)
            {
            case imgPriorityArray[0]:
                img.src = "images/coin_100.png";
                break;
            case imgPriorityArray[1]:
                img.src = "images/coin_500.png";
                break;
            case imgPriorityArray[2]:
                img.src = "images/bill_1000.png";
                break;
            
            case imgPriorityArray[3]:
                img.src = "images/bill_5000.png";
                break;
            case imgPriorityArray[4]:
                img.src = "images/bill_10000.png";
                break;
            case imgPriorityArray[5]:
                img.src = "images/bill_50000.png";
                break;
            
            case imgPriorityArray[6]:
                img.src = "images/bill_50000.png";
                break;
            
            case imgPriorityArray[7]:
                img.src = "images/bill_50000.png";
                break;
            
            case imgPriorityArray[8]:
                img.src = "images/bill_50000.png";
                break;
            
            case imgPriorityArray[9]:
                img.src = "images/bill_50000.png";
                break;
            
            case imgPriorityArray[10]:
                img.src = "images/bill_50000.png";
                break;
            
            case imgPriorityArray[11]:
                img.src = "images/bill_50000.png";
                isClear = true;
                break;
            }
            cellObject.appendChild(img)
        }
    }

    // game clear
    if (isClear === true) {
        alert("축하합니다!\n명륜이는 여행을 떠날 준비를 마쳤습니다!");
        return;
    }

    // check gameover
    isGameOver = checkGameOver();
    // if yes
    if (isGameOver === true) {
        alert("아쉽게도 명륜이는 모종의 이유로 여행을 떠날 수 없게 되었습니다...");
        return;
    }
    // if not over
    createImg();
}



function moveCell(dx, dy, flag)
{
    // flag = 0: 상하, flag = 1: 좌우
    let st_X = (dx === 1) ? 3 : 0;
    let st_Y = (dy === 1) ? 3 : 0;
    let X = st_X;
    let Y = st_Y;
    let target_X = st_X;
    let target_Y = st_Y;
    let isMoved = false;

    dx = (flag) ? -dx : 0;
    dy = (flag) ? 0 : -dy;
    for (let i=0; i<4; i++) {
        while ((0 <= Y && Y <= 3) && (0 <= X && X <= 3)) {
            if (boardArray[Y][X] !== -1) {
                let k = 1;
                while ((0 <= Y + k*dy && Y + k*dy <= 3) && (0 <= X + k*dx && X + k*dx <= 3)) {
                    if (boardArray[Y + k*dy][X + k*dx] !== -1) {
                        if (boardArray[Y][X] === boardArray[Y + k*dy][X + k*dx]) {
                            boardArray[target_Y][target_X] = boardArray[Y][X] + 1;
                            if (!(target_X == X && target_Y == Y)) 
                                boardArray[Y][X] = -1;
                            boardArray[Y + k*dy][X + k*dx] = -1;
                        }
                        else {
                            boardArray[target_Y][target_X] = boardArray[Y][X];
                            if (!(target_X == X && target_Y == Y)) 
                                boardArray[Y][X] = -1;
                        }
                        isMoved = true;
                        target_X += dx;
                        target_Y += dy;
                        break;
                    }
                    k++;
                }
                if (!isMoved) {
                    boardArray[target_Y][target_X] = boardArray[Y][X];
                    if (!(target_X == X && target_Y == Y)) 
                        boardArray[Y][X] = -1;
                    target_X += dx;
                    target_Y += dy;
                }
            }
            X += dx;
            Y += dy;
            isMoved = false;
        }
        X = (flag) ? st_X : i+1;
        Y = (flag) ? i+1 : st_Y;
        target_X = (flag) ? st_X : i+1;
        target_Y = (flag) ? i+1 : st_Y;
    }
}

// create img of cell (eg.100원)
function createImg()
{
    // 랜덤 난수 생성
    let randomCellNumX = Math.floor(Math.random()*4);
    let randomCellNumY = Math.floor(Math.random()*4);
    
    // ID로 변환
    let idString = "";
    let randomCell = document.getElementById(idString.concat(randomCellNumX.toString(), randomCellNumY.toString()));
    
    // See if there is already an existing image out there
    let isThereImg = randomCell.firstElementChild;
    if (isThereImg !== null) {
        createImg();
        return;
    }

    // 이미지 태그 생성
    let imgElement = document.createElement("img");
    imgElement.classList.add("items");

    let createProbability = Math.random();
    if (createProbability < 0.1) {
        // 500원
        imgElement.src = "images/coin_500.png";
        imgElement.classList.add("coin_500");
        
        boardArray[randomCellNumX][randomCellNumY] = 1;
    }
    else {
        // 100원
        imgElement.src = "images/coin_100.png";
        imgElement.classList.add("coin_100");
        
        boardArray[randomCellNumX][randomCellNumY] = 0;
    }
    randomCell.appendChild(imgElement);
}

// checking gameover functions, true if gameover
function checkGameOver()
{
    for (let i = 0 ; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (boardArray[i][j] === -1) 
                return false;
        }
    }
    for (let i = 0 ; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardArray[i][j] === boardArray[i][j+1])
                return false;
        }
    }
    for (let i = 0 ; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardArray[i][j] === boardArray[i+1][j])
                return false;
        }
    }
    return true;
}

// execution area

init();

// game.html ends
// game.html ends
// game.html ends