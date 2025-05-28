import React, { useState } from 'react';
import { Mail, Lock, LogIn, User, UserPlus } from 'lucide-react'; // Importing additional icons

function App() {
  // State for Login Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // State for Signup Form
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupResponse, setSignupResponse] = useState('');
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  // State to control which form is displayed ('login' or 'signup')
  const [mode, setMode] = useState('login');

  /**
   * Handles the login form submission.
   * Simulates an API call for user authentication.
   * @param {Event} e - The form submission event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true); // Set loading to true when login starts
    setLoginResponse(''); // Clear previous response

    try {
      // Simulate API call delay or actual fetch
      // For demonstration, we'll simulate success/failure based on email/password
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'user@example.com' && password === 'password123') {
        setLoginResponse('Login successful! Welcome back.');
      } else {
        setLoginResponse('Login failed. Invalid credentials.');
      }

      // In a real application, you would fetch data from your backend:
      
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoginResponse(data.message);
      
    } catch (error) {
      setLoginResponse('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoginLoading(false); // Set loading to false when login finishes
    }
  };

  /**
   * Handles the signup form submission.
   * Simulates an API call for user registration.
   * @param {Event} e - The form submission event.
   */
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSignupLoading(true); // Set loading to true when signup starts
    setSignupResponse(''); // Clear previous response

    if (signupPassword !== confirmPassword) {
      setSignupResponse('Passwords do not match.');
      setIsSignupLoading(false);
      return;
    }

    try {
      // Simulate API call delay or actual fetch
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demonstration, we'll simulate success
      setSignupResponse(`Account created for ${fullName}! Please log in.`);

      // In a real application, you would fetch data from your backend:
      
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email: signupEmail, password: signupPassword }),
      });

      const data = await res.json();
      setSignupResponse(data.message);
      

      // Optionally switch to login mode after successful signup
      // setMode('login');
    } catch (error) {
      setSignupResponse('Registration failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsSignupLoading(false); // Set loading to false when signup finishes
    }
  };

  return (
    // Main container for centering and background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 font-inter">
      {/* Dynamic card container based on mode */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        {mode === 'login' ? (
          <>
            {/* Login Form */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Welcome Back!
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Sign in to your account
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email input group */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password input group */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Login button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoginLoading} // Disable button when loading
                >
                  {isLoginLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <LogIn className="h-5 w-5 mr-2" />
                  )}
                  {isLoginLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            {/* Response message for login */}
            {loginResponse && (
              <p className={`mt-6 text-center text-sm ${loginResponse.includes('failed') || loginResponse.includes('Invalid') ? 'text-red-600' : 'text-green-600'} font-medium`}>
                {loginResponse}
              </p>
            )}

            {/* Optional: Footer with links for login */}
            <div className="mt-8 text-center text-sm">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); console.log('Forgot password clicked'); }}
                role="button"
                aria-label="Forgot your password link"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Forgot your password?
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setMode('signup'); }} // Switch to signup mode
                role="button"
                aria-label="Sign up for an account link"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Don't have an account? Sign up
              </a>
            </div>
          </>
        ) : (
          <>
            {/* Signup Form */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Create Account
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Join us today!
            </p>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Full Name input group */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email input group for signup */}
              <div>
                <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="signupEmail"
                    name="signupEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password input group for signup */}
              <div>
                <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="signupPassword"
                    name="signupPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password input group */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Signup button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSignupLoading} // Disable button when loading
                >
                  {isSignupLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <UserPlus className="h-5 w-5 mr-2" />
                  )}
                  {isSignupLoading ? 'Registering...' : 'Sign Up'}
                </button>
              </div>
            </form>

            {/* Response message for signup */}
            {signupResponse && (
              <p className={`mt-6 text-center text-sm ${signupResponse.includes('failed') || signupResponse.includes('match') ? 'text-red-600' : 'text-green-600'} font-medium`}>
                {signupResponse}
              </p>
            )}

            {/* Optional: Footer with link to login */}
            <div className="mt-8 text-center text-sm">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setMode('login'); }} // Switch back to login mode
                role="button"
                aria-label="Already have an account? Log in link"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Already have an account? Log in
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
