import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL

export const getToken = async () => {
    let src = baseURL+"api/botMassage/token"
    let token = localStorage.getItem('tokenBot')
    if (!token) {
        const data = await axios.get(src)
        localStorage.setItem('tokenBot', JSON.stringify(data.data))
    }
}
export const getAllMessages = async () => {
    let token = localStorage.getItem('tokenBot')
    let src = baseURL+"api/botMassage/messages/"
    if (token) {
        src = src + token;
        const data = await axios.get(src)
        return (data.data);
    }
}
export const sendMessage = async (message) => {
    let token = localStorage.getItem('tokenBot')
    let src = baseURL+"api/botMassage/messages/"
    const data=await axios.post(src, { 'message': message, 'token': token })
    return data.data;

}



//export default getToken();