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

Naming conventions:

* Core components have the prefix `Leaf`, e.g. `LeafButton`
* Components that represent an entire screen (that would be pushed to the navigation stack) have the prefix `Screen`, e.g. `LoginScreen`
* Child components of screen components don't have a prefix, e.g. `PatientCard`

## Style Presets

We define presets for styling our components so our app can feel consistent and be more maintainable. These are found in `components/core/styles`.

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

## Navigation

Navigation is managed in stacks, a stack is made up of screen components. To create the UI for your account you must create an `LeafAccountUI` and set the `stacks` attribute to the stacks you have created, to add this account to the application you must add it to `LeafAppUserInterfaces`.

### Creating Screens

Stacks are made from screen objects.

```typescript
export interface LeafScreen {
    name: string,
    component: React.FC,
    options?: object
};
```

To create a screen object you can call:

```typescript
function createLeafScreen(name: string, component: React.FC, options?: object): LeafScreen 
```

The `options` param will be passed to the screen options of the [react native stack](https://reactnavigation.org/docs/stack-navigator)

### Creating Stacks

```typescript
export interface LeafStack {
    stackName: string,
    initialRouteName: string,
    sideBarItemList: LeafSideBarItem[],
    screens: LeafScreen[],
    icon: string,
    focusedIcon: string,
    options?: object
};
```

To create a stack object you can call:

```typescript
function createLeafStack(stackName: string, initialRouteName: string, screens: LeafScreen[], icon: string, focusedIcon: string, options?: object, sideBarItemList: LeafSideBarItem[]= []): LeafStack
```

If the first screen in the stack is a scrollable list of items, then you should add these to the stack as a list of `SideBarItem`, this will allow us to render a sidebar on tablets.

```typescript
export interface LeafSideBarItem {
    header: string,
    subHeader: string,
    desc: string,
    props?: object
};
```

### Creating Account UI

```typescript
export interface LeafAccountUI {
    name: string,
    stacks: LeafStack[]
};
```

Then add to:

```typescript
const LeafAppUserInterfaces = {

};
```

Our app navigator will render the correct account interface based on who the user logs in as.

### Best Practice

You should create an enum with the stack names, use this enum anytime you want to access stack names, e.g:

```typescript
enum NurseUIStacks {
    YourPatients = "Your Patients",
    Patients = "Patients",
    NewTriage = "New Triage",
    YourAccount = "Your Account",
    DemoNavigation = "Demo Navigation"
};
```

Each stack should have an enum with the screen names:

```typescript
enum sScreens {
    DemoNavigation = "Demo Navigation",
    Scrollable = "Scrollable Screen"
}

const sScreen1 = createLeafScreen(sScreens.DemoNavigation, DemoNavigation);

const sScreen2 = createLeafScreen(sScreens.Scrollable, ScrollableScreen, { headerLargeTitle: true });

const sStack = createLeafStack(NurseUIStacks.DemoNavigation, sScreens.DemoNavigation, [sScreen1, sScreen2], "clipboard-outline", "clipboard-account-outline");
```

For type safe navigation you should implement a navigation prop:

```typescript
// Replace undefined with the route params passed into the screen e.g. { param1: boolean, param2: string }
type ScrollableStackParamList = {
    "Demo Navigation": undefined; 
    "Scrollable Screen": undefined; 
}

// This allows for type checking, you should define this for each screen
export type DemoNavigationNavigationProp = NativeStackNavigationProp<ScrollableStackParamList, 'Demo Navigation'>
```

This is how you pass into your screens:

```typescript
interface DemoNavigationProps {
    navigation: DemoNavigationNavigationProp    
}

export const DemoNavigation: React.FC<DemoNavigationProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text> Demo Navigation </Text> 
            <LeafButton label={"Navigate"} type 		{LeafButtonType.filled} onPress={() => navigation.navigate('Scrollable Screen')}>
            </LeafButton>
        </View>
    )
}
```

