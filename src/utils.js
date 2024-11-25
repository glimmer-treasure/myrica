export const asyncWrapper = async (promise) => {
    let result = new Array(2).fill(void 0)
    try {
        result[1] = await promise
    } catch (error) {
        result[0] = error
    } finally {
        return result
    }
}