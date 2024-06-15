import { Component, Input } from '@angular/core';
import { Link } from '../../util/types/link.interface';
import { Router, UrlTree } from '@angular/router';


@Component({
  selector: 'heron-guide',
  standalone: true,
  template: `<div class="main" (click)="navigateToSessionsList(data!.path)" [class.active]="isActive(data!.path)">
    <span class="material-symbols-outlined">{{data?.icon}}</span>
    <p>{{data?.title}}</p>
  </div>`,
  styleUrls: ['./guide.component.scss'],
})
export class GuideComponent {

  @Input() data: Link | undefined;
  
  constructor(private router: Router) {}

  protected navigateToSessionsList(path: string) {
    this.router.navigate([path]);
  }

  protected isActive(path: string): boolean {
    const currentPath = this.router.url;
    return this.normalizePath(currentPath) === this.normalizePath(`/${path}`);
  }

  private normalizePath(path: string): string {
    return path.replace(/^\/+|\/+$/g, '');
  }
}