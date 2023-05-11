import { LeafAccountUI, LeafStack } from "./Types";

/**
 * Creates a leaf account UI object
 * @param stacks the stacks for your UI
 * @param name the name of the UI
 * @returns a {@link LeafAccountUI}
 */
export function createLeafAccountUI(stacks: LeafStack[], name: string): LeafAccountUI {
    return {
        name: name,
        stacks: stacks
    }
}