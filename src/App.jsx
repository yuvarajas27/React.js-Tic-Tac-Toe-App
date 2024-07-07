// importing the useState hook from react
import { useState } from "react"

//importing Player component from ./Player.jsx 
// Important things about file paths mentioned below:
// ./ represents the importing file present from the same directory where index.jsx file present "
// ../ represents the importing file present one directory up from the current file present "
// ../../ represents the importing file present two directory up from the current file present "

// if component is exported as default , we want to specify just Component name after import . e.g Player
// if component is not exported as default , we want to specify component name inside curly braces({}) e.g {Player} 
import Player from "./Player.jsx"

// importing GameBoard Component from GameBoard.jsx
// we can import jsx file (GameBoard component here) without mentioning extension also .jsx
import GameBoard from "./GameBoard"

// importing Log Component from Log.jsx
import Log from "./Log.jsx"

// importing GameOver Component from GameOver.jsx
import GameOver from "./GameOver.jsx"

// importing WINNING COMBINATIONS object which is exported as default in winning_combinations.js from winning_combinations.js
// we can import js file without mentioning extension also
import { WINNING_COMBINATIONS } from "./winning_combinations.js"


// In Javscript, single Line comment is // 
// In Javascript, multiline comment is 
/* multi 
line 
comment */




// Defining the constant INITIAL_GAME_BOARD value as multidimensional array of 3 rows , in this each row contains 3 values , that is defining 3*3 grid(like matrix) , 3 rows and 3 columns as a initial value for GameBoard 
// Beacause GameBoard is a 3*3 Grid 
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]

]

// Defining the constant PLAYERS value as object that contains two properties(a property describes a piece of data stored on an object)
// X->PLAYER1 , Y->PLAYER2
const PLAYERS = {
  "X": "PLAYER1",
  'O': "PLAYER2"
}



// function definition for deriveActivePlayer, it accepts updated gameTurn state variable(array) as an argument
function deriveActivePlayer(gameTurn) {

  // initially we are setting the currentPlayer value as "X",we designed the game to start first player to start as "X",
  let currentPlayer = "X"

  // We know our gameTurns array state variable will be updated on each time when player selected any squares in gameBoard, but gameTurns array state variable will be updated like inserting new gameturns information(object) always first, then old game turns information will be added next for each time updation occurs.
  // so, checking gameTurns array value is greater than 0, if yes,it indicates one gameTurn already done, atleast one gameTurn information will be there in array and checking first value of that gameTurn player is X, if yes, currentPlayer value is set to "O", that is setting the next Player value as "O" for next gameTurn. 
  // We are checking first value of gameTurns state to find nextPlayer(currentPlayer needs to select square on gameboard in game), because first value is the latest gameTurn information, which means player in first gameTurn information is the player who played last.

  // if gameTurn length is 0, obviously currentPlayer is "X" we designed the game to start first player to start as "X", if gameTurns length is greater than 0, latest gameTurn (first value of gameTurn is "O" means, we need to set currentPlayer as "X", but we defined at start of this function itself, no need to define down in else block)
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O"
  }

  //returning the current Player information we found
  return currentPlayer

}


// function definition for deriveGameBoard, it accepts updated gameTurns state variable (array) as one and only argument
function deriveGameBoard(gameTurns) {


  // In Javascript, array is a reference data type, so when we assign simply some array value to some other variable, it simply assigns array reference value(address value (pointer) where array stores and pointing), so array assigned to variable(gameBoard here ) and array we assigned (INITIAL_GAME_BOARD) holds same address value, so if we change any array values, both array values will be changed, because it changing the array value by looking in to address value (pointer) where the array stored and points and changing, but both array points to same address in this case, This is mutable way of updating array(one array value will change if other array value change)

  /* pointer which holds address
  gameboard           --------------|
                                    |---------->1000 address -----------> [
                                    |                                                1001 (address) ------>  [null, null, null],
  INITIAL_GAME_BOARD  --------------|                                                1002 (address) ------>  [null, null, null],               
                                                                                     1003 (address) ------>  [null, null, null]
                                                                          ]
  */

  // setting the gameBoard value to initial game board value but in a immutable way,means using spread operator (...) inside array to spread array values , so our gameboard array will store and point to different address(for e.g 2000), but initial game board array points to address 1000, also we are using map to transform inner arrays also using spread operator, beacause with using spread operator like 
  // let gameBoard=[...INITIAL_GAME_BOARD] , will create new address(2000) for outerarray and gameBoard array points to address 2000 , but still inner arrays(three arrays) of gameBoard arrays will point to old address(like 1001,1002,1003), so for to change inner array address, using map to transform inner arrays with spread operator(...)  like below , so three inner arrays also points to different address 1004,1005,1006 respectively.

  let gameBoard = [...INITIAL_GAME_BOARD.map(rows => {
    return [...rows]
  })]

  // Using for of loop, iterating over gameTurns Array, if gameTurns doesnot contain any array values, for of loop doesnot iterate at all.
  for (const turn of gameTurns) {
    // we are storing data in gameTurns array like the beow format 
    // [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns]
    // using object destructuring , defining square and player const variables
    const { square, player } = turn
    // using object destructuring, defining row and col values from the variable square which contains object we just defined above 
    const { row, col } = square

    // upadating the gameBoard values with currentPlayer("X" or "O")
    gameBoard[row][col] = player


  }
  // returning the upadate gameBoard
  return gameBoard

}

