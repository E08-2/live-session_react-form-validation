// * REACT FORMS

// React forms work in a very similar way to HTML forms. But there are a couple of differences!
// You can use React forms in the same way as HTML forms - they have the same default behaviour.

// * Forms are an interesting case when it comes to "state" in a React app...

// Form elements (e.g. inputs) work a little differently to other JSX elements...
// ... because they naturally keep some "internal" state.
// So for example, if I type "Jamie" into the "name" input...
// It seems to "hold" that value - this seems like an alternative to a state variable made using useState().
// ? So does this mean we will have to live with having to different kinds of "state" in our forms?

// * No!

// A common React saying is that "state is the only source of truth".
// So forms must also get data from, and update data in, a component's STATE.
// This is the way we can be certain that the React app is always in control of the last version of the data.

// * A component that manages data in this way is called a CONTROLLED COMPONENT.
// With this kind of component, any values the user can see (e.g. the current value of an input)...
// ... is defined only by the app's STATE.
// The input itself has NO control over what it shows - the value comes direct from state.
// So in this way, state remains "the only source of truth".

// So let's check out how this works in practice...