# 26 - Mobile and Desktop JavaScript Development

## Table of Contents

- [PART 1 - React Native](#part-1---react-native)
- [PART 2 - Capacitor / Ionic](#part-2---capacitor--ionic)
- [PART 3 - Electron](#part-3---electron)
- [PART 4 - Flutter with Dart (JS Comparison)](#part-4---flutter-with-dart-js-comparison)
- [PART 5 - Progressive Web Apps](#part-5---progressive-web-apps)
- [PART 6 - Cross-Platform Frameworks](#part-6---cross-platform-frameworks)
- [PART 7 - Mobile-Specific Considerations](#part-7---mobile-specific-considerations)

---

# PART 1 - React Native

## 1. React Native Basics: Components, Styling, Navigation

React Native is a framework by Meta (Facebook) for building native mobile applications using JavaScript and React. Current version: **0.86** (as of 2026). It allows you to write UI components that render to native platform views (not browser DOM elements).

### Core Architecture

React Native runs JavaScript in a background thread (JS thread) and communicates with the native main thread to render UI. Key concepts:

- **JavaScript Thread**: Runs your React components, business logic, API calls, touch event processing
- **Main/UI Thread**: Handles native view rendering, animations on the native stack
- **Bridge/New Architecture**: Communication layer between JS and native code

### Core Components

React Native provides built-in **Core Components** that map directly to native platform views:

| Component | Purpose |
|-----------|---------|
| `View` | Most fundamental UI building block (like `<div>`) |
| `Text` | Displays text (supports nesting, styling, touch handling) |
| `Image` | Displays images from local files, network, or data URIs |
| `TextInput` | Text input via keyboard |
| `Pressable` | Detects various stages of press interactions (replaces deprecated Touchable*) |
| `ScrollView` | Scrollable container for multiple components |
| `FlatList` | Performant scrollable list (renders items lazily, only what's visible) |
| `SectionList` | Like FlatList but with section headers |
| `StyleSheet` | Abstraction layer similar to CSS stylesheets |
| `Button` | Basic button (cross-platform) |
| `Switch` | Boolean toggle input |
| `Modal` | Simple way to present content above enclosing view |
| `ActivityIndicator` | Circular loading indicator |
| `StatusBar` | Controls the app status bar |
| `RefreshControl` | Pull-to-refresh in ScrollView/FlatList |

**Platform-Specific Components:**
- Android: `DrawerLayoutAndroid`, `TouchableNativeFeedback`, `BackHandler`, `PermissionsAndroid`, `ToastAndroid`
- iOS: `InputAccessoryView`, `SafeAreaView`, `ActionSheetIOS`

### Styling

React Native uses a **flexbox-based** layout system. Styles are written as JavaScript objects using camelCase property names:

```javascript
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

Key differences from CSS:
- Default `flexDirection` is `column` (not `row`)
- Uses `transform: [{scale}]` array syntax
- No CSS cascade - styles are applied explicitly
- `StyleSheet.create()` provides optimization (compile-time validation, reference IDs instead of objects)

### Props and State

Components receive data through **props** (read-only) and manage internal data through **state** (useState hook):

```javascript
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Pressable onPress={() => setCount(count + 1)}>
        <Text>Increment</Text>
      </Pressable>
    </View>
  );
}
```

### Environment Setup

Two main approaches:
1. **Expo CLI** (recommended for beginners): `npx create-expo-app@latest`
2. **React Native CLI** (bare workflow): Requires native development environment (Xcode, Android Studio)

---

## 2. React Native vs Expo

### Expo

Expo is a framework and platform built around React Native that provides:
- **Managed workflow**: No need to deal with native code directly
- **Expo Go app**: Test on physical devices instantly without building native code
- **Expo SDK**: Pre-built native modules (camera, location, notifications, etc.)
- **EAS Build**: Cloud-based build service for iOS/Android
- **expo-router**: File-based routing (like Next.js)
- **Over-the-air updates**: Push updates without app store submission

```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

### React Native CLI (Bare Workflow)

- Full access to native code (iOS `Podfile`, Android `build.gradle`)
- Required when using native modules not in Expo SDK
- More control but more complexity
- Requires Xcode (macOS only) and Android Studio

### Comparison

| Feature | Expo | React Native CLI |
|---------|------|-----------------|
| Setup complexity | Low | High |
| Native code access | Limited (config plugins) | Full |
| Development speed | Fast | Slower |
| Build services | EAS Build (cloud) | Local builds |
| OTA updates | Built-in (Expo Updates) | Requires third-party |
| Community modules | Expo SDK modules | Any npm package |
| Custom native modules | Via config plugins | Direct native code |
| Best for | Most apps, prototyping | Apps needing deep native integration |

### Expo Config Plugins

When you need native code changes in Expo, config plugins modify native files at build time:

```json
// app.json
{
  "expo": {
    "plugins": [
      ["expo-camera", { "cameraPermission": "Allow camera access" }],
      ["expo-location", { "locationAlwaysAndWhenInUsePermission": "..." }]
    ]
  }
}
```

---

## 3. Navigation: React Navigation

**React Navigation** (v7.x) is the standard navigation library for React Native, supporting stack, tab, drawer, and material bottom tab navigators.

### Installation

```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
# For iOS:
npx pod-install ios
```

### Stack Navigator

Provides a way to jump between screens with a stack-like behavior (push/pop):

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Pressable } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Details')}>
        <Text>Go to Details</Text>
      </Pressable>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Page</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Tab Navigator

Bottom tab navigation pattern:

```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStackScreen}
          options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Settings" component={SettingsScreen}
          options={{ tabBarLabel: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### Drawer Navigator

Side menu navigation:

```bash
npm install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

```javascript
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

### Static vs Dynamic Configuration (v7+)

React Navigation 7+ supports **static configuration** (recommended):

```javascript
// Static configuration with automatic TypeScript types
const Stack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
});
```

### Deep Linking

React Navigation has built-in deep linking support for universal links on mobile and browser history on web.

### Navigation Props

Every screen receives navigation and route props:
- `navigation.navigate('ScreenName')` - go to screen
- `navigation.goBack()` - go back
- `navigation.popToTop()` - go to first screen
- `route.params` - access parameters passed to screen

---

## 4. State Management in React Native

### React Built-in State

- **useState**: Local component state
- **useReducer**: Complex local state logic
- **useContext**: Shared state across component tree (without prop drilling)

### Redux / Redux Toolkit

Most popular for large apps. Redux Toolkit (RTK) simplifies setup:

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={() => dispatch(counterSlice.actions.increment())} />
    </View>
  );
}
```

### Zustand

Lightweight alternative to Redux:

```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();
  return <Button onPress={increment} title={`Count: ${count}`} />;
}
```

### Jotai / Recoil

Atomic state management (fine-grained reactivity):

```javascript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <Button onPress={() => setCount(c => c + 1)} title={`Count: ${count}`} />;
}
```

### TanStack Query (React Query)

For server state management (API data caching, background refetching):

```javascript
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
  });
  if (isLoading) return <ActivityIndicator />;
  return <Text>{data.name}</Text>;
}
```

---

## 5. Native Modules and Bridging

### What Are Native Modules?

Native modules allow JavaScript to call code written in platform-specific languages (Java/Kotlin for Android, Objective-C/Swift for iOS). This is how React Native accesses device capabilities not available through JavaScript.

### The New Architecture (Fabric + TurboModules)

React Native's new architecture uses:
- **Codegen**: Generates type-safe native interfaces from JavaScript specs
- **TurboModules**: Lazy-loaded native modules (replaces legacy NativeModules)
- **Fabric**: New rendering system for native UI components

### Writing Native Modules

**JavaScript Spec (with TypeScript):**

```typescript
// NativeCalculator.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): number;
  getConstants(): { PI: number };
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCalculator');
```

**Android (Kotlin):**

```kotlin
// NativeCalculatorModule.kt
class NativeCalculatorModule(reactContext: ReactApplicationContext) :
    NativeCalculatorSpec(reactContext) {
    override fun add(a: Double, b: Double): Double = a + b
    override fun getPI(): Double = Math.PI
    override fun getName() = "NativeCalculator"
}
```

### Expo Modules API

For Expo-managed apps, the Expo Modules API provides a simpler way to write native modules:

```swift
// iOS Swift
public class BatteryModule: Module {
    public func definition() -> ModuleDefinition {
        Name("BatteryModule")
        AsyncFunction("getBatteryLevel") { () -> Double in
            UIDevice.current.batteryLevel
        }
    }
}
```

---

## 6. Platform-Specific Code

React Native provides two ways to write platform-specific code:

### Platform Module

```javascript
import { Platform, StyleSheet } from 'react-native';

// Platform.OS returns 'ios' or 'android'
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 4 },
    }),
  },
});

// Detect Android version
if (Platform.OS === 'android' && Platform.Version >= 33) {
  // Android 13+ specific code
}

// Detect iOS version
const majorVersionIOS = parseInt(Platform.Version, 10);
```

### Platform-Specific File Extensions

```
Button.ios.js     # iOS-specific implementation
Button.android.js # Android-specific implementation
```

```javascript
import Button from './Button'; // Automatically picks the right file
```

### Native-Specific Extensions

```
Container.js        # Used by webpack/Rollup (web)
Container.native.js # Used by Metro bundler (React Native)
```

---

## 7. Performance Optimization

React Native aims for 60fps (16.67ms per frame). Common performance issues and solutions:

### Key Issues

1. **Running in dev mode** (`dev=true`): Always test performance in release builds
2. **console.log statements**: Remove in production (use babel-plugin-transform-remove-console)
3. **FlatList rendering slow**: Implement `getItemLayout`, use `FlashList` or `Legend List` for large lists
4. **Heavy JS thread work**: Delays animation responsiveness

### Optimization Techniques

```javascript
// 1. Use InteractionManager for heavy work after navigation
import { InteractionManager } from 'react-native';

useEffect(() => {
  const task = InteractionManager.runAfterInteractions(() => {
    // Heavy computation here
  });
  return () => task.cancel();
}, []);

// 2. Use native driver for Animated
Animated.timing(opacity, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // Offloads animation to native thread
}).start();

// 3. Optimize FlatList
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// 4. Wrap onPress in requestAnimationFrame for responsiveness
function handleOnPress() {
  requestAnimationFrame(() => {
    doExpensiveAction();
  });
}

// 5. Enable hardware texture rendering on Android for moving views
<View renderToHardwareTextureAndroid={true}>
```

### Performance Monitoring

Use the Perf Monitor in Dev Menu to track:
- **JS Thread FPS**: Business logic performance
- **UI Thread FPS**: Native rendering performance

---

## 8. Testing React Native Apps

### Testing Pyramid

1. **Static Analysis** (fastest): ESLint + TypeScript
2. **Unit Tests** (Jest): Test individual functions/classes
3. **Integration Tests**: Test combined modules
4. **Component Tests**: Test React component rendering and interactions
5. **End-to-End Tests** (slowest, most confidence): Test on real device/emulator

### Unit Testing with Jest

React Native ships with Jest configured out of the box:

```javascript
// math.js
export function add(a, b) { return a + b; }

// math.test.js
describe('Math', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### Component Testing with React Native Testing Library

```javascript
import { render, fireEvent, screen } from '@react-native-testing-library';

function GroceryList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  return (
    <>
      <TextInput value={text} onChangeText={setText} placeholder="Add item" />
      <Button title="Add" onPress={() => { setItems([...items, text]); setText(''); }} />
      {items.map(item => <Text key={item}>{item}</Text>)}
    </>
  );
}

test('user can add an item', () => {
  render(<GroceryList />);
  fireEvent.changeText(screen.getByPlaceholderText('Add item'), 'Milk');
  fireEvent.press(screen.getByText('Add'));
  expect(screen.getByText('Milk')).toBeTruthy();
});
```

### Snapshot Testing

```javascript
test('renders correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### End-to-End Testing

- **Detox** (Wix): Most popular E2E framework for React Native
- **Appium**: Cross-platform E2E testing
- **Maestro**: Modern mobile E2E testing

```javascript
// Detox example
describe('Login Flow', () => {
  it('should login successfully', async () => {
    await element(by.id('email-input')).typeText('user@example.com');
    await element(by.id('password-input')).typeText('password');
    await element(by.id('login-button')).tap();
    await expect(element(by.text('Welcome'))).toBeVisible();
  });
});
```

---

## 9. Building and Deploying: iOS and Android

### iOS Deployment

**Prerequisites**: Mac with Xcode, Apple Developer account ($99/year)

```bash
# Build for iOS
npx react-native run-ios
# Or with Expo
eas build --platform ios

# Archive for App Store
# 1. Open .xcworkspace in Xcode
# 2. Product > Archive
# 3. Upload to App Store Connect via Xcode Organizer
```

**App Store Requirements:**
- App icon (1024x1024)
- Screenshots for each device size
- Privacy policy URL
- App description, keywords, categories
- App Review information
- Requires review board for certain APIs (location, camera, etc.)

### Android Deployment

**Prerequisites**: Android Studio, Google Play Developer account ($25 one-time)

```bash
# Build for Android
npx react-native run-android
# Or with Expo
eas build --platform android

# Generate release APK/AAB
cd android && ./gradlew assembleRelease
# Or bundle for Play Store
./gradlew bundleRelease
```

**Play Store Requirements:**
- App icon (512x512)
- Feature graphic (1024x500)
- Screenshots for phone, tablet
- Content rating questionnaire
- Data safety form
- Target audience and content declaration

### EAS Build (Expo)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all
eas submit --platform all  # Submit to app stores
```

### Fastlane

Automation tool for iOS and Android deployment:

```ruby
# Fastfile
lane :beta do
  increment_build_number
  build_app(scheme: "MyApp")
  upload_to_testflight
end
```

---

# PART 2 - Capacitor / Ionic

## 10. Capacitor Basics

**Capacitor** (v8) is a cross-platform native runtime by Ionic that makes it easy to build web apps that run natively on iOS, Android, and the web. It's the spiritual successor to Apache Cordova.

### How Capacitor Works

Capacitor takes your **built web assets** (HTML, CSS, JS from any framework) and wraps them in a native shell. It runs your web code in a **WebView** while providing JavaScript APIs to access native device features through plugins.

```
┌─────────────────────────────┐
│     Native Shell (iOS)      │
│  ┌───────────────────────┐  │
│  │      WebView          │  │
│  │  ┌─────────────────┐  │  │
│  │  │  Your Web App   │  │  │
│  │  │  (HTML/CSS/JS)  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │  Capacitor Plugins    │  │
│  │  (Native Bridge)      │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Getting Started

```bash
# Create new app
npm init @capacitor/app@latest

# Add to existing web project
npm i @capacitor/core
npm i -D @capacitor/cli
npx cap init

# Add platforms
npm i @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

# Sync web code to native projects
npx cap sync
```

### Key Concepts

- **Web Directory**: Your built web assets (configured via `webDir` in `capacitor.config.ts`)
- **Native Projects**: Generated iOS/Android projects in `/ios` and `/android`
- **Capacitor Config**: `capacitor.config.ts` - main configuration file
- **Plugins**: Native APIs exposed to JavaScript

### Built-in Plugins

Capacitor includes core plugins:
- `@capacitor/camera`
- `@capacitor/filesystem`
- `@capacitor/geolocation`
- `@capacitor/haptics`
- `@capacitor/local-notifications`
- `@capacitor/push-notifications`
- `@capacitor/share`
- `@capacitor/storage` (Preferences)
- `@capacitor/web` (WebView control)

### Development Workflow

```bash
# Run in browser (with native plugin simulation)
npx cap run web

# Run on device
npx cap run ios
npx cap run android

# Live reload during development
npx cap run android --livereload --external
```

### Native Code Access

When you need custom native code beyond plugins:

```swift
// iOS - Custom Swift code
// ios/App/App/AppDelegate.swift
// Add native Swift/ObjC code directly
```

```kotlin
// Android - Custom Kotlin/Java code
// android/app/src/main/java/...
```

---

## 11. Ionic Framework

**Ionic** (v8) is a UI component library for building cross-platform apps using web technologies. It provides beautiful, pre-built UI components that adapt to each platform (iOS, Android, desktop).

### Framework Support

Ionic works with:
- **Angular** (`@ionic/angular`)
- **React** (`@ionic/react`)
- **Vue** (`@ionic/vue`)
- **Vanilla JavaScript** (script include)

### Core Components

| Component | Description |
|-----------|-------------|
| `<ion-button>` | Styled button with platform appearance |
| `<ion-card>` | Content container with shadow styling |
| `<ion-content>` | Main scrollable content area |
| `<ion-header>` | App header bar |
| `<ion-toolbar>` | Navigation bar container |
| `<ion-tabs>` | Tab-based navigation |
| `<ion-menu>` | Side menu |
| `<ion-modal>` | Modal dialog |
| `<ion-popover>` | Popover overlay |
| `<ion-alert>` | Alert dialog |
| `<ion-loading>` | Loading spinner overlay |
| `<ion-input>` | Text input |
| `<ion-list>` | Scrollable list |
| `<ion-item>` | List item |
| `<ion-fab>` | Floating action button |
| `<ion-infinite-scroll>` | Infinite scroll trigger |
| `<ion-refresher>` | Pull-to-refresh |

### Ionic React Example

```tsx
import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonButton, IonCard, IonCardContent } from '@ionic/react';

function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <p>Welcome to Ionic!</p>
            <IonButton expand="block">Click Me</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
```

### Ionic Theming

Ionic uses CSS custom properties for theming:

```css
:root {
  --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-secondary: #5260ff;
  --ion-color-tertiary: #6a64ff;
  --ion-color-success: #2dd36f;
  --ion-color-warning: #ffc409;
  --ion-color-danger: #eb445a;
}
```

Platform styles automatically adapt: iOS uses iOS-style components, Android uses Material Design.

### Navigation with Ionic

**React Router integration:**
```tsx
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';

<IonRouterOutlet>
  <Route path="/home" component={Home} />
  <Route path="/details" component={Details} />
  <Route exact path="/" render={() => <Redirect to="/home" />} />
</IonRouterOutlet>
```

**Angular Router integration:**
```typescript
const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
```

---

## 12. Progressive Web Apps (PWA)

A **Progressive Web App** (PWA) is a web application that provides a native app-like experience. PWAs are installable, work offline, and can send push notifications.

### Three Pillars of PWAs

1. **Web App Manifest**: JSON file describing the app
2. **Service Worker**: Background script for caching and offline support
3. **HTTPS**: Secure connection required

### Web App Manifest

A JSON file that tells the browser how to install and display the app:

```json
{
  "name": "My PWA Application",
  "short_name": "MyPWA",
  "description": "A progressive web app example",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3880ff",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/icons/icon-72x72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-96x96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "screenshots": [
    { "src": "/screenshots/home.png", "sizes": "1080x1920", "type": "image/png", "form_factor": "wide" },
    { "src": "/screenshots/home-narrow.png", "sizes": "720x1280", "type": "image/png", "form_factor": "narrow" }
  ],
  "shortcuts": [
    { "name": "New Entry", "url": "/new", "icons": [{ "src": "/icons/new.png", "sizes": "96x96" }] }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": { "files": [{ "name": "file", "accept": ["image/*"] }] }
  }
}
```

**Required manifest members for installability:**
- `name` or `short_name`
- `icons` (at least 192x192 and 512x512)
- `start_url`
- `display` (standalone, minimal-ui, fullscreen)

**Display modes:**
- `standalone`: App appears without browser UI
- `minimal-ui`: Minimal browser controls
- `fullscreen`: No browser UI at all
- `browser`: Normal browser tab

Link manifest in HTML:
```html
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#3880ff">
```

### Service Workers

Service workers are background scripts that intercept network requests and enable offline functionality.

**Registration:**
```javascript
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(registration => {
      console.log('SW registered:', registration.scope);
    })
    .catch(error => {
      console.error('SW registration failed:', error);
    });
}
```

**Service Worker Lifecycle:**

```
Register → Install → Activate → Idle/Fetch Events
```

1. **install**: Cache site assets (called once)
2. **activate**: Clean up old caches (called when old SW is removed)
3. **fetch**: Intercept network requests (ongoing)
4. **message**: Communication with client

**Service Worker File (`sw.js`):**

```javascript
const CACHE_NAME = 'v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/offline.html',
];

// Install - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request)
          .then(response => {
            // Cache new resources
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => caches.match('/offline.html'));
      })
  );
});
```

**Caching Strategies:**

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Cache First | Check cache, fallback to network | Static assets |
| Network First | Check network, fallback to cache | Dynamic content |
| Stale While Revalidate | Serve cache, update in background | Semi-dynamic |
| Network Only | Always fetch from network | API calls |
| Cache Only | Always serve from cache | Static content |

### Push Notifications

```javascript
// Request permission
const permission = await Notification.requestPermission();

// In service worker - listen for push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
      badge: '/badge.png',
      data: { url: data.url },
    })
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

### Offline Support

```javascript
// Check if online/offline
window.addEventListener('online', () => {
  console.log('Back online');
  syncOfflineData();
});

window.addEventListener('offline', () => {
  console.log('Gone offline');
});

// IndexedDB for offline data storage
const request = indexedDB.open('MyDB', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('items', { keyPath: 'id' });
  store.createIndex('timestamp', 'timestamp');
};
```

### Add to Home Screen

The browser automatically shows an install prompt when:
- Web app manifest is valid
- Service worker is registered
- Served over HTTPS
- User has engaged with the site (varies by browser)

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show custom install button
  installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('Install prompt outcome:', outcome);
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
});
```

### Background Sync

```javascript
// Register sync in service worker
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-form-data') {
    event.waitUntil(syncFormData());
  }
});

// Trigger sync from main thread
const registration = await navigator.serviceWorker.ready;
await registration.sync.register('sync-form-data');
```

### Web Periodic Background Sync

```javascript
// Register periodic sync (requires periodic background sync permission)
const registration = await navigator.serviceWorker.ready;
await registration.periodicSync.register('content-sync', {
  minInterval: 60 * 60 * 1000, // 1 hour
});
```

---

# PART 3 - Electron

## 13. Electron Basics

**Electron** is a framework for building desktop applications using JavaScript, HTML, and CSS. It embeds **Chromium** (for rendering) and **Node.js** (for system access) into a single binary.

### Architecture

```
┌──────────────────────────────────────┐
│           Main Process              │
│  (Node.js environment)              │
│  - Window management                │
│  - Application lifecycle            │
│  - Native APIs                      │
│  - File system access               │
│  └──────────────────────────────┐   │
│                                 │   │
│    ┌────────────────────────┐   │   │
│    │   Renderer Process 1  │←──┘   │
│    │   (Chromium - HTML/   │       │
│    │    CSS/JS)            │       │
│    └────────────────────────┘       │
│    ┌────────────────────────┐       │
│    │   Renderer Process 2  │←──────┘
│    │   (Chromium - HTML/   │
│    │    CSS/JS)            │
│    └────────────────────────┘
└──────────────────────────────────────┘
```

### Main Process

- Runs in Node.js environment
- Entry point of the application
- Creates and manages application windows (`BrowserWindow`)
- Controls application lifecycle (`app` module)
- Has access to all Node.js APIs and Electron's native modules
- Only **one** main process per application

```javascript
// main.js
const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

### Renderer Process

- Responsible for rendering web content
- Runs in Chromium environment
- **Should** behave according to web standards
- Has **no** direct access to `require` or Node.js APIs by default
- Each `BrowserWindow` creates its own renderer process
- Uses HTML, CSS, and client-side JavaScript

### Preload Scripts

Bridge between main and renderer processes:

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Expose safe IPC methods to renderer
  sendMessage: (channel, data) => {
    const validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  onMessage: (callback) => {
    ipcRenderer.on('fromMain', (event, ...args) => callback(...args));
  },
});
```

### Inter-Process Communication (IPC)

```javascript
// main.js
const { ipcMain } = require('electron');

ipcMain.handle('get-file-data', async (event, filePath) => {
  // Validate sender
  if (!validateSender(event.senderFrame)) return null;
  const fs = require('node:fs');
  return fs.readFileSync(filePath, 'utf-8');
});

// renderer.js (via preload)
const data = await window.electronAPI.getFileData('/path/to/file');
```

### Utility Process

For CPU-intensive tasks (spawned from main process):

```javascript
const { utilityProcess } = require('electron');
const child = utilityProcess.fork('./worker.js');
child.postMessage({ task: 'heavy-computation', data: largeDataset });
child.on('message', (result) => {
  console.log('Result from utility:', result);
});
```

### TypeScript Support

```typescript
import { app } from 'electron/main';
import { shell } from 'electron/common';
```

---

## 14. Security in Electron

Electron apps have more power than browser apps. Security is critical.

### Key Security Principles

1. **Only load secure content** (HTTPS)
2. **Never enable Node.js integration for remote content**
3. **Enable context isolation** (default since v12)
4. **Enable process sandboxing** (default since v20)
5. **Use preload scripts** with `contextBridge` for IPC
6. **Never disable `webSecurity`**
7. **Define Content Security Policy (CSP)**
8. **Validate all IPC message senders**
9. **Limit navigation and new window creation**
10. **Keep Electron up to date**

### Context Isolation

Prevents renderer from accessing privileged APIs:

```javascript
// preload.js - CORRECT approach
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => {
    ipcRenderer.on('update-counter', (_event, value) => callback(value));
  },
});

// BAD - don't do this
// contextBridge.exposeInMainWorld('electronAPI', {
//   on: ipcRenderer.on,  // Exposes entire IPC system
// });
```

### Process Sandboxing

Limits what renderer processes can access at the OS level. Disabling context isolation also disables sandboxing.

### Content Security Policy

```html
<!-- meta tag approach -->
<meta http-equiv="Content-Security-Policy"
  content="default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'">
```

```javascript
// HTTP header approach
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ["default-src 'self'"]
    }
  });
});
```

### Security Checklist Summary

| Rule | Why |
|------|-----|
| HTTPS only | Data integrity and encryption |
| No nodeIntegration for remote content | Prevents RCE via XSS |
| Context isolation ON | Prevents prototype pollution |
| Sandbox ON | OS-level restrictions |
| CSP enforced | Limits resource loading |
| IPC sender validation | Prevents unauthorized access |
| No file:// protocol | Prevents arbitrary file access |
| Validate webview options | Prevents privilege escalation |

---

## 15. Auto-Update

### electron-updater (Electron Forge / electron-builder)

```javascript
// main.js
const { autoUpdater } = require('electron-updater');

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on('update-available', (info) => {
  console.log('Update available:', info.version);
});

autoUpdater.on('update-downloaded', (info) => {
  // Prompt user to restart
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: `Version ${info.version} is ready. Restart now?`,
    buttons: ['Restart', 'Later'],
  }).then(({ response }) => {
    if (response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.checkForUpdatesAndNotify();
```

### Electron Forge Publishing

```javascript
// forge.config.js
module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: { owner: 'myorg', name: 'myapp' },
        prerelease: false,
      },
    },
  ],
};
```

---

## 16. Building and Distributing Electron Apps

### Electron Forge

The recommended toolchain for building Electron apps:

```bash
# Create new project
npx create-electron-app@latest my-app

# Package for distribution
npx electron-forge package

# Create distributable (DMG, NSIS, etc.)
npx electron-forge make

# Publish to GitHub releases
npx electron-forge publish
```

### Platform-Specific Packaging

| Platform | Formats | Tool |
|----------|---------|------|
| macOS | .dmg, .zip, .pkg | electron-forge / electron-builder |
| Windows | .exe (NSIS), .msi, .appx | electron-forge / electron-builder |
| Linux | .AppImage, .deb, .rpm, .snap | electron-forge / electron-builder |

### Code Signing

**macOS**: Requires Apple Developer certificate
**Windows**: Requires code signing certificate (EV recommended)
**Linux**: Optional GPG signing

### Auto-Update Distribution

- **GitHub Releases**: Free, common for open-source
- **Electron Releases API**: GitHub's releases endpoint
- **Custom update server**: For private apps
- **Squirrel**: Framework for auto-updates

---

## 17. Alternatives: Tauri

**Tauri** is a lighter alternative to Electron. Key differences:

| Feature | Electron | Tauri |
|---------|----------|-------|
| Backend | Node.js | Rust |
| Webview | Bundled Chromium | System webview (WebKit/WebView2) |
| Bundle size | ~150MB+ | ~600KB+ |
| Security | Node.js risks | Rust memory safety |
| Performance | Good | Better (Rust backend) |
| Frontend | Any web framework | Any web framework |
| Mobile support | No | Yes (iOS/Android) |
| IPC | Electron IPC | Tauri IPC (Rust ↔ JS) |

### Tauri Architecture

```rust
// src-tauri/src/lib.rs (Rust backend)
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error running tauri app");
```

```javascript
// Frontend (any framework)
const { invoke } = window.__TAURI__.core;
const greeting = await invoke('greet', { name: 'World' });
```

### Tauri Security Model

- **Permissions system**: Granular access control
- **Command scopes**: Limit what commands can do
- **Capabilities**: Fine-grained security policies
- **Content Security Policy**: Built-in CSP support
- **Rust backend**: Memory-safe native code

### Tauri Plugins

Rich plugin ecosystem:
- `@tauri-apps/plugin-notification` - Push notifications
- `@tauri-apps/plugin-geolocation` - GPS access
- `@tauri-apps/plugin-fs` - File system
- `@tauri-apps/plugin-shell` - Shell commands
- `@tauri-apps/plugin-updater` - Auto-updates
- `@tauri-apps/plugin-store` - Persistent storage

### When to Choose Tauri Over Electron

- Need smaller bundle size
- Security is critical
- Want mobile support from the same codebase
- Comfortable with Rust (for backend customizations)
- Building resource-conscious desktop apps

---

# PART 4 - Flutter with Dart (JS Comparison)

## 18. Flutter Basics for JS Developers

**Flutter** is Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from a single codebase. It uses **Dart** as its programming language (not JavaScript).

### Dart vs JavaScript Comparison

| Concept | JavaScript | Dart |
|---------|------------|------|
| Typing | Dynamic | Static (optional dynamic) |
| Null safety | No (unless TypeScript) | Built-in null safety |
| Classes | Prototypal inheritance | Class-based with mixins |
| Async | Callbacks, Promises, async/await | Future, Stream, async/await |
| Modules | ES Modules (import/export) | import/export |
| Variables | `let`, `const`, `var` | `var`, `final`, `const` |
| Arrow functions | `(x) => x` | `(x) => x` |
| Null check | `value?.prop` | `value?.prop` |
| Spread | `...arr` | `...arr` |

### Flutter Architecture

```
┌─────────────────────────────┐
│     Your Dart Code          │
│  (Widgets, State, Logic)    │
├─────────────────────────────┤
│     Flutter Framework       │
│  (Widgets, Rendering, etc.) │
├─────────────────────────────┤
│     Flutter Engine (C++)    │
│  (Skia, Dart VM, etc.)      │
├─────────────────────────────┤
│     Platform Embedder       │
│  (iOS/Android/Linux/etc.)   │
└─────────────────────────────┘
```

### Widget System (vs React Components)

Everything in Flutter is a **Widget**. Widgets are immutable and compose to build UI.

```dart
// Flutter (Dart)
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

```javascript
// React Native (JavaScript) equivalent
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
    </View>
  );
}
```

### Key Differences from React Native

| Aspect | React Native | Flutter |
|--------|-------------|---------|
| Language | JavaScript/TypeScript | Dart |
| Rendering | Native components | Custom rendering (Skia) |
| Performance | Bridge overhead | Near-native performance |
| Hot reload | Fast | Very fast |
| UI consistency | Platform-adaptive | Pixel-perfect consistent |
| Ecosystem | npm packages | pub.dev packages |
| State management | Redux, Context, Zustand | Provider, Riverpod, Bloc |

### When to Choose Flutter Over JS Frameworks

- Need pixel-perfect UI consistency across platforms
- High-performance animations are critical
- Team is willing to learn Dart
- Building for multiple platforms (mobile, web, desktop) simultaneously
- Need custom UI that doesn't map to native components

---

# PART 5 - Progressive Web Apps

## 19. Service Workers: Registration, Lifecycle, Caching

### Registration

Service workers must be served over HTTPS (or localhost for development).

```javascript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    // updateViaCache: 'none', // Don't use HTTP cache for SW updates
  }).then(registration => {
    console.log('SW registered with scope:', registration.scope);

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated') {
          console.log('New service worker activated');
        }
      });
    });
  });
}

