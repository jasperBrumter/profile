


/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 TODO REMOVE
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/
	const rowHasNumber = (rowIndex, number) => {
		return SUDOKU_TABLE[rowIndex].some(({ pen }) => pen === number);
	};

	const columnHasNumber = (columnIndex, number) => {
		return SUDOKU_TABLE.some(row => row[columnIndex].pen === number);
	};

	const largeSquareHasNumber = (rowIndex, columnIndex, number) => {
		const squares = getLargeSquareRelatives(rowIndex, columnIndex);
		return squares.some(square => {
			const [squareRow, squareColumn] = square.split('');
			return SUDOKU_TABLE[squareRow][squareColumn].pen === number;
		})
	};

/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 Variables
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	const easy_entries = [
		[3,4,null,2,null,9,5,6,1],
		[9,null,6,5,1,4,null,3,2],
		[1,2,null,8,3,null,7,4,9],
		[null,5,3,6,2,1,9,null,4],
		[null,8,2,null,9,7,null,5,3],
		[4,9,null,3,8,5,2,7,null],
		[2,null,4,1,null,null,3,9,null],
		[8,1,7,null,6,3,4,2,5],
		[null,null,9,7,4,2,null,1,8],
	];

	const medium_entries = [
		[null,null,null,2,null,null,6,null,null],
		[null,3,null,null,null,null,null,null,null],
		[7,null,null,null,null,6,null,9,1],
		[null,null,null,null,8,null,null,3,9],
		[null,5,null,null,null,null,2,null,null],
		[null,null,null,3,4,9,null,null,null],
		[9,null,null,null,5,null,null,null,6],
		[null,null,6,null,null,null,null,null,7],
		[null,null,null,6,null,4,8,null,null],
	];

	// done
	const hard_entries = [
		[null,6,null,null,null,1,null,null,4],
		[3,null,null,null,null,null,5,2,null],
		[4,null,null,null,null,null,null,null,3],
		[5,1,null,9,4,null,null,null,2],
		[null,3,null,null,2,8,null,7,null],
		[null,null,null,null,null,null,null,1,6],
		[null,null,8,null,3,null,6,null,null],
		[null,null,3,null,null,5,null,null,null],
		[1,null,null,null,9,2,7,null,null],
	];

	// not done after swordfish and xwings
	// done after find pairs
	const hard_entries_two = [
		[null,7,null,null,null,null,6,null,null],
		[null,null,8,null,null,null,null,4,1],
		[9,null,null,8,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,4],
		[3,null,null,1,null,7,null,null,2],
		[7,9,null,null,null,6,3,null,null],
		[5,null,null,null,null,null,9,null,null],
		[null,6,null,2,null,9,null,null,null],
		[null,null,null,5,null,3,null,null,null],
	];

	const hard_entries_three = [
		[9,null,1,null,null,6,2,null,null],
		[null,null,4,null,null,null,null,3,null],
		[5,2,null,null,null,null,null,null,null],
		[null,null,null,4,null,2,null,null,null],
		[null,5,null,null,null,null,null,6,null],
		[null,null,null,null,7,null,8,null,1],
		[4,6,null,null,3,null,null,9,7],
		[null,null,null,7,null,null,4,null,null],
		[null,null,null,null,9,null,null,1,null],
	];

	const expert_entries = [
		[9,null,null,8,5,null,null,2,null],
		[null,8,null,null,null,null,null,null,null],
		[null,null,null,7,null,9,3,null,6],
		[null,null,null,null,2,null,4,null,null],
		[null,6,null,null,null,3,8,null,null],
		[null,null,null,null,null,null,null,null,1],
		[null,null,5,null,null,null,null,null,null],
		[7,2,null,1,null,null,null,null,null],
		[null,null,1,null,4,7,6,null,null],
	];

	const swordfish_entries = [
		[1,9,5,3,6,7,2,4,8],
		[null,7,8,null,5,null,3,6,9],
		[3,null,6,null,9,8,1,5,7],
		[null,null,3,7,8,null,5,9,null],
		[7,null,9,null,null,5,null,null,6],
		[5,8,4,9,null,6,7,1,null],
		[8,3,2,5,4,9,6,7,1],
		[9,null,7,null,1,3,null,2,5],
		[null,5,1,null,7,2,9,null,null],
	]

	const plane_entry = [
		[7,null,1,null,null,null,null,9,null],
		[8,null,9,null,null,1,null,3,null],
		[null,null,2,8,null,7,null,5,null],
		[5,2,3,null,null,9,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,5,null,null,9,2,3],
		[null,8,null,9,null,5,2,null,null],
		[null,1,null,2,null,null,8,null,5],
		[null,7,null,null,null,null,3,null,9],
	];

	// Cracked after findPairs
	const cracking_entry = [
		[null,null,1,2,null,3,4,null,null],
		[null,null,null,6,null,7,null,null,null],
		[5,null,null,null,null,null,null,null,3],
		[3,7,null,null,null,null,null,8,1],
		[null,null,null,null,null,null,null,null,null],
		[6,2,null,null,null,null,null,3,7],
		[1,null,null,null,null,null,null,null,8],
		[null,null,null,8,null,5,null,null,null],
		[null,null,6,4,null,2,5,null,null],
	];

	const empty_entry = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
	];

	const USED_ENTRIES = cracking_entry;

	const timer = 1;
	const highlightTimer = timer;
	// const highlightTimer = 2000;





