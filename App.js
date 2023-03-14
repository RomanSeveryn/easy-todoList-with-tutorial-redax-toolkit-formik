import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Todo } from './src/screens/Todo';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Todo />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
