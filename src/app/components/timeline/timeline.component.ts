import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map,  } from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  time: number;
  state$: BehaviorSubject<number>;
  current: number;
  state: boolean;

  timer = interval();

  constructor() {
  }

  ngOnInit(): void { 
    this.live();
  }

  getCurrent(): number {
    let timeStart = new Date(2021,10,1,0,0,0,0).getTime();
    let timeEnd = new Date(2021,10,31,23,59,59,10).getTime();
    this.current =  100 * (this.time - timeStart) / (timeEnd - timeStart);
    return this.current;
  }

  live(): Observable<number> {
    this.timer.pipe(map(() => this.state$.next(Date.now())));
    this.getCurrent();
    return this.timer;
  }

  selected(): Observable<number> {
    this.state$.next(new Date(2021,10,3).getTime());
    this.getCurrent();
    return this.state$;
  }

}
