import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  requestPermission(): Promise<NotificationPermission> {
    if (!this.notificationSupported) {
      return Promise.reject('Notifications not supported');
    }
    return window.Notification.requestPermission();
  }

  showNotification(title: string, options?: NotificationOptions): void {
    if (!this.notificationSupported) {
      console.warn('Notifications not supported');
      return;
    }

    if (window.Notification?.permission === 'granted') {
      new window.Notification(title, options);
    } else {
      console.warn('Notification permission not granted:', window.Notification?.permission);
    }
  }

  private get notificationSupported(): boolean {
    const isSupported = isPlatformBrowser(this.platformId) && 'Notification' in window;
    return isSupported;
  }

}