// Check registration status
navigator.serviceWorker.ready.then(registration => {
  console.log('SW is active:', registration.active);
});
```

### Complete Lifecycle

```
1. REGISTER: Browser fetches sw.js
2. INSTALL: install event fires (cache assets)
3. WAITING: Waits for old SW to stop controlling pages
4. ACTIVATE: activate event fires (clean old caches)
5. CONTROLLING: SW now handles fetch events for pages in scope
6. REDUNDANT: Old SW is discarded
```

```javascript
// sw.js - Complete lifecycle example
const CACHE_NAME = 'app-cache-v2';
const OFFLINE_URL = '/offline.html';

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/app.js',
          OFFLINE_URL,
        ]);
      })
  );
  // Activate immediately without waiting for old SW
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  // Take control of all open pages immediately
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  }
});

// MESSAGE (communication with client)
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

### Caching Strategies Implementation

```javascript
// Cache First (static assets)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}

// Network First (API calls, dynamic pages)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request);
  }
}

// Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  });
  return cached || fetchPromise;
}
```

---

## 20. Web App Manifest

### Complete Manifest Reference

```json
{
  "name": "Full Application Name (shown in stores)",
  "short_name": "ShortName (shown on home screen)",
  "description": "App description for store listing",
  "id": "/?home=1",
  "start_url": "/?source=pwa",
  "scope": "/",
  "display": "standalone",
  "display_override": ["window-controls-overlay", "standalone", "minimal-ui"],
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#3880ff",
  "lang": "en",
  "dir": "ltr",
  "categories": ["productivity", "utilities"],
  "prefer_related_applications": false,
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "screenshots": [
    { "src": "/wide.png", "sizes": "1280x720", "type": "image/png", "form_factor": "wide", "label": "Desktop view" },
    { "src": "/narrow.png", "sizes": "720x1280", "type": "image/png", "form_factor": "narrow", "label": "Mobile view" }
  ],
  "shortcuts": [
    { "name": "New Document", "url": "/new", "description": "Create a new document", "icons": [{"src": "/icons/new.png", "sizes": "96x96"}] },
    { "name": "Recent", "url": "/recent", "description": "View recent documents" }
  ],
  "launch_handler": { "navigate_to": "existing", "client_id": "/" },
  "protocol_handlers": [{ "protocol": "web+myapp", "url": "/handle?url=%s" }],
  "file_handlers": [
    { "name": "Image files", "accept": { "image/*": [".png", ".jpg", ".jpeg"] } }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": { "files": [{ "name": "images", "accept": ["image/*"] }] }
  },
  "serviceworker": { "src": "/sw.js", "scope": "/", "type": "module" }
}
```

