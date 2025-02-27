/*leader board*/

// Calculate the score sum and store it in localStorage
function store_lb() {
    let sum = 0;
    for (let i=0; i<4; i++)
        for (let j=0; j<4; j++)
            if (boardArray[i][j] !== -1)
                sum += Math.pow(2, (boardArray[i][j] + 1));
    
    // "myID" stored in a format like "lbmyID".
    let user_name = localStorage.getItem("user");
    if (localStorage.getItem("lb" + user_name) !== null) {
        if (parseInt(localStorage.getItem("lb" + user_name)) < sum)
            localStorage.setItem("lb" + user_name, sum);
    }
    else {
        localStorage.setItem("lb" + user_name, sum);
    }
}

// Update leader board
function update_lb() {
    let score_ary = Array(), cnt = 0;
    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.substring(0, 2) === "lb") {
            score_ary.push(Array(key, localStorage.getItem(key)));
            cnt++;
        }
    }

    // sort in descending order
    score_ary.sort(function(a, b) {
        let num_a = parseInt(a[1]), num_b = parseInt(b[1]);
        if (num_a > num_b) return -1;
        else if (num_a == num_b) return 0;
        else if (num_a < num_b) return 1;
    })

    for (let i=1; i<=((cnt < 7) ? cnt : 7); i++) {
        document.getElementById("name" + i.toString()).innerHTML = score_ary[i-1][0].substring(2);
        document.getElementById("score" + i.toString()).innerHTML = score_ary[i-1][1];
    }
}

// game.html
// game.html
// game.html

// image priority (11 classes)
let imgPriorityArray = ["coin_100", "coin_500", "bill_1000", "bill_5000", "bill_10000", "bill_50000", "carrier", "hotel", "plane_ticket", "SKKUchar", "plane"];
// array of boolean values which determines addition of image on the right .stack div
let acquiredImg = [false, false, false, false, false, false, false, false, false, false, false]; 
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
        default:
            break;
    }
});

// Initialization
function init() {
    // add coin_100 image to .stack div
    // to prevent reverse addition (e.g. 500 first, 100 second)
    acquiredImg[0] = true;
    let newImage = document.createElement("img");
    newImage.classList.add("items", "stackItems");
    newImage.src = "images/coin_100_lighter.png";
    stack.appendChild(newImage);

    // create image "twice"
    createImg();
    createImg();
}

let isClear = false;
let isGameOver = false;
// 변화 업데이트 (called inside moveCell and restart eventlistener)
function updateChange() {

    if (isClear === true) return; // 깼으면 업데이트 안 함
    else if (isGameOver === true) return; // gameover => 업데이트 안 함
    // delete all images in the visual board
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            let tempStr = "";
            let cellObject = document.getElementById(tempStr.concat(i.toString(), j.toString()));
            let imgChild = cellObject.firstElementChild;
            if (imgChild !== null)
                cellObject.removeChild(imgChild);
        }
    }
    // add images (status info of the result of last user move)
    let stack = document.getElementById("stack");
    let stack2 = document.getElementById("stack2");
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (boardArray[i][j] === -1) continue; // if image is not set, pass
            let imgClass = imgPriorityArray[boardArray[i][j]];
            let tempStr = "";
            let cellObject = document.getElementById(tempStr.concat(i.toString(), j.toString()));
            
            let img = document.createElement("img");
            img.classList.add(imgClass, "items"); // class .items provides style options
            switch (imgClass)
            {
            case imgPriorityArray[0]:
                img.src = "images/coin_100.png";
                // image is added on stack if not added yet
                if (acquiredImg[0] === false) {
                    acquiredImg[0] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = "images/coin_100_lighter.png";
                    stack.appendChild(newImage);
                }
                break;
            case imgPriorityArray[1]:
                img.src = "images/coin_500.png";
                if (acquiredImg[1] === false) {
                    acquiredImg[1] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = "images/coin_500_lighter.png";
                    stack.appendChild(newImage);
                }
                break;
            case imgPriorityArray[2]:
                img.src = "images/bill_1000.png";
                if (acquiredImg[2] === false) {
                    acquiredImg[2] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = "images/bill_1000_lighter.png";
                    stack.appendChild(newImage);
                }
                break;
            
            case imgPriorityArray[3]:
                img.src = "images/bill_5000.png";
                if (acquiredImg[3] === false) {
                    acquiredImg[3] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = "images/bill_5000_lighter.png";
                    stack.appendChild(newImage);
                }
                break;
            case imgPriorityArray[4]:
                img.src = "images/bill_10000.png";
                if (acquiredImg[4] === false) {
                    acquiredImg[4] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = "images/bill_10000_lighter.png";
                    stack.appendChild(newImage);
                }
                break;
            case imgPriorityArray[5]:
                img.src = "images/bill_50000.png";
                if (acquiredImg[5] === false) {
                    acquiredImg[5] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = "images/bill_50000_lighter.png";
                    stack.appendChild(newImage);
                }
                break;
            case imgPriorityArray[6]:
                img.src = "images/mycarrier.png";
                if (acquiredImg[6] === false) {
                    acquiredImg[6] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = img.src;
                    stack2.appendChild(newImage);
                }
                break;
            
            case imgPriorityArray[7]:
                img.src = "images/myhouse.png";
                if (acquiredImg[7] === false) {
                    acquiredImg[7] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = img.src;
                    stack2.appendChild(newImage);
                }
                break;
            
            case imgPriorityArray[8]:
                img.src = "images/myplaneticket.png";
                if (acquiredImg[8] === false) {
                    acquiredImg[8] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = img.src;
                    stack2.appendChild(newImage);
                }
                break;
            
            case imgPriorityArray[9]:
                img.src = "images/mySKKUchar.png";
                if (acquiredImg[9] === false) {
                    acquiredImg[9] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = img.src;
                    stack2.appendChild(newImage);
                }
                break;
            case imgPriorityArray[10]:
                img.src = "images/myplane.png";
                if (acquiredImg[10] === false) {
                    acquiredImg[10] = true;
                    let newImage = document.createElement("img");
                    newImage.classList.add("items", "stackItems");
                    newImage.src = img.src;
                    stack2.appendChild(newImage);
                }
                isClear = true; // game clear
                break;
            }
            cellObject.appendChild(img)
        }
    }

    // game clear
    if (isClear === true) {
        alert("축하합니다!\n명륜이는 여행을 떠날 준비를 마쳤습니다!");
        store_lb(); // records in leaderboard
        return;
    }

    // check gameover
    isGameOver = checkGameOver();
    // if gameover
    if (isGameOver === true) {
        alert("아쉽게도 명륜이는 모종의 이유로 여행을 떠날 수 없게 되었습니다...");
        store_lb(); // records in leaderboard
        return;
    }
    // if not over and not full
    if (checkIsFull() === false)
        createImg();
}

