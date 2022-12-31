export class InvalidCredentials extends Error {
  constructor(message?: string) {
    super(message || "Email ou senha incorretos");
    this.name = "InvalidCredentials";
  }
}
