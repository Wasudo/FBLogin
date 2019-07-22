import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginData: {};
  loginSuccess: boolean;

  constructor(private fb: Facebook) { }

  sendMessage() {
      this.fb.showDialog({
                method: 'send',
                caption: 'Check this out.',
                link: 'http://example.com',
                description: 'The site I told you about',
                picture: 'http://example.com/image.png'
            }
        );
  }

  loginAction() {
      // Login with permissions
      this.fb.login(['public_profile', 'email'])
      .then( (res: FacebookLoginResponse) => {

          // The connection was successful
          if (res.status === 'connected') {

              // Get user ID and Token
              // let fb_id = res.authResponse.userID;
              // let fb_token = res.authResponse.accessToken;

              // Get user infos from the API
              this.fb.api('/me?fields=name,id', []).then((user) => {

                  // Get the connected user details
                  let name = user.name;

                  console.log('Name : ' + name);
                  this.loginData = {
                      name: user.name,
                      id: user.id
                  };

                  this.loginSuccess = true;
              });
          } else {
              console.log('An error occurred...');
          }
      })
      .catch((e) => {
          console.log('Error logging into Facebook', e);
      });
  }
}