### Deploying the Manifest

```html
<head>
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#3880ff">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="apple-touch-icon" href="/icon-180.png">
</head>
```

---

## 21. Push Notifications

### Complete Push Notification Flow

```javascript
// 1. Request permission
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY'),
    });
    // Send subscription to your server
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
  }
}

// 2. Service worker - receive push
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New notification',
    icon: data.icon || '/icon.png',
    badge: data.badge || '/badge.png',
    image: data.image,
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open', icon: '/icons/open.png' },
      { action: 'dismiss', title: 'Dismiss', icon: '/icons/dismiss.png' },
    ],
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
  );
});

// 3. Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(event.notification.data.url);
    })
  );
});
```

### VAPID Key Generation

```javascript
// Server-side: generate VAPID keys
const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();
// { publicKey: '...', privateKey: '...' }
```

---

## 22. Offline Support

### Cache API

```javascript
// Open a cache
const cache = await caches.open('my-cache-v1');

// Add resources
await cache.add('/index.html');
await cache.addAll(['/style.css', '/app.js', '/image.png']);

// Match requests
const response = await cache.match('/index.html');
const response2 = await cache.match(new Request('/api/data'));

// Store request/response pairs
await cache.put('/api/data', new Response(JSON.stringify(data), {
  headers: { 'Content-Type': 'application/json' },
}));

// Delete entries
await cache.delete('/old-file.html');

// List all caches
const cacheNames = await caches.keys();

// Get all entries in a cache
const requests = await cache.keys();
```

