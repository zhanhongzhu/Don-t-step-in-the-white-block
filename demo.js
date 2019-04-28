var obox = document.getElementsByClassName('box')[0],
    go = document.getElementsByClassName('wrapper')[0],
    Start = document.getElementsByClassName('Start')[0],
    end = document.getElementsByClassName('end')[0],
    rscore = document.getElementsByClassName('score')[0],
    color = ['#ffe6eb', '#f9989f', '#ffd3de', '#32dbc6', '#f77754', '#51eaea', '#df0e62'],
    speed = 0,
    score = 0,
    wspeed = 6,
    timer = null,
    timer2 = null,
    count = 0;

//初始入口
function init() {
    bindCoverEvent();
}
init();

//游戏开始封面
function bindCoverEvent() {
    Start.style.display = 'block';
    end.style.display = 'none';
    Start.addEventListener('click', function() {
        Start.style.display = 'none';
        interval();
    })
}

//创建元素函数
function createRowBlock() {
    var blockRan = parseInt(Math.random() * 4);
    var colorRan = parseInt(Math.random() * 7);
    for (var i = 0; i < 4; i++) {
        var odiv = document.createElement('div');
        odiv.className = 'row';
        if (blockRan == i) {
            odiv.style.backgroundColor = color[colorRan];
        } else {
            odiv.style.backgroundColor = '#fff';
        }
        obox.appendChild(odiv);
    }

}

//执行创建、移动函数
function interval() {
    timer = setInterval(function() {
        createRowBlock();
        moveDown();
        console.log(count++);
        var w = parseInt(parseInt(obox.style.top) / 160);
        var sc = parseInt(score);
        console.log(w,sc)
        if (w != -sc) {
            clearInterval(timer2);
            clearInterval(timer);
            bindEndCover();
        }
    }, 1000)
    timer2 = setInterval(function() {
        move();
    }, wspeed * 80)
}
//原始的四个
createRowBlock();
createRowBlock();
createRowBlock();
createRowBlock();

//移动和计分函数
function moveDown() {
    var xdiv = document.getElementsByClassName('row');
    var cArr = [];
    for (var i = 0; i < xdiv.length; i++) {
        var s = xdiv[i];
        s.onclick = function(e) {
            var t = e.target.style.backgroundColor;
            console.log(t)
            if (t == 'rgb(255, 255, 255)') {
                bindEndCover();
            } else {
                score++;
                t = 'rgb(0, 0, 0)';
                console.log(t)
                rscore.innerHTML = '得分:' + score;
                console.log(rscore.innerHTML)
                createRowBlock();
                move();
                move();
                moveDown();
            }
        }
    }
}

//移动函数
function move() {
    speed++;
    obox.style.top = -speed * 30 + 'px';
}

//游戏结束及初始自执行函数
(function() {
    end.addEventListener('click', function() {
        end.style.display = 'none';
        Start.style.display = 'block';
        obox.style.top = 0 + 'px';
        obox.style.left = 0 + 'px';
        obox.style.zIndex = 1;
        score = 0;
        rscore.innerHTML = '得分:' + score;
        clearInterval(timer);
    })
})();


function bindEndCover() {
    obox.style.display = 'block';
    obox.style.zIndex = -1;
    end.innerHTML = '得分为:' + score;
    end.style.display = 'block';
    clearInterval(timer);
    clearInterval(timer2);
}