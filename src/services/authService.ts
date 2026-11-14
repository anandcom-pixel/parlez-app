import type { AuthUser } from '../types/auth';

const AUTH_STORAGE_KEY = 'parlez_auth_user_v1';
export const SHARED_PASSWORD = 'parlez123';

export const VALID_USERS: Record<string, AuthUser> = {
  admin: {
    username: 'admin',
    displayName: 'Admin',
    role: 'admin',
    avatar: '⚡',
    canEdit: true,
    canCreate: true
  },
  johnny: {
    username: 'johnny',
    displayName: 'Johnny hotbody (nick)',
    role: 'tester',
    avatar: '🧪',
    canEdit: true,
    canCreate: true
  },
  gayathri: {
    username: 'gayathri',
    displayName: 'Gayathri',
    role: 'tester',
    avatar: '🔬',
    canEdit: true,
    canCreate: true
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
        if (parsed && parsed.username) {
          let u = parsed.username.toLowerCase();
          if (u === 'sreegovind' || u === 'sree' || u === 'nick' || u === 'johnny hotbody') {
            u = 'johnny';
          }
          if (VALID_USERS[u]) {
            this.currentUser = VALID_USERS[u];
          }
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

  public canEditContent(): boolean {
    return this.currentUser !== null;
  }

  public canCreateContent(): boolean {
    return this.currentUser !== null;
  }

  public login(usernameInput: string, passwordInput: string): { success: boolean; error?: string; user?: AuthUser } {
    const cleanUsername = usernameInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    if (!cleanUsername) {
      return { success: false, error: 'Veuillez saisir votre nom d’utilisateur (Please enter username).' };
    }

    let lookupKey = cleanUsername;
    if (lookupKey === 'sreegovind' || lookupKey === 'sree' || lookupKey === 'nick' || lookupKey === 'johnny hotbody') {
      lookupKey = 'johnny';
    }

    const matchedUser = VALID_USERS[lookupKey];
    if (!matchedUser) {
      return {
        success: false,
        error: 'Utilisateur non reconnu. Comptes autorisés : admin, johnny hotbody (nick) ou gayathri.'
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
