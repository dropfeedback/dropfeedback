/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('../../auth/dto/auth.dto'),
          {
            AuthDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('../../projects/dto/project.dto'),
          {
            ProjectDto: {
              name: { required: true, type: () => String, minLength: 3 },
            },
          },
        ],
        [
          import('../../feedbacks/dto/feedback.dto'),
          {
            FeedbackDto: {
              content: { required: true, type: () => String, minLength: 10 },
              meta: { required: true, type: () => Object, nullable: true },
              projectId: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import('../../app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('../../auth/auth.controller'),
          {
            AuthController: {
              me: {},
              signupLocal: {},
              signinLocal: {},
              logout: { type: Boolean },
              refreshTokens: { type: Object },
            },
          },
        ],
        [
          import('../../projects/projects.controller'),
          {
            ProjectsController: {
              getAllByUser: { type: [Object] },
              createProject: { type: Object },
            },
          },
        ],
        [
          import('../../feedbacks/feedbacks.controller'),
          {
            FeedbacksController: {
              getAllByProjectId: { type: [Object] },
              createByProjectId: { type: Object },
            },
          },
        ],
      ],
    },
  };
};