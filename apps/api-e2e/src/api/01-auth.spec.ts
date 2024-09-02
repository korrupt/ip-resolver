import { HttpStatusCode } from 'axios';
import axios from '../support/axios';
import { CreateAuthLocalModel } from "@ip-resolver/shared/models";
import credentials from './credentials';

describe('Auth controller', () => {

  describe('POST /auth/local/new', () => {

    it('should register a new user', async () => {
      const req: CreateAuthLocalModel = {
        ...credentials.credentials,
        name: 'Test Testesen'
      };


      const res = await axios.post('/api/auth/local/new', req, {  });
      expect(res.status).toBe(HttpStatusCode.Created);
    });

    it('should login', async () => {
      const req = credentials.credentials;
      const res = await axios.post('/api/auth/local', req);
      expect(res.status).toBe(HttpStatusCode.Created);

      expect(res.data.access_token).toBeDefined();

      credentials.access_token = res.data.access_token;
    });

  });
});
