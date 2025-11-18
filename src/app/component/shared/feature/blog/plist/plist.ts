import { Component } from '@angular/core';
import { BlogService } from '../../../../../service/blog';
import { IPage } from '../../../../../model/plist';
import { Blog } from '../../../../../model/blog';
import { BotoneraService } from '../../../../../service/botonera';
import { neighborhood } from '../../../../../environment/environment';

@Component({
  selector: 'app-plist',
  imports: [],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PlistBlog {

  oPage: IPage<Blog> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  constructor(private blogService: BlogService, private oBotoneraService: BotoneraService) { }

  oBotonera: string[] = [];

  ngOnInit() {

    this.getPage();
  }

  getPage() {
    this.blogService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<Blog>) => {
        this.oPage = data;
        // queremos que se calcule la botonera
        this.oBotonera = this.oBotoneraService.getBotonera(this.oPage.number, this.oPage.totalPages, neighborhood);
        console.log("Botonera...", this.oBotonera);
      },
      error: (error) => {
        console.error(error);
      }
    });
    // pintar botonera
  }


  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false;
  }


}
