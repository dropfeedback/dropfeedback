/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./auth/dto/auth.dto'),
          {
            AuthDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/accept-invite-body.dto'),
          {
            AcceptInviteBodyDto: {
              acceptInviteToken: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/google-login.dto'),
          {
            GoogleLoginDto: { idToken: { required: true, type: () => String } },
          },
        ],
        [
          import('./projects/dto/project.dto'),
          {
            ProjectDto: {
              name: { required: true, type: () => String, minLength: 3 },
            },
          },
        ],
        [
          import('./projects/dto/delete-member.dto'),
          {
            DeleteMemberDto: {
              projectId: { required: true, type: () => String },
              memberId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./projects/dto/get-members.dto'),
          {
            GetMembersDto: {
              projectId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./projects/dto/add-member-body.dto'),
          {
            AddMemberBodyDto: {
              email: { required: true, type: () => String },
              role: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./projects/dto/add-member-param.dto'),
          {
            AddMemberParamDto: {
              projectId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./projects/dto/get-invites.dto'),
          {
            GetInvitesDto: {
              projectId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./projects/dto/delete-member-invite-param.dto'),
          {
            DeleteMemberInviteDto: {
              memberInviteId: { required: true, type: () => String },
              projectId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./feedbacks/dto/feedback.dto'),
          {
            FeedbackDto: {
              content: { required: true, type: () => String, minLength: 10 },
              meta: { required: true, type: () => Object, nullable: true },
              projectId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/send-invite-emails.dto'),
          {
            SendInviteEmailsBodyDto: {
              email: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./auth/auth.controller'),
          {
            AuthController: {
              me: {},
              signupLocal: {},
              signinLocal: {},
              logout: { type: Boolean },
              refreshTokens: {},
              acceptInvite: {},
              googleLogin: {},
            },
          },
        ],
        [
          import('./projects/projects.controller'),
          {
            ProjectsController: {
              getAllByUser: {},
              createProject: { type: Object },
              getMembers: {},
              getInvites: {},
              addMember: {},
              removeMember: {},
              cancelInvite: {},
            },
          },
        ],
        [
          import('./feedbacks/feedbacks.controller'),
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
