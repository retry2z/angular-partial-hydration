import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventEmitterService {
  private readonly events: { [key: string]: ReplaySubject<any> } = {};

  constructor() { }

  public emit(eventName: string, data: any): void {
    if (!eventName) return;

    if (!this.events[eventName]) {
      this.events[eventName] = new ReplaySubject();
    }

    this.events[eventName].next(data);
  }

  public selectEvent<T>(eventName: string): ReplaySubject<T> {
    if (!this.events[eventName]) {
      this.events[eventName] = new ReplaySubject();
    }

    return this.events[eventName];
  }
}
