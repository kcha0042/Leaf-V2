# Onboarding
If you're an onboarding developer, read this.

## Strings

We used a localised string file, so don't use string literals within the app.

```tsx
// Correct
let buttonText = strings("button.done");
```

```tsx
// Wrong
let buttonText = "Done";
```

More documentation can be found in `Strings.ts` and `en.ts` located in the `/localisation` directory.

## Components

When using components, use our wrapped components that start with the prefix `Leaf` over importing external components. The only exception is some containers containers, such as `View` and `ScrollView` (for our containers, see `components/containers`).

```tsx
// Correct
<LeafText typography={LeafTypography.body} >
    TODO
</LeafText>
```

```tsx
// Wrong
<Text>
    TODO
</Text>
```

This ensures:

1. Consistency within the application
2. Code reusability
3. Maintainability if we want to change all instances of a certain component
4. Forced proper usage, e.g. requiring text to specify a font through requiring a `LeafTypography` parameter

If a wrapped component doesn't already exist, create it. Even if it does nothing but wrap an externally imported component, it makes it so much easier to maintain and track its implementations.

When creating components, base components to be used throughout the application (e.g. `LeafButton`) should be created in the `components/base` directory in the relevant folder. Custom components used for a specified part of the app, e.g. `PatientCard`, would be stored in `components/custom`, or `components/screens` if it's a full page component, not in `components/base`.

Naming conventions:

* Core components have the prefix `Leaf`, e.g. `LeafButton`
* Components that represent an entire screen (that would be pushed to the navigation stack) have the suffix `Screen`, e.g. `LoginScreen`
* Child components of screen components don't have a prefix, e.g. `PatientCard`

## Style Presets

We define presets for styling our components so our app can feel consistent and be more maintainable. These are found in `components/styling`.

* `LeafTypography` has all the preset typography (font, size, color) of the app
* `LeafDimensions` has all the preset dimensions of the app
* `LeafColors` has all the colors of the app

The presets don't need to be referred to when creating components, you could create a new instance of a `LeafTypographyConfig` and pass that into your component if you want to use a text style isn't used in any other components, however in the vast majority of scenarios you should be referring to the preset ones.

These are also mutable, meaning you're free to change them - they're defined using Typescript getters (calculated properties), meaning every time you refer to a property a new instance is returned.

```typescript
let outcomeTextTypography = LeafTypography.body;
if (error) {
    // Modifying this doesn't induce side effects
    // Other LeafTypography.body instances won't be affected
    outcomeTextTypography.presetColor = LeafColors.textError;
    outcomeTextTypography.bold = true;
}
```

## Environment

Anything relating to the application environment should be read and managed in `Environment` rather than called directly.

```ts
// Correct
let platformIsAndroid = (Environment.instance.getOS() == OS.android);
```

```ts
// Wrong
let platformIsAndroid = (Platform.OS == "android");
```

This ensures:

* Consistency within the application
* Code reusability
* Maintainability
* Safer practice, e.g. OS.android can't be misspelled but "android" can, leading to bugs

## StateManager

`StateManager` manages state that can be read application-wide. This means components that need to share state don't need to have state passed down, and coupling is reduced between components that rely on shared state.

#### State Without Value

To define value-less state, statically instantiate a LeafPublisher.

```typescript
// In StateManager
public static readonly myState = new LeafPublisher();
```

To publish to that state, call the publish method. This would be done in a component.

```typescript
// In a component
StateManager.myState.publish();
```

Any component can subscribe. Every time the state is published, a callback is called.

```typescript
StateManager.myState.subscribe(() => {
    // React to the state change, e.g. update hooks or call forceUpdate()
});
```

**It's important that all subscriptions are made within a `useEffect` hook in order to not make a new subscription upon every re-render. Also remember to call the returned method upon the component being unmounted.**

```ts
useEffect(() => {
    const unsubscribe = StateManager.myState.subscribe(() => {
        // React to the state change, e.g. update hooks or call forceUpdate()
    });

    // When the component unmounts, unsubscribe
    return () => {
        unsubscribe();
    };
}, []);
```

#### State With Value

To define a state with value, statically instantiate a LeafValuePublisher.

```typescript
// In StateManager
public static readonly loginStatus = new LeafValuePublisher(LoginStatus.loggedOut);
```

