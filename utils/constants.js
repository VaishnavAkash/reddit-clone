export const projectID = '4gnxzyrwr7ts'
export const API_COMMUNITIES = 'https://academics.newtonschool.co/api/v1/reddit/channel'

export const API_POSTS = 'https://academics.newtonschool.co/api/v1/reddit/post/'

export const API_MAX_POSTS = `https://academics.newtonschool.co/api/v1/reddit/post?limit=100.`;

export const API_INFINITE_SCROLL = `https://academics.newtonschool.co/api/v1/reddit/post?limit=10&page=`;

export const API_SEARCH = `fetch('https://academics.newtonschool.co/api/v1/reddit/post?search={"field":"search_term_here"}', {
    headers: {
        'projectID': 'YOUR_PROJECT_ID'
    }
})`

export const API_FILTER = `
fetch('https://academics.newtonschool.co/api/v1/reddit/post?filter={"field":"search_term_here"}', {    headers: {
        'projectID': 'YOUR_PROJECT_ID'
    }
})`;

export const API_CREATE_SUBREDDITS= `fetch('https://academics.newtonschool.co/api/v1/reddit/channel/', {
    headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
       'projectID': 'YOUR_PROJECT_ID'
    },
   body: {
      'title': 'postTitle',
      'description': 'postDescription',
      'images': 'postImage',
   }
})`

export const API_UPDATE_SUBREDDITS= `fetch('https://academics.newtonschool.co/api/v1/reddit/channel/:channelId/', {
    headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
       'projectID': 'YOUR_PROJECT_ID'
    },
   body: {
      'title': 'postTitle',
      'description': 'postDescription',
   }
})`;

export const API_DELETE_SUBREDDITS = `fetch('https://academics.newtonschool.co/api/v1/reddit/channel/:channelId', {
    headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
       'projectID': 'YOUR_PROJECT_ID'
    }})`;

//     👉GET: Use the below API for getting user by ID
// fetch('https://academics.newtonschool.co/api/v1/reddit/channel/:userID', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }
// })

// 👉POST: Use the below API for following a Profile
// fetch('https://academics.newtonschool.co/api/v1/reddit/follow/:userId', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }
// })


// 👉DELETE: Use the below API for unfollowing a Profile
// fetch('https://academics.newtonschool.co/api/v1/reddit/follow/:userId', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }
// })

// 👉GET: Use the below API for getting post of a particular Subreddit
// fetch('https://academics.newtonschool.co/api/v1/reddit/channel/:channelId/posts', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }
// })

    // 👉POST: Use the below API for Upvoting a Post
    // fetch('https://academics.newtonschool.co/api/v1/reddit/like/:postId', {
    //     headers:
    //         'Authorization': 'Bearer YOUR_JWT_TOKEN',
    //        'projectID': 'YOUR_PROJECT_ID'
    //     }
    // })

//     👉DELETE: Use the below API for Downvoting a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/like/:postId', {
//     headers:
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }
// })

// 👉GET: Use the below API for fetching comments of a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/post/:postId/comments', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }
// })

// 👉POST: Use the below API for creating comment of a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/comment/:postId', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }, 
//    body: {
//        'content': 'YOUR_COMMENT'
//    }
// })

// 👉PATCH: Use the below API for updating comment of a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/comment/:commentId', {
//     headers:
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }, 
//    body: {
//        'content': 'YOUR_UPDATED_COMMENT'
//    }
// })

// 👉DELETE: Use the below API for deleting comment of a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/comment/:commentId', {
//     headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//  }})

// 👉DELETE: Use the below API for Deleting a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/post/:postId', {    headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     }})

// 👉PATCH: Use the below API for Updaing a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/post/:postId', {    headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     },
//    body: {
//       'title': 'new postTitle',
//       'content': 'new postContent',
//       'images': 'new postImage',
//    }
// })

// 👉POST: Use the below API for Creating a Post
// fetch('https://academics.newtonschool.co/api/v1/reddit/post/', {    
// headers: {
//         'Authorization': 'Bearer YOUR_JWT_TOKEN',
//        'projectID': 'YOUR_PROJECT_ID'
//     },
//    body: {
//       'title': 'postTitle',
//       'content': 'postContent',
//       'images': 'postImage',
//    }
// })