/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 Constants
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/
	const SUDOKU_TABLE = [];

	const BLOCKS = [1,2,3];
	const INTEGERS = [1,2,3,4,5,6,7,8,9];

	const HIGHLIGHT_CLASS = 'highlight';
	const SECONDARY_HIGHLIGHT_CLASS = 'secondary-highlight';



/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 Getters
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	/*
	 * Array of small square custom IDs that belong to same large square
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 *
	 * @return {String[]}           - Array of IDs
	 */
	const getLargeSquareRelatives = (rowIndex, columnIndex) => {
		const numberOfSquares = 3;
		const squares = [];
		const column = Math.floor(columnIndex / BLOCKS.length);
		const row = Math.floor(rowIndex / BLOCKS.length);
		for (row_iteration of BLOCKS) {
			for (column_iteration of BLOCKS) {
				squares.push(`${row * numberOfSquares + row_iteration - 1}${column * numberOfSquares + column_iteration - 1}`)
			}
		}
		return squares;
	};

	/*
	 * Array of small square custom IDs that belong to same row
	 *
	 * @prop {Number} rowIndex      - index of row
	 *
	 * @return {String[]}           - Array of IDs
	 */
	const getRowRelatives = (rowIndex) => {
		return INTEGERS.map(int => `${rowIndex}${int - 1}`)
	};

	/*
	 * Array of small square custom IDs that belong to same column
	 *
	 * @prop {Number} columnIndex   - index of column
	 *
	 * @return {String[]}           - Array of IDs
	 */
	const getColumnRelatives = (columnIndex) => {
		return INTEGERS.map(int => `${int - 1}${columnIndex}`)
	};

	const getLargeSquareByIndex = (index) => {
		const rowIndex = Math.floor((index) / 3);
		const columnIndex = Math.floor((index) % 3);
		return getLargeSquareRelatives(rowIndex * 3, columnIndex * 3);
	}
	/*
	 * Array of small square custom IDs that are either in same Large Square, column or row
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 *
	 * @return {String[]}           - Array of IDs
	 */
	const getRelatedSquares = (rowIndex, columnIndex) => {
		const relatedSquares = getLargeSquareRelatives(rowIndex, columnIndex);
		for (rowRelative of getRowRelatives(rowIndex)) {
			if (!relatedSquares.includes(rowRelative)) {
				relatedSquares.push(rowRelative);
			}
		}
		for (columnRelative of getColumnRelatives(columnIndex)) {
			if (!relatedSquares.includes(columnRelative)) {
				relatedSquares.push(columnRelative);
			}
		}
		return relatedSquares
	};

	/*
	 * Custom classname for small squares to draw bold horizontal and vertical lines on grid
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 *
	 * @return {String} className
	 */
	const getSmallSquareClass = (rowIndex, columnIndex) => {
		let squareClass = 'small-square';
		// Horizontal Lines
		if (rowIndex % 3 === 0) {
			squareClass += ' border-top';
		} else if (rowIndex === 8) {
			squareClass += ' border-bottom';
		}
		// Horizontal Lines
		if (columnIndex % 3 === 0) {
			squareClass += ' border-left';
		} else if (columnIndex === 8) {
			squareClass += ' border-right';
		}
		return squareClass;
	}

	/*
	 * Custom ID format for small squares
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 *
	 * @return {String} DOM div ID
	 */
	const getSmallSquareDivId = (rowIndex, columnIndex) => {
		return `${rowIndex}${columnIndex}`;
	};

	/*
	 * Custom ID format for all pencil notations divs
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 * @prop {Number} number        - pencilled number
	 *
	 * @return {String} DOM div ID
	 */
	const getPencilDivId = (rowIndex, columnIndex, number) => {
		return `pencil-${rowIndex}-${columnIndex}-${number}`;
	};

	/*
	 * Get array of squareIds that contain pencilled number
	 *
	 * @prop {String[]}  squareIds   - array of square IDs
	 * @prop {Number}    number      - the number that is being searched
	 *
	 * @return {String[]} array of squareIds that contain pencilled
	 */
	const getPencilledCells = (squareIds, number) => {
		return squareIds.filter(squareId => {
			const [squareRow, squareColumn] = squareId.split('');
			// console.log(squareId, SUDOKU_TABLE[squareRow][squareColumn])
			return SUDOKU_TABLE[squareRow][squareColumn].pencil.includes(number);
		})
	}

