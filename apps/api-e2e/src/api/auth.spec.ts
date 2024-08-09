import { HttpStatusCode } from 'axios';
import axios from '../support/axios';
import { CreateAuthLocalModel } from "@ip-resolver/shared/models";

describe('Auth controller', () => {
  // it('should return a message', async () => {
  //   const res = await axios.get(`/api`);

  //   expect(res.status).toBe(200);
  //   expect(res.data).toEqual({ message: 'Hello API' });
  // });

  const credentials = {
    email: 'test@testesen.no',
    password: '123@@Abcd',
  };

  let access_token: string;


  describe('POST /auth/local/new', () => {

    it('should register a new user', async () => {
      const req: CreateAuthLocalModel = {
        ...credentials,
        name: 'Test Testesen'
      };


      const res = await axios.post('/api/auth/local/new', req, {  });
      expect(res.status).toBe(HttpStatusCode.Created);
    });

    it('should login', async () => {
      const req = credentials;
      const res = await axios.post('/api/auth/local', req);
      expect(res.status).toBe(HttpStatusCode.Created);

      expect(res.data.access_token).toBeDefined();

      access_token = res.data.access_token;
    })

  });
});
