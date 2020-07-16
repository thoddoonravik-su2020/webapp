import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

import { environment } from '../environments/environment';

export interface UserDetails {
  id: number
  firstname: string
  lastname: string
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
  firstname: string
  lastname: string
  email: string
  password: string
}

//is it right?

export interface BookDetails{
   id:any,
  userid:any,
	isbn:string,
	title:string,
	authors:string,
	quantity:any,
	PRICE:any
  
}

export interface CartItems{
  id:number,
  userid: number,
  quantity: number,
  PRICE:number,
  title: string,
  bookid : number,
  message : string
}

export interface Images{
  id: number,
  bookid: number,
  imagedata: string 
}

@Injectable()
export class AuthenticationService {
 
  private token: string
  bookDetails: {
    id:number,
    userid:any,
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


  public getBookDetails(id :any) {

    return this.http.get(environment.apiUrl + '/books/seller/' +id)
  }

  public buyerBooks(id :any) {

    return this.http.get(environment.apiUrl + '/books/buyer/' +id)
  }

  public viewBookImages(id : any){
    return this.http.get(environment.apiUrl+'/seller/images/'+id)
  }

  public deleteBookImage(id : any){
    return this.http.delete(environment.apiUrl+'/books/seller/image/'+id,{
      headers: { Authorization: ` ${this.getToken()}` }
    })
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
    return this.http.post(environment.apiUrl + `/users/register`, user)
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(environment.apiUrl + `/users/login`, user)

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
    return this.http.get(environment.apiUrl + `/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  
//Update user  
  public updateUser(user: TokenPayload): Observable<any> {
    console.log('into update user method')
    return this.http.put(environment.apiUrl + `/users/profile/`+user.id, user, {
      headers: { Authorization: `${this.getToken()}` }
    })
  }

  //ADD BOOKS
  public seller(book : BookDetails,image : any[]): Observable<any> {
    console.log(JSON.stringify(book));
    let body = {
      isbn: book.isbn,
      title: book.title,
      authors: book.authors,
      publication_date: '',
      quantity: book.quantity,
      PRICE: book.PRICE,
      userid: book.userid,
      id: book.id,
      images: image
    }
    return this.http.post(environment.apiUrl + '/books/seller/',body, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }


  public putBookDetails(book : BookDetails,image : any[]): Observable<any> {
    let body = {
      isbn: book.isbn,
      title: book.title,
      authors: book.authors,
      publication_date: '',
      quantity: book.quantity,
      PRICE: book.PRICE,
      userid: book.userid,
      id: book.id,
      images: image
    }
    return this.http.put(environment.apiUrl + `/books/seller/`+book.id,body, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public post(user: TokenPayload): Observable<any> {
    return this.http.put(environment.apiUrl + `/users/register`, user)
  }

  getBook(id : any): Observable<any>{
    return this.http.get(environment.apiUrl+ `/books/`+id,{
      headers: { Authorization: ` ${this.getToken()}` } 
    })
  }

  deleteBook(book : BookDetails): Observable<any>{
    return this.http.delete(environment.apiUrl + `/books/seller/`+book, {
            headers: { Authorization: ` ${this.getToken()}` }   

    })
  }

  getImages(id : any): Observable<any>{
    return this.http.get(environment.apiUrl+`/books/seller/images/`+id,{
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }




  // getCartDetails() {
  //   console.log('get cart details - auth')
  //   return this.http.get(environment.apiUrl + '/buyer/cart')
  // }


  public cart(userid: any): Observable<any> {
    console.log(userid)
    return this.http.get(environment.apiUrl + `/buyer/cart/` + userid, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  
  //Add to cart
  public addToCart(book : any): Observable<any> {
    console.log("add to cart")
    return this.http.post(environment.apiUrl + `/buyer/cart/`+book.userid,book, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //Find using User ID and Book ID
  public findInCart(userid : any,bookid : any): Observable<any> {
  
    return this.http.get(environment.apiUrl+`/buyer/cart/check/`+userid+`/`+bookid,{
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  // Update Cart
  public updateCart(cart : CartItems): Observable<any>{
    return this.http.put(environment.apiUrl+`/buyer/cart/`+cart.id,cart,{
      headers: { Authorization: ` ${this.getToken()}` 
    }
    })
  }

  //Delete Cart
  public deleteCart(id : any): Observable<any>{
    return this.http.delete(environment.apiUrl+`/buyer/cart/`+id,{
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }



  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}