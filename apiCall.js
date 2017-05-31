export default function(operation, expression, callback){
    fetch(`https://newton.now.sh/${operation}/${expression}`)
    .then((response) => response.json())
    .then((responseData) => {
        callback(`I ${operation}'d ${expression} and got:\n\n${responseData.result}`);
    })
    .catch((e) => {
    callback('Sorry...I didn\'t understand that command.\nI\'m a robot, so there\'s a special way to tell me what to do!');
    })
    .finally();
};