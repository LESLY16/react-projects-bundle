import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, registerSuccess, registerFailure, logout } from '../store/slices/userSlice';
import { users } from '../data/users';
import { generateId } from '../utils/helpers';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, error } = useSelector(state => state.user);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const token = generateId(); // Generate a mock token
        const { password: _, ...userWithoutPassword } = user;
        dispatch(loginSuccess({ user: userWithoutPassword, token }));
        return { success: true };
      } else {
        dispatch(loginFailure('Invalid email or password'));
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        dispatch(registerFailure('Email already registered'));
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        phone: userData.phone,
        avatar: `https://i.pravatar.cc/150?img=${users.length + 1}`,
        createdAt: new Date().toISOString().split('T')[0],
        addresses: []
      };

      const token = generateId();
      const { password: _, ...userWithoutPassword } = newUser;
      dispatch(registerSuccess({ user: userWithoutPassword, token }));
      return { success: true };
    } catch (error) {
      dispatch(registerFailure(error.message));
      return { success: false, error: error.message };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    currentUser,
    isAuthenticated,
    error,
    login,
    register,
    logout: logoutUser
  };
};
