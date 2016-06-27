
const oauth = {
    twitter: {
        key: null,
        secret: null,
        callbackUrl: "/auth/signup/twitter/callback/"
    },
    github: {
        key: null,
        secret: null,
        callbackUrl: "/auth/signup/github/callback/"
    },
    google: {
        key: null,
        secret: null,
        callbackUrl: "/auth/signup/google/callback/"
    },
    tumblr: {
        key: null,
        secret: null,
        callbackUrl: "/auth/signup/tumblr/callback/"
    },
    facebook: {
        key: null,
        secret: null,
        callbackUrl: "/auth/signup/facebook/callback/"
    },
    //for the newsletter
    newsletter: {
        apiKey: null,
        listId: null,
    },
}

export default oauth
