export default (el: HTMLCanvasElement) => {
    const ctx = el.getContext("2d");

    if (!ctx) return;

    el.width = el.clientWidth;
    el.height = el.clientHeight;

    const width = el.width;
    const height = el.height;

    const cellSize = 24;

    const rows = Math.floor(height / cellSize);
    const cols = Math.floor(width / cellSize);

    let cells: boolean[][] = [];

    const draw = () => {
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.fillStyle = "#cccccc1a";

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!cells[i]) cells[i] = [];

                if (cells[i][j]) {
                    ctx.fillRect(
                        j * cellSize,
                        i * cellSize,
                        cellSize,
                        cellSize,
                    );
                }
            }
        }
    };

    const next = () => {
        const newCells = cells.map((row, i) =>
            row.map((cell, j) => {
                const neighbors = [
                    cells[i - 1]?.[j - 1],
                    cells[i - 1]?.[j],
                    cells[i - 1]?.[j + 1],
                    cells[i]?.[j - 1],
                    cells[i]?.[j + 1],
                    cells[i + 1]?.[j - 1],
                    cells[i + 1]?.[j],
                    cells[i + 1]?.[j + 1],
                ].filter((c) => c).length;

                if (cell) {
                    return neighbors === 2 || neighbors === 3;
                } else {
                    return neighbors === 3;
                }
            }),
        );

        cells = newCells;
    };

    let isPaused = false;

    const update = () => {
        next();
        draw();

        if (!isPaused) setTimeout(update, 700);
    };

    update();

    el.addEventListener("click", (e) => {
        const x = Math.floor(e.offsetX / cellSize);
        const y = Math.floor(e.offsetY / cellSize);

        cells[y][x] = !cells[y][x];

        draw();
    });

    el.addEventListener("resize", () => {
        el.width = el.clientWidth;
        el.height = el.clientHeight;
    });

    return {
        init() {
            for (let i = 0; i < rows; i++) {
                cells[i] = [];
                for (let j = 0; j < cols; j++) {
                    cells[i][j] = Math.random() > 0.7;
                }
            }
        },
        toggle() {
            isPaused = !isPaused;

            if (!isPaused) update();
        },
    };
};