// defining the deriveWinner function and it accepts players state variable and updated gameBoard Value
function deriveWinner(players, gameBoard) {
  // declaring the let variable for winner, but not defined(assigned) value, so js implicitly provides undefined value 
  let winner

  //Using the for of loop, iterating over all the WINNING_COMBINATIIONS array of objects we imported here in app.jsx file from winning_combinations.js file
  /*
  This is one of the arrays in winning_combinations.js file, which contains only three objects and each object represent the row and column index of that winning combination 
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ]
  Explanation:

  00 01 01 
  10 11 12 
  20 21 22 

  consider above as tic-tac-toe gameboard, here 00,01,02 is one of the winnig combination , 
  00 - 0th row 0th column
  01 - 0th row 1st column 
  02 - 0th row 2nd column
   so if Players symbol of "X" or "O" is found in all the three boxes of th winning combinations, winner is that respective Player who uses that symbol
  */
  for (const combinations of WINNING_COMBINATIONS) {

    // getting firstSquare symbol of one of the winning combinations
    let firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    // getting secondSquare symbol of one of the winning combinations
    let secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    // getting thirdSquare symbol of one of the winning combinations
    let thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]


    // checking firstSquareSymbol is null, if null definitely no possible of winner here, so winner will not found , but if its not null, then checking whether firstSquareSymbol , secondSquareSymbol, thirdSquareSymbol all are equal, if yes , winner is the player who holds this symbol, else no winner found. 
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }
  // returning the winner which holds either winner value or undefined value(means no winner found)
  return winner
}

