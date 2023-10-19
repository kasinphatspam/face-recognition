export default function NumberNormailize(x) {
    /** x more than million */
    if (x > 1000000) {
        return ((x / 1000000).toFixed(1) + 'M')
    }
    /** x more than thousand */
    else if (x > 1000) {
        return ((x / 1000).toFixed(2) + 'K')
    }
    else return x
}