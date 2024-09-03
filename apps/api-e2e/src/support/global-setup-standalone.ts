import { CredentialManager } from "../api/credentials"


module.exports = () => {
  globalThis.__manager__ = new CredentialManager();
}
