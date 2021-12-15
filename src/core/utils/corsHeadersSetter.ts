export const corsHeadersSetter = (axios): void => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
}