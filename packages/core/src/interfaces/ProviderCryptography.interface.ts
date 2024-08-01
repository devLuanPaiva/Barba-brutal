export default interface ProviderCryptography {
  cryptography(password: string): Promise<string>;
  compare(password: string, passwordCrypt: string): Promise<boolean>;
}
