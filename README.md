# SudokuSolver-JS
Sudoku puzzle solver implemented in Javascript.

## Idea of the project
Backtracking algorithm is used to implement this project.
1.It is checked if the given input is a valid sudoku board.If yes, the following process is carried out.Otherwise displays **invalid board** message.
2.First empty cell of the board is found.
3.This cell is filled with numbers from 1-9 and all the possible boards are generated.
4.Only valid boards are filtered from all the possible boards.
5.The first board of the valid board is selected.
6.The steps from 2-5 are repeated untill all the cells are filled.
7.If all the cells are filled,the algorithm stops and displays the result.
8.If one of the board on solving is invalid,then it is backtracked and repeats the above process for the next valid board.

## Instructions
1.Click the cell to enter the input.
2.Hit Enter to disable editing.
3.Click "Solve for me!" button to get the result.
4.Click "Clear Board" button to reset.

### Sudoku Board Preview
![Screenshot from 2020-07-17 08-22-09](https://user-images.githubusercontent.com/61909533/87743562-d8bf5c00-c806-11ea-91f9-e8f557863336.png)

#### Before solving
![Screenshot from 2020-07-17 08-20-07](https://user-images.githubusercontent.com/61909533/87743727-305dc780-c807-11ea-9fd4-91775ab1d1bf.png)
#### After solving
![Screenshot from 2020-07-17 08-20-27](https://user-images.githubusercontent.com/61909533/87743770-508d8680-c807-11ea-83c1-217bb84be125.png)


