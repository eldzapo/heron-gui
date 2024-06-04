import { Component, Input } from '@angular/core';
import { Link } from '../../util/types/link.interface';

@Component({
  selector: 'heron-guide',
  standalone: true,
  imports: [],
  template: `<div>
    <img src="" alt={{data?.icon}}>
    <p>{{data?.title}}</p>
  </div>`,
  styleUrl: './guide.component.scss'
})
export class GuideComponent {

  @Input() data : Link | undefined;

}
