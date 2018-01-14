export default {
    isBlankObject(obj = {}) {
        if (!obj) return true;
        for (let i in obj) {
            return false;
        }
        return true;
    }
}
