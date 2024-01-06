


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

	const empty_entry = [
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
	];

	const USED_ENTRIES = empty_entry;

	const timer = 30;





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

	let ALL_SQUARES = [];

	const HIGHLIGHT_CLASS = 'highlight';
	const SECONDARY_HIGHLIGHT_CLASS = 'secondary-highlight';
	const BLINK_CLASS = 'blink-highlight';



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
		// Vertical Lines
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
		}, timer);
	}

	const removeAnimateSquare = (squareId) => {
		const square = document.getElementById(squareId);
		square.classList.remove(BLINK_CLASS);
	}
	/*
	 * Add temporary highlighted class
	 *
	 * @prop {String} subtitle    - the new subtitle
	 *
	 * @return {void}
	 */
	const animateSquare = (squareId) => {
		const square = document.getElementById(squareId);
		ALL_SQUARES.forEach(otherSquare => {
			removeAnimateSquare(otherSquare);
		})
		square.classList.add(BLINK_CLASS);
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
		if (number === 0) {}
		SUDOKU_TABLE[rowIndex][columnIndex] = {
			pen: number === 0 ? null : number,
			pencil: [],
		}
		document.getElementById(getSmallSquareDivId(rowIndex, columnIndex)).innerHTML = number ? `<b>${number}</b>` : '';
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
				const square = document.createElement('div');
				square.id = getSmallSquareDivId(rowIndex, columnIndex);
				ALL_SQUARES.push(square.id);
				square.className = getSmallSquareClass(rowIndex, columnIndex);;
				row.appendChild(square);

				for (int_third_iteration of INTEGERS) {
					const pencil = document.createElement('div');
					pencil.className = `pencil pencil-${int_third_iteration}`;
					pencil.id = getPencilDivId(rowIndex, columnIndex, int_third_iteration);
					square.appendChild(pencil);

					// pencil.innerHTML = int_third_iteration;
				}
				// Add value and event listener
				if (corresponding !== null) {
					square.innerHTML =  `<b>${corresponding}<b>`;
				};
				// TODO REMOVE
				square.addEventListener('click', () => {
					console.log('click on square', rowIndex, columnIndex);
					const squareId = getSmallSquareDivId(rowIndex, columnIndex);
					animateSquare(squareId);
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
			const foundPositionsRows = {};
			const foundPositionsColumns = {};
			for (row_column_iteration of INTEGERS) {
				const rowIndex = row_column_iteration - 1;
				const rowCells = getRowRelatives(rowIndex);
				const pencilledInRow = getPencilledCells(rowCells, possible_entry);
				if (pencilledInRow.length === 2) {
					const rowPositions = pencilledInRow.map(entry => entry[1]).join(',');
					if (!Object.keys(foundPositionsRows).includes(rowPositions)) {
						foundPositionsRows[rowPositions] = rowIndex;
					} else {
						const firstRowFound = foundPositionsRows[rowPositions];
						pencilledInRow.forEach(cell => {
							console.log('celllll', [`${firstRowFound}${cell[1]}`, cell])
							const actionChanged = removePencilledFromRestOfColumn([`${firstRowFound}${cell[1]}`, cell], possible_entry);
							console.log('actionChanged', actionChanged);
							if (actionChanged) {
								hasChanged = true;
							}
						})
						console.log(`FOUND TWO same positions for number ${possible_entry} - ${rowPositions}, first row is ${foundPositionsRows[rowPositions]}, second row is ${rowIndex}`)
						// const [`${rowPositions}`]
						// removePencilledFromRestOfColumn()
					}
				}


				const columnIndex = row_column_iteration - 1;
				const columnCells = getColumnRelatives(columnIndex);
				const pencilledInColumn = getPencilledCells(columnCells, possible_entry);
				if (pencilledInColumn.length === 2) {

					const columnPositions = pencilledInColumn.map(entry => entry[0]).join(',');
					if (!Object.keys(foundPositionsColumns).includes(columnPositions)) {
						foundPositionsColumns[columnPositions] = columnIndex;
					} else {
						console.log(`FOUND TWO same positions for number ${possible_entry} - ${columnPositions}, first column is ${foundPositionsColumns[columnPositions]}, second column is ${columnIndex}`)
					}
				}
			}
		}
	}
/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 App Process
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
*/

	const processSolve = async () => {
		await new Promise(resolve => setTimeout(resolve, 3000));
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

		// await new Promise(resolve => setTimeout(resolve, 4000));
		// removePencilled(6,4,8);
		// removePencilled(6,5,8);


		// await new Promise(resolve => setTimeout(resolve, 6000));

		// await cleanUpPencilled()
		// replacePencilled = true;
		// while (replacePencilled) {
		// 	replacePencilled = await replaceForcedPencilled();
		// }


		await findXWings();

		replacePencilled = true;
		while (replacePencilled) {
			replacePencilled = await replaceForcedPencilled();
		}


	}

	const processSetup = async () => {
		initializeTable();
		const fillTableListener = document.addEventListener('keydown', (event) => {
		  	const blinking = document.getElementsByClassName(BLINK_CLASS);
		  	if (event.keyCode >= 48 && event.keyCode <= 57 && blinking.length) {
		  		const number = event.keyCode - 48;
		  		const [rowId, columnId] = blinking[0].id.split('');
		  		writePen(rowId, columnId, number);
		  		removeAnimateSquare(blinking[0].id);
		  	}
		});
		document.getElementById('solve').addEventListener('click', () => {
			processSolve();
		})
	};

	processSetup();
