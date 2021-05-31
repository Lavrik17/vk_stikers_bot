import axios from "axios";

import { Command } from "../../../utils/lib/command";

new Command(/(?:!tester)$/i, async function (message) {
	await message.loadMessagePayload();
	let userID;
	if (message.forwards[0]) {
		userID = message.forwards[0].senderId;
	} else if (message.replyMessage) {
		userID = message.replyMessage.senderId;
	} else {
		userID = message.senderId;
	}

	try {
		const userData = (
			await axios.get(
				"https://ssapi.ru/vk-bugs-api/?method=getReporter&reporter_id=" +
					userID,
			)
		).data;

		return message.editMessage({
			message: `Пользователь @id${userData.response.reporter.id}
Статус: ${userData.response.reporter.status_text}

Позиция в топе: ${userData.response.reporter.top_position}
Количество отчётов: ${userData.response.reporter.reports_count}

https://vk.com/bugs?act=reporter&id=${userData.response.reporter.id}`,
			disable_mentions: true,
		});
	} catch (error) {
		return message.reply("апи здохло");
	}
});