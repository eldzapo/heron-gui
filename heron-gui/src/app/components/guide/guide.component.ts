import { Component, Input } from '@angular/core';
import { Link } from '../../util/types/link.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'heron-guide',
  standalone: true,
  imports: [],
  template: `<div class="main" (click)="navigateToSessionsList(data!.path)">
    <span class="material-symbols-outlined">{{data?.icon}}</span>
    <p>{{data?.title}}</p>
  </div>`,
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {

  @Input() data: Link | undefined;
  constructor(private router: Router) {}

  navigateToSessionsList(path : string) {
    this.router.navigate([path]);
  }
}
