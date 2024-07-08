import { Tabs } from 'expo-router';
import React, { useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TextInput, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const onChangeText = (text: string) => {
    dispatch({ type: "SEARCH", text });
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerTitle: () => (
          <TextInput
            editable
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
            style={{
              padding: 10,
              fontSize: 20,
              width: Dimensions.get("window").width,
              flex: 1,
            }}
            autoCorrect={false}
            placeholder="Busca un título"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => <TabBarIcon name="movie" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tvSeries"
        options={{
          title: "TV Series",
          tabBarIcon: ({ color }) => <TabBarIcon name="tv" color={color} />,
        }}
      />
    </Tabs>
  )
}