### IndexedDB for Structured Data

```javascript
// Open database
const request = indexedDB.open('MyDatabase', 2);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('notes')) {
    const store = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    store.createIndex('timestamp', 'timestamp', { unique: false });
  }
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // Write data
  const tx = db.transaction('notes', 'readwrite');
  const store = tx.objectStore('notes');
  store.add({ title: 'My Note', content: 'Hello', timestamp: Date.now() });

  // Read data
  const readTx = db.transaction('notes', 'readonly');
  const readStore = readTx.objectStore('notes');
  const getAllRequest = readStore.getAll();
  getAllRequest.onsuccess = () => {
    console.log('All notes:', getAllRequest.result);
  };
};
```

### Workbox (Google's Service Worker Library)

```javascript
// Using Workbox for easier caching
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Precache all build assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({ cacheName: 'images', plugins: [
    { cacheDidUpdate: async ({ cache }) => { /* notify */ } }
  ]})
);

// Stale while revalidate for API
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({ cacheName: 'api' })
);
```

---

## 23. Add to Home Screen

### Android (Chrome) - Automatic Prompt

Chrome shows an install banner automatically when the PWA meets criteria:
- Valid manifest with `name`, `icons` (192x192+), `start_url`, `display`
- Service worker registered
- Served over HTTPS
- User engagement (visits on 2 separate days within 2 weeks)

