import { dispatch } from 'redux';
import { request } from 'graphql-request';

export default function reducer(state, action) {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.username
      };
    case 'feedLoading':
      return {
        ...state,
        feedLoading: true
      };
    case 'feedLoaded':
      return {
        ...state,
        feedLoading: false,
        feed: action.payload
      };
    case 'updateFeed':
      return {
        ...state,
        feed: action.payload
      };
    default:
      return state;
  }
}



export function refreshFeed() {
  return function(dispatch) {

    dispatch({
      type: 'feedLoading'
    })

    const query = `{
      posts(first: 50, orderBy: createdAt_DESC){
        id
        location
        caption
        likes{
          profile{
            username
          }
        }
        profile{
          displayName
        }
        image{
          url
        }
      }
    }`;

    request(global.apiEndpoint, query)
    .then(data => {
      // mark which posts
      // app user has liked
      data.posts.forEach(post => {
        post.liked = post.likes.map(l => l.profile.username).includes('rudots');
        post.likeCount = post.likes.length;
        if(post.liked) post.likeCount--;
      });

      dispatch({
        type: 'feedLoaded',
        payload: data.posts
      })
    });
  };
}
