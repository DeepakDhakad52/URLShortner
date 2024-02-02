export const generateShortId = () => {
    const alphabate = [...'abcdefghijklmnopqrstuvwxyz',...'1234567890',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    let result = '';
    for(let i=0,j; i<12; i++){
        j = Math.floor(Math.random()*62);
        result += alphabate[j];
    }
    return result;
}