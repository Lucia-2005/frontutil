import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBlog } from '../../../model/blog';
import { TrimPipe } from "../../../pipe/trim-pipe";

@Component({
  selector: 'app-front-view-post',
  imports: [TrimPipe, RouterLink],
  templateUrl: './front-view.html',
  styleUrl: './front-view.css',
})
export class FrontViewPost implements OnInit {
  @Input() oBlog: IBlog | null = null;

  iconClass: string = 'bi bi-newspaper';

  ngOnInit(): void {
    const icons: string[] = [
      'bi bi-newspaper',
      'bi bi-eye',
      'bi bi-journal-text',
      'bi bi-card-text',
      'bi bi-file-earmark-text',
      'bi bi-book',
    ];
    this.iconClass = icons[Math.floor(Math.random() * icons.length)];
  }

}
