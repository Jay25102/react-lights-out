import {fireEvent, render} from "@testing-library/react"
import Board from "./Board"

describe("rendering boards", function() {
    describe("initial board", function() {
        it("renders board without crashing", function() {
            render(<Board nrows={3} ncols={1} chanceLightStartsOn={0.5}/>);
        });

        it("matches snapshot for full board", function() {
            const { asFragment } = render(<Board chanceLightStartsOn={1}/>);
            expect(asFragment()).toMatchSnapshot();
        });

        it("matches snapshot for empty board", function() {
            const { asFragment } = render(<Board chanceLightStartsOn={0}/>);
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe("clicking cells", function() {
        it("toggles correctly", function() {
            const {getAllByRole} = render(
                <Board nrows={3} ncols={3} chanceLightStartsOn={1} />
            );
            const cells = getAllByRole("button");

            // check all cells start out as lit
            cells.forEach(cell => {
                expect(cell).toHaveClass("Cell-lit");
            });

            // click middle cell
            fireEvent.click(cells[4]);

            let litIndices = [0, 2, 6, 8];
            cells.forEach((cell, idx) => {
                if (litIndices.includes(idx)) {
                    expect(cell).toHaveClass("Cell-lit");
                }
                else {
                    expect(cell).not.toHaveClass("Cell-lit");
                }
            });
        });

        it("displays winning message on winning", function() {
            const { queryByText, getAllByRole } = render(
                <Board nrows={1} ncols={3} chanceLightStartsOn={1} />
            );

            // there should be no winning text yet
            expect(queryByText("You Win!")).not.toBeInTheDocument();

            const cells = getAllByRole("button");
            fireEvent.click(cells[1]);
            expect(queryByText("You Win!")).toBeInTheDocument();
        });
    });
    
});