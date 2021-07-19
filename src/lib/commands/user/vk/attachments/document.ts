import utils from "rus-anonym-utils";

import { UserCommand } from "../../../../utils/lib/commands/core";
import VK from "../../../../VK/core";

new UserCommand(/(?:^!doc)(?:\s(.*))?$/i, async function (message) {
	if (!message.args[1]) {
		return await message.editMessage({
			message: "Отсутствует запрос",
		});
	}

	const documents = await VK.user.getVK().api.docs.search({
		q: message.args[1],
		count: 10,
	});

	if (documents.items.length === 0) {
		return await message.editMessage({
			message: `По запросу ${message.args[1]} не найдено документов`,
		});
	}

	return await message.editMessage({
		message: `Нашёл ${documents.items.length} ${utils.string.declOfNum(
			documents.items.length,
			["документ", "документа", "документов"],
		)} по запросу ${message.args[1]}:`,
		attachment: documents.items.map(
			(x) =>
				`doc${x.owner_id}_${x.id}${x.access_key ? `_${x.access_key}` : ""}`,
		),
	});
});
