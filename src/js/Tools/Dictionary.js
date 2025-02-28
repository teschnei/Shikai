export function update(object, key, value) {
    const copy = {...object};
    const keys = key.split(".");
    let iter = copy;
    for(let i = 0; i < keys.length; i++) {
        let k = keys[i];
        if (i == keys.length - 1){iter[k] = value;} else {
            if(k in iter){iter = iter[k];}
        }
    } return copy;
}

export function query(object, key) {
    let copy = {...object};
    let path = key.split(".");
    for(let i = 0; i < path.length; i++) {copy = copy[path[i]];}
    return copy;
}