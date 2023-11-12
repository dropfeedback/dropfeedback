import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { VerificationEmail } from 'src/mail/mails/verification-email';

@Injectable()
export class MailService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.config.get<string>('CLIENT_ID'),
      this.config.get<string>('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }

        if (token) {
          resolve(token);
        } else {
          reject('Failed to create access token');
        }
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.config.get<string>('EMAIL'),
        clientId: this.config.get<string>('CLIENT_ID'),
        clientSecret: this.config.get<string>('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  private async sendMail({
    subject,
    email,
    html,
  }: {
    subject: 'Verification email';
    email: string;
    html: string;
  }) {
    await this.setTransport();
    return this.mailerService.sendMail({
      transporterName: 'gmail',
      to: email,
      from: this.config.get<string>('EMAIL'),
      subject,
      html,
    });
  }

  async sendVerificationEmail({
    email,
    token,
    projectName,
  }: {
    email: string;
    token: string;
    projectName: string;
  }) {
    const inviteUrl = `${this.config.get<string>(
      'CLIENT_URL',
    )}/verify-email?token=${token}`;

    const html = render(VerificationEmail({ inviteUrl, projectName }));
    await this.sendMail({ subject: 'Verification email', email, html });
  }
}
