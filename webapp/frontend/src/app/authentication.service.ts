import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'



export interface UserDetails {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

//is it right?

export interface BookDetails{
   id:number,
  userid:number,
	isbn:string,
	title:string,
	authors:string,
	quantity:number,
	PRICE:number
  
}

@Injectable()
export class AuthenticationService {
  private token: string
  bookDetails: {
    id:number,
    userid:number,
    isbn:string,
    title:string,
    authors:string,
    quantity:number,
    PRICE:number
    
  }
  

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }


  public getBookDetails() {
    return this.http.get('http://localhost:3000/books/seller')
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`/users/register`, user)
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  

  
  public updateUser(): Observable<any> {
    return this.http.put(`/profile`, {
      headers: { Authorization: `${this.getToken()}` }
    })
  }


  public seller(book : BookDetails): Observable<any> {
    return this.http.post('http://localhost:3000/books/seller/',book, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public putBookDetails(book : BookDetails): Observable<any> {
    return this.http.put(`http://localhost:3000/books/seller/`+book.id,book, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  // public postBook(user: BookDetails): Observable<any> {
  //   return this.http.post(`/books/seller`, user)
  // }

  public post(user: TokenPayload): Observable<any> {
    return this.http.put(`/users/register`, user)
  }

  deleteBook(book : BookDetails): Observable<any>{
    return this.http.delete(`http://localhost:3000/books/seller/`+book.id, {
      headers: { Authorization: ` ${this.getToken()}` }   

    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}