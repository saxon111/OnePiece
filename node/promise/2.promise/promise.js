const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: 'REJECTED'
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        const resolve = (val) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
            }
        }
        const reject = (reason) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            // 出错走失败逻辑
            reject(e)
        }
    }
    then(onFulfilled, onRejected) { // swtich  作用域
        if (this.status == STATUS.FUFILLED) {
            // to....
            onFulfilled(this.value);
        }
        if (this.status == STATUS.REJECTED) {
            
            onRejected(this.reason);
        }
    }
}
module.exports = Promise;