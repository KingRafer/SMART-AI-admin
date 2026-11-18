/* Auth admin — demo login, session, logout */
const DEMO_ADMIN = {
  email: 'admin@smartai.id',
  password: 'admin123',
  name: 'Admin SmartAI',
  role: 'superadmin',
  initials: 'AS'
};

const SESSION_KEY = 'smartai_admin';

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return !!getSession();
}

function login(email, password) {
  if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    setSession({
      email: DEMO_ADMIN.email,
      name: DEMO_ADMIN.name,
      role: DEMO_ADMIN.role,
      initials: DEMO_ADMIN.initials,
      loggedAt: Date.now()
    });
    return { ok: true };
  }
  return { ok: false, message: 'Email atau password salah.' };
}

function logout() {
  clearSession();
  location.replace('index.html');
}

function requireAuth() {
  if (!isLoggedIn()) {
    location.replace('index.html');
    return null;
  }
  return getSession();
}

// Expose
window.SmartAIAuth = { getSession, setSession, clearSession, isLoggedIn, login, logout, requireAuth, DEMO_ADMIN };
