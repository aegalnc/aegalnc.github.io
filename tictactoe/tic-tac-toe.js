

var height = 3;
var width = 3;

window.onload = function() {
    for (var row = 0; row < height; row++) {
        var board_html = document.getElementById("board");
        var row_id = "row_" + row.toString();
        board_html.innerHTML += '<div id="' + row_id + '"></div>';
        var row_html = document.getElementById(row_id);
        for (var col = 0; col < width; col++) {
            var box_id = "box_" + row.toString() + "_" + col.toString();
            var click_box = "click_box(" + row.toString() + ", " + col.toString() + ")";
            row_html.innerHTML += '<div class="box" id="' + box_id + '" onclick="' + click_box + '"></div>';
        }
    }
};

var board = [...Array(height)].map(e => Array(width).fill(""));

var next = "cross";

function click_box(row, col) {
    var box_id = "box_" + row.toString() + "_" + col.toString();
    var box = document.getElementById(box_id);
    if (box.classList.contains("cross") || box.classList.contains("circle")) {
        mdui.alert("这里已经有棋子了！", "提示");
        return;
    } else {
        box.classList.add(next);
        board[row][col] = next;
        if (next == "cross") {
            next = "circle";
        } else {
            next = "cross";
        }
    }

    function check_win() {
        for (var row = 0; row < 3; row++) {
            if (board[row][0] !== "" && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                return true;
            }
        }
        
        for (col = 0; col < 3; col++) {
            if (board[0][col] !== "" && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
                return true;
            }
        }

        if (board[0][0] !== "" && board[0][0]===board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }
        
        if (board[0][2] !== "" && board[0][2]===board[1][1] && board[0][2] === board[2][0]) {
            return true;
        }

        return false;
    }

    if (check_win()) {
        mdui.alert("赢了！！！😎");
        return;
    }

    function check_full() {
        for(var row = 0; row < height; row++){
            for(var col = 0; col < width; col++){
                if(board[row][col]=="") {
                    return false;
                }
            }
        }
        return true;
    }

    if(check_full()){
        mdui.alert("平局！！！！！！😳");
        return;
    }
}