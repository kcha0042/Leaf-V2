import LeafSelectionItem from "./LeafSelectionItem";

class LeafListSelectionManager {
    // Maintains the list of selection items for the active LeafListSelection being navigated to
    public static listSelection: LeafSelectionItem<unknown>[] = [];

    // Maintains the callback which triggers on selection
    public static onSelection: (item: LeafSelectionItem<unknown> | undefined) => void = (_) => {};
}

export default LeafListSelectionManager;
