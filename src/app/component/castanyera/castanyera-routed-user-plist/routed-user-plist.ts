import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPage } from '../../../model/plist';
import { ICastanyera } from '../../../model/castanyera';
import { CastanyeraService } from '../../../service/castanyera';
import { Paginacion } from '../../shared/paginacion/paginacion';
import { CastanyeraUnroutedUserView2 } from '../castanyera-unrouted-user-view2/unrouted-user-view2';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'castanyera-app-routed-user-plist',
  imports: [Paginacion, CastanyeraUnroutedUserView2],
  templateUrl: './routed-user-plist.html',
  styleUrl: './routed-user-plist.css',
})
export class CastanyeraRoutedUserPlist {
  oPage: IPage<ICastanyera> | null = null;
  numPage: number = 0;
  numRpp: number = 2;
 
  constructor(private oCastanyeraService: CastanyeraService) {}

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPublicPage();
  }

  getPublicPage() {
    const page$ = this.oCastanyeraService.getPublicPage(this.numPage, this.numRpp, 'fecha_creacion', 'desc');
    const count$ = this.oCastanyeraService.countPublic();

    forkJoin([page$, count$]).pipe(
      map(([pageData, countPublic]) => {
        pageData.content = pageData.content || [];
        // Defensive filter in case backend returned non-public items
        pageData.content = pageData.content.filter((item) => item.publico === true);
        if (typeof countPublic === 'number') {
          pageData.totalElements = countPublic;
          pageData.totalPages = Math.max(1, Math.ceil(countPublic / this.numRpp));
        }
        return pageData;
      })
    ).subscribe({
      next: (data: IPage<ICastanyera>) => {
        this.oPage = data;
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.getPublicPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPublicPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPublicPage();
    return false;
  }
}
