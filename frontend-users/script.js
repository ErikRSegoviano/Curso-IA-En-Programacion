// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const tabs = document.querySelectorAll('.tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authView = document.getElementById('authView');
const dashboardView = document.getElementById('dashboardView');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const progressContainer = document.getElementById('progressContainer');
const progressText = document.getElementById('progressText');

let countdownInterval = null;

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Clear any existing countdown
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        
        const tabName = tab.getAttribute('data-tab');
        
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show/hide forms
        if (tabName === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
        
        // Clear messages
        clearMessages();
        hideProgress();
    });
});

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Clear previous errors
    clearErrors('login');
    hideMessage('loginError');
    hideMessage('loginSuccess');
    
    // Basic validation
    let isValid = true;
    if (!email) {
        showError('loginEmailError', 'El correo es requerido');
        isValid = false;
    }
    if (!password) {
        showError('loginPasswordError', 'La contraseña es requerida');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<div class="loading"></div>';
    loginBtn.disabled = true;
    
    try {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        
        const response = await fetch(`${API_BASE_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.access_token);
            
            // Get user info
            await loadUserInfo(email);
            
            // Switch to dashboard
            showDashboard();
            
            // Reset form
            loginForm.reset();
        } else {
            const error = await response.json();
            showMessage('loginError', error.detail || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('loginError', 'Error al conectar con el servidor');
    } finally {
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }
});

// Register Form Submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('registerFullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Clear previous errors
    clearErrors('register');
    hideMessage('registerError');
    hideMessage('registerSuccess');
    
    // Basic validation
    let isValid = true;
    if (!fullName) {
        showError('registerFullNameError', 'El nombre es requerido');
        isValid = false;
    }
    if (!email) {
        showError('registerEmailError', 'El correo es requerido');
        isValid = false;
    }
    if (!password || password.length < 6) {
        showError('registerPasswordError', 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading
    const originalText = registerBtn.innerHTML;
    registerBtn.innerHTML = '<div class="loading"></div>';
    registerBtn.disabled = true;
    
    try {
        const userData = {
            full_name: fullName,
            email: email,
            password: password
        };
        
        const response = await fetch(`${API_BASE_URL}/api/v1/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            // Clear form inputs
            registerForm.reset();
            
            // Show success message
            showMessage('registerSuccess', '¡Usuario creado exitosamente!');
            
            // Show progress bar and start countdown
            showProgress();
            
            // Start 15-second countdown
            startCountdown(15);
        } else {
            const error = await response.json();
            if (error.detail) {
                showMessage('registerError', error.detail);
            } else if (error.email) {
                showError('registerEmailError', error.email[0]);
            } else if (error.password) {
                showError('registerPasswordError', error.password[0]);
            } else {
                showMessage('registerError', 'Error en el registro');
            }
        }
    } catch (error) {
        console.error('Register error:', error);
        showMessage('registerError', 'Error al conectar con el servidor');
    } finally {
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    showAuthView();
    showMessage('loginSuccess', 'Sesión cerrada correctamente');
});

// Helper Functions
async function loadUserInfo(email) {
    try {
        // Store user info in localStorage
        const userInfo = {
            email: email,
            full_name: email.split('@')[0] // Use email prefix as fallback
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // Try to get full user data from API
        const token = localStorage.getItem('authToken');
        const usersResponse = await fetch(`${API_BASE_URL}/api/v1/users/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (usersResponse.ok) {
            const users = await usersResponse.json();
            const user = users.find(u => u.email === email);
            if (user) {
                localStorage.setItem('userInfo', JSON.stringify(user));
            }
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

function showDashboard() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
        userName.textContent = userInfo.full_name || userInfo.email;
        userEmail.textContent = userInfo.email;
    }
    
    authView.style.display = 'none';
    dashboardView.classList.add('show');
}

function showAuthView() {
    dashboardView.classList.remove('show');
    authView.style.display = 'block';
    
    // Reset to login tab
    tabs.forEach(t => t.classList.remove('active'));
    tabs[0].classList.add('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.classList.add('show');
}

function clearErrors(formType) {
    const errors = document.querySelectorAll(`.${formType}Error`);
    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

function showMessage(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.classList.add('show');
}

function hideMessage(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('show');
}

function clearMessages() {
    hideMessage('loginError');
    hideMessage('loginSuccess');
    hideMessage('registerError');
    hideMessage('registerSuccess');
    clearErrors('login');
    clearErrors('register');
}

function showProgress() {
    progressContainer.style.display = 'block';
}

function hideProgress() {
    progressContainer.style.display = 'none';
}

function startCountdown(seconds) {
    let remaining = seconds;
    
    // Update progress text
    progressText.textContent = `Redirigiendo en ${remaining} segundos...`;
    
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Start countdown
    countdownInterval = setInterval(() => {
        remaining--;
        
        if (remaining > 0) {
            progressText.textContent = `Redirigiendo en ${remaining} segundos...`;
        } else {
            // Clear interval
            clearInterval(countdownInterval);
            countdownInterval = null;
            
            // Hide progress and switch to login tab
            hideProgress();
            hideMessage('registerSuccess');
            
            // Switch to login tab
            tabs.forEach(t => t.classList.remove('active'));
            tabs[0].classList.add('active');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
    }, 1000);
}

// Initialize - Check if user is already logged in
function init() {
    const token = localStorage.getItem('authToken');
    if (token) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            userName.textContent = user.full_name || user.email;
            userEmail.textContent = user.email;
            showDashboard();
        } else {
            showAuthView();
        }
    } else {
        showAuthView();
    }
}

// Start the app
init();