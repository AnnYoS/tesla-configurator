import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError} from "rxjs";

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  return next(req).pipe(
    catchError((error) => {
      const errorMessage = `Error interceptor: ${error.statusText}`;
      console.log(errorMessage)
      alert(errorMessage);
      throw error;
    })
  );
};
