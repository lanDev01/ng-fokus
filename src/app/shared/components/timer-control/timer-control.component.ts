import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-control',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './timer-control.component.html',
  styleUrl: './timer-control.component.scss'
})
export class TimerControlComponent {

  timerFormat = '';

  isTimerStarted = false;

  timerInSeconds = 30;

  private intervalId: any;

  constructor() {
    this.configTimer();
  }

  onStartClick(): void {
    this.intervalId = setInterval(() => {
      this.countdown()
    }, 1000);

    this.isTimerStarted = true;
  }

  onPauseClick(): void {
    this.isTimerStarted = false;
    clearInterval(this.intervalId);
  }

  private countdown(): void {
    this.timerInSeconds -= 1;
    this.configTimer();
  }

  private configTimer(): void {
    this.timerFormat = new Date(this.timerInSeconds * 1000)
      .toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
  }
}
