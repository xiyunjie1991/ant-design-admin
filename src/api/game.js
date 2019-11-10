import apiService from "@/api/http.js";

export const findGames = (page = 1, pageSize = 10, query = "") => {
  return apiService({
    url: "/admin/Game/FindGames",
    method: "POST",
    data: {
      page,
      page_size: pageSize,
      query
    }
  });
};

export function FindGameTypes(data) {
	return apiService({
		url:  "/admin/Game/FindGameTypes",
		method: "get",
		params: { data }
	});
}

export function FindGameModes(data) {
	return apiService({
		url:  "/admin/Game/FindGameModes",
		method: "get",
		params: { data }
	});
}

export function FindGamePlatforms() {
	return apiService({
		url:  "/admin/Game/FindGamePlatforms",
		method: "get",
		data:{}
	});
}

export function UpdateGame(data) {
	return apiService({
		url:  "/admin/Game/UpdateGame",
		method: "post",
		data
	});
}

export function GetGameInfo(id) {
	return apiService({
		url:  "/admin/Game/GetGameInfo",
		method: "post",
		data:{id}
	});
}

export function GetGameInfoByPediaItemID(itemID) {
	return apiService({
		url:  "/admin/Game/GetGameInfoByPediaItemID",
		method: "post",
		data: {
			item_id: itemID
		}
	});
}

export function UpdateGamePlatformInfo(game_id,platform_id,price,official_chs,release_time) {
	return apiService({
		url:  "/admin/Game/UpdateGamePlatformInfo",
		method: "post",
		data:{
			game_id,
			platform_id,
			price,
			official_chs,
			release_time,
		}
	});
}

export function DeleteGamePlatformInfo(game_id, platform_id) {
	return apiService({
		url:  "/admin/Game/DeleteGamePlatformInfo",
		method: "post",
		data: {
			game_id,
			platform_id
		}
	});
}

// 获取游戏百科分类
export function FindGamePediaGroups(game_id) {
	return apiService({
		url:  "/admin/Game/FindGamePediaGroups",
		method: "post",
		data: {
			game_id
		}
	});
}

// 更新游戏的百科分类
export function UpdateGamePediaGroups(game_id, groups) {
	return apiService({
		url:  "/admin/Game/UpdateGamePediaGroups",
		method: "post",
		data: {
			game_id,
			groups
		}
	});
}

// 删除游戏的百科分类
export function DeleteGamePediaGroup(id, game_id) {
	return apiService({
		url:  "/admin/Game/DeleteGamePediaGroup",
		method: "post",
		data: {
			id,
			game_id
		}
	});
}

// 创建游戏的百科分类
export function CreateGamePediaGroup(game_id, name) {
	return apiService({
		url:  "/admin/Game/CreateGamePediaGroup",
		method: "post",
		data: {
			game_id,
			name
		}
	});
}

// 创建游戏的百科词条
export function CreateGamePediaItem(group_id, name, article_id) {
	return apiService({
		url:  "/admin/Game/CreateGamePediaItem",
		method: "post",
		data: {
			group_id,
			name,
			article_id
		}
	});
}

// 查找游戏的百科词条
export function FindGamePediaItems(group_id) {
	return apiService({
		url:  "/admin/Game/FindGamePediaItems",
		method: "post",
		data: {
			group_id
		}
	});
}

// 创建游戏的百科分类
export function DeleteGamePediaItem(id, group_id) {
	return apiService({
		url:  "/admin/Game/DeleteGamePediaItem",
		method: "post",
		data: {
			id,
			group_id
		}
	});
}

// 创建游戏的百科分类
export function UpdateGamePediaItems(group_id, items) {
	return apiService({
		url:  "/admin/Game/UpdateGamePediaItems",
		method: "post",
		data: {
			group_id,
			items
		}
	});
}
