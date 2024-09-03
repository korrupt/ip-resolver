import { HttpStatusCode } from 'axios';
import axios from '../support/axios';
import { CreateAuthLocalModel } from "@ip-resolver/shared/models";
import { CredentialManager } from './credentials';

const credentials = globalThis.__manager__ as CredentialManager;


describe.only('Auth controller', () => {

  describe('POST /auth/local/new', () => {

    it('should register a new user', async () => {
      const req: CreateAuthLocalModel = {
        ...credentials.admin.credentials,
        name: 'Test Testesen'
      };


      const res = await axios.post('/api/auth/local/new', req, {  });
      expect(res.status).toBe(HttpStatusCode.Created);
    });

    it('should login', async () => {
      const req = credentials.admin.credentials;
      const res = await axios.post('/api/auth/local', req);
      expect(res.status).toBe(HttpStatusCode.Created);

      expect(res.data.access_token).toBeDefined();

      credentials.admin.access_token = res.data.access_token;
    });

  });
});