/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 DOM Elements
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	const grid = document.getElementById('grid');
	const subtitleDOM = document.getElementById('subtitle');


/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 DOM Functions
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	/*
	 * Modify DOM subtitle element
	 *
	 * @prop {String} subtitle    - the new subtitle
	 *
	 * @return {void}
	 */
	const setSubtitle = (subtitle) => {
		subtitleDOM.innerHTML = subtitle;
	}

	/*
	 * Add temporary highlighted class
	 *
	 * @prop {String} subtitle    - the new subtitle
	 *
	 * @return {void}
	 */
	const highlightSquare = (squareId, secondary = false) => {
		const square = document.getElementById(squareId);
		square.classList.add(!secondary ? HIGHLIGHT_CLASS : SECONDARY_HIGHLIGHT_CLASS);

		setTimeout(() => {
			square.classList.remove(HIGHLIGHT_CLASS);
			square.classList.remove(SECONDARY_HIGHLIGHT_CLASS);
		}, highlightTimer);
	}

	/*
	 * Pencil number in specific square
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 * @prop {Number} number        - the number being pencilled
	 *
	 * @return {void}
	 */
	const drawPencilled = (rowIndex, columnIndex, number) => {
		const currentPencilled = SUDOKU_TABLE[rowIndex][columnIndex].pencil;
		if (!currentPencilled.includes(number)) {
			currentPencilled.push(number)
		} else {
			console.log('DEBUG ALREADY PENCILLED', number, rowIndex, columnIndex, SUDOKU_TABLE[rowIndex][columnIndex])
		}
		document.getElementById(getPencilDivId(rowIndex, columnIndex, number)).innerHTML = number;
	};

	/*
	 * Remove pencil number from specific square
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 * @prop {Number} number        - the number being removed-pencilled
	 *
	 * @return {void}
	 */
	const removePencilled = (rowIndex, columnIndex, number) => {
		if (SUDOKU_TABLE[rowIndex][columnIndex].pencil.includes(number)) {
			let currentPencilled = SUDOKU_TABLE[rowIndex][columnIndex].pencil;
			SUDOKU_TABLE[rowIndex][columnIndex].pencil = currentPencilled.filter(pencil => pencil !== number);
			const pencilDiv = document.getElementById(getPencilDivId (rowIndex, columnIndex, number));
			highlightSquare(getSmallSquareDivId(rowIndex, columnIndex), 'secondary');
			if (pencilDiv) {
				pencilDiv.innerHTML = null
			}
		}
	};

	/*
	 * Remove pencil number from large square
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 * @prop {Number} number        - the number being removed-pencilled
	 *
	 * @return {void}
	 */
	const removePencilledFromRelatedSquares =  (rowIndex, columnIndex, number) => {
		getRelatedSquares(rowIndex, columnIndex).forEach(square => {
			const [squareRow, squareColumn] = square.split('');
			removePencilled(squareRow, squareColumn, number);
		})
	};

	/*
	 * Remove pencilled from an entire row except squareIds passed as argument
	 *
	 * @prop {String[]}  cellsToRemove   - array of square IDs that should remove the pencilled number
	 * @prop {String[]}  cellsToKeep     - array of square IDs that should keep the pencilled number
	 * @prop {Number}    number          - the number that is being removed
	 *
	 * @return {Boolean} did we have to remove a pencil or was action uneffective
	 */
	const removePencilledFromRestOfCells = (cellsToRemove, cellsToKeep, number) => {
		let hasChanged = false;
		cellsToRemove.forEach(cell => {
			const [rowIndex, columnIndex] = cell.split('');
			if (!cellsToKeep.includes(cell) && SUDOKU_TABLE[rowIndex][columnIndex].pencil.includes(number)) {
				hasChanged = true;
				console.log('REMOVING PENCILLED, removePencilledFromRestOfCells', number, 'from square', squareId);
				removePencilled(rowIndex, columnIndex, number);
			}
		})
		return hasChanged;
	};

		/*
	 * Remove pencilled from an entire row except squareIds passed as argument
	 *
	 * @prop {String[]}  cellsToRemove   - array of square IDs that should remove the pencilled number
	 * @prop {Number[]}  numbersToKeep   - the number that is being removed
	 *
	 * @return {Boolean} did we have to remove a pencil or was action uneffective
	 */
	const removeOtherPencilledFromCells = (cellsToRemove, numbersToKeep) => {
		let hasChanged = false;
		cellsToRemove.forEach(cell => {
			const [rowIndex, columnIndex] = cell.split('');
			const currentPencilled = SUDOKU_TABLE[rowIndex][columnIndex].pencil || [];
			const otherPencilled = currentPencilled.filter(number => !numbersToKeep.includes(number));
			otherPencilled.forEach(pencilled => {
				hasChanged = true;
				console.log('removeOtherPencilledFromCells', pencilled, 'from square', cell);
				removePencilled(rowIndex, columnIndex, pencilled);
			})
		})
		return hasChanged;
	};

	/*
	 * Remove pencilled from an entire row except squareIds passed as argument
	 *
	 * @prop {String[]}  squareIds   - array of square IDs that should keep the pencilled number
	 * @prop {Number}    number      - the number that is being removed
	 *
	 * @return {Boolean} did we have to remove a pencil or was action uneffective
	 */
	const removePencilledFromRestOfRow = (pencilledSquareIds, number) => {
		let hasChanged = false;
		const rowIndex = pencilledSquareIds[0][0];
		for (column_iteration of INTEGERS) {
			const columnIndex = column_iteration - 1;
			const squareId = getSmallSquareDivId(rowIndex, columnIndex);
			if (!pencilledSquareIds.includes(squareId) && SUDOKU_TABLE[rowIndex][columnIndex].pencil.includes(number)) {
				hasChanged = true;
				removePencilled(rowIndex, columnIndex, number);
			}
		}
		return hasChanged;
	};

	/*
	 * Remove pencilled from an entire column except squareIds passed as argument
	 *
	 * @prop {String[]}  squareIds   - array of square IDs that should keep the pencilled number
	 * @prop {Number}    number      - the number that is being removed
	 *
	 * @return {Boolean} did we have to remove a pencil or was action uneffective
	 */
	const removePencilledFromRestOfColumn = (pencilledSquareIds, number) => {
		let hasChanged = false;
		const columnIndex = pencilledSquareIds[0][1];
		for (row_iteration of INTEGERS) {
			const rowIndex = row_iteration - 1;
			const squareId = getSmallSquareDivId(rowIndex, columnIndex);
			if (!pencilledSquareIds.includes(squareId) && SUDOKU_TABLE[rowIndex][columnIndex].pencil.includes(number)) {
				hasChanged = true;
				removePencilled(rowIndex, columnIndex, number);
			}
		}
		return hasChanged;
	};

	/*
	 * Pen down number in specific square
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 * @prop {Number} number        - the number being penned
	 *
	 * @return {void}
	 */
	const writePen = (rowIndex, columnIndex, number) => {
		SUDOKU_TABLE[rowIndex][columnIndex] = {
			pen: number,
			pencil: [],
		}
		document.getElementById(getSmallSquareDivId(rowIndex, columnIndex)).innerHTML = `<b>${number}</b>`;
		removePencilledFromRelatedSquares(rowIndex, columnIndex, number);

	};

