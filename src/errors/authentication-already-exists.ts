export class AuthenticationUserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message || "Usuário já existe");
    this.name = "AuthenticationUserAlreadyExistsError";
  }
}
