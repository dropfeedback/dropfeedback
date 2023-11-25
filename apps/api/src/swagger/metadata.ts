/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("../auth/dto/auth.dto"), { "AuthDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("../auth/dto/google-login.dto"), { "GoogleLoginDto": { idToken: { required: true, type: () => String } } }], [import("../projects/dto/update-project.dto"), { "UpdateProjectDto": { name: { required: true, type: () => String, minLength: 3 } } }], [import("../projects/dto/create-project.dto"), { "CreateProjectDto": { name: { required: true, type: () => String, minLength: 3 } } }], [import("../projects/dto/delete-member.dto"), { "DeleteMemberDto": { projectId: { required: true, type: () => String }, memberId: { required: true, type: () => String } } }], [import("../projects/dto/add-member.dto"), { "AddMemberDto": { email: { required: true, type: () => String }, role: { required: true, type: () => Object } } }], [import("../feedbacks/dto/feedback.dto"), { "FeedbackDto": { content: { required: true, type: () => String }, meta: { required: true, type: () => Object, nullable: true }, projectId: { required: true, type: () => String } } }], [import("../auth/dto/send-invite-emails.dto"), { "SendInviteEmailsBodyDto": { email: { required: true, type: () => String } } }]], "controllers": [[import("../app.controller"), { "AppController": { "getHello": { type: String } } }], [import("../auth/auth.controller"), { "AuthController": { "me": { type: Object }, "signupLocal": {}, "signinLocal": {}, "logout": { type: Boolean }, "refreshTokens": {}, "googleLogin": {} } }], [import("../projects/projects.controller"), { "ProjectsController": { "getAllByUser": {}, "createProject": {}, "getCurrentUserInvites": {}, "getProjectById": { type: Object }, "updateProject": {}, "deleteProject": {}, "addMember": {}, "getMembers": {}, "getInvites": {}, "acceptInvite": {}, "rejectInvite": {}, "removeMember": {}, "cancelInvite": {} } }], [import("../feedbacks/feedbacks.controller"), { "FeedbacksController": { "getAllByProjectId": {}, "createByProjectId": { type: Object } } }]] } };
};