export function replaceSpace(string) {
    return [...string].map(char => {
        if(char == ' ') {
            return ''
        }
        return char;
    }).join('')
}