import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
import { AppService } from './app.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor{

    constructor(private service: AppService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if(err.status === 400 && err.error.type ==='GameOverException') {
                    this.service.setGameOver(true);
                }
                Swal.fire({
                    title: 'Sorry!',
                    html: `${err.error.message || 'Something went wrong'}. <br>Would you like to retry?`,
                    confirmButtonText: 'Yes',
                    showCancelButton: true,
                    cancelButtonText: 'No',
                    type: 'error'
                }).then(result => {
                    if(result.value) {
                        window.location.reload();
                    }
                })
                return throwError(err);
            })
        )
    }
}