// Check whether the cell is moveable or not and move it
// flag = 0: 상하, flag = 1: 좌우
function moveCell(dx, dy, flag)
{
    let isMoved = false;
    // 기준 X, Y 저장
    let st_X = ((dx === 1) ? 3 : 0);
    let st_Y = ((dy === 1) ? 3 : 0);
    let X = st_X;
    let Y = st_Y;
    // 셀을 이동시킬 좌표
    let target_X = st_X;
    let target_Y = st_Y;

    // 탐색이 위에서부터가 아닌 밑(기준)에서부터 탐색하며 올라오므로
    dx = ((flag) ? -dx : 0);
    dy = ((flag) ? 0 : -dy);

    for (let i=0; i<4; i++) {
        while ((0 <= Y && Y <= 3) && (0 <= X && X <= 3)) {
            if (boardArray[Y][X] !== -1) {
                let k = 1;
                while ((0 <= Y + k*dy && Y + k*dy <= 3) && (0 <= X + k*dx && X + k*dx <= 3)) {
                    if (boardArray[Y + k*dy][X + k*dx] !== -1) {
                        // 이동시킨 후에 인접한 두 셀이 합칠 수 있는 경우
                        if (boardArray[Y][X] === boardArray[Y + k*dy][X + k*dx]) {
                            boardArray[target_Y][target_X] = boardArray[Y][X] + 1;
                            // 이동 시키려는 셀이 이동하지 않은 경우 -1로 갱신 X
                            if (!(target_X == X && target_Y == Y)) 
                                boardArray[Y][X] = -1;
                            boardArray[Y + k*dy][X + k*dx] = -1;
                        }
                        // 합칠 수 없는 경우
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
                // 탐색 중인 라인에 셀이 하나만 있었던 경우
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
        // 다음 기준 위치로 초기화 or 이동
        X = ((flag) ? st_X : i+1);
        Y = ((flag) ? i+1 : st_Y);
        target_X = ((flag) ? st_X : i+1);
        target_Y = ((flag) ? i+1 : st_Y);
    }
    updateChange();
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

        if (acquiredImg[1] === false) {
            acquiredImg[1] = true;
            let newImage = document.createElement("img");
            newImage.classList.add("items", "stackItems");
            newImage.src = "images/coin_500_lighter.png";
            stack.appendChild(newImage);
        }

        boardArray[randomCellNumX][randomCellNumY] = 1; // adds information to boardArray
    }
    else {
        // 100원
        imgElement.src = "images/coin_100.png";
        imgElement.classList.add("coin_100");
        
        boardArray[randomCellNumX][randomCellNumY] = 0; // adds information to boardArray
    }
    randomCell.appendChild(imgElement);
}

// checking gameover functions, true if gameover
function checkGameOver()
{
    if (checkIsFull() === false)
        return false;
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
function checkIsFull()
{
    for (let i = 0 ; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (boardArray[i][j] === -1) 
                return false;
        }
    }
    return true;
}

// refresh button event listener
document.getElementById("refreshGame").addEventListener("click", () => {
    boardArray = [ [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1] ]; // initialize boardArray
    
    // initialize both .stack and .stack2
    let stack = document.getElementById("stack");
    while (stack.firstElementChild)
    {
        stack.removeChild(stack.firstElementChild);
    }
    let stack2 = document.getElementById("stack2");
    while (stack2.firstElementChild)
    {
        stack2.removeChild(stack2.firstElementChild);
    }
    acquiredImg = [true, false, false, false, false, false, false, false, false, false, false];
    // add coin_100 by default
    let newImage = document.createElement("img");
    newImage.classList.add("items", "stackItems");
    newImage.src = "images/coin_100_lighter.png";
    stack.appendChild(newImage);

    isClear = false;
    isGameOver = false;
    updateChange(); // creates one element
    createImg();
});
// game.html ends
// game.html ends
// game.html ends