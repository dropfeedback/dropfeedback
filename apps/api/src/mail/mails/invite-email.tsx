//don't remove this import
import React from 'react';

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { config } from '../../config';

export const InviteEmail = ({ projectName }: { projectName: string }) => {
  const inviteUrl = config().WEB_URL + '/invites';
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://react-email-demo-ijnnx5hul-resend.vercel.app/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{projectName}</strong> on <strong>Feedbacky</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello, you invited to the team on Vercel.{' '}
              <strong>{projectName}</strong> project on{' '}
              <strong>Feedbacky</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={inviteUrl}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteUrl} className="text-blue-600 no-underline">
                {inviteUrl}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was sended from feedbacky service. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your account's safety, please get in touch with
              us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
