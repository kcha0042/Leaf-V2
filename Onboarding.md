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

When using components, use our wrapped components that start with the prefix `Leaf` over importing external components. The only exception is containers, such as `View`, `VStack`, etc.

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

When creating components, core components to be used throughout the application (e.g. `LeafButton`) should be created in the `components/core` directory in the relevant folder. Components used for a specified part of the app, e.g. `LoginScreen`, would be stored in its relevant directory, not in `components/core`.

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



