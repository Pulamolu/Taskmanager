import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isRegistering: boolean = false;
  showForgotPassword: boolean = false;
  resetEmail: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    // Simple validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    // Use the auth service to login
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = response.message || 'Invalid username or password';
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred during login';
      }
    });
  }

  register(): void {
    // Simple validation
    if (!this.username || !this.password || !this.email) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Use the auth service to register
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = response.message || 'Registration failed';
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid registration data. Please check your input.';
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    });
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
    this.email = ''; // Clear email when toggling modes
  }

  resetPassword(): void {
    if (!this.resetEmail) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.resetEmail)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.authService.forgotPassword(this.resetEmail).subscribe({
      next: (response) => {
        if (response.success) {
          this.errorMessage = 'Password reset link has been sent to your email';
          this.showForgotPassword = false;
          this.resetEmail = '';
        } else {
          this.errorMessage = response.message || 'Failed to send reset link';
        }
      },
      error: (error) => {
        console.error('Reset password error:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred while sending the reset link';
        }
      }
    });
  }
} 