export const formatter = (number) => {
    const numFormatter = Intl.NumberFormat('en', {
        notation: 'compact',
    })
    return numFormatter.format(number)
}