let operations = {
    simplify: { past: 'simplified' },
    factor:   { past: 'factored'   },
    derive:   { past: 'differentiated' },
    integrate:{ past: 'integrated' },
    zeroes:   { past: 'solved' },
    tangent:  { past: 'found the line tangent to' },
    area:     { past: 'found the area under' },
    sin:      { past: 'calculated the sine value of' },
    cos:      { past: 'calculated the cosine value of' },
    tan:      { past: 'calculated the tangent value of' },
    arcsin:   { past: 'calculated the inverse sine value of' },
    arccos:   { past: 'calculated the inverse cosine value of' },
    arctan:   { past: 'calculated the inverse tangent value of' },
    abs:      { past: 'found the absolute value of' },
    log:      { past: 'calculated the log value of' }
};

export default function(operation, expression, callback){
    computedExpression = expression.split('/').join('(over)');
    fetch(`https://newton.now.sh/${operation}/${computedExpression}`)
    .then((response) => response.json())
    .then((responseData) => {
        callback(`I ${operations[operation].past} ${expression} and got:\n\n${responseData.result}`);
    })
    .catch((e) => {
    callback('Sorry...I didn\'t understand that command. I\'m a robot, so there\'s a special way to tell me what to do.');
    })
    .finally();
};