// Defining the App component function ( In React , component is just a function)
// In React, if function to be recognized and used as a component, it must follow two rules 
// 1. Function name should starts with UpperCase letter. multiword names should be written in camelCase(E.g myHeader), also recommend to pick   a  name that describes the component(UI building block) 
// 2. function  must return a value that can be rendered(displayed on screen), in most cases , return jsx(html code in javascript also allowed return values like String,Number,Boolean,Null,array of allowed values(string,number,boolean,null)
function App() {

  //const [activePlayer, setActivePlayer] = useState("X")

  // React state is all about registering variables that are handled by react and that variable are updated with help of special function provided by react and this function tells react that data changed and it will cause react to update UI by running the respective component again which is responsible for data change
  // All these functions that start with use in React projects are React Hooks.
  // React Hooks are the special functions we can use in functional components,Hooks are functions that make functional components works like class components. Before react launch hook, only way to manage state and lifecycle methods is to use class based components.



  // useState hook accepts one argument that is initial value(default value) react want to use or store when component is rendered first time. in simpler terms, it uses this value as a initial value for a state variable 
  // useState hooks returns array of two values: 
  // first array value is a state variable which contains initial value we pass to useState hook, if no value pass, value will be undefined
  // second array value is always a function(state updating function), we can call this state updating function with new values to update the state variable, component will rerender for every time state updating function call occur(every time state variable changes).
  //  using array destructuring to store the state variable and function values to players and setPlayers respectively. 

  // defining the players state variable as PLAYERS object as initial value by passing as an argument to useState Hook and we can use setPlayers state updating function to update the players state variable. 

  // we are managing this state to update the PlayerNames using setPlayers state updating function if player edit the name (we have edit player Name functionality)
  /**************************************************************************
   * Lifting state up in React(important concept)                                                                       
   * In React, we can lift the state up to the closest ancestor component that has access to all components that need to work with that state
   *      ancestor component(we can define state here , that can be used by both child components)
   *              |
   *              |
   *         _____|______________________________
   *        |                                    |
   *     child component 1            child component 2
   * 
   * In our project , Ancestor Component is App, child components are GameBoard,GameOver,Log,Player.
   * 
   ****************************************************************************/

  // Actually we are manging one state already in Player.jsx component to update player name when input text box value changes, but we can't lift that state up here in App.jsx component, because that state variable change based on input text box value change for every keystroke, so that leads to rerender this app component for every change of value in text box occurs for every keystroke, that's redundant(unwanted), also we can't lift that state and manage here, because its like managing this state for player name updation for both Players(calling two players component here right), so it leads to confusion and error, so its not possible to lift that stateup here 

  // So, we are getting that upadted playername for each player component and updating that informatioin in below players state variable using setPlayers updating function when user only clicks the edit button and after editing the player name.
  const [players, setPlayers] = useState(PLAYERS)


  // defining the gameTurns state variable as empty array as initial value by passing as an argument to useState Hook and we can use setGameTurns state updating function to update the gameTurns state variable. 

  // we are managing this state to update the gameTurns of the game(which player clicked which square in gameBoard) using setGameTurns state updating function if new gameTurn happened(player clicked square in gamboard, in simpler terms)

  const [gameTurns, setGameTurns] = useState([])
  //console.log(`In App.jsx, gameTurns state : ${gameTurns}`)



  // calling the deriveGameBoard function  defined outside of App Component with updated gameTurns state as an argument to get gameBoard value
  const gameBoard = deriveGameBoard(gameTurns)
  //console.log(`In App.jsx  gameBoard : ${gameBoard}`)

  // calling the deriveWinner function defined outside of App Component with updated players state and gameBoard as an argument to get winner value
  const winner = deriveWinner(players, gameBoard)
  //console.log(`In App.jsx : ${winner}`)



  // After getting the winner variable value , checking gameTurns array length is 9 and winner value is undefined(means no winner found), so if these two conditions satisfy, match is drawn for sure, if these two condition is true, hasDraw will be "true" else "false"
  const hasDraw = gameTurns.length === 9 && !winner

  // function handleSelectSquare() {
  //   setActivePlayer((prevPlayer) =>
  //     prevPlayer === "X" ? "O" : "X"
  //   )

  // }



  // calling the deriveActivePlayer function defined outside of App Component with updated gameTurns state as an argument to get activePlayer
  const activePlayer = deriveActivePlayer(gameTurns)
  //console.log(`In App.jsx , active player: ${activePlayer}`)
  //console.log("===================================================")


  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((prevPlayer) => prevPlayer === "X" ? "O" : "X")

    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns]
      return updatedTurns
    })

  }

  function handleRestart() {
    setGameTurns([])

  }

  function handleSelectName(symbol, updatedName) {
    setPlayers((prevPlayers) => {
      return (
        {
          ...prevPlayers,
          [symbol]: updatedName

        }
      )

    })

  }
  //console.log(gameTurn)

  // returning the jsx(non standard javscript syntax,html in javascript )
  return (

    // In react jsx we can pass dynamic values inside curly braces {dynamic value} */}
    <main>
      <div id="game-container" >
        <ol id="players" className="highlight-player">

          {/* In jsx , to comment use ctrl + ? in vs code to get comment feature */}
          {/* In React components are reusable, to build and use certain react components with different input data, react offer crucial concept called props , props concept is about pass data in to components and use data there  */}
          {/* props are component attributes(input data we are passing to components) used to configure components ,
            In simpler terms, react allows you to pass data to components via concept called props.
           */}


          {/* calling the Player Component with four props values : 
          initialPlayerName as Player1   
          for playerSymbol X, 
          isActive as true or false by checking whether X is a current active Player, 
          onChangeName as function value called handleSelectName which holds the logic for updating the player name using setPlayers state updating function when playername is edited by user  */}
          {/* for onChangeName prop, we are passing function as value, that means passing function pointer value, so the component which recieves this function pointer will able to identify this function using his pointer and execute.    */}
          {/* Note: In Depth Explanation !!! For function we are passing as value here as a prop will follow the closure concept, that means this function will have access to outer function variables even after execution of outer function (here App component) */}
          <Player initialPlayerName={PLAYERS.X} playerSymbol="X" isActive={activePlayer === "X"} onChangeName={handleSelectName} />




          {/* calling the Player Component with four props values : 
          initialPlayerName as Player2 
          for playerSymbol O,
          isActive as true or false by checking whether O is a current active Player, 
          onChangeName as function value called handleSelectName which holds the logic for updating the player name using setPlayers state updating function when playername is edited by user  */}
          {/* for onChangeName prop, we are passing function as value, that means passing function pointer value, so the component which recieves this function pointer will able to identify this function using his pointer and execute.    */}
          <Player initialPlayerName={PLAYERS.O} playerSymbol="O" isActive={activePlayer === "O"} onChangeName={handleSelectName} />
        </ol>

        {/* calling the GameOver Component with two Prop values :
         winner prop as true or false based on winner logic , 
         onRestart prop as function value called handleRestart which holds the logic for restarting the game if match is over ,but GameOver Component will call only when we find winner or find match state is draw in logic mentioned above . 
         So using && operator , if winner || hasDraw (anyone is true) means left side of && operator is true and calling Gameover component is evaluated as true to default, So calling GameOver component will run */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}


        {/* calling GameBoard Component with two prop values : 
          onSelectSquare as function value called handleSelectSquare which holds the logic for updating the gameTurns array state variable (each game turn values will be added as first value in array follwed by previous turn values, initially array value is empty) for each select(each gameplay) in gameboard using setGameTurns state updating function.
          board value as updated gameBoard 
        */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />

      </div>


      {/* calling the Log component with two prop values:
      turns as updated gameTurns array state variable 
      player as players state variable which holds the updated Player Name
      */}
      <Log turns={gameTurns} player={players} />

    </main>
  )

}

// exporting the app component function as default, this is one of the way to export default function, we can export only one default function in a component
export default App
