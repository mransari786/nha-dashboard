import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HomePage } from '../home/home.page';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //API Path
  
  GetAccumulateURL:string = 'https://dashboard.abdm.gov.in/abdmservice/api/dashboard/healthdata/1.0';  
  HealthTrendWiseURL:string = 'https://dashboard.abdm.gov.in/abdmservice/api/dashboard/healthh/1.0';  
  HealthStateWiseURL:string = 'https://dashboard.abdm.gov.in/abdmservice/api/dashboard/healthstatewise/1.0'; 
  StateMasterURL:string = 'https://dashboard.abdm.gov.in/abdmservice/api/dashboard/statedist/1.0'; 
  GetUploadDateURL:any='https://dashboard.abdm.gov.in/abdmservice/api/dashboard/getupdatedate/1.0'; 
  GetStateCodeURL:any="https://dashboard.abdm.gov.in/abdmservice/api/dashboard/stcode/1.0";
  HospitalLinkedURL:string = 'https://dashboard.abdm.gov.in/abdmservice/api/dashboard/hospitallinked/1.0';
/*
  GetAccumulateURL:string = 'http://localhost:8080/api/dashboard/healthdata/1.0';  
  HealthTrendWiseURL:string = 'http://localhost:8080/api/dashboard/healthh/1.0';  
  HealthStateWiseURL:string = 'http://localhost:8080/api/dashboard/healthstatewise/1.0'; 
  StateMasterURL:string = 'http://localhost:8080/api/dashboard/statedist/1.0';
  GetUploadDateURL:any="http://localhost:8080/api/dashboard/getupdatedate/1.0"; 
  GetStateCodeURL:any="http://localhost:8080/api/dashboard/stcode/1.0";
  */
  //HealthTrendWiseURL:string = 'http://localhost:8080/api/dashboard/healthh/1.0';
  //HospitalLinkedURL:string = 'http://localhost:8080/api/dashboard/hospitallinked/1.0';
  
  
  
  //accumulateres:AccumulateRes;
  constructor(private http: HttpClient) {
    //this.accumulateres=new AccumulateRes();

   }


  // Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};


// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

// Create a new item
GetHealthIDeData(item): Observable<HomePage> {
  return this.http
    .post<HomePage>(this.GetAccumulateURL, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
GetHealthTrendData(item): Observable<HomePage> {
  return this.http
    .post<HomePage>(this.HealthTrendWiseURL, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
GetHealthStateWiseData(item): Observable<HomePage> {
  return this.http
    .post<HomePage>(this.HealthStateWiseURL, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

GetStateMaster(item): Observable<HomePage> {
  return this.http
    .post<HomePage>(this.StateMasterURL, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

GetUploadDate(): Observable<any> {
  return this.http.get(this.GetUploadDateURL).pipe(
       catchError(this.handleError)
  );
}
GetStateCode(item:any): Observable<any> {
  return this.http
    .post<any>(this.GetStateCodeURL, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
GetHospitalLinked(item:any): Observable<any> {
  return this.http
    .post<any>(this.HospitalLinkedURL, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}





