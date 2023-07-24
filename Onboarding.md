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

**It's important that all subscriptions are made within a `useEffect` hook in order to not make a new subscription upon every re-render.**

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

Again, **it's important that all subscriptions are made within a `useEffect` hook in order to not make a new subscription upon every re-render.**

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
NavigationSession.inst.navigateTo(ActionsScreen, navigation, "My Title"));
```

You would replace `"My Title"` with a `strings` call or with whatever string is relevant.

We provide the title in the call because many titles depend on the previous screen, e.g. when selecting a patient you can set the title to be the patient name, or if you're navigating to the triage screen that can be to do a new triage or edit an existing patient.

The navigation system automatically renders a back button, but if you need to provide your own, you can call the following code:

```tsx
NavigationSession.inst.navigateBack(navigation);
```

