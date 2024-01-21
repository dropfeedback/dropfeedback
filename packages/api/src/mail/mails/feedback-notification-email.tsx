//don't remove this import
import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Img,
  Link,
} from '@react-email/components';
import { Feedback, Project } from '@prisma/client';

import { config } from '../../config';

const FeedbackNotificationEmail = ({
  feedback,
}: {
  feedback: Feedback & {
    project: Project;
  };
}) => {
  const feedbackUrl = `${
    config().WEB_URL
  }/dashboard/${feedback?.projectId}/feedback/${feedback?.id}`;

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
              New Feedback on{' '}
              <span className="font-bold">
                {feedback?.project?.name || '<project-name>'}
              </span>
            </Heading>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-2 px-4"
                href={feedbackUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to <span className="font-bold">DropFeedback</span> dashboard
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FeedbackNotificationEmail;
