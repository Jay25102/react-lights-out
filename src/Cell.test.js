import { fireEvent, render } from "@testing-library/react";
import Cell from "./Cell";

describe("rendering cells", function() {
    let container;

    beforeEach(function() {
        container = document.body.appendChild(document.createElement("tr"));
    });

    it("renders a cell without crashing", function() {
        render(<Cell/>, {container});
    });

    it("matches snapshot when lit", function() {
        const { asFragment } = render(<Cell isLit />, { container });
        expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot when not lit", function() {
        const { asFragment } = render(<Cell />, { container });
        expect(asFragment()).toMatchSnapshot();
    });
});