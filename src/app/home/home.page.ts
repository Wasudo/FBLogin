import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private fb: Facebook) { }

  loginAction() {
      // Login with permissions
      this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then( (res: FacebookLoginResponse) => {

          // The connection was successful
          if (res.status === 'connected') {

              // Get user ID and Token
              let fb_id = res.authResponse.userID;
              let fb_token = res.authResponse.accessToken;

              // Get user infos from the API
              this.fb.api('/me?fields=name,gender,birthday,email', []).then((user) => {

                  // Get the connected user details
                  let gender    = user.gender;
                  let birthday  = user.birthday;
                  let name      = user.name;
                  let email     = user.email;

                  console.log('=== USER INFOS ===');
                  console.log('Gender : ' + gender);
                  console.log('Birthday : ' + birthday);
                  console.log('Name : ' + name);
                  console.log('Email : ' + email);
                  // => Open user session and redirect to the next page
              });
          }
          else {
              console.log('An error occurred...');
          }
      })
      .catch((e) => {
          console.log('Error logging into Facebook', e);
      });
  }
}


