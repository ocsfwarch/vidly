import _ from 'lodash'

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize
    // Create a lodash object
    // so we can chain the lodash methods
    return _(items).slice(startIndex).take(pageSize).value()
}