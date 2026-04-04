import React, { useState } from 'react';
import '../css/Login.css';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  // Handlers
  const handleSocialLogin = (provider) => {
    alert(`Continue with ${provider} — (integration ready)`);
  };

  const handlePhoneAuth = () => {
    const phoneNumber = prompt("Enter your phone number to continue:");
    if (phoneNumber && phoneNumber.trim() !== "") {
      alert(`We'll send a code to ${phoneNumber.trim()}`);
    } else if (phoneNumber !== null) {
      alert("Phone number required");
    }
  };

  const handleForgotPassword = () => {
    alert("📧 Reset link sent to your email (demo)");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      alert('Please enter email or username');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    alert(`🔐 Logged in as ${loginIdentifier} (demo)`);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!signupEmail.trim()) {
      alert('Please enter your email address');
      return;
    }
    if (!signupPassword || signupPassword.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert(`🎉 Welcome ${signupName.split(' ')[0]}! Account created. (demo)`);
    // Switch to login mode after successful signup
    setMode('login');
    // Reset signup form
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
  };

  // Social buttons component (reused)
  const SocialButtons = () => (
    <div className="social-grid">
      <button className="social-btn" onClick={() => handleSocialLogin('Google')}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
      
      <button className="social-btn" onClick={() => handleSocialLogin('Apple')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C5.85 18.4 4.5 15.3 5.01 11.3c.3-2.34 1.55-3.86 3.2-4.45 1.55-.55 3.03-.27 4.02.46.7.52 1.3.66 2.16.39.85-.27 1.52-.82 2.33-1.16.44.66.7 1.4.77 2.17.09 1.01-.23 1.98-.72 2.84-.52.92-1.22 1.7-1.77 2.59.3.86.75 1.67.8 2.6.07.97-.25 1.9-.76 2.67zM14.5 5.3c.45-.56.75-1.3.67-2.06-.53.04-1.14.35-1.55.78-.39.4-.68.97-.75 1.57.53.03 1.08-.29 1.63-.29z"/>
        </svg>
        Continue with Apple
      </button>
      
      <button className="social-btn phone-option" onClick={handlePhoneAuth}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
        Continue with phone
      </button>
    </div>
  );

  // Login Form
  const LoginForm = () => (
    <>
      <div className="auth-header">
        <h1>LOGIN</h1>
        <p>Access your smart workspace</p>
      </div>
      
      <div className="smart-note">
        <span>✨</span>
        <span>You'll get smarter responses & can upload files, images, and more.</span>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label>Email or username</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="hello@example.com or username"
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
            autoComplete="username"
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="••••••••"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        
        <div className="forgot-row">
          <button type="button" className="forgot-link" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        </div>
        
        <button type="submit" className="primary-btn">Continue</button>
      </form>

      <div className="divider">OR</div>
      
      <SocialButtons />

      <div className="toggle-section">
        <span className="toggle-text">Don't have an account?</span>
        <button className="toggle-link" onClick={() => setMode('signup')}>
          Sign up
        </button>
      </div>
    </>
  );

  // Signup Form
  const SignupForm = () => (
    <>
      <div className="auth-header">
        <h1>Sign up</h1>
        <p>Create an account for smarter AI</p>
      </div>
      
      <div className="smart-note">
        <span>🧠</span>
        <span>You'll get smarter responses and can upload files, images, and more.</span>
      </div>
      
      <div className="divider">OR</div>
      
      <SocialButtons />

      <form onSubmit={handleSignupSubmit}>
        <div className="form-group">
          <label>Full name</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Alex Johnson"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            autoComplete="name"
          />
        </div>
        
        <div className="form-group">
          <label>Email address</label>
          <input 
            type="email" 
            className="input-field" 
            placeholder="hello@example.com"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Create a password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        
        <div className="form-group">
          <label>Confirm password</label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Confirm your password"
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        
        <button type="submit" className="primary-btn">Create account</button>
      </form>

      <div className="toggle-section">
        <span className="toggle-text">Already have an account?</span>
        <button className="toggle-link" onClick={() => setMode('login')}>
          Log in
        </button>
      </div>
    </>
  );

  return (
    <div className="auth-container">
      <div className="auth-panel">
        {mode === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Login; 