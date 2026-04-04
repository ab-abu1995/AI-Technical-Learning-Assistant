import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

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

  // 3. Shared Google Logic for both Login and Signup
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const data = await res.json();
        
        setUserData(data);
        
        // Save to storage
        localStorage.setItem('user', JSON.stringify(data));
        console.log("Google Auth Success:", data);
        
        // Redirect after short delay
        setTimeout(() => {
          onClose();
          navigate('/ai-interface'); 
        }, 1500);
        
      } catch (err) {
        console.error("Failed to fetch Google profile:", err);
      }
    },
    onError: () => console.error('Google Auth Failed'),
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

  // Manual Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const loggedInUser = { email: email, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      onClose();
      navigate('/ai-interface');
    }
  };

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
    return null;
  };

  const validateSignup = () => {
    let tempErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!signupData.name.trim()) tempErrors.name = "Name is required";
    if (!signupData.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(signupData.email)) tempErrors.email = "Valid email is required";
    
    if (!signupData.password) tempErrors.password = "Password is required";
    else {
      const passwordError = validatePassword(signupData.password);
      if (passwordError) tempErrors.password = passwordError;
    }
    if (signupData.password !== signupData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
    
    setSignupErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Manual Signup Submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newUser = { name: signupData.name, email: signupData.email, picture: null };
        localStorage.setItem('user', JSON.stringify(newUser));
        setShowSignup(false);
        resetSignupForm();
        onClose();
        navigate('/ai-interface'); 
      } catch (err) {
        console.error("Signup failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetSignupForm = () => {
    setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
    setSignupErrors({});
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    if (signupErrors[name]) setSignupErrors(prev => ({ ...prev, [name]: '' }));
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
            <p>Redirecting to AI Interface...</p>
            <button className="primary-btn-red" onClick={() => navigate('/ai-interface')}>Go to Dashboard Now</button>
          </div>
        </div>
      </div>
    );
  }

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
              </form>

              {/* ADDED: Google Sign Up Button */}
              <div className="divider">or</div>
              <button type="button" className="google-btn-white" onClick={() => loginWithGoogle()}>
                <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" style={{marginRight: '10px'}} />
                Sign up with Google
              </button>

              <div className="signup-footer">
                <p>
                  Already have an account?{' '}
                  <button type="button" className="signup-link-btn" onClick={handleCloseSignup}>
                    Login here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;