/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 Helpers
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	/*
	 * Custom ID format for all pencil notations divs
	 *
	 * @prop {String[]}  squareIds   - array of square IDs
	 * @prop {Number}    number      - the number that is being searched
	 *
	 * @return {Boolean} Is Number penned in one of these squares
	 */
	const isNumberInSquares = (squareIds, number) => {
		return squareIds.some(squareId => {
			const [squareRow, squareColumn] = squareId.split('');
			return SUDOKU_TABLE[squareRow][squareColumn].pen === number;
		})
	};

	/*
	 * Given a small_square, find if Number is already present in a related square
	 *
	 * @prop {Number} rowIndex      - index of row
	 * @prop {Number} columnIndex   - index of column
	 * @prop {Number} number        - the number being penned
	 *
	 * @return {Boolean} Is number found in one of related squares 
	 */
	const isNumberInRelatedSquares = (rowIndex, columnIndex, number) =>  {
		const squares = getRelatedSquares(rowIndex, columnIndex);
		return isNumberInSquares(squares, number);
	}

	/*
	 * Check if number is pencilled only once in given array of squares
	 *
	 * @prop {String[]}  squareIds   - array of square IDs
	 * @prop {Number}    number      - the number that is being searched
	 *
	 * @return {Boolean} Is Number penned only once in these squares
	 */
	const isNumberPencilledOnceInSquares = (squareIds, number) => {
		const squares = getPencilledCells(squareIds, number);
		return squares.length === 1 ?
			squares[0]
			: null;
	};

	/*
	 * Check if array of {['rowId,columnId', 'rowId2,columnId2'...]}
	 * has an element that has number at position 0 for row, position 1 for column
	 *
	 * @prop {String[]}  squareIds   - array of square IDs
	 * @prop {Number}    position    - the number that is being searched
	 * @prop {String}    number      - the number that is being searched
	 *
	 * @return {Boolean} is number present in any element of array at that position
	 */
	const arrayHasSwordfishElement = (array, position, number) => {
		return array.filter(element => {
			const split = element.split(',');
			return split[position] === number;
		})
	}
