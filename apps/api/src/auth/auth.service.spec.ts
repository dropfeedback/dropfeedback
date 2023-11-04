import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { decode } from 'jsonwebtoken';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { clearPostgres } from '../test/helpers/clear-db';
import { faker } from '@faker-js/faker';

const user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Auth Flow', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    authService = moduleRef.get(AuthService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('signup', () => {
    beforeAll(async () => {
      await clearPostgres();
    });

    it('should signup', async () => {
      const tokens = await authService.signupLocal({
        email: user.email,
        password: user.password,
      });

      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
    });

    it('should throw on duplicate user signup', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signupLocal({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        expect(error.status).toBe(409);
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('signin', () => {
    beforeAll(async () => {
      await clearPostgres();
    });

    it('should throw if no existing user', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signinLocal({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('should login', async () => {
      await authService.signupLocal({
        email: user.email,
        password: user.password,
      });

      const tokens = await authService.signinLocal({
        email: user.email,
        password: user.password,
      });

      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
    });

    it('should throw if password is incorrect', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signinLocal({
          email: user.email,
          password: user.password + 'a',
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('logout', () => {
    beforeAll(async () => {
      await clearPostgres();
    });

    it('should pass if call to non existent user', async () => {
      const result = await authService.logout('1');
      expect(result).toBeDefined();
    });

    it('should logout', async () => {
      await authService.signupLocal({
        email: user.email,
        password: user.password,
      });

      let userFromDb: User | null;

      userFromDb = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });
      expect(userFromDb?.hashedRefreshToken).toBeTruthy();

      // logout
      await authService.logout(userFromDb!.id);

      userFromDb = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });

      expect(userFromDb?.hashedRefreshToken).toBeFalsy();
    });
  });

  describe('refresh', () => {
    beforeAll(async () => {
      await clearPostgres();
    });

    it('should throw if no existing user', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens({ id: '1', refreshToken: '' });
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('should throw if user is logged out', async () => {
      // signup and save refresh token
      const _tokens = await authService.signupLocal({
        email: user.email,
        password: user.password,
      });

      const rt = _tokens.refreshToken;

      // get user id from refresh token
      // also possible to get using prisma like above
      // but since we have the rt already, why not just decoding it
      const decoded = decode(rt);
      const userId = decoded?.sub as string;

      // logout the user so the hashedRefreshToken is set to null
      await authService.logout(userId);

      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens({
          id: userId,
          refreshToken: rt,
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('should throw if refresh token is incorrect', async () => {
      await clearPostgres();

      const _tokens = await authService.signupLocal({
        email: user.email,
        password: user.password,
      });

      const rt = _tokens.refreshToken;

      const decoded = decode(rt);
      const userId = decoded?.sub as string;

      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens({
          id: userId,
          refreshToken: 'abcde',
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokens).toBeUndefined();
    });

    it('should refresh tokens', async () => {
      await clearPostgres();

      // log in the user again and save rt + at
      const _tokens = await authService.signupLocal({
        email: user.email,
        password: user.password,
      });

      const rt = _tokens.refreshToken;
      const at = _tokens.accessToken;

      const decoded = decode(rt);
      const userId = decoded?.sub as string;

      // since jwt uses seconds signature we need to wait for 1 second to have new jwts
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      const tokens = await authService.refreshTokens({
        id: userId,
        refreshToken: rt,
      });
      expect(tokens).toBeDefined();

      // refreshed tokens should be different
      expect(tokens.accessToken).not.toBe(at);
      expect(tokens.refreshToken).not.toBe(rt);
    });
  });
});
