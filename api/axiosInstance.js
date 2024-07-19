// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { router } from "expo-router";

const axiosInstance = axios.create({
    baseURL: 'http://10.10.103.57:8082/api/v1',
});

// axiosInstance.interceptors.request.use(
//     async config => {
//         try {
            
//             const token = await AsyncStorage.getItem('token')
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`
//             }
//         } catch (error) {
//             console.error('Error fetching token from AsyncStorage', error)
//         }
//         return config
//     }
// )

// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             router.push('/signin')
//         }
//         return Promise.reject(error)
//     }
// )

export default axiosInstance