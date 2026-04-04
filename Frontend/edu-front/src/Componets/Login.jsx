import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import '../css/Login.css';

const Login = ({ isOpen, onClose }) => {
  // State for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);
  
  // State for signup modal
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const data = await res.json();
        setUserData(data);
        console.log("Google User Success:", data);
      } catch (err) {
        console.error("Failed to fetch Google profile:", err);
      }
    },
    onError: () => alert('Google Login Failed'),
  });

  if (!isOpen) return null;

  // Login Validation Logic
  const validate = () => {
    let tempErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) tempErrors.email = "Valid email is required";
    if (!password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login Attempt:", email);
      alert(`Logging in with: ${email}`);
    }
  };

  // Fixed Password Validation Logic
  const validatePassword = (password) => {
    const checks = {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    if (!checks.minLength) return "Password must be at least 8 characters";
    if (!checks.hasLowercase) return "Password must contain at least one lowercase letter";
    if (!checks.hasUppercase) return "Password must contain at least one uppercase letter";
    if (!checks.hasNumber) return "Password must contain at least one number";
    if (!checks.hasSpecial) return "Password must contain at least one special character (!@#$%^&* etc.)";
    
    return null; // No error
  };

  // Signup Validation Logic
  const validateSignup = () => {
    let tempErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    
    // Name validation
    if (!signupData.name.trim()) {
      tempErrors.name = "Name is required";
    } else if (signupData.name.length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (!signupData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(signupData.email)) {
      tempErrors.email = "Valid email is required";
    }
    
    // Password validation
    if (!signupData.password) {
      tempErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(signupData.password);
      if (passwordError) {
        tempErrors.password = passwordError;
      }
    }
    
    // Confirm password validation
    if (!signupData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
    } else if (signupData.password !== signupData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    
    setSignupErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Signup Data:", signupData);
        
        // Store user data in localStorage
        const newUser = {
          name: signupData.name,
          email: signupData.email,
          picture: null
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        
        alert(`Welcome ${signupData.name}! Please login with your credentials.`);
        
        // Close signup modal and reset form
        setShowSignup(false);
        resetSignupForm();
        
        // Auto-fill the email in login form
        setEmail(signupData.email);
        
      } catch (err) {
        console.error("Signup failed:", err);
        alert("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetSignupForm = () => {
    setSignupData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setSignupErrors({});
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (signupErrors[name]) {
      setSignupErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
    resetSignupForm();
  };

  // Success State View
  if (userData) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="auth-container modal-animate" onClick={e => e.stopPropagation()}>
          <div className="auth-panel text-center">
            <img src={userData.picture} alt="profile" className="profile-img-success" style={{width: '80px', borderRadius: '50%'}} />
            <h1>Hi {userData.name}!</h1>
            <p>Connected: {userData.email}</p>
            <button className="primary-btn-red" onClick={onClose}>Go to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  // Default Login View
  return (
    <>
      {/* Login Modal */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="auth-container modal-animate" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={onClose}>&times;</button>
          
          <div className="auth-panel">
            <div className="auth-header">
              <h1>Hi learner</h1>
              <p>Welcome to Edulite AI Assistant</p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="eduliteai@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              <button type="submit" className="primary-btn-red">Login</button>

              <div className="signup-link-container">
                <p className="signup-text">
                  Don't have an account? <button type="button" onClick={() => setShowSignup(true)} className="signup-link-btn">Sign up</button>
                </p>
              </div>
            </form>

            <div className="divider">or</div>

            <button type="button" className="google-btn-white" onClick={() => loginWithGoogle()}>
              <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" style={{marginRight: '10px'}} />
              Login with Google
            </button>

            <div className="social-footer-icons" style={{marginTop: '20px', textAlign: 'center'}}>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay" onClick={handleCloseSignup}>
          <div className="signup-container modal-animate" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseSignup}>&times;</button>
            
            <div className="signup-panel">
              <div className="auth-header">
                <h1>Create Account</h1>
                <p>Join Edulite AI Assistant today</p>
              </div>

              <form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    className={`input-field ${signupErrors.name ? 'input-error' : ''}`}
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={handleSignupChange}
                  />
                  {signupErrors.name && <span className="error-msg">{signupErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className={`input-field ${signupErrors.email ? 'input-error' : ''}`}
                    placeholder="john@example.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                  {signupErrors.email && <span className="error-msg">{signupErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    className={`input-field ${signupErrors.password ? 'input-error' : ''}`}
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                  {signupErrors.password && <span className="error-msg">{signupErrors.password}</span>}
                  <small className="password-hint">
                    Password must contain: 8+ chars, uppercase, lowercase, number & special character
                  </small>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    className={`input-field ${signupErrors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                  />
                  {signupErrors.confirmPassword && <span className="error-msg">{signupErrors.confirmPassword}</span>}
                </div>

                <button type="submit" className="primary-btn-red" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <div className="signup-footer">
                  <p>
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      className="signup-link-btn" 
                      onClick={() => {
                        handleCloseSignup();
                      }}
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </form>

              <div className="divider">or</div>

              <button 
                type="button" 
                className="google-btn-white" 
                onClick={() => {
                  handleCloseSignup();
                  loginWithGoogle();
                }}
              >
                <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" style={{marginRight: '10px'}} />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;