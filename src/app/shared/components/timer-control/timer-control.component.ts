import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ContextService, ContextType } from '../../services/context.service';

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

  private contextService = inject(ContextService);

  context = this.contextService.contextSignal$;

  constructor() {
    effect(() => {

      switch (this.context()) {
        case 'foco':
          this.timerInSeconds = 30;
          break;
        case 'descanso-curto':
          this.timerInSeconds = 5;
          break;
        case 'descanso-longo':
          this.timerInSeconds = 15;
          break;
      }

      this.configTimer();
    });
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

  onChangeContext(context: ContextType): void {
    this.contextService.updateContext(context);
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