### iOS Safari - Manual Instructions

iOS doesn't support automatic install prompts:

```html
<!-- Show instructions for iOS -->
<div id="ios-install-banner" style="display:none;">
  <p>To install this app on your iOS device, tap the Share button
     and then "Add to Home Screen".</p>
  <img src="/ios-share-icon.png" alt="Share button">
</div>

<script>
  // Detect iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = navigator.standalone === false;
  if (isIOS && isSafari) {
    document.getElementById('ios-install-banner').style.display = 'block';
  }
</script>
```

### Custom Install UI

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-btn').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} install`);
  deferredPrompt = null;
  document.getElementById('install-btn').style.display = 'none';
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  console.log('App installed successfully');
  // Track installation analytics
});
```

---

## 24. Background Sync

### Basic Background Sync

```javascript
// Register sync from main thread
async function sendMessageWhileOffline(message) {
  // Store in IndexedDB
  await saveToIndexedDB('pendingMessages', { ...message, timestamp: Date.now() });

  // Register sync
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('send-message');

  console.log('Message queued for sync');
}

// Service worker - handle sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-message') {
    event.waitUntil(sendPendingMessages());
  }
});

async function sendPendingMessages() {
  const messages = await getAllFromIndexedDB('pendingMessages');
  for (const message of messages) {
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      await deleteFromIndexedDB('pendingMessages', message.id);
    } catch {
      // Will retry on next sync
      break;
    }
  }
}
```

### Periodic Background Sync

```javascript
// Register periodic sync
async function registerPeriodicSync() {
  const registration = await navigator.serviceWorker.ready;

  if ('periodicSync' in registration) {
    const status = await navigator.permissions.query({
      name: 'periodic-background-sync',
    });
    if (status.state === 'granted') {
      await registration.periodicSync.register('content-update', {
        minInterval: 60 * 60 * 1000, // 1 hour
      });
    }
  }
}

