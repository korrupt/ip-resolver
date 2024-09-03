class UserCredential {
  constructor(
    public credentials: { email: string; password: string },
  ) {}

  access_token?: string;

  get header() {
    return {
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      }
    }
  }

}

export class CredentialManager {

  admin = new UserCredential({
    'email': 'admin@testesen.no',
    'password': '123abc@iiAAA'
  });

  user = new UserCredential({
    'email': 'test@testesen.no',
    'password': '123$TrongP@ssword'
  });
}


