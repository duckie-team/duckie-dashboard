import { EndpointClient } from "endpoint-client";
import * as ExamAPI from "./endpoint";

export class ExamClient extends EndpointClient {
    readonly index = {
        heartbeat: this.endpointBuilder(ExamAPI.Index.GetHeartBeat),
    };

    readonly auth = {
        postKakao: this.endpointBuilder(ExamAPI.Auth.PostAuthKakao),
        getToken: this.endpointBuilder(ExamAPI.Auth.GetAuthToken),
    };

    readonly devices = {
        post: this.endpointBuilder(ExamAPI.Devices.PostDevice),
    };

    readonly categories = {
        list: this.endpointBuilder(ExamAPI.Categories.GetCategories),
        post: this.endpointBuilder(ExamAPI.Categories.PostCategory),
    };

    readonly examInstance = {
        post: this.endpointBuilder(ExamAPI.ExamInstance.PostExamInstance),
        get: this.endpointBuilder(ExamAPI.ExamInstance.GetExamInstance),
        submit: this.endpointBuilder(
            ExamAPI.ExamInstance.PostExamInstanceSubmit
        ),
    };

    readonly exams = {
        post: this.endpointBuilder(ExamAPI.Exams.PostExam),
        list: this.endpointBuilder(ExamAPI.Exams.GetExams),
        get: this.endpointBuilder(ExamAPI.Exams.GetExam),
        patch: this.endpointBuilder(ExamAPI.Exams.PatchExam),
        getMeFollowing: this.endpointBuilder(ExamAPI.Exams.GetExamsMeFollowing),
        postThumbnail: this.endpointBuilder(ExamAPI.Exams.PostExamThumbnail),
    };

    readonly files = {
        post: this.endpointBuilder(ExamAPI.Files.PostFile),
    };

    readonly follows = {
        post: this.endpointBuilder(ExamAPI.Follows.PostFollow),
        delete: this.endpointBuilder(ExamAPI.Follows.DeleteFollow),
    };

    readonly notifications = {
        post: this.endpointBuilder(ExamAPI.Notifications.PostNotification),
    };

    readonly recommendations = {
        post: this.endpointBuilder(ExamAPI.Recommendations.PostRecommendation),
        list: this.endpointBuilder(ExamAPI.Recommendations.GetRecommendations),
        patch: this.endpointBuilder(
            ExamAPI.Recommendations.PatchRecommendation
        ),
        delete: this.endpointBuilder(
            ExamAPI.Recommendations.DeleteRecommendation
        ),
    };

    readonly search = {
        exams: this.endpointBuilder(ExamAPI.Search.SearchExams),
        users: this.endpointBuilder(ExamAPI.Search.SearchUsers),
        tags: this.endpointBuilder(ExamAPI.Search.SearchTags),
    };

    readonly tags = {
        post: this.endpointBuilder(ExamAPI.Tags.PostTag),
    };

    readonly terms = {
        post: this.endpointBuilder(ExamAPI.Terms.PostTerms),
        get: this.endpointBuilder(ExamAPI.Terms.GetTerm),
        getLastVersion: this.endpointBuilder(
            ExamAPI.Terms.GetTermsLatestVersion
        ),
    };

    readonly users = {
        get: this.endpointBuilder(ExamAPI.Users.GetUser),
        patch: this.endpointBuilder(ExamAPI.Users.PatchUser),
        nickNameDuplicateCheck: this.endpointBuilder(
            ExamAPI.Users.GetUserNicknameDuplicateCheck
        ),
        getFollowing: this.endpointBuilder(ExamAPI.Users.GetUserMeFollowings),
        getFollowers: this.endpointBuilder(ExamAPI.Users.GetUserMeFollowers),
    };
}
