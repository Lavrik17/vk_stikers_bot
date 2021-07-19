import utils from "rus-anonym-utils";

import { UserCommand } from "../../../../utils/lib/commands/core";
import VK from "../../../../VK/core";

new UserCommand(/(?:^!audio)(?:\s(.*))?$/i, async function (message) {
	if (!message.args[1]) {
		return await message.editMessage({
			message: "Отсутствует запрос",
		});
	}

	const audios = await VK.user.getVK().api.call("audio.search", {
		q: message.args[1],
		count: 10,
	});

	if (audios.items.length === 0) {
		return await message.editMessage({
			message: `По запросу ${message.args[1]} не найдено документов`,
		});
	}

	return await message.editMessage({
		message: `Нашёл ${audios.items.length} ${utils.string.declOfNum(
			audios.items.length,
			["аудиозапись", "аудизаписи", "аудиозаписей"],
		)} по запросу ${message.args[1]}:`,
		attachment: audios.items.map(
			(x: { owner_id: string; id: string; access_key: string }) =>
				`audio${x.owner_id}_${x.id}_${x.access_key}`,
		),
	});
});
