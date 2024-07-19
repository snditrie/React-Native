import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import RootLayout from './app/_layout';
import { EmployeeProvider } from './context/EmployeeContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';


export default function App() {
  return (
    <Provider store={store}>
     <AuthProvider>
      <EmployeeProvider> 
        <SafeAreaView>
          <Stack/>
          
          {/* <RootLayout /> */}
        </SafeAreaView>
     </EmployeeProvider>
    </AuthProvider> 
    </Provider>

  );
}