/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 Functions
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/


	/*
	 * Modify DOM grid element with entries
	 *
	 * @return {void}
	 */
	const initializeTable = () => {
		// Create JS table
		for (int_first_iteration of INTEGERS) {
			// Add Data
			const rowIndex = int_first_iteration - 1;
			SUDOKU_TABLE[rowIndex] = [];

			// Draw Table
			const row = document.createElement('div');
			row.id = `row${rowIndex}`;
			row.className = 'row';
			grid.appendChild(row);


			for (int_second_iteration of INTEGERS) {

				// Add Data
				const columnIndex = int_second_iteration - 1;
				const corresponding = USED_ENTRIES[rowIndex][columnIndex];
				const square_info = {
					pen: corresponding,
					pencil: [],
				};
				SUDOKU_TABLE[rowIndex].push(square_info);

				// Draw Table
				const column = document.createElement('div');
				column.id = getSmallSquareDivId(rowIndex, columnIndex);
				column.className = getSmallSquareClass(rowIndex, columnIndex);;
				row.appendChild(column);

				for (int_third_iteration of INTEGERS) {
					const pencil = document.createElement('div');
					pencil.className = `pencil pencil-${int_third_iteration}`;
					pencil.id = getPencilDivId(rowIndex, columnIndex, int_third_iteration);
					column.appendChild(pencil);

					// pencil.innerHTML = int_third_iteration;
				}
				// Add value and event listener
				if (corresponding !== null) {
					column.innerHTML =  `<b>${corresponding}<b>`;
				};
				// TODO REMOVE
				column.addEventListener('click', () => {
					const squares = getRelatedSquares(rowIndex, columnIndex);
					squares.forEach(square => highlightSquare(square));
				})

			};
		};
	}
	
	console.log('SUDOKU_TABLE', SUDOKU_TABLE);



	const traverseTreeAndFindPencilled = async () => {
		setSubtitle('For each empty square, let\s pencil in possible values')
		for (int_first_iteration of INTEGERS) {
			const rowIndex = int_first_iteration - 1;
			for (int_second_iteration of INTEGERS) {
				const columnIndex = int_second_iteration - 1;
				const squareId = getSmallSquareDivId(rowIndex, columnIndex);
				const corresponding = SUDOKU_TABLE[rowIndex][columnIndex];
				if (corresponding.pen === null) {
					let shouldHighlight = false;
					for (possible_entry of INTEGERS) {						
						if (!isNumberInRelatedSquares(rowIndex, columnIndex, possible_entry)) {
							drawPencilled(rowIndex, columnIndex, possible_entry);
							shouldHighlight = true;
						}

					}
					if (shouldHighlight) {
						highlightSquare(squareId);
						await new Promise(resolve => setTimeout(resolve, timer));
					}
				}
			}
		}
	};

	const replaceForcedPencilled =  async () => {
		let hasChanged = false
		console.log('SUDOKU_TABLE', SUDOKU_TABLE)
		for (int_first_iteration of INTEGERS) {
			const rowIndex = int_first_iteration - 1;
			for (int_second_iteration of INTEGERS) {
				const columnIndex = int_second_iteration - 1;
				const squareId = getSmallSquareDivId(rowIndex, columnIndex);
				const correspondingPencil = SUDOKU_TABLE[rowIndex][columnIndex].pencil;
				// Only one item pencilled in a small_square
				if (correspondingPencil.length === 1) {
					hasChanged = true;
					writePen(rowIndex, columnIndex, correspondingPencil[0]);
				}

				// Find other cases
				const largeSquareRelatives = getLargeSquareRelatives(rowIndex, columnIndex);
				const rowRelatives = getRowRelatives(rowIndex);
				const columnRelatives = getColumnRelatives(columnIndex);

				for (possible_entry of INTEGERS) {
					// Only pencilled once in large square
					const onlyPencilInLargeSquareId = isNumberPencilledOnceInSquares(largeSquareRelatives, possible_entry);
					if (onlyPencilInLargeSquareId) {
						hasChanged = true;
						const [
							onlyPencilInLargeSquareRowId,
							onlyPencilInLargeSquareColumnId
						] = onlyPencilInLargeSquareId.split('');
						writePen(onlyPencilInLargeSquareRowId, onlyPencilInLargeSquareColumnId, possible_entry);
					}
					// Only pencilled once in row
					const onlyPencilInRowId = isNumberPencilledOnceInSquares(rowRelatives, possible_entry);
					if (onlyPencilInRowId) {
						hasChanged = true;
						const [
							onlyPencilInRowRowId,
							onlyPencilInRowColumnId
						] = onlyPencilInRowId.split('');
						writePen(onlyPencilInRowRowId, onlyPencilInRowColumnId, possible_entry);
					}
					// Only pencilled once in column
					const onlyPencilInColumnId = isNumberPencilledOnceInSquares(columnRelatives, possible_entry);
					if (onlyPencilInColumnId) {
						hasChanged = true;
						const [
							onlyPencilInColumnRowId,
							onlyPencilInColumnColumnId
						] = onlyPencilInColumnId.split('');
						writePen(onlyPencilInColumnRowId, onlyPencilInColumnColumnId, possible_entry);
					}
				}

				if (hasChanged) {
					highlightSquare(getSmallSquareDivId(rowIndex, columnIndex));
					await new Promise(resolve => setTimeout(resolve, timer * 2)); 
				}
			}
		}
		return hasChanged;
	};

	const cleanUpPencilled = async () => {
		for (int_first_iteration of BLOCKS) {
			const blockRowIndex = int_first_iteration - 1;
			for (int_second_iteration of BLOCKS) {
				const blockColumnIndex = int_second_iteration - 1;
				const largeSquareCells = getLargeSquareRelatives(blockRowIndex * 3, blockColumnIndex * 3);
				for (possible_entry of INTEGERS) {
					const pencilledCells = getPencilledCells(largeSquareCells, possible_entry);

					if (pencilledCells.length > 1) {
						const [rowIndex, columnIndex] = pencilledCells[0];
						const allInSameRow = pencilledCells.every(cell => cell[0] === rowIndex);
						if (allInSameRow) {
							removePencilledFromRestOfRow(pencilledCells, possible_entry);
						}

						const allInSameColumn = pencilledCells.every(cell => cell[1] === columnIndex);
						if (allInSameColumn) {
							removePencilledFromRestOfColumn(pencilledCells, possible_entry);
						}
					}
				}
			}
		}
	}



	const findXWings = async () => {
		let hasChanged = false;
		for (possible_entry of INTEGERS) {
			const foundTwoPositionsRows = {};
			const foundTwoPositionsColumns = {};

			for (row_column_iteration of INTEGERS) {
				const rowIndex = row_column_iteration - 1;
				const rowCells = getRowRelatives(rowIndex);
				const pencilledInRow = getPencilledCells(rowCells, possible_entry);
				if (pencilledInRow.length === 2) {
					const rowPositions = pencilledInRow.map(entry => entry[1]).join(',');
					if (!Object.keys(foundTwoPositionsRows).includes(rowPositions)) {
						foundTwoPositionsRows[rowPositions] = rowIndex;
					} else {
						const firstRowFound = foundTwoPositionsRows[rowPositions];
						pencilledInRow.forEach(cell => {
							const actionChanged = removePencilledFromRestOfColumn([`${firstRowFound}${cell[1]}`, cell], possible_entry);
							if (actionChanged) {
								hasChanged = true;
							}
						})
					}
				}


				// Treat columns
				const columnIndex = row_column_iteration - 1;
				const columnCells = getColumnRelatives(columnIndex);
				const pencilledInColumn = getPencilledCells(columnCells, possible_entry);
				if (pencilledInColumn.length === 2) {
					const columnPositions = pencilledInColumn.map(entry => entry[0]).join(',');
					if (!Object.keys(foundTwoPositionsColumns).includes(columnPositions)) {
						foundTwoPositionsColumns[columnPositions] = columnIndex;
					} else {
						const firstColumnFound = foundTwoPositionsColumns[columnPositions];
						pencilledInColumn.forEach(cell => {
							const actionChanged = removePencilledFromRestOfRow([`${cell[0]}${firstColumnFound}`, cell], possible_entry);
							if (actionChanged) {
								hasChanged = true;
							}
						})
					}
				}
			}

			// At the end of iteration, find swordfish for rows
			console.log('for entry', possible_entry, 'foundTwoPositionsRows is', foundTwoPositionsRows )
			const rowsWithTwoCandidatesFound = Object.keys(foundTwoPositionsRows);
			if (rowsWithTwoCandidatesFound.length >= 3) {
				for (let i = 0; i < rowsWithTwoCandidatesFound.length; i++) {
					const entry = rowsWithTwoCandidatesFound[i];
					const firstRow = foundTwoPositionsRows[entry];
					const [firstColumnOne, firstColumnTwo] = entry.split(',');
					const otherEntries = rowsWithTwoCandidatesFound.filter(each => each !== entry);
					const hasMutualFirstColumn = arrayHasSwordfishElement(otherEntries, 0, firstColumnOne);
					console.log('hasMutualFirstColumn', entry, hasMutualFirstColumn);
					for (let j = 0; j < hasMutualFirstColumn.length; j++) {
						const secondEntry = hasMutualFirstColumn[j];
						const secondRow = foundTwoPositionsRows[secondEntry];
						const [secondColumnOne, secondColumnTwo] = secondEntry.split(',');
						const secondOtherEntries = rowsWithTwoCandidatesFound.filter(each => ![entry, secondEntry].includes(each));
						const hasMutualSecondColumn = arrayHasSwordfishElement(secondOtherEntries, 1, secondColumnTwo);

						for (let k = 0; k < hasMutualSecondColumn.length; k++) {
							const thirdEntry = hasMutualSecondColumn[k];
							const thirdRow = foundTwoPositionsRows[thirdEntry];
							const [thirdColumnOne, thirdColumnTwo] = thirdEntry.split(',');
							if (thirdColumnOne === firstColumnTwo) {
								console.log('SWORDFISH FOUND FOR ROWS ', firstRow, secondRow, thirdRow, 'number is', possible_entry);
								const firstActionChanged = removePencilledFromRestOfColumn([`${firstRow}${firstColumnOne}`, `${secondRow}${secondColumnOne}`], possible_entry);
								const secondActionChanged = removePencilledFromRestOfColumn([`${secondRow}${secondColumnTwo}`, `${thirdRow}${thirdColumnTwo}`], possible_entry);
								const thirdActionChanged = removePencilledFromRestOfColumn([`${thirdRow}${thirdColumnOne}`, `${firstRow}${firstColumnTwo}`], possible_entry);
								if (firstActionChanged || secondActionChanged || thirdActionChanged) {
									hasChanged = true;
								}
							}
						}
					}
				}
			}

			// At the end of iteration, find swordfish for columns
			console.log('for entry', possible_entry, 'foundTwoPositionsColumns is', foundTwoPositionsColumns )
			const columnsWithTwoCandidatesFound = Object.keys(foundTwoPositionsColumns);
			if (columnsWithTwoCandidatesFound.length >= 3) {
				for (let i = 0; i < columnsWithTwoCandidatesFound.length; i++) {
					const entry = columnsWithTwoCandidatesFound[i];
					const firstColumn = foundTwoPositionsColumns[entry];
					const [firstRowOne, firstRowTwo] = entry.split(',');
					const otherEntries = columnsWithTwoCandidatesFound.filter(each => each !== entry);
					const hasMutualFirstRow = arrayHasSwordfishElement(otherEntries, 0, firstRowOne);
					console.log('hasMutualFirstRow', entry, hasMutualFirstRow);
					for (let j = 0; j < hasMutualFirstRow.length; j++) {
						const secondEntry = hasMutualFirstRow[j];
						const secondColumn = foundTwoPositionsColumns[secondEntry];
						const [secondRowOne, secondRowTwo] = secondEntry.split(',');
						const secondOtherEntries = columnsWithTwoCandidatesFound.filter(each => ![entry, secondEntry].includes(each));
						const hasMutualSecondRow = arrayHasSwordfishElement(secondOtherEntries, 1, secondRowTwo);

						for (let k = 0; k < hasMutualSecondRow.length; k++) {
							const thirdEntry = hasMutualSecondRow[k];
							const thirdColumn = foundTwoPositionsColumns[thirdEntry];
							const [thirdRowOne, thirdRowTwo] = thirdEntry.split(',');
							if (thirdRowOne === firstRowTwo) {
								console.log('SWORDFISH FOUND FOR COLUMNS ', firstColumn, secondColumn, thirdColumn, 'number is', possible_entry);
								const firstActionChanged = removePencilledFromRestOfRow([`${firstColumn}${firstRowOne}`, `${secondColumn}${secondRowOne}`], possible_entry);
								const secondActionChanged = removePencilledFromRestOfRow([`${secondColumn}${secondRowTwo}`, `${thirdColumn}${thirdRowTwo}`], possible_entry);
								const thirdActionChanged = removePencilledFromRestOfRow([`${thirdColumn}${thirdRowOne}`, `${firstColumn}${firstRowTwo}`], possible_entry);
								if (firstActionChanged || secondActionChanged || thirdActionChanged) {
									hasChanged = true;
								}
							}
						}
					}
				}
			}
		}
	}

	// Pairs are two separate squares either in the same large-square, or in the same row/column
	// that are the only squares with pencilled x,y in that LargeSquare/Row/Column
	const findPairs = async () => {
		for (possible_entry of INTEGERS) {
			const index = possible_entry - 1;
			const largeSquareSquareIds = getLargeSquareByIndex(index);
			eliminatePencilledBecauseOfPairs(largeSquareSquareIds);
			const rowSquareIds = getRowRelatives(index);
			eliminatePencilledBecauseOfPairs(rowSquareIds);
			const columnSquareIds = getColumnRelatives(index);
			eliminatePencilledBecauseOfPairs(columnSquareIds);
		}
	}

	const eliminatePencilledBecauseOfPairs = async (arrayOfSquares) => {
		const results = {};
		for (possible_entry of INTEGERS) {
			const integerIsPencilledInSquares = getPencilledCells(arrayOfSquares, possible_entry);
			if (integerIsPencilledInSquares.length === 2) {
				results[possible_entry] = integerIsPencilledInSquares;
			}
		}
		Object.entries(results).forEach(([key, value]) => {
			const foundInOther = Object.entries(results).find(([secondKey, secondValue])=> {
				return secondKey !== key && JSON.stringify(value) == JSON.stringify(secondValue);
			});
			if (foundInOther) {
				const numbersToKeep = [Number(key), Number(foundInOther[0])];
				const squaresToRemoveFrom = foundInOther[1];
				removePencilledFromRestOfCells(arrayOfSquares, value, Number(key));
				removeOtherPencilledFromCells(squaresToRemoveFrom, numbersToKeep);

			}
		})
	}
