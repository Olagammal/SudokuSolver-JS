const a = null;

const myBoard = [
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a],
    [a,a,a,a,a,a,a,a,a]
]
//other script 
function enableEditing(id){
    document.getElementById(id).readOnly = false;
    document.getElementById(id).style.cursor = 'auto'; 
}

function disableEditing(id,e){
    if(e.keyCode == 13){
        document.getElementById(id).readOnly = true;
        document.getElementById(id).style.cursor = 'default';         
        
    }
}
function onEnteringValue(id,e){
    e.preventDefault();
    var inputValue = parseInt(e.target.value,10);       

    if(isNaN(inputValue)){
        var myRow = parseInt(id.charAt(1),10)
        var myColumn = parseInt(id.charAt(2),10)
        myBoard[myRow][myColumn] = null;
        
    }
    else{
        var myRow = parseInt(id.charAt(1),10)
        var myColumn = parseInt(id.charAt(2),10)
        myBoard[myRow][myColumn] = inputValue
    }    
}
function enteredValue(id,e){    
    if((e.keyCode >= 49 && e.keyCode <= 57)){                
       return true
    }
    else {
        return false
    }
}
function solveSudoku(){ 
    //calculation for solution
    var finalSolvedBoard = solveBoard(myBoard)
    console.log(finalSolvedBoard);
    
    if(finalSolvedBoard == false){
        modalPopUp()
    }
    else if(isSolved(myBoard)){
        document.getElementById("modalContent").textContent = "This board is already solved"
        modalPopUp()
    }
    else{
        for(var i=0; i<9; i++){
            for(var j=0; j<9; j++){
                if(myBoard[i][j] == null){
                    currentId = "r"+i+j;
                    document.getElementById(currentId).value = finalSolvedBoard[i][j];
                    document.getElementById(currentId).style.color = "green";
                }
            }
        }
    }
    //disable editing in sudoku board after solving once
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            currentId = "r"+i+j;
            document.getElementById(currentId).style.cursor = 'default';
            document.getElementById(currentId).disabled = true
        }
    }
}
function resetBoard(divId){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            currentId = "r"+i+j;
            document.getElementById(currentId).value = "";
            //enable editing
            document.getElementById(currentId).disabled = false
        }
    }
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            myBoard[i][j] = null;
        }
    }
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            currentId = "r"+i+j;
                document.getElementById(currentId).style.color = "black";
            }
        }
}

function modalPopUp(){
    document.getElementById('popup-1').classList.add('active');
}

function closeModal(){
    document.getElementById('popup-1').classList.remove('active');
}






//main solving function
function solveBoard(board){
    if(isSolved(board)){
        return board
    }
    else{
        const possibleBoards = findAllBoards(board)
        const validBoards = filterValidBoards(possibleBoards)
        return solvingFurther(validBoards)
    }
}

function solvingFurther(validBoards){
    if(validBoards.length <1){
        return false
    }
    else{
        var currentBoard = validBoards.shift()
        const value = solveBoard(currentBoard)
        if( value == false){
            return solvingFurther(validBoards)
        }
        else{
            return value
        }
    }

}

function isSolved(board){
    for(var i=0; i<9 ; i++){
        for( var j=0; j<9 ; j++){
            if(board[i][j] == null){
                return false
            }
        }
    }
    return true
}

function findAllBoards(board){
    var boards = []
    const firstEmpty = firstEmptyBox(board) // returns x and y coordinates
    const x = firstEmpty[0]
    const y = firstEmpty[1]
    for(var i = 1;i <= 9 ; i++){
        var newBoard = []
        newBoard = [...board]
        var row = [...newBoard[x]]
        row[y] = i
        newBoard[x] = row
        boards.push(newBoard)        
        }    
    return boards
}

function firstEmptyBox(board){
    for(var i =0; i<9 ; i++){
        for(var j=0 ;j<9 ;j++){
            if(board[i][j] == null){
                return [i,j]
            }
        }
    }
}

function filterValidBoards(boards){
    var valid = []
    for (const board of boards) {
        if(isValid(board)){
            valid.push(board)
        }        
    }
    return valid
}

function isValid(board){
    if(rowsCheck(board) && columnsCheck(board) && miniCheck(board)){
        return true
    }
    else{
        return false
    } 
}

function rowsCheck(board){
    for(var i = 0; i<9 ;i++){
        var rowElements = []
        for(var j=0; j<9 ;j++){
            if(board[i][j] != null){
                if(rowElements.includes(board[i][j])){
                    return false
                }
                else{
                    rowElements.push(board[i][j])
                }
            }
        }
    }
    return true
}
function columnsCheck(board){
    for(var i = 0; i<9 ;i++){
        var columnElements = []
        for(var j=0; j<9 ;j++){
            if(board[j][i] != null){
                if(columnElements.includes(board[j][i])){
                    return false
                }
                else{
                    columnElements.push(board[j][i])
                }
            }
        }
    }
    return true
}

function miniCheck(board){
    for( var rowStart=0 ; rowStart<9 ; rowStart += 3){
        for(var columnStart=0 ; columnStart<9; columnStart +=3){
            var miniBoxElements =[]
            for(var i=rowStart; i<(rowStart+3); i++){
                for(var j=columnStart; j<(columnStart+3); j++ ){
                    if(board[i][j] != null){
                        if(miniBoxElements.includes(board[i][j])){
                            return false
                        }
                        else{
                            miniBoxElements.push(board[i][j])
                        }
                    }
                }
            }
        }
    }
    return true
}


