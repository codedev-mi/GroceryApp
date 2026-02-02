import { Stack, Tabs } from "expo-router";
import React from "react";

export default function ProductLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="product"/>
    </Stack>
  );
}
