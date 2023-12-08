
const Telegraf = require('telegraf');
const tf = require('@tensorflow/tfjs');

const bot = new Telegraf('6612192466:AAG2wldoEjNFfCN0jXvVsoMuXnCB59pGseA');

let model;
(async function() {
    const modelJson = {
        "class_name": "Sequential",
        "config": {
            "name": "sequential_1",
            "layers": [
                {
                    "class_name": "Dense",
                    "config": {
                        "units": 32,
                        "activation": "relu",
                        "input_shape": [784]
                    }
                },
                {
                    "class_name": "Dense",
                    "config": {
                        "units": 10,
                        "activation": "softmax"
                    }
                }
            ]
        }
    };
    model = await tf.models.modelFromJSON(modelJson);
})();

bot.on('text', (ctx) => {
    const inputText = ctx.message.text;
    const inputTensor = tf.tensor1d([inputText]);
    const result = model.predict(inputTensor);
    ctx.reply(result);
});

bot.launch();