// Service worker
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  const response = await fetch('/api/latest-content');
  const data = await response.json();
  await saveToIndexedDB('cachedContent', data);
  // Notify all clients
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({ type: 'CONTENT_UPDATED', data });
  });
}
```

---

# PART 6 - Cross-Platform Frameworks

## 25. NativeScript

**NativeScript** provides direct access to native platform APIs from JavaScript. Current version: **9.0** (with Vite support, multi-window apps).

### What Makes NativeScript Different

Unlike React Native (which uses a bridge to communicate with native), NativeScript provides **direct access** to native APIs from JavaScript runtime:

```javascript
// Direct access to iOS APIs
import { ios } from '@nativescript/core';
const device = ios.UIDevice.currentDevice;

// Direct access to Android APIs
import { android } from '@nativescript/core';
const context = android.content.Intent;
```

### Supported Frameworks ("Flavors")

- Plain JavaScript/TypeScript (XML-based UI)
- Angular (`@nativescript/angular`)
- Vue (`nativescript-vue`)
- React (`react-nativescript`)
- Solid (`@nativescript-community/solid-js`)
- Svelte (`@nativescript-community/svelte-native`)

### Project Structure

```
my-app/
├── app/
│   ├── app.css
│   ├── main.js
│   └── app.ts
├── app_resources/     # Platform-specific resources
├── nativescript.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts     # Vite configuration
```

### Key Features

- **Platform APIs directly in JS**: No bridge overhead
- **CSS Styling**: Use real CSS (subset)
- **XML UI**: Declarative UI markup
- **Data Binding**: Two-way data binding
- **Gestures**: Built-in gesture recognition
- **Animations**: Platform-native animations
- **Multithreading**: Background threads via workers
- **Vision Pro**: visionOS development support

### Getting Started

```bash
npm install -g nativescript
ns create my-app --template @nativescript/template-blank
cd my-app
ns run android
ns run ios
```

---

## 26. Framework7

**Framework7** is a free and open-source mobile HTML framework for building iOS, Android, and desktop apps. It's focused on iOS and Android native look and feel.

### Key Features

- **iOS and Material Design themes**
- **Works with any framework** or standalone
- **Built-in navigation**: Page-based routing
- **Rich UI components**: List views, cards, modals, toolbars, tabs
- **Swipe back**: iOS-like navigation gesture
- **Dynamic pages**: Load pages via AJAX
- **RTL support**

### Core Components

```html
<!-- Framework7 standalone -->
<div class="page">
  <div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-inner">
      <div class="title">My App</div>
    </div>
  </div>
  <div class="page-content">
    <div class="list">
      <ul>
        <li class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">Item 1</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### With React/Vue

