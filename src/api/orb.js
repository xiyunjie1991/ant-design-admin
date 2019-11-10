import apiService from "@/api/http.js";
export function FindOrbs(page,page_size,query) {
	return apiService({
		url:  "/admin/Orb/FindOrbs",
		method: "post",
		data:{
			page,
			page_size,
			query
		}
	});
}

export function UpdateOrb(
	id,
	name,
	nickname,
	avatar,
	intro,
	pictures,
	game_id,
	picture,
	is_official
) {
	return apiService({
		url:  "/admin/Orb/UpdateOrb",
		method: "post",
		data: {
			id,
			name,
			nickname,
			avatar,
			intro,
			pictures,
			game_id,
			picture,
			is_official
		}
	});
}

export function GetOrbInfo(id) {
	return apiService({
		url:  "/admin/Orb/GetOrbInfo",
		method: "post",
		data: {
			id
		}
	});
}

export function GetOrbInfoByRoomID(roomID) {
	return apiService({
		url:  "/admin/Orb/GetOrbInfoByRoomID",
		method: "post",
		data: {
			room_id: roomID
		}
	});
}

export function GetOrbRoom(id) {
	return apiService({
		url:  "/admin/Orb/GetOrbRoom",
		method: "post",
		data: {
			id
		}
	});
}

export function FindFeaturedOrbs(data) {
	return apiService({
		url:  "/admin/Orb/FindFeaturedOrbs",
		method: "post",
		data
	});
}

export function UpdateFeaturedOrbs(orbs) {
	return apiService({
		url:  "/admin/Orb/UpdateFeaturedOrbs",
		method: "post",
		data: {
			orbs
		}
	});
}

export function FindOrbRoomGroups(orb_id) {
	return apiService({
		url:  "/admin/Orb/FindOrbRoomGroups",
		method: "post",
		data: {
			orb_id
		}
	});
}

export function FindOrbRoomGroupRooms(group_id) {
	return apiService({
		url:  "/admin/Orb/FindOrbRoomGroupRooms",
		method: "post",
		data: {
			group_id
		}
	});
}

export function UpdateOrbRoom(id, group_id, name, type) {
	return apiService({
		url:  "/admin/Orb/UpdateOrbRoom",
		method: "post",
		data: {
			id,
			group_id,
			name,
			type
		}
	});
}

export function UpdateOrbRoomGroup(id, orb_id, name) {
	return apiService({
		url:  "/admin/Orb/UpdateOrbRoomGroup",
		method: "post",
		data: {
			id,
			orb_id,
			name
		}
	});
}

export function UpdateOrbRoomGroups(orb_id, groups) {
	return apiService({
		url:  "/admin/Orb/UpdateOrbRoomGroups",
		method: "post",
		data: {
			orb_id,
			groups
		}
	});
}

export function UpdateOrbRooms(group_id, rooms) {
	return apiService({
		url:  "/admin/Orb/UpdateOrbRooms",
		method: "post",
		data: {
			group_id,
			rooms
		}
	});
}

export function FindOrbRoom_Articles(query, page, page_size, room_id) {
	return apiService({
		url:  "/admin/Orb/FindOrbRoom_Articles",
		method: "post",
		data: {
			query,
			page,
			page_size,
			room_id
		}
	});
}

export function CreateOrbRoom_Article(room_id, article_id) {
	return apiService({
		url:  "/admin/Orb/CreateOrbRoom_Article",
		method: "post",
		data: {
			room_id,
			article_id
		}
	});
}

export function RemoveOrbRoom_Article(room_id, article_id) {
	return apiService({
		url:  "/admin/Orb/RemoveOrbRoom_Article",
		method: "post",
		data: {
			room_id,
			article_id
		}
	});
}

export function FindRecommendedOrbs(data) {
	return apiService({
		url:  "/admin/Orb/FindRecommendedOrbs",
		method: "post",
		data
	});
}

export function UpdateRecommendedOrbs(orb_ids) {
	return apiService({
		url:  "/admin/Orb/UpdateRecommendedOrbs",
		method: "post",
		data: {
			orb_ids
		}
	});
}

export function RemoveOrb(id) {
	return apiService({
		url:  "/admin/Orb/RemoveOrb",
		method: "post",
		data: {
			id
		}
	});
}

export function FindOrbUsers(page, page_size, query, orb_id) {
	return apiService({
		url:  "/admin/Orb/FindOrbUsers",
		method: "post",
		data: {
			page,
			page_size,
			query,
			orb_id
		}
	});
}
