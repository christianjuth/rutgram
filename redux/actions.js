import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api-useast.graphcms.com/v1/ck041h6kf0eri01bx3rtqe0du/master';
const graphQLClient = new GraphQLClient(endpoint, {});

export const SET_PROFILE_ID = 'SET_PROFILE_ID';
export const RESET = 'RESET';

/*
 * home page feed
 */

export const FEED_REFRESH = 'FEED_REFRESH';
export const FEED_LOADED = 'FEED_LOADED';
export const FEED_UPDATE = 'FEED_UPDATE';

export function refreshFeed() {
  return function(dispatch, getState) {

    dispatch({
      type: FEED_REFRESH
    });

    let state = getState();

    const query = `{
      profile(where: { id: "${state.profileId}" }){
        following{
    			celebrity{
            id
            profilePicture{
              url
            }
            username
            posts(first: 5){
              id
              createdAt
              location
              caption
              likes{
                profile{
                  id
                  username
                }
              }
              profile{
                id
                displayName
                profilePicture{
                  url
                }
              }
              image{
                url
              }
            }
          }
        }
      }
    }`;

    graphQLClient.request(query)
    .then(data => {
      let posts = [];
      data.profile.following.forEach(f => {
        posts.push(...f.celebrity.posts);
      });

      // mark which posts
      // app user has liked
      posts.forEach(post => {
        post.liked = post.likes.map(l => l.profile.id).includes(state.profileId);
        post.likeCount = post.likes.length;
        if(post.liked) post.likeCount--;
      });

      posts.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      });

      let celebrities = data.profile.following.map(p => {
        let { id, profilePicture, username } = p.celebrity;
        return { id, profilePicture, username };
      });

      dispatch({
        type: FEED_LOADED,
        payload: {
          celebrities,
          posts
        }
      });
    });
  };
}



/*
 * likes page
 * (shows who has liked your posts)
 */

export const LIKES_LOADING = 'LIKES_LOADING';
export const LIKES_LOADED = 'LIKES_LOADED';

export function refreshLikes() {
  return function(dispatch, getState) {
    let { profileId } = getState();

    dispatch({
      type: LIKES_LOADING
    });

    const query = `{
      likes(where: { post: { profile: { id: "${profileId}" } } }, first: 50, orderBy: createdAt_DESC){
        id
        profile{
          username
          profilePicture{
            url
          }
        }
        post{
          image{
            url
          }
        }
      }
    }`;

    graphQLClient.request(query)
    .then(data => {
      // mark which posts
      // app user has liked
      dispatch({
        type: LIKES_LOADED,
        payload: data.likes
      });
    });
  };
}


/*
 * profile page
 */

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_LOADED = 'PROFILE_LOADED';

export function refreshProfile() {
  return function(dispatch, getState) {
    let state = getState();

    const query = `{
      profile(where: { id: "${state.profileId}" }){
        username
        displayName
        bio
        profilePicture{
          url
        }
        followers{
          fan{
            id
            username
          }
        }
        following{
          fan{
            id
            username
          }
        }
        posts(orderBy: createdAt_DESC){
          id
          location
          caption
          likes{
            profile{
              id
              username
            }
          }
          profile{
            displayName
            profilePicture{
              url
            }
          }
          image{
            url
          }
        }
      }
    }`;

    graphQLClient.request(query)
    .then(data => {
      dispatch({
        type: PROFILE_LOADED,
        payload: data.profile
      });
    });
  };
}
