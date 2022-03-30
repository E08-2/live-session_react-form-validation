// * REFS

// React elements are IMMUTABLE. After an element has been created, you cannot change its children/attributes.
// From the React docs:
// * "In the typical React dataflow, props are the only way that parent components interact with their children...
// * "... to modify a child, you RE-RENDER it, with new props."
// ? https://reactjs.org/docs/refs-and-the-dom.html

// However, there is a way for you to modify an element outside of the normal dataflow...
// For example, if you want an element to change (e.g. get new styling) when the user interacts with it...
// ... in a way which doesn't trigger a re-render.

// * Refs

// A "ref" in React is short for a "reference".
// We use refs to store a reference to a JSX element, so we can select it (like using document.querySelector).
// ! You should use refs sparingly - only where they are needed!
// Usually we should use the normal dataflow (see above).
// However, there is no limit to the number of refs you can use!