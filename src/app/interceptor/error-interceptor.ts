import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                localStorage.removeItem('imepress_userdata');
                localStorage.removeItem('imepress_token');
                setTimeout(() => {
                    this.router.navigate(['']);
                }, 2000);
            }
            const error = { message: err.error.message || err.statusText, code: err.status };
            return throwError(error);
        }))
    }
}