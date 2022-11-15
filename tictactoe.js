const gameboard = (() => {
    let playerSelection = document.querySelectorAll(".gameboard")
    let selectionInput = document.querySelectorAll(".selection")
    let player1ScoreDisplay = document.querySelector(".player1score")
    let player2ScoreDisplay = document.querySelector(".player2score")
    let tieScoreDisplay = document.querySelector(".tie")
    let player1Score = Number(player1ScoreDisplay.textContent)
    let player2Score = Number(player2ScoreDisplay.textContent)
    let tieScore = Number(tieScoreDisplay.textContent)
    let selectionArray = []
    let gotWinner = false
    const winCombos = [ 
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [0,4,8]
  ]
    player1 = playerFactory('X', true)
    player2 = playerFactory('O', false)
    playerSelection.forEach(selection => {
      selection.addEventListener("click", playGame)
    })
  
    function playGame (e) {
      selectionIndex = Array.from(playerSelection).indexOf(e.target)
      if  (player1.turn) {
        player1.turn = false
        player2.turn = true
        playerSelection[selectionIndex].removeEventListener("click", playGame)
        selectionInput[selectionIndex].textContent = "X"
        selectionArray[selectionIndex] = "X"
        checkWinner()
        tieGame()
      } else if (player2.turn) {
        player1.turn = true
        player2.turn = false
        selectionInput[selectionIndex].textContent = "O"
        selectionArray[selectionIndex] = "O"
        playerSelection[selectionIndex].removeEventListener("click", playGame)
        checkWinner()
        tieGame()
      }
    }
  
    function checkWinner () {
      winCombos.forEach(combo => {
        if (selectionArray[combo[0]] === "X" && selectionArray[combo[1]] === "X" && selectionArray[combo[2]]=== "X") {
          selectionInput[combo[0]].classList.add("winningmove")
          selectionInput[combo[1]].classList.add("winningmove")
          selectionInput[combo[2]].classList.add("winningmove")
          gotWinner = true
          player1.turn = false
          player2.turn = false
          player1Score++
          player1ScoreDisplay.textContent = player1Score
          setTimeout(resetGame, 2000)
          return gotWinner
        } else if (selectionArray[combo[0]] === "O" && selectionArray[combo[1]] === "O" && selectionArray[combo[2]]=== "O") {
          selectionInput[combo[0]].classList.add("winningmove")
          selectionInput[combo[1]].classList.add("winningmove")
          selectionInput[combo[2]].classList.add("winningmove")
          gotWinner = true
          player1.turn = false
          player2.turn = false
          player2Score++
          player2ScoreDisplay.textContent = player2Score
          setTimeout(resetGame, 2000)
          return gotWinner
        }
      })
    }
  
    function tieGame () {
      let newSelectionArray = selectionArray.filter(x => x)
      if ((newSelectionArray.length === 9) && (!gotWinner)) {
        setTimeout(resetGame, 2000)
        selectionInput.forEach(input => {
          input.classList.add("winningmove")
        })
        tieScore++
        tieScoreDisplay.textContent = tieScore
      }
    }
  
    function resetGame () {
      selectionInput.forEach(selection => {
        selection.textContent = ""
        selection.classList.remove("winningmove")
      })
      player1.turn = true
      player2.turn = false
      selectionArray = []
      playerSelection.forEach(selection => {
        selection.addEventListener("click", playGame)
      })
      gotWinner = false
    }
  })()
  
  function playerFactory(selection, turn) {
    return {
      selection, turn
    }
}
  
  