/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 App Process
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	const process = async () => {
		initializeTable();
		await new Promise(resolve => setTimeout(resolve, timer * 2));
		await traverseTreeAndFindPencilled();
		setSubtitle('Great!')
		await new Promise(resolve => setTimeout(resolve, timer * 4));
		setSubtitle('Now we\'ll replace the squares that only have a single pencilled value')
		await new Promise(resolve => setTimeout(resolve, timer * 6));


		let replacePencilled = true;
		while (replacePencilled) {
			replacePencilled = await replaceForcedPencilled();
		}

		await new Promise(resolve => setTimeout(resolve, timer * 10));

		await cleanUpPencilled()

		await new Promise(resolve => setTimeout(resolve, timer * 10));

		replacePencilled = true;
		while (replacePencilled) {
			replacePencilled = await replaceForcedPencilled();
		}
		await cleanUpPencilled()

		await new Promise(resolve => setTimeout(resolve, 200));



		await findPairs();

		await findXWings();

		await new Promise(resolve => setTimeout(resolve, timer * 10));

		replacePencilled = true;
		while (replacePencilled) {
			replacePencilled = await replaceForcedPencilled();
		}
		await cleanUpPencilled()


		await findPairs();

		await findXWings();

		await new Promise(resolve => setTimeout(resolve, timer * 10));

		replacePencilled = true;
		while (replacePencilled) {
			replacePencilled = await replaceForcedPencilled();
		}
		await cleanUpPencilled()
	}

	process();
