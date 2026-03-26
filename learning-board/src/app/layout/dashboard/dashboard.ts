import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  leftPanelOpen = signal(true);
  rightPanelOpen = signal(true);
  messageInput = '';
  messages = signal<ChatMessage[]>([]);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleLeftPanel(): void {
    this.leftPanelOpen.update(v => !v);
  }

  toggleRightPanel(): void {
    this.rightPanelOpen.update(v => !v);
  }

  sendMessage(): void {
    const text = this.messageInput.trim();
    if (!text) return;

    this.messages.update(msgs => [
      ...msgs,
      { role: 'user', content: text, timestamp: new Date() },
    ]);
    this.messageInput = '';

    // Placeholder respuesta del agente
    setTimeout(() => {
      this.messages.update(msgs => [
        ...msgs,
        {
          role: 'assistant',
          content: '...',
          timestamp: new Date(),
        },
      ]);
    }, 600);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
