
class CredentialManager {
  credentials = {
    email: 'test@testesen.no',
    password: '123@@Abcd',
  };

  access_token?: string;

  get headers() {
    return {
      headers: {
        'Authorization': this.access_token
      }
    } as const;
  }
}

export default new CredentialManager();
