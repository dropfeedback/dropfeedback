import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import InviteEmail from 'src/mail/mails/invite-email';
import VerificationEmail from './mails/verification-email';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.config.get<string>('GOOGLE_EMAIL_OAUTH_CLIENT_ID'),
      this.config.get<string>('GOOGLE_EMAIL_OAUTH_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
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
        user: this.config.get<string>('GOOGLE_EMAIL'),
        clientId: this.config.get<string>('GOOGLE_EMAIL_OAUTH_CLIENT_ID'),
        clientSecret: this.config.get<string>(
          'GOOGLE_EMAIL_OAUTH_CLIENT_SECRET',
        ),
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
    subject: 'Verification email' | 'Invite email';
    email: string;
    html: string;
  }) {
    try {
      await this.setTransport();

      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to: email,
        from: this.config.get<string>('GOOGLE_EMAIL'),
        subject,
        html,
      });
    } catch (error) {
      //TODO: add logger
      console.log(error);
    }
  }

  async sendVerificationMail({ email }: { email: string }) {
    const token = await this.jwtService.signAsync(
      { email },
      {
        expiresIn: this.config.get<number>('EMAIL_TOKEN_EXPIRES_IN'),
        secret: `${this.config.get<number>('EMAIL_TOKEN_SECRET')}`,
        jwtid: email,
        issuer: 'dropfeedback.com',
      },
    );
    const html = render(VerificationEmail({ token }));
    this.sendMail({ subject: 'Verification email', email, html });
  }

  async sendInviteEmail({
    email,
    projectName,
  }: {
    email: string;
    projectName: string;
  }) {
    const html = render(InviteEmail({ projectName }));
    this.sendMail({ subject: 'Invite email', email, html });
  }
}
