import LeafSelectionItem from "./LeafSelectionItem";

class LeafListSelectionManager {
    // Maintains the list of selection items for the active LeafListSelection being navigated to
    public static listSelection: LeafSelectionItem<unknown>[] = [];

    // Maintains the currently selected item for the active LeafListSelection
    public static onSelection: (item: LeafSelectionItem<unknown>) => void = (_) => {};
}

export default LeafListSelectionManager;