```javascript
// Framework7 React
import { App, Page, Navbar, Button } from 'framework7-react';

export default function Home() {
  return (
    <Page>
      <Navbar title="Home" />
      <Button fill>Click Me</Button>
    </Page>
  );
}
```

### Getting Started

```bash
# Standalone
npx create-framework7 my-app

# With React
npx create-react-app my-app --template framework7-react

# With Vue
npx create-vue-app my-app --template framework7-vue
```

---

## 27. Quasar Framework

**Quasar** is a Vue.js-based framework that lets you build web apps, PWAs, mobile apps (Cordova/Capacitor), and desktop apps (Electron) from a single codebase.

### What Quasar Provides

- **Vue 3** components with rich UI library
- **CLI**: Project scaffolding, dev server, build tools
- **100+ Components**: Buttons, forms, dialogs, tables, carousels, etc.
- **Quasar CLI**: Optimized build pipeline
- **Multi-platform output**: SPA, PWA, SSR, Mobile, Desktop, BEX (browser extension)

### Platform Modes

```bash
# Web app (SPA)
quasar build -m spa

# Progressive Web App
quasar build -m pwa

# Mobile (Capacitor)
quasar build -m capacitor -T android

# Mobile (Cordova)
quasar build -m cordova -T ios

# Desktop (Electron)
quasar build -m electron

# Server-side rendered
quasar build -m ssr

# Browser Extension
quasar build -m bex
```

### Component Example

```vue
<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">My Quasar App</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="name" label="Name" />
        <q-btn color="primary" label="Submit" @click="submit" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const name = ref('');

function submit() {
  $q.notify(`Hello, ${name.value}!`);
}
</script>
```

### Getting Started

```bash
npm init quasar
# Choose: Quasar v2 + Vite + Vue 3
cd my-app
npm install
npx quasar dev
```

---

# PART 7 - Mobile-Specific Considerations

## 28. Touch Gestures and Haptics

### Touch Events

```javascript
// Web touch events
element.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  console.log(`Touch at: ${touch.clientX}, ${touch.clientY}`);
});

element.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent scrolling
});

element.addEventListener('touchend', (e) => {
  console.log('Touch ended');
});

// React Native
import { Pressable, Gesture, GestureDetector } from 'react-native-gesture-handler';

function SwipeableCard() {
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Track finger movement
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > 100) {
        // Swipe detected
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={{ transform: [{ translateX }] }} />
    </GestureDetector>
  );
}
```

### Gesture Libraries

| Library | Framework | Features |
|---------|-----------|----------|
| Hammer.js | Web | Pan, pinch, rotate, swipe, tap |
| react-native-gesture-handler | React Native | Native gesture system |
| @use-gesture/react | React | Hook-based gesture detection |
| Ionic Gestures | Ionic | Built-in gesture utility |

### Haptics

```javascript
// Web (Vibration API - limited support)
navigator.vibrate(200); // Vibrate for 200ms
navigator.vibrate([100, 50, 100]); // Pattern: vibrate, pause, vibrate

// React Native (expo-haptics)
import * as Haptics from 'expo-haptics';

// Light impact
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium impact
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Heavy impact
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

// Selection feedback
await Haptics.selectionAsync();

// Notification feedback
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

// Taptic Engine (iOS only)
import { Haptics } from 'expo-haptics';
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
```

---

## 29. Camera, GPS, Sensors

### Camera Access

```javascript
// Web - getUserMedia
async function openCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment', width: 1280, height: 720 },
    audio: false,
  });
  videoElement.srcObject = stream;
}

// Web - file input
<input type="file" accept="image/*" capture="environment" />

// React Native - expo-camera
import { CameraView, useCameraPermissions } from 'expo-camera';

function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission required</Text>
        <Button title="Grant" onPress={requestPermission} />
      </View>
    );
  }
  return <CameraView style={{ flex: 1 }} facing="back" />;
}
```

### GPS / Geolocation

```javascript
// Web Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    console.log(`Location: ${latitude}, ${longitude} (±${accuracy}m)`);
  },
  (error) => console.error(error),
  { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
);

// Watch position changes
const watchId = navigator.geolocation.watchPosition(
  (position) => updateMap(position.coords),
  (error) => console.error(error),
  { enableHighAccuracy: true }
);
// Later: navigator.geolocation.clearWatch(watchId);

// React Native - expo-location
import * as Location from 'expo-location';

const { status } = await Location.requestForegroundPermissionsAsync();
if (status === 'granted') {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  console.log(`${location.coords.latitude}, ${location.coords.longitude}`);

  // Background location
  await Location.startLocationUpdatesAsync('BACKGROUND_TASK', {
    accuracy: Location.Accuracy.High,
    distanceInterval: 10, // meters
    deferredUpdatesInterval: 60000, // ms
  });
}
```

### Device Sensors

```javascript
// Web DeviceMotion API (accelerometer, gyroscope)
window.addEventListener('devicemotion', (event) => {
  const { accelerationIncludingGravity, rotationRate } = event;
  console.log(`Acceleration: ${accelerationIncludingGravity.x}, ${accelerationIncludingGravity.y}, ${accelerationIncludingGravity.z}`);
  console.log(`Rotation: ${rotationRate.alpha}, ${rotationRate.beta}, ${rotationRate.gamma}`);
});

// DeviceOrientation
window.addEventListener('deviceorientation', (event) => {
  const { alpha, beta, gamma } = event;
  // alpha: compass direction (0-360)
  // beta: front-back tilt (-180 to 180)
  // gamma: left-right tilt (-90 to 90)
});

// React Native - expo-sensors
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

Accelerometer.addListener(({ x, y, z }) => {
  console.log(`Accel: ${x}, ${y}, ${z}`);
});
Accelerometer.setUpdateInterval(100); // ms

Gyroscope.addListener(({ x, y, z }) => {
  console.log(`Gyro: ${x}, ${y}, ${z}`);
});
```

---

## 30. Deep Linking

Deep linking allows users to navigate directly to specific content within your app from URLs.

### Universal Links (iOS) and App Links (Android)

```json
// iOS - Associated Domains (entitlements)
{
  "com.apple.developer.associated-domains": [
    "applinks:example.com",
    "applinks:www.example.com"
  ]
}

// Android - AndroidManifest.xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="example.com" android:pathPrefix="/" />
</intent-filter>

// Apple Association File (https://example.com/.well-known/apple-app-site-association)
{
  "applinks": {
    "apps": [],
    "details": [{
      "appID": "TEAM_ID.com.myapp",
      "paths": ["/items/*", "/user/*"]
    }]
  }
}

// Android Digital Asset Links (https://example.com/.well-known/assetlinks.json)
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.myapp",
    "sha256_cert_fingerprints": ["..."]
  }
}]
```

