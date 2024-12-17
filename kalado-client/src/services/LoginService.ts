// import axios from 'axios';

// export const loginUser = async (formData: { email: string; password: string }) => {
//     try {
//         const response = await axios.post('https://kaladoshop.com/v1/auth/login', formData);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const loginUser = async (formData: { email: string; password: string }) => {
    // Simulate a successful response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Login successful',
                user: {
                    email: formData.email,
                    // Add any other user data you want to simulate
                }
            });
        }, 1000); // Simulate a delay of 1 second
    });
};