import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {User} from "./user.model";
import {Router} from "@angular/router";

interface AuthResponseData {
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthHttpService {

  user = new BehaviorSubject<User | any>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  singUp(fullName: string, email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuA2DvUQrld38b7b2I7a204FLujMG1ZhQ', {
      displayName: fullName,
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuth(respData.displayName, respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuA2DvUQrld38b7b2I7a204FLujMG1ZhQ', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(respData => {
        this.handleAuth(respData.displayName, respData.email, respData.localId, respData.idToken, +respData.expiresIn)
      }));
  }

  private handleAuth(displayName: string, email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(displayName, email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/expertList']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    if (!localStorage.getItem('userData') || '') return;
    const userData: {
      displayName: string;
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '');
    if (!userData) return;
    const loadedUser = new User(userData.displayName, userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password or email is incorrect';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.'
        break;
      case 'INVALID_ID_TOKEN':
        errorMessage = 'The user\'s credential is no longer valid. You must sign in again.'
        break;
      case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
        errorMessage = 'The user\'s credential is an old. You must login again.'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later'
        break;
    }
    return throwError(errorMessage);
  }

  changePassword(password: string) {
    const userData: {
      displayName: string;
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '');
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCuA2DvUQrld38b7b2I7a204FLujMG1ZhQ', {
      password: password,
      idToken: userData._token,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuth(respData.displayName, respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));

  }

  changeEmail(email: string) {
    const userData: {
      displayName: string;
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '');
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCuA2DvUQrld38b7b2I7a204FLujMG1ZhQ',
      {
        idToken: userData._token,
        email: email,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuth(respData.displayName, respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

}