### React Navigation Deep Linking

```javascript
// Static configuration
const linking = {
  prefixes: ['myapp://', 'https://example.com'],
  config: {
    screens: {
      Home: '',
      Items: 'items/:id',
      User: 'user/:userId/profile',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>
```

### Custom URL Schemes

```javascript
// iOS - Info.plist
CFBundleURLTypes:
  CFBundleTypeRole: Editor
  CFBundleURLName: com.myapp
  CFBundleURLSchemes: [myapp]

// Android - AndroidManifest.xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="myapp" />
</intent-filter>

// Handle incoming deep links
import { Linking } from 'react-native';

Linking.getInitialURL().then(url => {
  if (url) handleDeepLink(url);
});

Linking.addEventListener('url', (event) => {
  handleDeepLink(event.url);
});
```

---

## 31. App Store Optimization (ASO)

### Key ASO Factors

| Factor | iOS (App Store) | Android (Play Store) |
|--------|----------------|---------------------|
| App Name | 30 characters | 30 characters |
| Subtitle | 30 characters | N/A |
| Short Description | N/A | 80 characters |
| Full Description | 4000 characters | 4000 characters |
| Keywords | 100 characters (hidden) | N/A (uses description) |
| Screenshots | 3-10 per device | 2-8 per device |
| Preview Video | Up to 30 seconds | Up to 30 seconds |
| App Icon | 1024x1024 | 512x512 |

### Best Practices

**App Title & Subtitle:**
- Include primary keyword in title
- Keep subtitle focused on value proposition
- Don't stuff keywords

**Keywords (iOS):**
- Use all 100 characters
- Don't repeat words in title/subtitle
- Use commas without spaces
- Research competitor keywords

**Description:**
- Lead with value proposition in first 3 lines
- Use bullet points for features
- Include social proof and testimonials
- Update regularly with new features

**Screenshots:**
- Show key features, not just UI
- Add captions/text overlays
- Tell a story across screenshots
- Use device frames

**Ratings & Reviews:**
- Prompt after positive interactions
- Never ask on first launch
- Respond to negative reviews
- Use in-app review APIs

**Localization:**
- Translate all metadata for target markets
- Adapt screenshots for each locale
- Consider cultural differences

### Apple Search Ads & Google Play ASO Tools

- **App Annie / data.ai**: Analytics and competitive intelligence
- **Sensor Tower**: Keyword research and rank tracking
- **Mobile Action**: ASO optimization
- **AppFollow**: Review management

---

## 32. Performance on Mobile Devices

### Mobile Performance Considerations

1. **Battery Life**: Minimize background processing
2. **Memory**: Mobile devices have limited RAM (2-6GB typical)
3. **Network**: Variable connectivity (3G, 4G, 5G, WiFi)
4. **CPU**: Lower-powered than desktop
5. **Screen Size**: Smaller displays, various densities
6. **Touch Input**: Different interaction patterns

### Performance Budget

| Resource | Mobile Budget |
|----------|---------------|
| Total page weight | < 1MB (ideally < 500KB) |
| JavaScript bundle | < 300KB gzipped |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| First Input Delay | < 100ms |

### Optimization Techniques

```javascript
// 1. Code splitting (reduce initial load)
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// 2. Image optimization
<img
  srcSet="image-320w.webp 320w, image-640w.webp 640w, image-1280w.webp 1280w"
  sizes="(max-width: 600px) 320px, (max-width: 1000px) 640px, 1280px"
  loading="lazy"
  decoding="async"
/>

// 3. Virtual scrolling for long lists
// React Native: FlatList, SectionList, FlashList
// Web: react-window, react-virtualized

// 4. Debounce scroll/resize handlers
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 5. Use requestAnimationFrame for animations
function animate() {
  // Update animation state
  requestAnimationFrame(animate);
}

// 6. Web Workers for heavy computation
const worker = new Worker('heavy-task.js');
worker.postMessage({ data: largeDataset });
worker.onmessage = (e) => console.log('Result:', e.data);

// 7. Prefetch critical resources
<link rel="prefetch" href="/next-page.html">
<link rel="preload" href="/critical-font.woff2" as="font" type="font/woff2" crossorigin>
```

### React Native Mobile Performance

```javascript
// 1. Optimize FlatList
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/>

// 2. Avoid unnecessary re-renders
const MemoizedItem = React.memo(ItemComponent, (prev, next) => {
  return prev.item.id === next.item.id;
});

// 3. Use InteractionManager for heavy work
useEffect(() => {
  const task = InteractionManager.runAfterInteractions(() => {
    // Heavy computation after animation
  });
  return () => task.cancel();
}, []);

// 4. Optimize images
<Image
  source={{ uri: url }}
  resizeMode="contain"
  fadeDuration={0}
  progressiveRenderingEnabled
/>

// 5. Use Hermes engine (default in React Native)
// Hermes optimizes startup time and reduces memory usage
```

### Monitoring Performance

```javascript
// Web Vitals
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);  // Cumulative Layout Shift
onFID(console.log);  // First Input Delay
onLCP(console.log);  // Largest Contentful Paint

// React Native Performance Monitoring
import { PerformanceObserver } from 'react-native';

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration}ms`);
  }
});
observer.observe({ entryTypes: ['measure', 'mark'] });
```

---

## Summary: Choosing the Right Technology

| Use Case | Recommended Technology |
|----------|----------------------|
| Native mobile app (JS team) | React Native (Expo or bare) |
| Native mobile app (no JS) | Flutter |
| Hybrid mobile app (web code) | Capacitor + Ionic |
| Desktop app (large bundle OK) | Electron |
| Desktop app (small, secure) | Tauri |
| Offline-first web app | PWA (Service Workers + Manifest) |
| Cross-platform (mobile+web+desktop) | Capacitor, Quasar, or Tauri |
| Quick prototype (mobile) | Expo + React Native |
| Enterprise desktop app | Electron with security hardening |
| Low-resource desktop app | Tauri |
| Web app with native features | PWA + Web APIs |

### Key Decision Factors

1. **Team skills**: JS → React Native/Capacitor/Electron; Dart → Flutter; Rust → Tauri
2. **Performance needs**: Flutter/Tauri > React Native > Capacitor/Ionic > PWA
3. **Bundle size**: Tauri (~600KB) < Capacitor < Flutter < Electron (~150MB)
4. **Native access**: React Native (bridge) = NativeScript (direct) > Capacitor (plugins) > PWA (limited)
5. **Development speed**: PWA > Capacitor/Ionic > Expo > React Native CLI > Flutter > Tauri/Electron
6. **Offline support**: All support it; PWAs and Capacitor excel
7. **App store distribution**: All except PWAs (direct install)

---

*Sources: React Native Docs (reactnative.dev), Expo Docs (docs.expo.dev), React Navigation (reactnavigation.org), Capacitor Docs (capacitorjs.com), Ionic Docs (ionicframework.com), Electron Docs (electronjs.org), MDN Web Docs (developer.mozilla.org), Tauri Docs (tauri.app), NativeScript Docs (nativescript.org), Quasar Docs (quasar.dev)*
