import utils from "rus-anonym-utils";
import { Command } from "../../../utils/lib/command";

new Command(
	/(?:^!выбери число)(?:\sот(?:\s?)(\d+)(?:\s?)(?:(?:до)?)(?:\s?)(?:(\d+)?))?$/i,
	async function (message) {
		if (!message.args[1]) {
			const firstNum = utils.number.getRandomInt(0, 50);
			const secondNum = utils.number.getRandomInt(50, 100);
			return message.editMessage({
				message: `Поскольку границы для выбора числа не были выбраны, я выбирал число от ${firstNum} до ${secondNum}
Итак моё число это ${utils.number.getRandomInt(firstNum, secondNum)}`,
			});
		}
		if (!message.args[2]) {
			const secondNum = utils.number.getRandomInt(
				Number(message.args[1]),
				Number(message.args[1]) * 3,
			);
			return message.editMessage({
				message: `Поскольку вы не установили верхней границы для выбора числа, я решил что она будет равна ${secondNum}
Итак моё число это ${utils.number.getRandomInt(
					Number(message.args[1]),
					secondNum,
				)}`,
			});
		}
		console.log(message.args[2]);
		return message.editMessage({
			message: `Я выбираю число ${utils.number.getRandomInt(
				Number(message.args[1]),
				Number(message.args[2]),
			)}
Границы выбора: ${Number(message.args[1])} и ${Number(message.args[2])}`,
		});
	},
);