To publish to that state, a value must be passed to the publish method. This would be done in a component.

```typescript
// In a component
StateManager.loginStatus.publish(LoginStatus.worker);
```

Any component can subscribe. Every time the state is published, a callback is called.

```typescript
StateManager.loginStatus.subscribe(() => {
    // We can read the state value
    let stateValue: LoginStatus = StateManager.loginStatus.read();

    // React to the state change, e.g. update hooks or call forceUpdate()
});
```

Again, **it's important that all subscriptions are made within a `useEffect` hook in order to not make a new subscription upon every re-render. And again, remember to call the returned method upon the component being unmounted**

```typescript
useEffect(() => {
    const unsubscribe = StateManager.myState.subscribe(() => {
        // We can read the state value
    	let stateValue: LoginStatus = StateManager.loginStatus.read();
        
        // React to the state change, e.g. update hooks or call forceUpdate()
    });

    // When the component unmounts, unsubscribe
    return () => {
        unsubscribe();
    };
}, []);
```

## Assertions

Assertions should be used throughout the application to aid in debugging. Using them to check conditions that should be true saves time finding out where a logic error came from. Make sure the message provided is helpful.

```typescript
// Example: LeafColor constructor
// Asserts that any color passed in must be a valid css color
// If a developer accidentially passes in an invalid color, they will be notified immediately because an error will be thrown
assert(cssColorRegex.test(lightMode), `Invalid lightMode color string provided: '${lightMode}'`);
```

```typescript
let currentDay = //...
let weekdays: string[] = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
for (let day of weekdays) {
    if (day == currentDay) {
        return day;
    }
}
// It shouldn't be possible to reach here, so if we do, we call an assertionFailure
assertionFailure(`No day matched current day: ${currentDay}`)
```

## Navigation

Navigation is pretty simple. Let's say you want to navigate to `ActionsScreen`. You would run the following:

```tsx
NavigationSession.inst.navigateTo(ActionsScreen, navigation, "My Title");
```

You would replace `"My Title"` with a `strings` call or with whatever string is relevant.

We provide the title in the call because many titles depend on the previous screen, e.g. when selecting a patient you can set the title to be the patient name, or if you're navigating to the triage screen that can be to do a new triage or edit an existing patient.

The navigation system automatically renders a back button, but if you need to provide your own, you can call the following code:

```tsx
NavigationSession.inst.navigateBack(navigation);
```

# react-native

## Components

#### What is a react-native component?

A React Native component is a building block of a React Native application. It's a self-contained module that can render some output. Components can be thought of as the UI elements that you see on the screen.

#### How are they used?

Components are used by importing them into a file and then using them within JSX code. They can represent anything from a button to a full screen and can be reused throughout the application. Componenets can be passed properties, the same way a function can be passed parameters, these properties can then be used to render the component in different ways.

```typescript
import React from 'react';
import { Text } from 'react-native';

const MyComponent = () => {
  return <Text>Hello, React Native!</Text>;
};

export default MyComponent;
```

#### What are props?

Props (short for "properties") are a way of passing data from parent to child components. They are read-only and help to make your components reusable. React allows us to type the properties, providing us with intelliSense, and also making the component type safe. 

```typescript
interface Props {
  name: string;
}

const Welcome: React.FC<Props> = ({ name }) {
  return <Text>Hello, {name} </Text>;
}
```

#### Typescript tricks

##### Generics

Typescript allows for generic types, as can be seen when passing Props into a React component. So what is a generic? A generic is a type that is generic (duh). What this means is we can provide a function/object/class with a generic type that has to be consistent.

```typescript
class Data<T> {
  private _data: T;
  
  constructor(data: T){
    this._data = data;
  }
  
  public get data(): T {
    return this._data;
  }
  
  public set data(data: T){
    this._data = data;
  }
}

const stringData = new Data<string>("hello");
stringData.data = 10; // Typescript will not allow you to do this.
```

What this allows for is a flexible class/function/object that can have variables of any type, whilst still being type safe. For example, in this data class we take in a generic T, we then use this type to specify what type the data variable has to be, and what type the paramater in set data() must be. As you can see we have now created data class that allows for any type data, whilst still be type safe.

