import axios from 'axios';
import config from '../Config';
const { googleOAuth, server } = config;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } = googleOAuth;

class GoogleOAuthService {
  makeQueryString(query) {
    const enc = encodeURIComponent;
    return Object.keys(query)
      .map((k) => `${enc(k)}=${enc(query[k])}`)
      .join('&');
  }

  getGoogleAuthUrl = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const query = {
      redirect_uri: `${server.SERVER_URL}:${server.PORT}/${GOOGLE_REDIRECT_URL}`,
      client_id: GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    const queryString = this.makeQueryString(query);
    return `${rootUrl}?${queryString}`;
  };

  async getGoogleUserData({ id_token, access_token }) {
    try {
      const url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=';
      const { data } = await axios.get(url + access_token, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      });

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getGoogleToken(code: string) {
    const clientId = GOOGLE_CLIENT_ID;
    const clientSecret = GOOGLE_CLIENT_SECRET;
    const redirectUri = `${server.SERVER_URL}:${server.PORT}/${GOOGLE_REDIRECT_URL}`;
    const url = 'https://oauth2.googleapis.com/token';

    const query = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };

    try {
      const { data } = await axios.post(url, this.makeQueryString(query));
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

}

export default GoogleOAuthService;
