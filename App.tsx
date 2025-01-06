// /* eslint-disable */
// import React, { type FC, useEffect, useState } from 'react';
// import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
// import { Provider as StoreProvider } from 'react-redux';
// import * as Sentry from '@sentry/react-native';
// import { PersistGate } from 'redux-persist/integration/react';

// import Navigator from './src/navigators';
// import SplashScreen from './src/Screens/SplashScreen/Splash.Screen';
// import { persistor, store } from './src/store';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     secondary: 'yellow'
//   }
// };

// Sentry.init({
//   dsn: 'https://c2a97730d96c05c0a4a86ac98197deab@o4506316960038912.ingest.us.sentry.io/4507920948527104',
//   tracesSampleRate: 1.0,
//   _experiments: {
//     profilesSampleRate: 1.0
//   }
// });

// const App: FC = () => {
//   const [isLoading, setIsLoading] = useState(true);


//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <StoreProvider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <PaperProvider theme={theme}>
//           {isLoading ? <SplashScreen /> : <Navigator />}
//         </PaperProvider>
//       </PersistGate>
//     </StoreProvider>
//   );
// };

// export default Sentry.wrap(App);


import React, { useEffect } from 'react';
import { MD3DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider as StoreProvider } from 'react-redux';
import { Platform } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apolloClient';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';

const App = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '709351998176-dtbag3km4rt06h6upn2hv18n24noj81b.apps.googleusercontent.com', // Web Client ID from google-services.json
      offlineAccess: true, // Required for server-side authentication if needed
      scopes: ['profile', 'email'], // Add more if you need more permissions
      //iosClientId: Platform.OS === 'ios' ? 'com.googleusercontent.apps.709351998176-8me570r8cv85prubflsa56vnophqbqsv' : undefined, // iOS specific client ID
    });
  }, []);

  const isDarkMode = false; // Replace with state management for theme toggle



  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={isDarkMode ? MD3DarkTheme : DefaultTheme}>
            <NavigationContainer theme={isDarkMode ? MD3DarkTheme : DefaultTheme}>
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
