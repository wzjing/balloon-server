export const cssClasses = {
    LAYOUT: "file-selector--layout",
    INPUT: "file-selector--input",
    BUTTON: "file-selector--button"
};

export const selectors = {
    LAYOUT_SELECTOR: ".file-selector--layout",
    INPUT_SELECTOR: ".file-selector--input",
    BUTTON_SELECTOR: ".file-selector--button"
};

class FileSelector extends View {

    get button() {
        return this.htmlEl.querySelector()
    }

    constructor(el) {
        super(el);
    }
}