export const projectID = '4gnxzyrwr7ts'
export const API_COMMUNITIES = 'https://academics.newtonschool.co/api/v1/reddit/channel'

export const API_POSTS = 'https://academics.newtonschool.co/api/v1/reddit/post'

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

