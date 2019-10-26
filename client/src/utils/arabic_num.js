export const arabic_num = {
    0: '٠',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
    10: '١٠',
    11: '١١',
}
export function convert(number) {
    console.log({number});
    let arabic = number.map((el)=>{
        let sNumber = el.answer.toString()
        if (sNumber.length === 2) {
            // f = arabic_num[sNumber[0]]
            el.arabic_answer =  `${arabic_num[sNumber[0]]}${arabic_num[sNumber[1]]}`
        }else if (sNumber.length === 1){            
            el.arabic_answer =  `${arabic_num[sNumber[0]]}`
        }
        return el;
    })
    return arabic
}
// export default arabic_num;