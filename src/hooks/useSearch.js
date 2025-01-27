export function useSearch(url, query) {
    const doSearch = () => {
        if (query.length == '') return
        location.href = url.replace('{{search_query}}', query)
    }

    return { doSearch }    
}