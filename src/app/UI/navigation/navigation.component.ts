import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { user } from '../../user';
import { CookieService } from 'ngx-cookie-service';
import { UserDetailService } from 'src/app/service/user-detail.service';
import { User } from '@auth0/auth0-angular';
import { ShowPostService } from 'src/app/service/show-post.service';
import { ActivatedRoute } from '@angular/router';
import { profileUser } from 'src/app/userdetail.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user: User;

  constructor(
    private readonly loginService: AuthService,
    private cookies: CookieService,
    private userDetailService: UserDetailService,
    private showPostService: ShowPostService, 
    private route: ActivatedRoute, 
  ) { }

  loggedInEmail: string;

  ngOnInit(): void {
    // this.getUserDetail();
    
    this.loggedInEmail = this.cookies.get('username');

    this.loginService.userSubject.asObservable().subscribe(() => {
      this.loggedInEmail = this.cookies.get('username');
    })
  }

  onlogout() { 
    this.loginService.logoutUser();
    location.reload();
  }

  // getUserDetail(){
  //   this.userDetailService.getUserDetail().subscribe(result => {
  //     console.log('user detail is ', result);
  //     this.user = result;
  //   })
  // }

}
