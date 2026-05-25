declare module 'jsonwebtoken' {
  const jwt: {
    sign(payload: any, secret: string, options?: any): string;
    verify(token: string, secret: string): any;
  };

  export default jwt;
}
