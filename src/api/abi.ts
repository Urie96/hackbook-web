/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "abi";

export enum UserRole {
  Visitor = 0,
  Reader = 1,
  UNRECOGNIZED = -1,
}

export function userRoleFromJSON(object: any): UserRole {
  switch (object) {
    case 0:
    case "Visitor":
      return UserRole.Visitor;
    case 1:
    case "Reader":
      return UserRole.Reader;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserRole.UNRECOGNIZED;
  }
}

export function userRoleToJSON(object: UserRole): string {
  switch (object) {
    case UserRole.Visitor:
      return "Visitor";
    case UserRole.Reader:
      return "Reader";
    case UserRole.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Course {
  articleCount: number;
  brief: string;
  done: boolean;
  id: string;
  image: string;
  price: number;
  purchasedCount: string;
  teacherName: string;
  teacherTitle: string;
  title: string;
  sections: Section[];
  description: string;
  studyInfo: StudyInfo | undefined;
}

export interface StudyInfo {
  percent: number;
  lastStudyAt: number;
}

export interface ListCourseResponse {
  courses: Course[];
  more: boolean;
}

export interface Section {
  id: string;
  title: string;
  articles: Article[];
}

export interface SectionList {
  sections: Section[];
}

export interface Article {
  id: string;
  title: string;
  publishDate: string;
  done: boolean;
  content: string;
  course: Course | undefined;
  section: Section | undefined;
  studyInfo: StudyInfo | undefined;
}

export interface ArticleList {
  articles: Article[];
}

export interface Comment {
  content: string;
  likeCount: number;
  nickName: string;
  replies: Comment[];
}

export interface CommentList {
  comments: Comment[];
}

export interface UserInfo {
  id: string;
  role: UserRole;
}

export interface SaveStudyInfoRequest {
  articleId: string;
  courseId: string;
  percent: number;
}

function createBaseCourse(): Course {
  return {
    articleCount: 0,
    brief: "",
    done: false,
    id: "",
    image: "",
    price: 0,
    purchasedCount: "",
    teacherName: "",
    teacherTitle: "",
    title: "",
    sections: [],
    description: "",
    studyInfo: undefined,
  };
}

export const Course = {
  encode(message: Course, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.articleCount !== 0) {
      writer.uint32(8).uint32(message.articleCount);
    }
    if (message.brief !== "") {
      writer.uint32(18).string(message.brief);
    }
    if (message.done === true) {
      writer.uint32(24).bool(message.done);
    }
    if (message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    if (message.image !== "") {
      writer.uint32(42).string(message.image);
    }
    if (message.price !== 0) {
      writer.uint32(48).uint32(message.price);
    }
    if (message.purchasedCount !== "") {
      writer.uint32(58).string(message.purchasedCount);
    }
    if (message.teacherName !== "") {
      writer.uint32(66).string(message.teacherName);
    }
    if (message.teacherTitle !== "") {
      writer.uint32(74).string(message.teacherTitle);
    }
    if (message.title !== "") {
      writer.uint32(82).string(message.title);
    }
    for (const v of message.sections) {
      Section.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(98).string(message.description);
    }
    if (message.studyInfo !== undefined) {
      StudyInfo.encode(message.studyInfo, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Course {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCourse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.articleCount = reader.uint32();
          break;
        case 2:
          message.brief = reader.string();
          break;
        case 3:
          message.done = reader.bool();
          break;
        case 4:
          message.id = reader.string();
          break;
        case 5:
          message.image = reader.string();
          break;
        case 6:
          message.price = reader.uint32();
          break;
        case 7:
          message.purchasedCount = reader.string();
          break;
        case 8:
          message.teacherName = reader.string();
          break;
        case 9:
          message.teacherTitle = reader.string();
          break;
        case 10:
          message.title = reader.string();
          break;
        case 11:
          message.sections.push(Section.decode(reader, reader.uint32()));
          break;
        case 12:
          message.description = reader.string();
          break;
        case 13:
          message.studyInfo = StudyInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Course {
    return {
      articleCount: isSet(object.articleCount) ? Number(object.articleCount) : 0,
      brief: isSet(object.brief) ? String(object.brief) : "",
      done: isSet(object.done) ? Boolean(object.done) : false,
      id: isSet(object.id) ? String(object.id) : "",
      image: isSet(object.image) ? String(object.image) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      purchasedCount: isSet(object.purchasedCount) ? String(object.purchasedCount) : "",
      teacherName: isSet(object.teacherName) ? String(object.teacherName) : "",
      teacherTitle: isSet(object.teacherTitle) ? String(object.teacherTitle) : "",
      title: isSet(object.title) ? String(object.title) : "",
      sections: Array.isArray(object?.sections) ? object.sections.map((e: any) => Section.fromJSON(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      studyInfo: isSet(object.studyInfo) ? StudyInfo.fromJSON(object.studyInfo) : undefined,
    };
  },

  toJSON(message: Course): unknown {
    const obj: any = {};
    message.articleCount !== undefined && (obj.articleCount = Math.round(message.articleCount));
    message.brief !== undefined && (obj.brief = message.brief);
    message.done !== undefined && (obj.done = message.done);
    message.id !== undefined && (obj.id = message.id);
    message.image !== undefined && (obj.image = message.image);
    message.price !== undefined && (obj.price = Math.round(message.price));
    message.purchasedCount !== undefined && (obj.purchasedCount = message.purchasedCount);
    message.teacherName !== undefined && (obj.teacherName = message.teacherName);
    message.teacherTitle !== undefined && (obj.teacherTitle = message.teacherTitle);
    message.title !== undefined && (obj.title = message.title);
    if (message.sections) {
      obj.sections = message.sections.map((e) => e ? Section.toJSON(e) : undefined);
    } else {
      obj.sections = [];
    }
    message.description !== undefined && (obj.description = message.description);
    message.studyInfo !== undefined &&
      (obj.studyInfo = message.studyInfo ? StudyInfo.toJSON(message.studyInfo) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Course>, I>>(object: I): Course {
    const message = createBaseCourse();
    message.articleCount = object.articleCount ?? 0;
    message.brief = object.brief ?? "";
    message.done = object.done ?? false;
    message.id = object.id ?? "";
    message.image = object.image ?? "";
    message.price = object.price ?? 0;
    message.purchasedCount = object.purchasedCount ?? "";
    message.teacherName = object.teacherName ?? "";
    message.teacherTitle = object.teacherTitle ?? "";
    message.title = object.title ?? "";
    message.sections = object.sections?.map((e) => Section.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.studyInfo = (object.studyInfo !== undefined && object.studyInfo !== null)
      ? StudyInfo.fromPartial(object.studyInfo)
      : undefined;
    return message;
  },
};

function createBaseStudyInfo(): StudyInfo {
  return { percent: 0, lastStudyAt: 0 };
}

export const StudyInfo = {
  encode(message: StudyInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.percent !== 0) {
      writer.uint32(13).float(message.percent);
    }
    if (message.lastStudyAt !== 0) {
      writer.uint32(16).uint64(message.lastStudyAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StudyInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStudyInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.percent = reader.float();
          break;
        case 2:
          message.lastStudyAt = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StudyInfo {
    return {
      percent: isSet(object.percent) ? Number(object.percent) : 0,
      lastStudyAt: isSet(object.lastStudyAt) ? Number(object.lastStudyAt) : 0,
    };
  },

  toJSON(message: StudyInfo): unknown {
    const obj: any = {};
    message.percent !== undefined && (obj.percent = message.percent);
    message.lastStudyAt !== undefined && (obj.lastStudyAt = Math.round(message.lastStudyAt));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StudyInfo>, I>>(object: I): StudyInfo {
    const message = createBaseStudyInfo();
    message.percent = object.percent ?? 0;
    message.lastStudyAt = object.lastStudyAt ?? 0;
    return message;
  },
};

function createBaseListCourseResponse(): ListCourseResponse {
  return { courses: [], more: false };
}

export const ListCourseResponse = {
  encode(message: ListCourseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.courses) {
      Course.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.more === true) {
      writer.uint32(16).bool(message.more);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCourseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCourseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.courses.push(Course.decode(reader, reader.uint32()));
          break;
        case 2:
          message.more = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCourseResponse {
    return {
      courses: Array.isArray(object?.courses) ? object.courses.map((e: any) => Course.fromJSON(e)) : [],
      more: isSet(object.more) ? Boolean(object.more) : false,
    };
  },

  toJSON(message: ListCourseResponse): unknown {
    const obj: any = {};
    if (message.courses) {
      obj.courses = message.courses.map((e) => e ? Course.toJSON(e) : undefined);
    } else {
      obj.courses = [];
    }
    message.more !== undefined && (obj.more = message.more);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCourseResponse>, I>>(object: I): ListCourseResponse {
    const message = createBaseListCourseResponse();
    message.courses = object.courses?.map((e) => Course.fromPartial(e)) || [];
    message.more = object.more ?? false;
    return message;
  },
};

function createBaseSection(): Section {
  return { id: "", title: "", articles: [] };
}

export const Section = {
  encode(message: Section, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    for (const v of message.articles) {
      Article.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Section {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.articles.push(Article.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Section {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      title: isSet(object.title) ? String(object.title) : "",
      articles: Array.isArray(object?.articles) ? object.articles.map((e: any) => Article.fromJSON(e)) : [],
    };
  },

  toJSON(message: Section): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    if (message.articles) {
      obj.articles = message.articles.map((e) => e ? Article.toJSON(e) : undefined);
    } else {
      obj.articles = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Section>, I>>(object: I): Section {
    const message = createBaseSection();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.articles = object.articles?.map((e) => Article.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSectionList(): SectionList {
  return { sections: [] };
}

export const SectionList = {
  encode(message: SectionList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sections) {
      Section.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SectionList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSectionList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sections.push(Section.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SectionList {
    return { sections: Array.isArray(object?.sections) ? object.sections.map((e: any) => Section.fromJSON(e)) : [] };
  },

  toJSON(message: SectionList): unknown {
    const obj: any = {};
    if (message.sections) {
      obj.sections = message.sections.map((e) => e ? Section.toJSON(e) : undefined);
    } else {
      obj.sections = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SectionList>, I>>(object: I): SectionList {
    const message = createBaseSectionList();
    message.sections = object.sections?.map((e) => Section.fromPartial(e)) || [];
    return message;
  },
};

function createBaseArticle(): Article {
  return {
    id: "",
    title: "",
    publishDate: "",
    done: false,
    content: "",
    course: undefined,
    section: undefined,
    studyInfo: undefined,
  };
}

export const Article = {
  encode(message: Article, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.publishDate !== "") {
      writer.uint32(26).string(message.publishDate);
    }
    if (message.done === true) {
      writer.uint32(32).bool(message.done);
    }
    if (message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    if (message.course !== undefined) {
      Course.encode(message.course, writer.uint32(50).fork()).ldelim();
    }
    if (message.section !== undefined) {
      Section.encode(message.section, writer.uint32(58).fork()).ldelim();
    }
    if (message.studyInfo !== undefined) {
      StudyInfo.encode(message.studyInfo, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Article {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArticle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.publishDate = reader.string();
          break;
        case 4:
          message.done = reader.bool();
          break;
        case 5:
          message.content = reader.string();
          break;
        case 6:
          message.course = Course.decode(reader, reader.uint32());
          break;
        case 7:
          message.section = Section.decode(reader, reader.uint32());
          break;
        case 8:
          message.studyInfo = StudyInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Article {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      title: isSet(object.title) ? String(object.title) : "",
      publishDate: isSet(object.publishDate) ? String(object.publishDate) : "",
      done: isSet(object.done) ? Boolean(object.done) : false,
      content: isSet(object.content) ? String(object.content) : "",
      course: isSet(object.course) ? Course.fromJSON(object.course) : undefined,
      section: isSet(object.section) ? Section.fromJSON(object.section) : undefined,
      studyInfo: isSet(object.studyInfo) ? StudyInfo.fromJSON(object.studyInfo) : undefined,
    };
  },

  toJSON(message: Article): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.publishDate !== undefined && (obj.publishDate = message.publishDate);
    message.done !== undefined && (obj.done = message.done);
    message.content !== undefined && (obj.content = message.content);
    message.course !== undefined && (obj.course = message.course ? Course.toJSON(message.course) : undefined);
    message.section !== undefined && (obj.section = message.section ? Section.toJSON(message.section) : undefined);
    message.studyInfo !== undefined &&
      (obj.studyInfo = message.studyInfo ? StudyInfo.toJSON(message.studyInfo) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Article>, I>>(object: I): Article {
    const message = createBaseArticle();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.publishDate = object.publishDate ?? "";
    message.done = object.done ?? false;
    message.content = object.content ?? "";
    message.course = (object.course !== undefined && object.course !== null)
      ? Course.fromPartial(object.course)
      : undefined;
    message.section = (object.section !== undefined && object.section !== null)
      ? Section.fromPartial(object.section)
      : undefined;
    message.studyInfo = (object.studyInfo !== undefined && object.studyInfo !== null)
      ? StudyInfo.fromPartial(object.studyInfo)
      : undefined;
    return message;
  },
};

function createBaseArticleList(): ArticleList {
  return { articles: [] };
}

export const ArticleList = {
  encode(message: ArticleList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.articles) {
      Article.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArticleList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArticleList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.articles.push(Article.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArticleList {
    return { articles: Array.isArray(object?.articles) ? object.articles.map((e: any) => Article.fromJSON(e)) : [] };
  },

  toJSON(message: ArticleList): unknown {
    const obj: any = {};
    if (message.articles) {
      obj.articles = message.articles.map((e) => e ? Article.toJSON(e) : undefined);
    } else {
      obj.articles = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArticleList>, I>>(object: I): ArticleList {
    const message = createBaseArticleList();
    message.articles = object.articles?.map((e) => Article.fromPartial(e)) || [];
    return message;
  },
};

function createBaseComment(): Comment {
  return { content: "", likeCount: 0, nickName: "", replies: [] };
}

export const Comment = {
  encode(message: Comment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== "") {
      writer.uint32(10).string(message.content);
    }
    if (message.likeCount !== 0) {
      writer.uint32(16).uint32(message.likeCount);
    }
    if (message.nickName !== "") {
      writer.uint32(26).string(message.nickName);
    }
    for (const v of message.replies) {
      Comment.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.content = reader.string();
          break;
        case 2:
          message.likeCount = reader.uint32();
          break;
        case 3:
          message.nickName = reader.string();
          break;
        case 4:
          message.replies.push(Comment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Comment {
    return {
      content: isSet(object.content) ? String(object.content) : "",
      likeCount: isSet(object.likeCount) ? Number(object.likeCount) : 0,
      nickName: isSet(object.nickName) ? String(object.nickName) : "",
      replies: Array.isArray(object?.replies) ? object.replies.map((e: any) => Comment.fromJSON(e)) : [],
    };
  },

  toJSON(message: Comment): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content);
    message.likeCount !== undefined && (obj.likeCount = Math.round(message.likeCount));
    message.nickName !== undefined && (obj.nickName = message.nickName);
    if (message.replies) {
      obj.replies = message.replies.map((e) => e ? Comment.toJSON(e) : undefined);
    } else {
      obj.replies = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Comment>, I>>(object: I): Comment {
    const message = createBaseComment();
    message.content = object.content ?? "";
    message.likeCount = object.likeCount ?? 0;
    message.nickName = object.nickName ?? "";
    message.replies = object.replies?.map((e) => Comment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommentList(): CommentList {
  return { comments: [] };
}

export const CommentList = {
  encode(message: CommentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.comments) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommentList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.comments.push(Comment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommentList {
    return { comments: Array.isArray(object?.comments) ? object.comments.map((e: any) => Comment.fromJSON(e)) : [] };
  },

  toJSON(message: CommentList): unknown {
    const obj: any = {};
    if (message.comments) {
      obj.comments = message.comments.map((e) => e ? Comment.toJSON(e) : undefined);
    } else {
      obj.comments = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommentList>, I>>(object: I): CommentList {
    const message = createBaseCommentList();
    message.comments = object.comments?.map((e) => Comment.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserInfo(): UserInfo {
  return { id: "", role: 0 };
}

export const UserInfo = {
  encode(message: UserInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.role !== 0) {
      writer.uint32(16).int32(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.role = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserInfo {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      role: isSet(object.role) ? userRoleFromJSON(object.role) : 0,
    };
  },

  toJSON(message: UserInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.role !== undefined && (obj.role = userRoleToJSON(message.role));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserInfo>, I>>(object: I): UserInfo {
    const message = createBaseUserInfo();
    message.id = object.id ?? "";
    message.role = object.role ?? 0;
    return message;
  },
};

function createBaseSaveStudyInfoRequest(): SaveStudyInfoRequest {
  return { articleId: "", courseId: "", percent: 0 };
}

export const SaveStudyInfoRequest = {
  encode(message: SaveStudyInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.articleId !== "") {
      writer.uint32(10).string(message.articleId);
    }
    if (message.courseId !== "") {
      writer.uint32(18).string(message.courseId);
    }
    if (message.percent !== 0) {
      writer.uint32(29).float(message.percent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveStudyInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveStudyInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.articleId = reader.string();
          break;
        case 2:
          message.courseId = reader.string();
          break;
        case 3:
          message.percent = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SaveStudyInfoRequest {
    return {
      articleId: isSet(object.articleId) ? String(object.articleId) : "",
      courseId: isSet(object.courseId) ? String(object.courseId) : "",
      percent: isSet(object.percent) ? Number(object.percent) : 0,
    };
  },

  toJSON(message: SaveStudyInfoRequest): unknown {
    const obj: any = {};
    message.articleId !== undefined && (obj.articleId = message.articleId);
    message.courseId !== undefined && (obj.courseId = message.courseId);
    message.percent !== undefined && (obj.percent = message.percent);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SaveStudyInfoRequest>, I>>(object: I): SaveStudyInfoRequest {
    const message = createBaseSaveStudyInfoRequest();
    message.articleId = object.articleId ?? "";
    message.courseId = object.courseId ?? "";
    message.percent = object.percent ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
