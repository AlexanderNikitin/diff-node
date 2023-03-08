function compare(s1, s2) {
    class CacheHolder {
        constructor(count, side, prev) {
            this.count = count
            this.side = side
            this.prev = prev
        }
    }

    const A = 1;
    const B = 2;
    const C = 3;

    const NULL = new CacheHolder(0, null, null)

    let n = s1.length + 1;
    let m = s2.length + 1;
    let cache = [[],[]];
    cache[0].length = cache[1].length = m;
    let prevCacheLine = cache[0];
    let currentCacheLine = cache[1];
    prevCacheLine.fill(NULL);
    currentCacheLine[0] = NULL;

    for (let i = 1, prevI = 0; i < n; prevI = i++) {
        let curIPrevJ = currentCacheLine[0];
        for (let j = 1, prevJ = 0; j < m; prevJ = j++) {
            let result;
            if (s1[prevI], s2[prevJ]) {
                let prevIPrevJ = prevCacheLine[prevJ];
                result = new CacheHolder(prevIPrevJ.count + 1, C, prevIPrevJ);
            } else {
                let prevICurJ = prevCacheLine[j];
                let a = prevICurJ.count;
                let b = curIPrevJ.count;
                result = a > b || a == b && i < j ?
                        new CacheHolder(a, A, prevICurJ) :
                        new CacheHolder(b, B, curIPrevJ);
            }
            curIPrevJ = currentCacheLine[j] = result;
        }

        let temp = prevCacheLine;
        prevCacheLine = currentCacheLine;
        currentCacheLine = temp;
    }
    let result = [];
    let current = cache[s1.length % 2][s2.length]
    for (let i = s1.length, j = s2.length;
         i > 0 && j > 0; ) {
        switch (current.side) {
            case C:
                result.push([--i, --j])
                break
            case A:
                i--
                break
            case B:
                j--
                break
        }
        current = current.prev;
    }
    result = result.reverse()
}

function genArray(length, ratio) {
    let a = []
    let maxRandom = length / ratio;
    for(let i = 0; i < length; i++){
        a.push(Math.random(maxRandom))
    }
    return a
}

function genData(length, ratio, iterations) {
    let res = []
    for(let i = 0; i < iterations; i++) {
        res.push([genArray(length, ratio), genArray(length, ratio)])
    }
    return res
}

function bench() {
    let iterations = 20
    let length = 10000
    let ration = 100
    let data = genData(length, ration, iterations)
    let max = undefined
    let t0 = new Date().getTime()
    for(let i in data) {
        let pair = data[i]
        let result = compare(pair[0], pair[1])
        if(max == undefined || result.length > max.length) {
            max = result
        }
    }
    let t = new Date().getTime()
    console.log('time: ' + (t - t0))
    console.log(max.length)
    console.log(max)
}

bench()