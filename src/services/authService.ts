import type { AuthUser } from '../types/auth';

const AUTH_STORAGE_KEY = 'parlez_auth_user_v1';
export const SHARED_PASSWORD = 'parlez123';

export const VALID_USERS: Record<string, AuthUser> = {
  admin: {
    username: 'admin',
    displayName: 'Admin (Content Editor)',
    role: 'admin',
    avatar: '⚡'
  },
  sreegovind: {
    username: 'sreegovind',
    displayName: 'Sreegovind (Tester)',
    role: 'tester',
    avatar: '🧪'
  },
  gayathri: {
    username: 'gayathri',
    displayName: 'Gayathri (Tester)',
    role: 'tester',
    avatar: '🔬'
  }
};

class AuthService {
  private currentUser: AuthUser | null = null;
  private listeners: Set<(user: AuthUser | null) => void> = new Set();

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username && VALID_USERS[parsed.username.toLowerCase()]) {
          this.currentUser = VALID_USERS[parsed.username.toLowerCase()];
        }
      }
    } catch (e) {
      console.warn('Failed to parse auth user:', e);
    }
  }

  public getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  public isTester(): boolean {
    return this.currentUser?.role === 'tester';
  }

  public login(usernameInput: string, passwordInput: string): { success: boolean; error?: string; user?: AuthUser } {
    const cleanUsername = usernameInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    if (!cleanUsername) {
      return { success: false, error: 'Veuillez saisir votre nom d’utilisateur (Please enter username).' };
    }

    const matchedUser = VALID_USERS[cleanUsername];
    if (!matchedUser) {
      return {
        success: false,
        error: 'Utilisateur non reconnu. Comptes autorisés : admin, sreegovind ou gayathri.'
      };
    }

    if (cleanPassword !== SHARED_PASSWORD) {
      return {
        success: false,
        error: 'Mot de passe incorrect. Veuillez vérifier vos identifiants.'
      };
    }

    this.currentUser = matchedUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matchedUser));
    }
    this.notify();
    return { success: true, user: matchedUser };
  }

  public logout() {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    this.notify();
  }

  public subscribe(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.currentUser);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }
}

export const authService = new AuthService();
