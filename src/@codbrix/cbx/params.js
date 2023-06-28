export const getLocationParams = (params) => {
    var query = Object.fromEntries(window.location.search.replace('?', '').split('&').map(q => [q.split('=')[0], q.split('=')[1]]))
    return '?' + [...Object.entries(query), ...Object.entries(params)].map(item => item.join('=')).join('&')
}