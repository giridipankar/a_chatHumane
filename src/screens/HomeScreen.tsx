import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AppIcon } from '../components/AppIcon';
import MicUi from './MicUi';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          //   backgroundColor: 'lightgreen',
        }}
      >
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'lightblue',
          }}
        >
          <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 18 }}>
            Hello there!{'\n'}
          </Text>
          <Text
            style={{
              color: isDarkMode ? 'white' : 'black',
              fontSize: 14,
              fontStyle: 'italic',
            }}
          >
            I am chatHumane, your personal AI assistant.
          </Text>
        </View>
        <MicUi />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
