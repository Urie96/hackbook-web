
import { Article, Course, CourseList, CommentList, UserInfo, UserRole, SaveStudyInfoRequest } from './abi'
import { Message, Dialog, sleep } from '@/utils';
export * from './abi'

const fetchProto = async (url: string, options?: RequestInit) => {
  if (options?.method?.toLowerCase() === 'post') {
    options.headers = options.headers || {};
    const headers: any = options.headers;
    headers['content-type'] = 'application/protobuf';
  }
  const resp = await fetch('/api' + url, options);
  if (resp.ok) {
    return new Uint8Array(await resp.arrayBuffer());
  }
  return null;
}

export const listCourses = async ({ offset = 0, limit = 20, keyword = '' }) => {
  const data = await fetchProto(`/courses?offset=${offset}&limit=${limit}&keyword=${keyword}`);
  const res = {
    courses: data ? CourseList.decode(data).courses : [],
    more: true,
  };
  if (res.courses.length < limit) {
    res.more = false;
  }
  return res
};


export const getCourseById = async (courseId: string) => {
  const data = await fetchProto(`/course/${courseId}`);
  return data ? Course.decode(data) : null;
}


export const getArticleComments = async (articleId: string) => {
  const data = await fetchProto(`/article/${articleId}/comments`);
  return data ? CommentList.decode(data).comments : [];
}

let loggedUser: UserInfo | null = null;

export const getLoggedUser = async () => {
  if (loggedUser) {
    return loggedUser
  }
  const data = await fetchProto('/me')
  if (data) {
    loggedUser = UserInfo.decode(data);
    return loggedUser
  }
  console.log('Not logged in');
  return null
}

export const login = async (redirect = '') => {
  if (!redirect) {
    redirect = location.href
  }
  Message('正在跳转SSO登录...');
  await sleep(1);
  location.href = `/api/login?return_to=${redirect}`;
  await sleep(1000000)
}

let socket: WebSocket | null = null;

async function receiveMessage() {
  return new Promise<MessageEvent<any>>((resolve, reject) => {
    socket!.onmessage = function (e) {
      const data = e.data;
      if (typeof data === 'string') {
        switch (data) {
          case "You have logged in elsewhere":
            popupLock();
        }
      }
      resolve(e);
    }
  })
}

const connect = async () => {
  if (socket) {
    return true;
  }
  if (!await getLoggedUser()) {
    await login();
  }
  if (loggedUser!.role != UserRole.Reader) {
    try {
      await Dialog.confirm({
        title: '是否申请阅读权限',
        message:
          '为了避免滥用，阅读权限需要申请，\n申请后管理员会在1-2个工作日内审核，\n审核通过后即可阅读所有文章',
        confirmButtonText: '申请',
      })
      location.href = '/apply'
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
  await new Promise<void>((resolve, reject) => {
    const { location } = window;

    const proto = location.protocol.startsWith('https') ? 'wss' : 'ws';
    const host = location.host;
    // const host = 'localhost:8080';
    const wsUri = `${proto}://${host}/api/ws`;

    console.log('Connecting...');
    socket = new WebSocket(wsUri);

    socket.onopen = function () {
      Message('已成功建立Websocket连接');
      resolve();
    }

    socket.onclose = function (e) {
      console.log('close', e);
      Message('Websocket连接已断开');
    }
    socket.onerror = function (e) {
      console.log('error', e);
    }
  })
  return true;
}

function popupLock() {
  Dialog({ message: '检测到您的账户在其它地方登录，\n当前连接已被强制中断', showConfirmButton: false });
}

function disconnect() {
  if (socket) {
    console.log('Disconnecting...')
    socket.close()
    socket = null
  }
}

export const getArticleDetailById = async (articleId: string) => {
  if (!socket) {
    const connected = await connect();
    if (!connected) {
      return null
    }
  }
  socket!.send('/article_detail ' + articleId);
  const { data } = await receiveMessage();
  if (typeof data === 'object') {
    const buf = await (data as Blob).arrayBuffer();
    const article = Article.decode(new Uint8Array(buf));
    return article;
  }
  return null
}

export const saveStudyInfo = async (info: SaveStudyInfoRequest) => {
  await fetchProto('/study_info', {
    method: 'POST',
    body: SaveStudyInfoRequest.encode(info).finish(),
  })
}

// export const addUserTend = async (courseTend: CourseTend) => {
//   if (!window.isAuthenticated) await login();
//   const { addCourseTend } = await request(
//     gql`
//       mutation ($courseId: String!, $type: String!) {
//         addCourseTend(courseId: $courseId, type: $type) {
//           ...courseTend
//         }
//       }

//       ${courseTendFragment}
//     `,
//     courseTend
//   );
//   return addCourseTend as CourseTend;
// };

// export const deleteUserTend = async (courseId: string) => {
//   if (!window.isAuthenticated) await login();
//   const { deleteCourseTend } = await request(
//     gql`
//       mutation ($courseId: String!) {
//         deleteCourseTend(courseId: $courseId)
//       }
//     `,
//     { courseId }
//   );
//   return deleteCourseTend as boolean;
// };


//   ${courseFragment}
//   ${sectionFragment}
//   ${articleFragment}
// `);
//   return course as Course;
// };

// export const getArticleById = async (id: string) => {
//   const { article } = await request(gql`
//   {
//     article(id: "${id}"){
//       ...article
//       content
//       section{
//         ...section
//         course{
//           ...course
//         }
//       }
//       comments{
//         ...comment
//       }
//     }
//   }

//   ${commentFragment}
//   ${articleFragment}
//   ${courseFragment}
//   ${sectionFragment}
//   `);
//   return article as Article;
// };

// const sleepForever = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 1000 * 3600 * 24 * 100);
//   });

// export const login = async (loginReturnTo = location.pathname) => {
//   if (loginReturnTo.trim() === '') {
//     throw new Error('param loginReturnTo must not be blank string');
//   }
//   const {
//     login: { message, redirect },
//   } = await request(
//     gql`
//       {
//         login(loginReturnTo: "${loginReturnTo}"){
//           message
//           redirect
//         }
//       }
//       `
//   );
//   if (message === 'success') {
//     window.isAuthenticated = true;
//     return true;
//   }
//   if (redirect) {
//     Message.warning('trying to log in automatically');
//     window.location.href = redirect;
//     await sleepForever();
//   }
// };

// export const guestLogin = async (token: string) => {
//   const {
//     guestLogin: { message },
//   } = await request(
//     gql`
//       {
//         guestLogin(token: "${token}"){
//           message
//         }
//       }
//       `
//   );
//   if (message === 'success') {
//     Message.success('successfully logged in as a guest');
//     window.isAuthenticated = true;
//     return true;
//   } else {
//     Message.warning(`login as a guest failed: ${message}`);
//     return false;
//   }
// };
