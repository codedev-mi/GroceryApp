import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
});
