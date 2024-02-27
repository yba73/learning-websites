export interface Email {
  email: string;
  subject: string;
  message: string;
}
export interface MailOption {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}
