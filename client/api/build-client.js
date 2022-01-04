import axios from 'axios';

/**
 * We need this helper function everytime we make request from `getInitialProps` function.
 *
 * @returns `AxiosInstance`
 */
export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    // requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/?(.*)
    // with cookie if needed
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // requests can be made with the baseUrl of ''
    return axios.create({
      baseURL: '/',
    });
  }
};