Going back to our `React.FC<Props>` we can see that it uses a generic to ensure type safety. The important thing about this though is that it gives us intelliSense which is obvs very nice.

##### Optionals

Optionals are variables that are optional (duh once again). This means the variable can either by the type you specify or undefined. You can also do optional chaining, this allows you to easily access optional values without the need for annoying if statements. See below.

```typescript
let name?: {
	firstName: string;
  lastName: string;
};

// bad!!!
if (name != undefined){
	console.log(name.lastName)
}else{
  console.log("No name!");
}

// good :)
// this is basically if (name?.lastName != undefined) then name.lastName else "No name!"
// it works because undefined is treated as false in ts.
// so you unwrap the optional and then perform an or on the result.
console.log(name?.lastName || "No name!");
```

#### Styling

By default components will be positioned in order, vertically, in their parent component. You can use `flex-direction` in the parent to change this. However, Andre has kindly made `VStack` and `HStack` that mean you should not have to worry about this.

##### Key Style Props in React Native:

1. **flex**: Similar to CSS's flex, but with differences. In React Native, components use the flexbox algorithm to specify the layout. By default, items will be in a column layout. The `flex` prop determines how an item grows relative to its siblings in the container.
   - `flex: 1` means the item will take up all available space.
   - `flex: 2` in a container with another item of `flex: 1` means it will take up twice as much space as the other.
2. **flexDirection**: Determines the primary axis of distribution. Can be `column` (default) or `row`.
3. **justifyContent**: Describes how to align children within the main axis of their container. Options are: `flex-start`, `flex-end`, `center`, `space-between`, and `space-around`.
4. **alignItems**: Describes how to align children along the cross axis of their container. Options are: `flex-start`, `flex-end`, `center`, `stretch`, and `baseline`.
5. **padding** and **margin**: Similar to the web, but do not support shorthand properties like `padding: 10px 20px`. Instead, you would specify each separately: `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`.
   1. padding, paddingVertical, and paddingHorizontal
6. **backgroundColor**: Specifies the background color of an element.
7. **borderWidth**, **borderColor**, **borderRadius**: Used for borders. Individual borders can be set using `borderTopWidth`, `borderRightWidth`, etc.
8. **width** and **height**: Define the dimensions of an element. You can specify static values or percentages.
9. Do not use `position: absolute` it is a pain to manage.

## State management

#### useState

`useState` is a hook in React that allows you to add state to functional components, meaning you can have dynamic interactive screens. It returns the current state and a function to update it.

**IMPORTANT** - react uses shallow comparison, meaning if you pass in an object that has been modified (but is still the same as the original object) no re render will occur as react does not recognise the change. The most command example of this is if you modify an array, and then setState(array) nothing will happen, you instead need to go setState([...array]), this creates a completly new array allowing react to recognise the change.

```typescript
import { useState } from 'react';

function Counter() {
  
  const arr = [0, 1];
  const [arr, setArr] = useState(arr);
  
  return (
    <>
      <Text>{arr[0]}</Text>
      <Button title="Increment" onPress={() => {
        arr[0] = 5
        setArr([...arr])
      }} />
    </>
  );
}
```

#### useEffect

`useEffect` is a hook that lets you perform side effects in function components. It can replace `componentDidMount` (rendered), `componentDidUpdate`, and `componentWillUnmount` (removed).

```typescript
jsxCopy code
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    // This code runs after the component is mounted.
    console.log('Component mounted.');

    return () => {
      // This code runs when the component is unmounted.
      console.log('Component will unmount.');
    };
  }, []);

  return <Text>Hello, React Native!</Text>;
}
```

#### redux

In leaf we use redux to implement the subscriber publisher model. This is super useful as we avoid prop hell, where we would have to pass props through every screen. Instead you can use `StateManager` to get a publisher, and then subscribe to its event.

When you subscribe to a publisher from StateManger you are now listening, if anything is published, then you are notified and can use the callback to react accordingly.

## Leaf specifics

#### Leaf colors

These are the colours of our application, you can choose to add your own colours if you wish.

#### LeafDimensions

These are the base dimensions of our application, use these for screen padding, screen spacing, etc.

#### LeafTypography

These are the fonts in our app, feel free to add new.

#### Base components

Andre and I have implemented basically all the components you will need, if you have any questions about how to use them ask us. 

