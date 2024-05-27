import {HttpInterceptorFn} from '@angular/common/http';
import {catchError} from "rxjs";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      const errorMessage = `Error interceptor: ${error.statusText}`;
      console.log(errorMessage)
      alert(errorMessage);
      throw error;
    })
  );
};
