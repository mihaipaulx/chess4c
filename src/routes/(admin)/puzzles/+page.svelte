<script lang="ts">
  import { WebsiteName } from "../../../config"
  import { goto } from "$app/navigation"
  import { getNewUserStats } from "$lib/utils/glicko2.js"
  import type { PageServerLoad } from "./$types"
  export let data: PageServerLoad
  import { onMount } from "svelte"
  import { Chessground } from "svelte-chessground"
  // import { pieces, board, selectedPiece } from './store';

  const { puzzle, user } = data.props

  console.log(puzzle.fen)

  console.log("Puzzle rating: ", puzzle.rating)
  console.log("User: ", user)

  let puzzleSolution: string[] = puzzle.moves.split(" ")
  let initialPuzzleSolution = puzzleSolution
  let userSolution: string[] = []
  let isSubsetAndInSameOrder = (parentArray: string[], subsetArray: string[]) =>
    subsetArray.every((el, index) => parentArray[index] == el)
  let rating = user?.rating
  let puzzleCompleted = false
  let puzzleRestarted = 0
  let initialShapes = []
  let pastShapes = []
  let initialFen = puzzle.fen
  let deletedArrows = 0
  let chess

  const nextPuzzle = () => {
    // Navigate to the same route to trigger a reload
    location.reload()
  }

  const toCgMove = (lanMove) => {
    // Extract the original and destination positions
    const orig = lanMove.slice(0, 2)
    const dest = lanMove.slice(2, 4)
    // Return an object with orig and dest as properties
    return { orig, dest }
  }

  let firstPuzzleMove = toCgMove(puzzleSolution.shift())
  let fenAfterFirstMove = ""

  const keydownHandler = (event) => {
    if (
      event.key === "r" &&
      event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      // do nothing, this is browser's tab refresh
    } else if (event.key === "r") {
      console.log('The "R" key was pressed.')
      const restartButton = document.getElementById("restart-puzzle")
      if (restartButton) {
        restartButton.click()
      }
    } else if (event.key === " ") {
      // Check for the space key
      event.preventDefault() // browser has Space for scrolldown, prevent this
      if (puzzleCompleted) {
        console.log("The ⎵ key was pressed.")
        const nextButton = document.getElementById("next-puzzle")
        if (nextButton) {
          nextButton.click()
        }
      }
    }
  }

  // Use onMount to make a move programmatically when the component mounts
  onMount(() => {
    setTimeout(() => {
      chess.move(firstPuzzleMove.orig, firstPuzzleMove.dest)
    }, 250)
    fenAfterFirstMove = chess.getFen()
  })

  const restartPuzzle = () => {
    puzzleRestarted++
  }

  const getPostData = (success: boolean) => ({
    user_id: user?.id,
    puzzle_id: puzzle?.id,
    success: success,
    old_rating: user?.rating,
    old_rating_deviation: user.rating_deviation,
  })

  const drawListener = async (shapes) => {
    if (!puzzleCompleted) {
      shapes.forEach((shape) => {
        const shapeInPastShapesWithDifferentBrush = pastShapes.find(
          (pastShape) =>
            shape.orig == pastShape.orig &&
            shape.dest == pastShape.dest &&
            shape.brush != pastShape.brush,
        ) // ignore brush, you might have
        if (shapeInPastShapesWithDifferentBrush) {
          shapeInPastShapesWithDifferentBrush.brush = shape.brush
        }

        const shapeInPastShapes = pastShapes.find(
          (pastShape) =>
            shape.orig == pastShape.orig && shape.dest == pastShape.dest,
        )
        if (!shapeInPastShapes) {
          pastShapes.push(shape)
        }
      })

      // create a set of `orig` values from `array1` with `dest` as `undefined` (to compare with circles in pastShapes)
      const origSet = new Set(
        shapes
          .filter((shape) => shape.dest === undefined)
          .map((item) => item.orig),
      )
      console.log(origSet)

      // filter `pastShapes` based on the criteria
      pastShapes = pastShapes.filter(
        (pastShape) =>
          pastShape.dest ||
          (origSet.has(pastShape.orig) && pastShape.dest === undefined),
      )

      // Check for deleted arrows and make them sticky
      if (shapes.length < pastShapes.length) {
        deletedArrows++
      }

      userSolution = pastShapes
        .filter((shape) => shape.dest)
        .map((shape) => `${shape.orig + shape.dest}`)

      console.log("Player solution: ", userSolution)
      console.log("Puzzle solution: ", puzzleSolution)

      if (JSON.stringify(puzzleSolution) === JSON.stringify(userSolution)) {
        console.log("Puzzle solved")
        const success = true

        userSolution.every((move) => {
          const { orig, dest } = toCgMove(move)
          try {
            chess.move(orig, dest)
          } catch (e) {
            return false
          }
          return true
        })

        puzzleCompleted = true

        const postData = {
          ...getPostData(success),
          ...getNewUserStats(
            success,
            user.rating,
            puzzle.rating,
            user.rating_deviation,
            puzzle.rating_deviation,
          ),
        }

        const response = await fetch("/puzzles", {
          method: "POST",
          body: JSON.stringify({ postData }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        rating = postData.new_rating // for page state
        console.log(postData, response)
      } else if (!isSubsetAndInSameOrder(puzzleSolution, userSolution)) {
        console.log("Puzzle failed")
        const success = false

        userSolution.every((move) => {
          const { orig, dest } = toCgMove(move)
          try {
            chess.move(orig, dest)
          } catch (e) {
            return false
          }
          return true
        })

        puzzleCompleted = true

        console.log(
          success,
          user.rating,
          puzzle.rating,
          user.rating_deviation,
          puzzle.rating_deviation,
        )
        const postData = {
          ...getPostData(success),
          ...getNewUserStats(
            success,
            user.rating,
            puzzle.rating,
            user.rating_deviation,
            puzzle.rating_deviation,
          ),
        }

        const response = await fetch("/puzzles", {
          method: "POST",
          body: JSON.stringify({ postData }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        rating = postData.new_rating // for page state
        console.log(postData, response)
      }
    }
  }

  let config = {
    fen: puzzle.fen,
    viewOnly: false,
    coordinates: false,
    movable: {
      free: false,
    },
    drawable: {
      onChange: drawListener,
      enabled: true,
      eraseOnClick: false,
    },
    animation: {},
  }

  $: if (deletedArrows) {
    config = {
      ...config,
      fen: fenAfterFirstMove,
      movable: {
        ...config.movable,
        free: false,
      },
      drawable: {
        onChange: drawListener,
        enabled: true,
        shapes: pastShapes,
      },
    }
  }

  $: if (puzzleCompleted) {
    config = {
      ...config,
      fen: chess.getFen(),
      movable: {
        ...config.movable,
        free: false,
      },
      drawable: {
        onChange: drawListener,
        enabled: false,
        shapes: pastShapes,
      },
    }
    document.getElementById("next-puzzle").classList.remove("hidden")
  }

  $: if (puzzleRestarted) {
    config = {
      ...config,
      fen: initialFen,
      movable: {
        ...config.movable,
        free: false,
      },
      drawable: {
        onChange: drawListener,
        enabled: true,
        shapes: [],
      },
    }
    document.getElementById("next-puzzle").classList.add("hidden")
    puzzleCompleted = false
    userSolution = []
    pastShapes = []
    setTimeout(() => {
      chess.move(firstPuzzleMove.orig, firstPuzzleMove.dest)
    }, 400)
  }
</script>

<svelte:head>
  <title>{WebsiteName} | Puzzles</title>
  <meta name="description" content="{WebsiteName} | Puzzles" />
</svelte:head>

<div class="container mx-auto px-6 place-items-start max-h-[100vh] py-[15vh]">
  <div class="grid grid-flow-col">
    <div class="w-[70vh]">
      <Chessground
        bind:this={chess}
        orientation={puzzle.fen.includes("w") ? "black" : "white"}
        {config}
      />
    </div>

    <div class="flex h-full items-end ml-auto pr-3 gap-3 flex-row">
      <button
        on:click={restartPuzzle}
        class="btn btn-lg font-bold puzzle-button outline-none"
        id="restart-puzzle"
      >
        Restart [ R ]
      </button>
      <button
        on:click={nextPuzzle}
        class="btn btn-lg font-bold puzzle-button outline-none hidden"
        id="next-puzzle"
      >
        Next Puzzle [ ⎵ ]
      </button>
    </div>
  </div>
  <div class="font-bold mt-10">
    <span class="text-lg text-[#00000044]">Your rating: </span><span
      class="text-3xl text-[#333]">{rating}</span
    >
  </div>
</div>

<svelte:window on:keydown={keydownHandler} />
