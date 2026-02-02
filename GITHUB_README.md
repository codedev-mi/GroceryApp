# 📱 Instamart Clone - React Native Expo App

A premium, modern grocery delivery application built with React Native and Expo. This project demonstrates a realistic UI/UX with features like product dashboards, cart management, and seamless navigation.

## 🚀 Features

- **Store Dashboard**: Modern homepage with location header, promotional banners, and horizontal category scrolling.
- **Product Details**: Immersive product screens with large images, ratings, and sticky "Add to Cart" actions.
- **Shopping Cart**: Visual cart management with quantity controls and bill summary.
- **State Management**: Robust state handling using Redux Toolkit.
- **Routing**: File-based routing using Expo Router.
- **Performance**: Optimized image loading with `expo-image`.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Components**: Custom components with StyleSheet
- **Icons**: [@expo/vector-icons](https://icons.expo.fyi/)
- **Images**: [expo-image](https://docs.expo.dev/versions/latest/sdk/image/)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

---

## ⚙️ Installation & Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/instamart-clone.git
cd instamart-clone
```

### 2. Install Dependencies
Install all the required packages using npm.
```bash
npm install
```

### 3. Install Expo specific libraries (if needed)
If you run into issues, ensure these core libraries are installed:
```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar @expo/vector-icons expo-image
```

---

## 🏃‍♂️ Running the App

Start the development server:

```bash
npx expo start
```

### Options:
- **Scan QR Code**: Use the **Expo Go** app on your Android/iOS phone to scan the QR code in the terminal.
- **Android Emulator**: Press `a` in the terminal to open in Android Studio Emulator.
- **iOS Simulator**: Press `i` in the terminal to open in iOS Simulator (Mac only).
- **Web**: Press `w` to run in the browser.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | The main framework SDK |
| `expo-router` | File-based navigation |
| `@reduxjs/toolkit` | State management library |
| `react-redux` | React bindings for Redux |
| `expo-image` | High-performance image component |
| `@expo/vector-icons` | Icon set (Ionicons, Feather, etc.) |
| `react-native-safe-area-context` | Handling safe areas on notched devices |

## 🤝 Contribution

Feel free to fork this project and submit pull requests. Any improvements or new features are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
