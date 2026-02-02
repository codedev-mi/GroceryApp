# 📱 Instamart Clone – React Native Expo App

A **premium, Zepto-inspired grocery delivery application** built with **React Native and Expo**.  
This project focuses on **realistic mobile UI/UX**, clean architecture, and modern state management.

---

## ✨ Highlights

- ⚡ Fast, mobile-first UI inspired by **Zepto**
- 🟡 Brand theme with primary color **#FFD41D**
- 🧺 Smooth cart & quantity management
- 🧭 File-based navigation with Expo Router
- 🧠 Scalable Redux Toolkit architecture
- 🌐 Works on **Android, iOS, and Web**

---

## 🚀 Features

- **Home Dashboard**
  - Delivery header (“Delivery in 10 mins ⚡”)
  - Product cards with images, prices, and quantity controls
- **Categories**
  - Grid-based category listing
  - Dynamic category → product navigation
- **Product Management**
  - Add / remove items with live quantity update
- **Shopping Cart**
  - Cart summary with total price
  - Real-time Redux-powered updates
- **Authentication Flow (UI)**
  - Login → OTP → App navigation
- **Performance Optimized**
  - Uses `expo-image` for efficient image loading

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----|-----------|
| Framework | React Native with Expo (SDK 54) |
| Navigation | Expo Router (file-based routing) |
| State Management | Redux Toolkit |
| UI Styling | React Native StyleSheet |
| Icons | @expo/vector-icons |
| Images | expo-image |
| Language | TypeScript |

---

## 📂 Project Structure

```text
app/
├── _layout.tsx
├── (auth)/
│   ├── login.tsx
│   └── otp.tsx
├── (app)/
│   └── (tabs)/
│       ├── index.tsx        # Home
│       ├── categories.tsx  # Categories
│       └── cart.tsx        # Cart
├── category/
│   └── [id].tsx            # Dynamic category products
├── components/
│   ├── Container.tsx
│   └── ProductItem.tsx
├── data/
│   └── dummyData.ts
store/
├── index.ts
└── slices/
    └── cartSlice.ts

Prerequisites
Make sure you have the following installed:
Node.js (LTS recommended)
Git
Expo CLI (optional but recommended)
npm install -g expo

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/instamart-clone.git
cd instamart-clone

2️⃣ Install Dependencies
npm install

3️⃣ Install Expo Dependencies (if required)
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar @expo/vector-icons expo-image

▶️ Running the App
npx expo start

Run Options

📱 Android / iOS (Real Device): Scan QR using Expo Go
🤖 Android Emulator: Press a
🍎 iOS Simulator (Mac only): Press i
🌐 Web: Press w

📦 Key Dependencies
Package	Description
expo	Expo SDK
expo-router	File-based navigation
@reduxjs/toolkit	State management
react-redux	Redux bindings
expo-image	Optimized image rendering
@expo/vector-icons	Icon library
react-native-safe-area-context	Safe area handling
