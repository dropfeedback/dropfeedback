//don't remove this import
import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
  Img,
} from '@react-email/components';

import { config } from '../../config';

const InviteEmail = ({
  projectName = '<projectName>',
}: {
  projectName: string;
}) => {
  const inviteUrl = config().WEB_URL + '/dashboard';
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://github.com/alicanerdurmaz/alicanerdurmaz/assets/23058882/d3d41d15-0810-4711-b898-924886f98981`}
                width="64"
                height="55"
                alt="DropFeedback logo"
                className="block my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{projectName}</strong> on{' '}
              <strong>DropFeedback</strong>
            </Heading>
            <Text className="text-black text-center text-[14px] leading-[24px]">
              Hello, you invited to the team <strong>{projectName}</strong> on{' '}
              <strong>DropFeedback</strong>. To join the team, click the button.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-2 px-4"
                target="_blank"
                rel="noopener noreferrer"
                href={inviteUrl}
              >
                Join the DropFeedback
              </Link>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link
                href={inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 no-underline"
              >
                {inviteUrl}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was sended from DropFeedback service. If you were
              not expecting this invitation, you can ignore this email. If you
              are concerned about your account&apos;s safety, please get in
              touch with us at info@dropfeedback.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteEmail;
