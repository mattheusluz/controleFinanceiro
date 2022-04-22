export function orderColumnAsc(a, b, by){
    if(by === 'date'){
        return new Date(a.date) - new Date(b.date);
    }

    if(by === 'value'){
        return a.value - b.value
    }
}

export function orderColumnDesc(a, b, by){
    if(by === 'date'){
        return new Date(b.date) - new Date(a.date);
    }
    
    if(by === 'value'){
        return b.value - a.value
    }
}